import Link from "next/link";
import { Outfit } from "@/lib/dummy-data";

type Props = {
  outfit: Outfit;
};

export default function OutfitCard({ outfit }: Props) {
  return (
    <Link
      href={`/outfits/${outfit.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-black">
        <img
          src={outfit.imageUrl}
          alt={outfit.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-2 p-4">
        <p className="text-xs tracking-[0.2em] text-white/40">{outfit.date}</p>
        <h2 className="text-lg font-semibold text-white">{outfit.title}</h2>
        <p className="text-sm text-white/70">{outfit.brand}</p>
        <p className="line-clamp-2 text-sm text-white/50">{outfit.memo}</p>
      </div>
    </Link>
  );
}