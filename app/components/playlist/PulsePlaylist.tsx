"use client";

import { useState } from 'react';
import PulsePlaylistMessage from './PulsePlaylistMessage';
import useTracks from '@/app/universal/hooks/useTracks';
import PulsePlaylistModal from '../modals/PulsePlaylistModal';

const PulsePlaylist = () => {
    // pulling in custom hook 
    const tracks = useTracks();
    const [modalOpen, setModalOpen] = useState(false);

    // Function to close the modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>

            {tracks.length > 0 ? (
                <>
                    <PulsePlaylistModal
                        open={modalOpen}
                        onClose={handleCloseModal}
                    />
                    <PulsePlaylistMessage />
                </>

            ) : (
                <>
                    <div className="spacer"></div>
                    <PulsePlaylistMessage />
                </>
            )}
        </>
    );
};

export default PulsePlaylist;