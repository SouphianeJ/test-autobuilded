import { useState } from 'react';

export default function Home() {
  const [repoUrl, setRepoUrl] = useState('');
  const [treeData, setTreeData] = useState(null);
  const [error, setError] = useState(null);

  const handleGetTree = async () => {
    setError(null);
    setTreeData(null);

    try {
      const response = await fetch(`/api/getgittree?repoUrl=${repoUrl}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch tree data');
      }

      const data = await response.json();
      setTreeData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>GitHub Repository Tree Viewer</h1>
      <input
        type="text"
        placeholder="Enter GitHub Repository URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      <button onClick={handleGetTree}>Get Tree</button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {treeData && (
        <div>
          <h2>Repository Tree:</h2>
          <pre>{JSON.stringify(treeData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}