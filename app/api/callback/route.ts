import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const url = new URL(req.url); // Parse the incoming request URL
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 });
  }

  try {
    // Spotify Token Endpoint (MUST be an absolute URL)
    const tokenEndpoint = "https://accounts.spotify.com/api/token";

    // Exchange the authorization code for an access token
    const response = await axios.post(
      tokenEndpoint,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NEXT_PUBLIC_DEV_SPOTIFY_REDIRECT_URI!, // Make sure this is an absolute URL
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token, expires_in } = response.data;

    // Set the access token as a cookie
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `access_token=${access_token}; Path=/; HttpOnly; Max-Age=${expires_in}`
    );

    // Redirect to /home (You must use an absolute URL)
    const homeUrl = new URL("/home", req.url); // Converts `/home` to an absolute URL based on the request
    return NextResponse.redirect(homeUrl, { headers });
  } catch (error: any) {
    console.error("Error exchanging code for tokens:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to exchange code for tokens", details: error.message },
      { status: 500 }
    );
  }
}