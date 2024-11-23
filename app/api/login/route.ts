import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Read and validate environment variables
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    const scopes = process.env.NEXT_PUBLIC_SPOTIFY_SCOPES;

    if (!clientId || !redirectUri || !scopes) {
      console.error("Missing required environment variables");
      return NextResponse.json(
        { error: "Missing environment variables" },
        { status: 500 }
      );
    }

    // Construct the Spotify authorization URL
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}`;

    // Redirect the user to the Spotify authorization endpoint
    return NextResponse.redirect(spotifyAuthUrl);
  } catch (error: unknown) {
    // Handle unexpected errors
    if (error instanceof Error) {
      console.error("Unexpected error during Spotify authorization:", error.message);
      return NextResponse.json(
        { error: "Unexpected server error", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error occurred");
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}