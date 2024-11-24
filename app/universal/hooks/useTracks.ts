import { useEffect, useState } from 'react';
import { useMood } from '../context/MoodContext';
import moodMappingJson from '../../universal/data/mood-mapping.json';
import { MoodMapping, Track } from '../data/interfaces';
import { useUserDataContext } from '../context/UserDataContext';

const moodMapping: MoodMapping = moodMappingJson.moodMappings;

 const fetchTracks = async (genres: string[], accessToken: string | null) => {
    if (!genres.length || !accessToken) return [];
    const genreString = genres.join(',');
    const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${genreString}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return Array.isArray(data.tracks) ? data.tracks : [];
};

const useTracks = (): Track[] => {
    const { selectedMood } = useMood();
    const { accessToken } = useUserDataContext
    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => {
        const getTracks = async () => {
            const genres = moodMapping[selectedMood || ''] || [];
            const fetchedTracks = await fetchTracks(genres, accessToken);
            setTracks(fetchedTracks);
        };

        if (selectedMood && accessToken) {
            getTracks();
        }
    }, [selectedMood, accessToken]);

    return tracks;
};

export default useTracks;