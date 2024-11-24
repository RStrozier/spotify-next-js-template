"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useUserData } from "../hooks/useUserdata";
import Cookies from "js-cookie";
import { UserData, UserDataContextType, Playlist } from "../data/interfaces";

// Extend the UserDataContextType to include favorites logic
interface ExtendedUserDataContextType extends UserDataContextType {
  favoritePlaylists: Playlist[];
  toggleFavoritePlaylist: (playlistId: string, songs: string[], playlistName: string) => void;
  toggleFavoriteSong: (playlistId: string, songId: string) => void;
}

// Create the context
const UserDataContext = createContext<ExtendedUserDataContextType | undefined>(undefined);

// Create the provider component
export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const { userData: fetchedUserData, loading } = useUserData();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [favoritePlaylists, setFavoritePlaylists] = useState<Playlist[]>([]);

  // Update context's userData when fetched data is available
  useEffect(() => {
    if (fetchedUserData) {
      setUserData(fetchedUserData);
    }
  }, [fetchedUserData]);

  // Retrieve the accessToken from cookies on component mount
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  // Logic to toggle favorite playlists
  const toggleFavoritePlaylist = (playlistId: string, songs: string[], playlistName: string) => {
    setFavoritePlaylists((prev) => {
      const existingPlaylist = prev.find((playlist) => playlist.id === playlistId);
      if (existingPlaylist) {
        return prev.filter((playlist) => playlist.id !== playlistId);
      } else {
        return [...prev, { id: playlistId, name: playlistName, songs }];
      }
    });
  };

  // Logic to toggle favorite songs within a playlist
  const toggleFavoriteSong = (playlistId: string, songId: string) => {
    setFavoritePlaylists((prev) => {
      return prev.map((playlist) => {
        if (playlist.id === playlistId) {
          const songs = playlist.songs.includes(songId)
            ? playlist.songs.filter((id) => id !== songId)
            : [...playlist.songs, songId];
          return { ...playlist, songs };
        }
        return playlist;
      });
    });
  };

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        accessToken,
        setAccessToken,
        loading,
        favoritePlaylists,
        toggleFavoritePlaylist,
        toggleFavoriteSong,
      }}
    >
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