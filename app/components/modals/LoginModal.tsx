"use client";

import Image from "next/image";
import { Modal, Box, Fade, Backdrop } from "@mui/material"; // Import Backdrop
import logo from "../../../public/imgs/final-logo-pulse-playlist.png";

export default function LoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Handle login button click and close the modal (with redirect logic)
  const handleLogin = () => {
    onClose(); // Trigger the onClose callback
    window.location.href = "/api/login"; // Redirect to the Spotify login endpoint
  };

  return (
    <>
      {/* Material-UI Modal with Fade */}
      <Modal
        open={isOpen}
        onClose={onClose} // Trigger the onClose callback when the modal is closed
        disableEscapeKeyDown // Prevent closing with Escape key
        closeAfterTransition // Ensures smooth fade-out
        BackdropComponent={Backdrop} // Use custom Backdrop
        BackdropProps={{
          timeout: 500, // Smooth fade effect for the backdrop
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent black background
          },
        }}
      >
        <Fade in={isOpen} timeout={500}>
          <Box
            className="pulse-modal background"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)", // Keeps the modal centered
              width: 400,
              bgcolor: "rgba(26, 26, 26, 0.85)",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              backdropFilter: "blur(10px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "transform 0.2s ease-in-out", // Smooth scaling animation remains inline
            }}
          >
            {/* Modal Content */}
            <Image
              src={logo}
              alt="Pulse Playlist Logo"
              className="mb-4"
              width={300}
              height={100}
            />
            <button
              onClick={handleLogin} // Close modal and redirect
              className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Login with Spotify
            </button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}