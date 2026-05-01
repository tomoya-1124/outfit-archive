"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OutfitForm from "@/components/outfits/OutfitForm";
import ErrorState from "@/components/ui/ErrorState";
import { createOutfit } from "@/features/outfits/usecases/create-outfit";
import { toErrorMessage } from "@/lib/api/errors";

export default function NewOutfitPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold">新規登録</h1>
        {error ? <ErrorState message={error} /> : null}
        <OutfitForm
          onSubmit={(input) => {
            try {
              const created = createOutfit(input);
              router.push(`/outfits/${created.id}?message=created`);
            } catch (e) {
              setError(toErrorMessage(e));
            }
          }}
        />
      </section>
    </main>
  );
}
