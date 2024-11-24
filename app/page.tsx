"use client";

import { useState, useEffect } from "react";
import LoginModal from "./universal/modals/LoginModal";

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
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </>
  );
}