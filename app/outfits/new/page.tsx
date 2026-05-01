"use client";

import { useRouter } from "next/navigation";
import OutfitForm from "@/components/outfits/OutfitForm";
import { outfitService } from "@/lib/services/outfit-service";

export default function NewOutfitPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold">新規登録</h1>
        <OutfitForm
          onSubmit={(input) => {
            const created = outfitService.create(input);
            router.push(`/outfits/${created.id}`);
          }}
        />
      </section>
    </main>
  );
}
