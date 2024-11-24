"use client";

import Image from "next/image";
import { Modal, Box, Fade } from "@mui/material"; // Import Fade
import logo from "../../../public/imgs/final-logo-pulse-playlist.png";

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
        BackdropProps={{
          timeout: 500, // Makes the fade effect smoother for the backdrop
        }}
      >
        <Fade in={isOpen} timeout={500}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)", // Keeps the modal centered
              width: 400,
              bgcolor: "rgba(26, 26, 26, 1)",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "transform 0.2s ease-in-out", // Smooth scaling animation
              "&:hover": {
                transform: "translate(-50%, -50%) scale(1.05)", // Grows slightly, stays centered
              },
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