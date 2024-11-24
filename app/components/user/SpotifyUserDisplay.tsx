"use client";

import { useUserDataContext } from "@/app/universal/context/UserDataContext";
import LoadingIndicator from "@/app/universal/LoadingIndicator";

export default function SpotifyUserDisplay() {
  const { userData } = useUserDataContext(); // Access user data

  if (!userData) {
    // Fallback rendering in case userData is null
    return <LoadingIndicator />
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome, {userData.display_name}!</h1>

      {userData.images?.[0]?.url && (
        <img
          src={userData.images[0].url}
          alt="Profile"
          className="w-32 h-32 rounded-full mt-4"
        />
      )}

      <p className="mt-2 text-gray-600">Email: {userData.email}</p>
    </div>
  );
}