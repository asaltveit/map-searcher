import { VoiceSection } from "@/components/voice/VoiceSection";
import { MapContainer } from '@/components/map';

export default function Home() {
  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col bg-zinc-50 font-sans dark:bg-black">
      <main
        id="main-content"
        className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6 sm:py-8"
        aria-label="Main content"
      >
        <h1 className="mb-3 text-xl font-semibold tracking-tight text-zinc-900 sm:mb-4 sm:text-2xl dark:text-zinc-50">
          Weave Hacks – Voice
        </h1>
        <MapContainer className="h-[280px] w-full min-h-[220px] rounded-lg border border-zinc-200 overflow-hidden sm:h-[400px] sm:min-h-[300px] dark:border-zinc-800" />
        <p className="mb-6 text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
          Use the Voice section below to speak (speech-to-text) or hear text read aloud (text-to-speech).
        </p>
        <VoiceSection className="w-full max-w-xl" />
      </main>
    </div>
  );
}