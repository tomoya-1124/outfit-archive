import { Suspense } from "react";
import OutfitsPageClient from "./OutfitsPageClient";

export default function OutfitsPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-neutral-950 text-white" />}>
      <OutfitsPageClient />
    </Suspense>
  );
}
