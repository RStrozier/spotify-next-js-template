"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useUserData } from "../hooks/useUserdata";
import { UserData, UserDataContextType, Playlist } from "../data/interfaces";

interface ExtendedUserDataContextType extends UserDataContextType {
  favoritePlaylists: Playlist[];
  toggleFavoritePlaylist: (playlistId: string, songs: string[], playlistName: string) => void;
  toggleFavoriteSong: (playlistId: string, songId: string) => void;
}

// Create the context
const UserDataContext = createContext<ExtendedUserDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const { userData: fetchedUserData, loading } = useUserData();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [favoritePlaylists, setFavoritePlaylists] = useState<Playlist[]>([]);

  // THIS DATA IS AVAILIBLE SERVER SIDE, BUT NOW I CANNOT RENDER IT CLIENT SIDE

  // Update userData when fetched data is available
  useEffect(() => {
    if (fetchedUserData) {
      setUserData(fetchedUserData);
    }
  }, [fetchedUserData]);


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