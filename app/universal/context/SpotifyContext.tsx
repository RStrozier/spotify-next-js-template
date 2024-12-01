"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define the type for the context
interface SpotifyContextType {
  accessToken: string; // Now a string, not null
  refreshToken: string; // Now a string, not null
}

// Create the context with an initial value of null
const SpotifyContext = createContext<SpotifyContextType | null>(null);

// Define props for the provider
interface SpotifyProviderProps {
  children: ReactNode; // Define the type for children
}

export const SpotifyProvider = ({ children }: SpotifyProviderProps) => {
  const [accessToken, setAccessToken] = useState<string>(''); // Initialize as empty string
  const [refreshToken, setRefreshToken] = useState<string>(''); // Initialize as empty string
  // console.log("Current cookies:", document.cookie);
  
  useEffect(() => {
    // Fetch access token and refresh token from cookies
    const cookies = document.cookie.split('; ');
    console.log("Current cookies:", document.cookie);
     // Log all cookies for debugging
    const accessTokenCookie = cookies.find(row => row.startsWith('access_token='));
    const refreshTokenCookie = cookies.find(row => row.startsWith('refresh_token='));
    console.log("refresh token cookie" + refreshTokenCookie, 
        "access token cookie" + accessTokenCookie)

    if (accessTokenCookie) {
      const token = accessTokenCookie.split('=')[1];
      setAccessToken(token);
      console.log("Access token retrieved from cookie:", token);
    } else {
      console.warn("Access token cookie not found. Using empty string.");
    }

    if (refreshTokenCookie) {
      const token = refreshTokenCookie.split('=')[1];
      setRefreshToken(token);
      console.log("Refresh token retrieved from cookie:", token);
    } else {
      console.warn("Refresh token cookie not found. Using empty string.");
    }
  }, []);

  return (
    <SpotifyContext.Provider value={{ accessToken, refreshToken }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error('useSpotify must be used within a SpotifyProvider');
  }
  return context;
};