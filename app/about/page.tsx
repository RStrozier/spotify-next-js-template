import { FaSpotify, FaMusic, FaHeart } from 'react-icons/fa';
import { Container, Typography, Paper } from '@mui/material';
import Navbar from '../components/navbar/Navbar';

// TODO: STYLE THE CONTAINER HERE TO MATCH FLOW OF THE SITE
const AboutPage = () => {
    return (
        <>
            <Container maxWidth="lg" className="py-8">
                <Typography variant="h4" className="text-center text-xl font-bold mb-6">
                    About Pulse Playlist
                </Typography>
                <div className="mini-spacer"></div>
                <Paper elevation={3} className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
                    <Typography variant="h5" className="text-center mb-4">
                        Discover Your Soundtrack Based on Your Mood
                    </Typography>
                    <Typography variant="body2" className="text-center mb-6">
                        Pulse Playlist harnesses the power of your Spotify data and our unique mood mapping algorithm to create personalized playlists tailored to your emotional state.
                    </Typography>
                    <div className="mini-spacer"></div>
                    <Typography variant="h6" className="font-semibold mb-4">How It Works:</Typography>

                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="flex flex-col items-center max-w-xs">
                            <FaSpotify className="text-green-500 mb-2 text-6xl" />
                            <Typography variant="h6" className="font-semibold">Your Spotify Data</Typography>
                            <Typography variant="body2" className="text-center">
                                We analyze your Spotify listening habits to understand your musical preferences.
                            </Typography>
                        </div>
                        <div className="flex flex-col items-center max-w-xs">
                            <FaMusic className="text-blue-500 mb-2 text-6xl" />
                            <Typography variant="h6" className="font-semibold">Mood Mapping</Typography>
                            <Typography variant="body2" className="text-center">
                                Our custom algorithm maps your moods to specific genres, creating a unique listening experience.
                            </Typography>
                        </div>
                        <div className="flex flex-col items-center max-w-xs">
                            <FaHeart className="text-red-500 mb-2 text-6xl" />
                            <Typography variant="h6" className="font-semibold">Personalized Playlists</Typography>
                            <Typography variant="body2" className="text-center">
                                Enjoy playlists curated just for you, reflecting your current mood and musical taste.
                            </Typography>
                        </div>
                    </div>
                </Paper>
            </Container>
        </>
    );
};

export default AboutPage;