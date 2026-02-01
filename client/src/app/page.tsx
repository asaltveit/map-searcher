<<<<<<< HEAD
import { VoiceSection } from "@/components/voice/VoiceSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main id="main-content" className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6" aria-label="Main content">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Weave Hacks – Voice
        </h1>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          Use the Voice section below to speak (speech-to-text) or hear text read aloud (text-to-speech).
        </p>
        <VoiceSection className="max-w-xl" />
      </main>
    </div>
=======
'use client';

import { MapContainer } from '@/components/map';

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <MapContainer className="h-full w-full" />
    </main>
>>>>>>> 7fb986692aa2e5b0b0458fc042eb84c79fbd99b3
  );
}
