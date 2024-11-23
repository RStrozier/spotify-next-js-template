import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  // Extract cookies from the request headers
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = Object.fromEntries(cookieHeader.split('; ').map((c) => c.split('=')));

  const accessToken = cookies['access_token']; // Get access token from cookies
  if (!accessToken) {
    return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
  }

  try {
    // Fetch user profile from Spotify API
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data); // Return user profile
  } catch (error: unknown) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      console.error(
        'Error fetching Spotify profile:',
        error.response?.data || error.message
      );
      return NextResponse.json(
        {
          error: 'Failed to fetch Spotify profile',
          details: error.response?.data || error.message,
        },
        { status: 500 }
      );
    } else {
      console.error('Unexpected error:', (error as Error).message);
      return NextResponse.json(
        { error: 'An unexpected error occurred', details: (error as Error).message },
        { status: 500 }
      );
    }
  }
}