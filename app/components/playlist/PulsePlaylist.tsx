"use client";

import { useState } from "react";
import PulsePlaylistModal from "../modals/PulsePlaylistModal";
import PulsePlaylistMessage from "./PulsePlaylistMessage";
import { useSpotifyRecommendations } from "@/app/universal/hooks/useSpotifyReccomendation";

const PulsePlaylist = () => {
  // Pulling in the custom Spotify hook
  const { tracks, loading, error } = useSpotifyRecommendations();
  const [modalOpen, setModalOpen] = useState(false);

  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* Handle loading, error, and tracks state */}
      {loading ? (
        <p>Loading tracks...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : tracks.length > 0 ? (
        <>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary"
            aria-label="View Playlist Modal"
          >
            View Playlist
          </button>
          <PulsePlaylistModal open={modalOpen} onClose={handleCloseModal} />
          <PulsePlaylistMessage />
        </>
      ) : (
        <>
          <div className="spacer"></div>
          <PulsePlaylistMessage />
          <p>No tracks found. Please select a mood to generate a playlist.</p>
        </>
      )}
    </>
  );
};

export default PulsePlaylist;