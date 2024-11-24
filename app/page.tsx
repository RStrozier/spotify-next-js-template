"use client";

import { useState, useEffect } from "react";
import LoginModal from "./components/modals/LoginModal";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [loading, setLoading] = useState(true); // Simulate loading state

  // Simulate loading completion (replace this with actual useUserData logic)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading for 1 second
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Open the modal after loading is complete
  useEffect(() => {
    if (!loading) {
      setIsModalOpen(true); // Open the modal after loading finishes
    }
  }, [loading]);

  // Close the modal using a callback
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-red-500 to-blue-500">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-xl">Loading...</p>
        </div>
      ) : (
        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
}