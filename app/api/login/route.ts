import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const scopes = process.env.NEXT_PUBLIC_SPOTIFY_SCOPES;

  if (!clientId || !redirectUri || !scopes) {
    console.error("Missing required environment variables");
    return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
  }

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes)}`;

  return NextResponse.redirect(spotifyAuthUrl);
}