import React, { useState, useEffect } from 'react';

interface Repo {
  name: string;
  full_name: string;
}

interface RepoSelectProps {
  username: string;
  onChange: (repoFullName: string) => void;
  defaultValue?: string; // optionnel, permet de définir une valeur par défaut
}

const RepoSelect: React.FC<RepoSelectProps> = ({ username, onChange, defaultValue }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/github/repos?username=${username}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Repo[] = await response.json();
        setRepos(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };


  if (loading) {
    return <div>Loading repositories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <select onChange={handleChange} value={defaultValue || ""}>
      <option value="">Select a repository</option>
      {repos.map((repo) => (
        <option key={repo.full_name} value={repo.full_name}>
          {repo.name}
        </option>
      ))}
    </select>
  );
};

export default RepoSelect;