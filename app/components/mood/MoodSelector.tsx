"use client";

import { useState } from 'react';
import moodData from '../../universal/data/moods.json';
import moodDescriptions from '../../universal/data/mood-descriptions.json';
import { Button, Tooltip } from '@mui/material';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { MoodKey } from '@/app/universal/data/interfaces';
import { useMood } from '@/app/universal/context/MoodContext';
import MoodDescription from './MoodDescription';
import { useToggle } from '@/app/universal/context/ToggleContext';
import MoodAlert from '../alerts/MoodAlert';
import PulsePlaylistModal from '../modals/PulsePlaylistModal';

const moods = moodData.moods as MoodKey[];
const descriptions = moodDescriptions.moodDescriptions;
type MoodDescriptionKeys = keyof typeof descriptions;

const MoodSelector = () => {
    const { setSelectedMood } = useMood();
    const [selectedMood, setSelectedMoodState] = useState<MoodKey | null>(null);
    const { isExpanded, toggleExpand, showAlert } = useToggle();

    // State to manage modal visibility
    const [modalOpen, setModalOpen] = useState(false);

    const handleMoodSelect = (mood: MoodKey) => {
        setSelectedMoodState(mood);
    };

    const handleGeneratePlaylist = () => {
        if (selectedMood) {
            setSelectedMood(selectedMood);
            setModalOpen(true); // Open the modal when generating the playlist
        } else {
            showAlert();
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false); // Close the modal
    };

    return (
        <div className="text-center my-4 mx-2">
            <div className="text-xl mb-2 text-gray-200 header-font">Select Your Mood</div>
            <MoodDescription />
            <div className="spacer"></div>
            <div className="flex justify-center items-center">
                <Button onClick={toggleExpand} className="flex items-center justify-center  hover:text-blue-700 underline transition-all">
                    {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                    <span className="ml-2 text-base">{isExpanded ? 'Close Moods' : 'Select Mood'}</span>
                </Button>
            </div>
            <div className="mini-spacer"></div>

            {/* Full-page overlay for moods */}
            {isExpanded && (
                <div className="fixed inset-0 bg-gradient-to-b from-red-500 to-blue-500 z-50 flex flex-col items-center justify-center overflow-auto">
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                        {moods.map((mood) => (
                            <Tooltip
                                key={mood}
                                title={descriptions[mood as MoodDescriptionKeys]}
                                arrow
                                placement="top"
                            >
                                <Button
                                    variant="contained"
                                    className={`transition-colors duration-300 ${selectedMood === mood ? 'bg-purple-500' : 'bg-gray-700'
                                        }`}
                                    onClick={() => handleMoodSelect(mood)}
                                    sx={{
                                        backgroundColor:
                                            selectedMood === mood ? 'rgba(255, 0, 0, 0.8)' : '#333',
                                        color: '#F0F0F0',
                                        padding: '4px 8px',
                                        border: '2px solid transparent',
                                        backgroundImage:
                                            selectedMood === mood
                                                ? 'linear-gradient(to right, rgba(255, 0, 0, 0.8), rgba(0, 0, 50, 1))'
                                                : 'none',
                                        backgroundClip: 'padding-box',
                                        boxShadow: '0px 0px 2px rgba(275, 0, 0, 0.4)',
                                        fontFamily: 'default-roboto',
                                    }}
                                >
                                    {mood}
                                </Button>
                            </Tooltip>
                        ))}
                    </div>
                    <Button
                        variant="contained"
                        className="mt-4"
                        onClick={() => toggleExpand()} // Close overlay when clicked
                    >
                        Close
                    </Button>
                </div>
            )}

            {/* <div className="default-roboto text-sm">
                Select mood above.  Click below to generate pulse playlist.
            </div>
            <div className="spacer"></div> */}

            {/* Selects mood and generates a pulse playlist */}
            <Button
                variant="contained"
                onClick={handleGeneratePlaylist}
                className="bg-red-500 hover:bg-red-600 text-white font-nunito font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all"
            >
                Generate<span className="mx-1 text-red-200">{selectedMood}</span> Playlist!
            </Button>

            <MoodAlert />
            <div className="spacer"></div>

            {/* Add the modal component here */}
            <PulsePlaylistModal open={modalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default MoodSelector;