"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { outfitService } from "@/lib/services/outfit-service";

export default function OutfitDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const outfit = outfitService.findById(params.id);

  if (!outfit) return <main className="min-h-screen bg-neutral-950 p-8 text-white">Not found</main>;

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-3xl space-y-5">
        <img
          src={outfit.imageUrl}
          alt={outfit.title}
          className="h-96 w-full rounded-2xl object-cover"
        />
        <h1 className="text-3xl font-bold">{outfit.title}</h1>
        <p className="text-white/70">{outfit.description}</p>
        <p>
          {outfit.brand} / {outfit.season} / {outfit.visibility}
        </p>
        <p className="text-sm text-white/60">tags: {outfit.tags.join(", ")}</p>
        <div className="flex gap-3">
          <Link
            href={`/outfits/${outfit.id}/edit`}
            className="rounded-full border border-white/20 px-4 py-2 text-sm"
          >
            編集
          </Link>
          <Button
            variant="danger"
            onClick={() => {
              outfitService.remove(outfit.id);
              router.push("/outfits");
            }}
          >
            削除
          </Button>
        </div>
      </section>
    </main>
  );
}
