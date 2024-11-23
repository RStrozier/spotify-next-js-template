import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code'); // Get the authorization code from query string

  if (!code) {
    return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
  }

  try {
    // Spotify Token URL
    const tokenUrl = 'https://accounts.spotify.com/api/token';

    // Request body as x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI!);
    params.append('client_id', process.env.SPOTIFY_CLIENT_ID!);
    params.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET!);

    // Exchange the code for tokens
    const response = await axios.post(tokenUrl, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token, expires_in } = response.data;

    // Set tokens in secure HTTP-only cookies
    const responseHeaders = new Headers();
    responseHeaders.append(
      'Set-Cookie',
      `access_token=${access_token}; HttpOnly; Secure; Path=/; Max-Age=${expires_in}`
    );
    responseHeaders.append(
      'Set-Cookie',
      `refresh_token=${refresh_token}; HttpOnly; Secure; Path=/; Max-Age=604800` // 7 days
    );

    // Redirect the user back to the homepage
    return NextResponse.redirect('/', { headers: responseHeaders });
  } catch (error: any) {
    console.error('Error exchanging code for tokens:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to exchange code for tokens' }, { status: 500 });
  }
}