"use client";

import { useUserDataContext } from "@/app/universal/context/UserDataContext";
import LoadingIndicator from "@/app/universal/LoadingIndicator";

export default function SpotifyUserDisplay() {
  const { userData } = useUserDataContext(); // Access user data

  if (!userData) {
    // Fallback rendering in case userData is null
    return <LoadingIndicator />;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center bg-gray-800">
      <div className="p-4 rounded-lg">
        <h1 className="text-2xl mt-2 font-montserrat font-light tracking-wide text-center text-white animate-fade-in">
          Welcome, <span className="text-red-500">{userData.display_name}!</span>
        </h1>

        {userData.images?.[0]?.url && (
          <div className="flex justify-center mt-4 group">
            <div className="relative w-32 h-32 rounded-full border border-gray-500 p-1 overflow-hidden shadow-md transition-shadow duration-300 group-hover:shadow-lg">
              <img
                src={userData.images[0].url}
                alt="Profile"
                className="w-full h-full rounded-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        )}

        <p className="text-sm text-gray-400 text-center mt-3">
          Email: {userData.email}
        </p>
      </div>
    </div>
  );
}