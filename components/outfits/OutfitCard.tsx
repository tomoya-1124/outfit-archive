import Link from "next/link";
import { Outfit } from "@/types/outfit";

const seasonLabels: Record<Outfit["season"], string> = {
  SPRING: "Spring",
  SUMMER: "Summer",
  AUTUMN: "Autumn",
  WINTER: "Winter",
};

export default function OutfitCard({ outfit }: { outfit: Outfit }) {
  return (
    <Link
      href={`/outfits/${outfit.id}`}
      className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.09]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
        <img
          src={outfit.imageUrl}
          alt={outfit.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-black/45 px-3 py-1 text-xs font-medium backdrop-blur">
            {seasonLabels[outfit.season]}
          </span>
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black">
            {outfit.visibility}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/55">{outfit.brand}</p>
          <h3 className="mt-1 text-xl font-semibold leading-tight">{outfit.title}</h3>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <p className="line-clamp-2 text-sm leading-6 text-white/65">{outfit.description}</p>
        <div className="flex flex-wrap gap-2">
          {outfit.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/60"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
