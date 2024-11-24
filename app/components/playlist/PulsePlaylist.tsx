"use client";

import useTracks from "@/app/universal/hooks/useTracks";
import { useState } from "react";
import PulsePlaylistModal from "../modals/PulsePlaylistModal";
import PulsePlaylistMessage from "./PulsePlaylistMessage";

const PulsePlaylist = () => {
    const tracks = useTracks(); // Pull tracks from the custom hook
    const [modalOpen, setModalOpen] = useState(false);

    // Function to close the modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    console.log("Tracks in PulsePlaylist:", tracks); // Debug tracks

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