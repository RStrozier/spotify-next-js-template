"use client";

import { useUserData } from "./universal/hooks/useUserdata";
import LoginToSpotifyBtn from "./components/buttons/LoginToSpotifyBtn";
import logo from "../public/imgs/final-logo-pulse-playlist.png"
import Image from 'next/image';

export default function Page() {
  const { loading } = useUserData();

  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <p>Loading...</p>
    </div>
  ) : (
    <>
      <Image src={logo} alt="Pulse Playlist Logo" className="mb-4" width={300} height={100} /> {/* Set width and height */}
          <LoginToSpotifyBtn />
    </>
  );
}