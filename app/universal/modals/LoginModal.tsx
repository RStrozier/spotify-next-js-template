"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Modal, Box } from "@mui/material";
import logo from "../../../public/imgs/final-logo-pulse-playlist.png";

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
        <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-b from-red-500 to-blue-500">
          <p className="text-white text-xl">Loading...</p>
        </div>
      ) : (
        <>
          {/* Material-UI Modal */}
          <Modal
            open={isModalOpen}
            onClose={() => {}} // Disable default close behavior
            disableEscapeKeyDown // Prevent closing with Escape key
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "rgba(26, 26, 26, 1)",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
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
          </Modal>

          {/* Fallback Background Content */}
          <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-b from-red-500 to-blue-500">
          </div>
        </>
      )}
    </>
  );
}