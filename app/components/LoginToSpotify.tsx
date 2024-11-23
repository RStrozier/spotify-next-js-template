import { useState, useEffect } from "react";

// Spotify Authorization Helpers
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const redirectUri = process.env.NEXT_PUBLIC_DEV_SPOTIFY_REDIRECT_URI!; // Redirect URI set in Spotify Developer Dashboard
const scopes = process.env.NEXT_PUBLIC_SPOTIFY_SCOPES!; // Scopes for the Spotify API

const getAuthUrl = (): string => {
  // Constructs the Spotify authorization URL
  return `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes)}`;
};

const redirectToSpotifyAuth = (): void => {
  // Redirects the user to Spotify's authorization page
  window.location.href = getAuthUrl();
};

// Define the structure of `userData`
interface UserData {
  display_name: string;
  email: string;
  images?: { url: string }[]; // Optional `images` array
}

const LoginToSpotify = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null); // Use `UserData` type

  // Check if the user is logged in by verifying the access_token cookie
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch("/api/me"); // Calls `/api/me` endpoint
        if (res.ok) {
          const data: UserData = await res.json(); // Cast the response to `UserData`
          setUserData(data); // Store user profile data
          setIsLoggedIn(true); // User is logged in
        } else {
          setIsLoggedIn(false); // User is not logged in
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Render the login button if not logged in
  if (!isLoggedIn) {
    return (
      <main className="flex items-center justify-center h-screen">
        <button
          onClick={redirectToSpotifyAuth} // Calls the redirectToSpotifyAuth function
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Login with Spotify
        </button>
      </main>
    );
  }

  // Render the user's profile if logged in
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome, {userData?.display_name}!</h1>
      {userData?.images?.[0]?.url && (
        <img
          src={userData.images[0].url}
          alt="Profile Picture"
          className="w-32 h-32 rounded-full mt-4"
        />
      )}
      <p className="mt-2 text-gray-600">Email: {userData?.email}</p>
    </main>
  );
};

export default LoginToSpotify;