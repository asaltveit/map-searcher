'use client';

import { MapContainer } from '@/components/map';

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <MapContainer className="h-full w-full" />
    </main>
  );
}
