import type { Metadata, Viewport } from "next";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans-app",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif-app",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pulse – Current events research & map",
  description: "Research current events, places, and routes. Ask in plain language and see findings on an interactive map.",
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
    <html lang="en" className={`${dmSans.variable} ${sourceSerif.variable}`}>
      <body className="antialiased font-sans min-h-screen safe-area-padding bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
