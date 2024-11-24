import { NextRequest, NextResponse } from "next/server";
import axios from "axios"; // Import AxiosError

export async function GET(req: NextRequest) {
  const url = new URL(req.url); // Parse the incoming request URL
  const code = url.searchParams.get("code");
  console.log("Authorization code received:", code); // Debugging log

  if (!code) {
    console.error("Missing authorization code.");
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
        redirect_uri: process.env.NEXT_PUBLIC_DEV_SPOTIFY_REDIRECT_URI!,
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    console.log("Response from Spotify token endpoint:", response.data); // Debugging log
    const { access_token, expires_in } = response.data;
    console.log("Access token received:", access_token);
    console.log("Token expires in (seconds):", expires_in);

    // Set the access token as a cookie
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `access_token=${access_token}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${expires_in}`
    );
    console.log("Set-Cookie header being sent:", headers.get("Set-Cookie")); // Debugging log

    // Redirect to /home
    const homeUrl = new URL("/home", req.url);
    console.log("Redirecting to:", homeUrl.toString()); // Debugging log
    return NextResponse.redirect(homeUrl, { headers });
  } catch (error: unknown) {
    // Ensure error is of type AxiosError
    if (axios.isAxiosError(error)) {
      console.error("Axios error exchanging code for tokens:", error.response?.data || error.message);
      return NextResponse.json(
        {
          error: "Failed to exchange code for tokens",
          details: error.response?.data || error.message,
        },
        { status: 500 }
      );
    } else {
      console.error("Unexpected error exchanging code for tokens:", (error as Error).message);
      return NextResponse.json(
        { error: "An unexpected error occurred", details: (error as Error).message },
        { status: 500 }
      );
    }
  }
}