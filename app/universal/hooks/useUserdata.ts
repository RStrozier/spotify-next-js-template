"use client"; // Hooks must run on the client side

import { useState, useEffect } from "react";

interface UserData {
  display_name: string;
  email: string;
  images?: { url: string }[]; // Optional `images` field
}

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me"); // Fetch user data from your API
        if (res.ok) {
          const data: UserData = await res.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUser();
  }, []);

  return { userData, loading };
};