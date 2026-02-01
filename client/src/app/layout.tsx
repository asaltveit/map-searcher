import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Map Searcher",
  description: "Voice-powered map search application",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans min-h-screen safe-area-padding">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
