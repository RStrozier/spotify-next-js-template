"use client";

import { useEffect, useState } from "react";
import { useUserDataContext } from "../universal/context/UserDataContext";
import LoginModal from "../universal/modals/LoginModal";
import LoadingIndicator from "../universal/LoadingIndicator";
import SpotifyUserDisplay from "../components/user/SpotifyUserDisplay";

export default function HomePage() {
  const { userData, loading } = useUserDataContext(); // Access user data and loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  // Open the modal if no user data exists after loading is complete
  useEffect(() => {
    if (!loading && !userData) {
      setIsModalOpen(true); // Open the modal if user is logged out
    }
  }, [loading, userData]);

  // Close the modal using a callback
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // While loading, show a spinner
  if (loading) {
    return <LoadingIndicator />;
  }

  // If no user data exists, keep modal open and render fallback
  if (!userData) {
    return <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />;
  }

  // Render the user's profile
  return (
   <SpotifyUserDisplay />
  );
}