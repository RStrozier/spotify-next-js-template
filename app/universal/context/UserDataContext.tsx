"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useUserData } from "../hooks/useUserdata";

// Define the shape of the user data
interface UserData {
  display_name: string;
  email: string;
  images?: { url: string }[]; // Optional `images` field
}

// Define the type for the context
interface UserDataContextType {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  loading: boolean;
}

// Create the context
const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

// Create the provider component
export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const { userData: fetchedUserData, loading } = useUserData();
  const [userData, setUserData] = useState<UserData | null>(null);

  // Update context's userData when fetched data is available
  useEffect(() => {
    if (fetchedUserData) {
      setUserData(fetchedUserData);
    }
  }, [fetchedUserData]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook to consume the context
export const useUserDataContext = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserDataContext must be used within a UserDataProvider");
  }
  return context;
};