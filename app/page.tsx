"use client";
import { useEffect, useState } from "react";
import { useUserData } from "./universal/hooks/useUserdata";
import logo from "../public/imgs/final-logo-pulse-playlist.png";
import Image from "next/image";
import { Modal, Box } from "@mui/material"; // Material-UI Modal and Box components

export default function Page() {
  const { loading } = useUserData();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Automatically open the modal after loading is complete
  useEffect(() => {
    if (!loading) {
      setIsModalOpen(true);
    }
  }, [loading]);

  // Handle login button click and close modal before redirecting
  const handleLogin = () => {
    setIsModalOpen(false); // Close the modal
    window.location.href = "/api/login"; // Redirect to the Spotify login endpoint
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
      {loading ? (
        // Loading indicator
        <p className="text-white text-xl">Loading...</p>
      ) : (
        <>
          {/* Material-UI Modal */}
          <Modal
            open={isModalOpen}
            onClose={() => {}} // Disable default close behavior
            disableEscapeKeyDown // Prevent closing with Escape key
            BackdropProps={{
              style: { backgroundColor: "rgba(0, 0, 0, 0.8)" }, // Darken backdrop
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
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

{/* TODO: MAKE BACKGORUND THE GRADIENT COLOR */}
          {/* Fallback Content */}
          <div className="text-white">
            <Image
              src={logo}
              alt="Pulse Playlist Logo"
              className="mb-4"
              width={300}
              height={100}
            />
          </div>
        </>
      )}
    </div>
  );
}