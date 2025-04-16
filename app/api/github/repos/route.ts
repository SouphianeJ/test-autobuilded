import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // Use a Github token for better rate limiting
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    return NextResponse.json(repos);
  } catch (error: any) {
    console.error('Error fetching repos:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch repositories' }, { status: 500 });
  }
}