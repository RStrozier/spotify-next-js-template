"use client"; // Marks this as a Client Component

export default function LoginToSpotifyBtn() {
  return (
    <main className="flex items-center justify-center h-screen">
      <button
        onClick={() => (window.location.href = "/api/login")} // Redirect to your Spotify login endpoint
        className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Login with Spotify
      </button>
    </main>
  );
}