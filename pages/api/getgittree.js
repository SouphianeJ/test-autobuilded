import { Octokit } from "@octokit/rest";

async function getRepoTree(owner, repo, ref = 'main') {
  const octokit = new Octokit();

  try {
    const { data: treeData } = await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: ref,
      recursive: 'true',
    });

    return treeData.tree;
  } catch (error) {
    console.error("Error fetching tree:", error);
    throw error;
  }
}

function parseGitHubUrl(url) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== 'github.com') {
      return null;
    }

    const pathParts = urlObj.pathname.slice(1).split('/');
    if (pathParts.length < 2) {
      return null;
    }

    const owner = pathParts[0];
    const repo = pathParts[1];
    return { owner, repo };
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}


export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { repoUrl } = req.query;

    if (!repoUrl) {
      return res.status(400).json({ error: 'Missing repoUrl parameter' });
    }

    const repoInfo = parseGitHubUrl(repoUrl);

    if (!repoInfo) {
      return res.status(400).json({ error: 'Invalid GitHub repository URL' });
    }

    try {
      const tree = await getRepoTree(repoInfo.owner, repoInfo.repo);
      res.status(200).json(tree);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}