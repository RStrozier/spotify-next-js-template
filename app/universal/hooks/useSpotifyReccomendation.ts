import { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log("Selected mood:", selectedMood); // Debugging
    console.log("Access token in useSpotifyRecommendations:", accessToken); // Debugging

    if (!accessToken) {
      setError("Access token is missing or invalid.");
      setLoading(false);
      return;
    }

    if (!selectedMood) {
      setError("No mood selected. Please select a mood to fetch recommendations.");
      setLoading(false);
      return;
    }

    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      setTracks([]);

      const genres = moodMapping[selectedMood] || [];
      if (!genres.length) {
        setError(`No genres available for the selected mood: "${selectedMood}".`);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/recommendations?seed_genres=${genres.join(",")}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const data = await response.json();
        setTracks(data.tracks || []);
      } catch (err) {
        console.error("Error fetching Spotify recommendations:", err);
        setError("Error fetching recommendations.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [selectedMood, accessToken]);

  return { tracks, loading, error };
};