"use client";
import { useUserData } from "../universal/hooks/useUserdata";
import LoadingIndicator from "../universal/LoadingIndicator";

export default function HomePage() {
  const { userData, loading } = useUserData(); 
  // While loading, show a spinner or message
  if (loading) {
    return (
      <LoadingIndicator />
    );
  }

  // If no user data exists, redirect to the login page 
  if (!userData) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    return null;
  }

  // Render the user's profile
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome, {userData.display_name}!</h1>
      {userData.images?.[0]?.url && (
        <img
          src={userData.images[0].url}
          alt="Profile"
          className="w-32 h-32 rounded-full mt-4"
        />
      )}
      <p className="mt-2 text-gray-600">Email: {userData.email}</p>
    </main>
  );
}