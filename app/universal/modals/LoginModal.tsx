"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Modal, Box, Fade } from "@mui/material"; // Import Fade
import logo from "../../../public/imgs/final-logo-pulse-playlist.png";
import LoadingIndicator from "../LoadingIndicator";

export default function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [loading, setLoading] = useState(true); // Simulate loading state (replace with `useUserData` if needed)

  // Simulate loading completion (replace this with actual `useUserData` logic)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading for 1 second
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Automatically open modal after loading is complete
  useEffect(() => {
    if (!loading) {
      setIsModalOpen(true); // Open the modal after loading finishes
    }
  }, [loading]);

  // Handle login button click and close the modal (with redirect logic)
  const handleLogin = () => {
    setIsModalOpen(false); // Close the modal
    window.location.href = "/api/login"; // Redirect to the Spotify login endpoint
  };

  return (
    <>
      {loading ? (
        // Display loading UI while waiting for data
        <LoadingIndicator />
      ) : (
        <>
          {/* Material-UI Modal with Fade */}
          <Modal
            open={isModalOpen}
            onClose={() => {}} // Disable default close behavior
            disableEscapeKeyDown // Prevent closing with Escape key
            closeAfterTransition // Ensures smooth fade-out
            BackdropProps={{
              timeout: 500, // Makes the fade effect smoother for the backdrop
              style: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
            }}
          >
            <Fade in={isModalOpen} timeout={500}>
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

          {/* Fallback Background Content */}
          <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-b from-red-500 to-blue-500"></div>
        </>
      )}
    </>
  );
}