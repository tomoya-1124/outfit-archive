import Link from "next/link";
import { Outfit } from "@/types/outfit";

export default function OutfitCard({ outfit }: { outfit: Outfit }) {
  return (
    <Link href={`/outfits/${outfit.id}`} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <img src={outfit.imageUrl} alt={outfit.title} className="h-64 w-full object-cover" />
      <div className="space-y-1 p-4">
        <h3 className="font-semibold">{outfit.title}</h3>
        <p className="text-sm text-white/60">{outfit.brand}</p>
        <p className="text-xs text-white/50">{outfit.season} / {outfit.visibility}</p>
      </div>
    </Link>
  );
}
