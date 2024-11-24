"use client";

import { useEffect, useState } from 'react';
import { useMood } from '../context/MoodContext';
import moodMappingJson from '../../universal/data/mood-mapping.json';
import { MoodMapping, Track } from '../data/interfaces';
import { useUserDataContext } from '../context/UserDataContext';

const moodMapping: MoodMapping = moodMappingJson.moodMappings;

const fetchTracks = async (genres: string[], accessToken: string | null) => {
    if (!genres.length) {
        console.warn("No genres provided, skipping fetch.");
        return [];
    }
    if (!accessToken) {
        console.warn("No access token provided, cannot fetch tracks.");
        return [];
    }

    try {
        const genreString = genres.join(',');
        const url = `https://api.spotify.com/v1/recommendations?seed_genres=${genreString}`;
        console.log("Fetching tracks from URL:", url);

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            console.error(`Spotify API Error: ${response.status} - ${response.statusText}`);
            const errorData = await response.json();
            console.error("Error Details:", errorData); // Debug detailed error response
            return [];
        }

        const data = await response.json();
        console.log("Fetched Tracks from Spotify:", data); // Debug fetched tracks
        return Array.isArray(data.tracks) ? data.tracks : [];
    } catch (error) {
        console.error("Unexpected error while fetching tracks:", error);
        return [];
    }
};

const useTracks = (): Track[] => {
    const { selectedMood } = useMood();
    const { accessToken } = useUserDataContext();
    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => {
        const getTracks = async () => {
            console.log("Selected Mood:", selectedMood); // Debug selected mood
            console.log("Access Token:", accessToken); // Debug access token

            const genres = moodMapping[selectedMood || ''] || [];
            console.log("Mapped Genres:", genres); // Debug mapped genres

            const fetchedTracks = await fetchTracks(genres, accessToken);
            console.log("Fetched Tracks:", fetchedTracks); // Debug fetched tracks

            setTracks(fetchedTracks);
        };

        if (selectedMood && accessToken) {
            getTracks();
        }
    }, [selectedMood, accessToken]);

    return tracks;
};

export default useTracks;