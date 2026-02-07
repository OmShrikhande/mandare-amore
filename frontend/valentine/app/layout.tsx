import type { Metadata } from "next";
import { Playfair_Display, Inter, Caveat } from "next/font/google";
import "./globals.css";
import BackgroundMusic from "./components/BackgroundMusic";
import ParticleSystem from "./components/ParticleSystem";
import { SoundEffectsProvider } from "./components/SoundEffects";
import HeartCursor from "./components/HeartCursor";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Small Piece of How I Feel",
  description: "An intimate Valentine's Day experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${caveat.variable} antialiased`}
      >
        <ParticleSystem />
        <SoundEffectsProvider>
          {children}
        </SoundEffectsProvider>
        <BackgroundMusic />
        <HeartCursor />
      </body>
    </html>
  );
}
