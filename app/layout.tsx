import type { Metadata } from "next";
import "./globals.css";
import { UserDataProvider } from "./universal/context/UserDataContext";

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
        {/* Wrap children with UserDataProvider */}
        <UserDataProvider>{children}</UserDataProvider>
      </body>
    </html>
  );
}