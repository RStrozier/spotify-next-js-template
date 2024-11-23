import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));

  const accessToken = cookies['access_token']; // Get access token from cookies
  if (!accessToken) {
    return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data); // Return user profile
  } catch (error: any) {
    console.error('Error fetching Spotify profile:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch Spotify profile' }, { status: 500 });
  }
}