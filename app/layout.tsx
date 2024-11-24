import type { Metadata } from "next";
import "./globals.css";
import { UserDataProvider } from "./universal/context/UserDataContext";
import { MoodProvider } from "./universal/context/MoodContext";
import { ToggleProvider } from "./universal/context/ToggleContext";

export const metadata: Metadata = {
  title: "Pulse Playlist",
  description: "The playlist for every emotion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Nest providers to make their contexts available throughout the app */}
        <UserDataProvider>
          <MoodProvider>
            <ToggleProvider>
              {children}
            </ToggleProvider>
          </MoodProvider>
        </UserDataProvider>
      </body>
    </html>
  );
}