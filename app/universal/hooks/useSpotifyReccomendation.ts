import { useEffect, useState } from "react";
import { useMood } from "../context/MoodContext";
import moodMappingJson from "../../universal/data/mood-mapping.json";
import { MoodMapping, Track } from "../data/interfaces";
import { useSpotify } from "../context/SpotifyContext"; // Import the Spotify context

const moodMapping: MoodMapping = moodMappingJson.moodMappings;

export const useSpotifyRecommendations = () => {
  const { selectedMood } = useMood();
  const { accessToken } = useSpotify(); // Access the accessToken from the context
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Selected mood:", selectedMood);
    console.log("Access token in useSpotifyRecommendations:", accessToken);

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
  }, [selectedMood, accessToken]); // Add accessToken to the dependency array

  return { tracks, loading, error };
};