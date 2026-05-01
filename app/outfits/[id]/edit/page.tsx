"use client";

import { useParams, useRouter } from "next/navigation";
import OutfitForm from "@/components/outfits/OutfitForm";
import { outfitService } from "@/lib/services/outfit-service";

export default function EditOutfitPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const outfit = outfitService.findById(params.id);

  if (!outfit) return <main className="min-h-screen bg-neutral-950 p-8 text-white">Not found</main>;

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold">編集</h1>
        <OutfitForm
          initial={outfit}
          onSubmit={(input) => {
            outfitService.update(outfit.id, input);
            router.push(`/outfits/${outfit.id}`);
          }}
        />
      </section>
    </main>
  );
}
