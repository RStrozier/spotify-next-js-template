"use client"; // Marks this as a Client Component
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // For programmatic navigation in the App Router
import { useUserData } from "./universal/hooks/useUserdata";

export default function Page() {
  const { userData, loading } = useUserData();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (userData) {
        // If logged in, redirect to /home
        router.push("/home");
      }
    }
  }, [loading, userData, router]);

  // While loading, show a spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If not logged in, render the login button
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