import { ResearchMapPage } from "@/components/ResearchMapPage";
import { ProtectedRoute, UserHeader } from "@/components/auth";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen min-h-[100dvh] flex-col bg-background font-sans">
        <UserHeader />
        <main
          id="main-content"
          className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6 sm:py-8"
          aria-label="Main content"
        >
          <ResearchMapPage />
        </main>
      </div>
    </ProtectedRoute>
  );
}