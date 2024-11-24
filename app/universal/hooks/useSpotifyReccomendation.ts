"use client";

import { useState, useEffect } from "react";
import { useMood } from "../context/MoodContext"; // Context for selected mood
import { useUserDataContext } from "../context/UserDataContext"; // Context for Spotify access token
import moodMappingJson from "../../universal/data/mood-mapping.json"; // Mood mapping JSON
import { MoodMapping, Track } from "../data/interfaces"; // Interfaces for type safety

const moodMapping: MoodMapping = moodMappingJson.moodMappings;

export const useSpotifyRecommendations = () => {
  const { selectedMood } = useMood(); // Get the selected mood from context
  const { accessToken } = useUserDataContext(); // Get the Spotify access token

  const [tracks, setTracks] = useState<Track[]>([]); // State to store fetched tracks
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  /**
   * Fetch tracks based on genres and access token
   * @param genres - Array of Spotify genres
   * @param accessToken - Spotify access token
   * @returns Array of tracks
   */
  const fetchTracks = async (genres: string[], accessToken: string | null) => {
    if (!genres.length || !accessToken) return []; // Return empty if no genres or token
    const genreString = genres.join(","); // Create a comma-separated genre string
    const response = await fetch(
      `https://api.spotify.com/v1/recommendations?seed_genres=${genreString}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token
        },
      }
    );

    const data = await response.json();
    return Array.isArray(data.tracks) ? data.tracks : [];
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors
      setTracks([]); // Clear previous tracks

      // Ensure mood and access token are available
      if (!selectedMood) {
        setError("No mood selected. Please select a mood to fetch recommendations.");
        setLoading(false);
        return;
      }

      if (!accessToken) {
        setError("Access token is missing or invalid.");
        setLoading(false);
        return;
      }

      // Map the selected mood to Spotify genres
      const genres = moodMapping[selectedMood] || []; // Get genres from moodMapping
      if (!genres.length) {
        setError(`No genres available for the selected mood: "${selectedMood}".`);
        setLoading(false);
        return;
      }

      try {
        // Fetch tracks using genres and access token
        const fetchedTracks = await fetchTracks(genres, accessToken);
        if (!fetchedTracks.length) {
          setError("No recommendations found for the selected mood.");
        } else {
          setTracks(fetchedTracks); // Update state with tracks
        }
      } catch (err) {
        console.error("[useSpotifyRecommendations] Unexpected error:", err);
        setError("An unexpected error occurred while fetching recommendations.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchRecommendations();
  }, [selectedMood, accessToken]); // Re-run whenever mood or token changes

  return { tracks, loading, error }; // Return tracks, loading, and error state
};