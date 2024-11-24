"use client";

import { useState, useEffect } from "react";
import LoginModal from "./components/modals/LoginModal";
import LoadingIndicator from "./universal/LoadingIndicator";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [loading, setLoading] = useState(true); // Simulate loading state

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);

      // Automatically open the modal when the page is first loaded
      setIsModalOpen(true);
    }, 1000); // Simulate loading for 1 second

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Close the modal using a callback
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <div className="h-screen w-screen bg-gradient-to-b from-red-500 to-blue-500">
            <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
          </div>
        )}
    </>
  );
}