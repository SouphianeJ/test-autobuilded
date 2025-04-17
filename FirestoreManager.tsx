// FirestoreManager.tsx
import React, { useState, useEffect } from 'react';
import {
  collection,
  getFirestore,
  getDocs,
  doc,
  deleteDoc,
  Firestore,
} from 'firebase/firestore';
import { app } from '@/src/firebase/client';
import { logError, logInfo } from '@/src/firestore/logging';

// Interface for document data
interface DocumentData {
  id: string;
  [key: string]: any;
}

const FirestoreManager = () => {
  const [collections, setCollections] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([]);
  const db: Firestore = getFirestore(app);

  // --- Fetch Available Collections ---
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collectionRefs = await db.listCollections();
        const collectionNames = collectionRefs.map((ref) => ref.id);
        setCollections(collectionNames);
        logInfo('Collections fetched successfully:', collectionNames);
      } catch (error: any) {
        logError('Error fetching collections:', error);
      }
    };

    fetchCollections();
  }, [db]);

  // --- Fetch Documents for Selected Collection ---
  useEffect(() => {
    const fetchDocuments = async () => {
      if (selectedCollection) {
        try {
          const collectionRef = collection(db, selectedCollection);
          const snapshot = await getDocs(collectionRef);
          const documentsData: DocumentData[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDocuments(documentsData);
          logInfo(`Documents fetched successfully for collection: ${selectedCollection}`);
        } catch (error: any) {
          logError(`Error fetching documents for collection ${selectedCollection}:`, error);
          setDocuments([]); // Clear documents on error
        }
      } else {
        setDocuments([]); // Clear documents if no collection is selected
      }
    };

    fetchDocuments();
  }, [selectedCollection, db]);

  // --- Handle Collection Selection ---
  const handleCollectionSelect = (collectionName: string) => {
    setSelectedCollection(collectionName);
    setSelectedDocumentIds([]); // Clear selected documents when collection changes
  };

  // --- Handle Document Selection ---
  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocumentIds((prevSelected) => {
      if (prevSelected.includes(documentId)) {
        return prevSelected.filter((id) => id !== documentId);
      } else {
        return [...prevSelected, documentId];
      }
    });
  };

  // --- Handle Document Deletion ---
  const handleDeleteDocuments = async () => {
    if (selectedCollection && selectedDocumentIds.length > 0) {
      try {
        for (const documentId of selectedDocumentIds) {
          const documentRef = doc(db, selectedCollection, documentId);
          await deleteDoc(documentRef);
          logInfo(`Document ${documentId} deleted successfully from collection ${selectedCollection}`);
        }

        // Refresh documents after deletion
        const collectionRef = collection(db, selectedCollection);
          const snapshot = await getDocs(collectionRef);
          const documentsData: DocumentData[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDocuments(documentsData);
        setSelectedDocumentIds([]); // Clear selected documents after deletion
      } catch (error: any) {
        logError(`Error deleting documents from collection ${selectedCollection}:`, error);
      }
    }
  };

  // --- Handle Read Document Data (Placeholder - Implement actual logic) ---
  const handleReadDocument = (documentId: string) => {
    // TODO: Implement logic to read and display the data of the selected document
    console.log(`Reading data for document: ${documentId}`);
  };

  return (
    <div>
      <h2>Firestore Manager</h2>

      {/* Collection Selection */}
      <div>
        <h3>Collections</h3>
        <ul>
          {collections.map((collectionName) => (
            <li key={collectionName}>
              <button onClick={() => handleCollectionSelect(collectionName)}>
                {collectionName}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Document List */}
      {selectedCollection && (
        <div>
          <h3>Documents in {selectedCollection}</h3>
          {documents.length > 0 ? (
            <ul>
              {documents.map((doc) => (
                <li key={doc.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={doc.id}
                      checked={selectedDocumentIds.includes(doc.id)}
                      onChange={() => handleDocumentSelect(doc.id)}
                    />
                    {doc.id}
                    <button onClick={() => handleReadDocument(doc.id)}>Read</button>
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p>No documents found in this collection.</p>
          )}
        </div>
      )}

      {/* Delete Button */}
      {selectedCollection && selectedDocumentIds.length > 0 && (
        <div>
          <button onClick={handleDeleteDocuments}>Delete Selected Documents</button>
        </div>
      )}
    </div>
  );
};

export default FirestoreManager;