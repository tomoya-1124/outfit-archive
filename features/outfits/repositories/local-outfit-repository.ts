import { validateOutfitInput } from "@/features/outfits/schemas/outfit-schema";
import { mockOutfits } from "@/lib/mock-outfits";
import { Outfit, OutfitFilter, OutfitInput } from "@/types/outfit";
import { OutfitRepository } from "./outfit-repository";

const STORAGE_KEY = "outfit-archive-v3";

const isBrowser = () => typeof window !== "undefined";

const mergeWithMockOutfits = (outfits: Outfit[]): Outfit[] => {
  const outfitIds = new Set(outfits.map((outfit) => outfit.id));
  const missingMockOutfits = mockOutfits.filter((outfit) => !outfitIds.has(outfit.id));

  return missingMockOutfits.length > 0 ? [...outfits, ...missingMockOutfits] : outfits;
};

const read = (): Outfit[] => {
  if (!isBrowser()) return mockOutfits;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return mockOutfits;
  try {
    const storedOutfits = JSON.parse(stored) as Outfit[];
    const outfits = mergeWithMockOutfits(storedOutfits);
    if (outfits.length !== storedOutfits.length) write(outfits);
    return outfits;
  } catch {
    return mockOutfits;
  }
};

const write = (outfits: Outfit[]) => {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(outfits));
};

export class LocalOutfitRepository implements OutfitRepository {
  list(filter?: OutfitFilter) {
    const outfits = read();
    if (!filter) return outfits;

    return outfits.filter((item) => {
      const q = (filter.query ?? "").toLowerCase();
      const brand = (filter.brand ?? "").toLowerCase();

      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));

      const matchBrand = !brand || item.brand.toLowerCase().includes(brand);
      const matchSeason =
        !filter.season || filter.season === "ALL" || item.season === filter.season;
      const matchVisibility =
        !filter.visibility || filter.visibility === "ALL" || item.visibility === filter.visibility;
      const matchTag = !filter.tag || item.tags.includes(filter.tag);

      return matchQuery && matchBrand && matchSeason && matchVisibility && matchTag;
    });
  }

  findById(id: string) {
    return read().find((item) => item.id === id) ?? null;
  }

  create(input: OutfitInput) {
    const validation = validateOutfitInput(input);
    if (!validation.success) throw new Error(validation.errors.join(", "));

    const outfits = read();
    const now = new Date().toISOString();
    const next: Outfit = { id: crypto.randomUUID(), ...input, createdAt: now, updatedAt: now };
    const updated = [next, ...outfits];
    write(updated);
    return next;
  }

  update(id: string, input: OutfitInput) {
    const validation = validateOutfitInput(input);
    if (!validation.success) throw new Error(validation.errors.join(", "));

    const outfits = read();
    let saved: Outfit | null = null;
    const updated = outfits.map((item) => {
      if (item.id !== id) return item;
      saved = { ...item, ...input, updatedAt: new Date().toISOString() };
      return saved;
    });
    write(updated);
    return saved;
  }

  remove(id: string) {
    const outfits = read().filter((item) => item.id !== id);
    write(outfits);
  }
}
