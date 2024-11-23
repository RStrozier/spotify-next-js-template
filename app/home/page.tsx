"use client"; // Marks this as a Client Component
import { useEffect, useState } from "react";

// Define the structure of the user data
interface UserData {
  display_name: string;
  email: string;
  images?: { url: string }[]; // Optional `images` array with objects containing `url`
}

export default function HomePage() {
  const [userData, setUserData] = useState<UserData | null>(null); // Use the `UserData` type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/me"); // Call your `/api/me` endpoint to fetch user profile
        if (res.ok) {
          const data: UserData = await res.json(); // Cast the response to `UserData`
          setUserData(data); // Store user profile data
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProfile();
  }, []);

  // While loading, show a loading spinner or message
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If logged in, show the user's profile
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome, {userData?.display_name}!</h1>
      {userData?.images?.[0]?.url && (
        <img
          src={userData.images[0].url}
          alt="Profile"
          className="w-32 h-32 rounded-full mt-4"
        />
      )}
      <p className="mt-2 text-gray-600">Email: {userData?.email}</p>
    </main>
  );
}