import type { Metadata } from "next";
import "./globals.css";
import { UserDataProvider } from "./universal/context/UserDataContext";
import { MoodProvider } from "./universal/context/MoodContext";
import { ToggleProvider } from "./universal/context/ToggleContext";
import Navbar from "./components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Pulse Playlist",
  description: "The playlist for every emotion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Add Google Fonts here */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;500&family=Nunito:wght@600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <UserDataProvider>
          <MoodProvider>
            <ToggleProvider>
              <Navbar />
              {children}
            </ToggleProvider>
          </MoodProvider>
        </UserDataProvider>
      </body>
    </html>
  );
}