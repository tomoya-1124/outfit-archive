import { Outfit, OutfitFilter, OutfitInput } from "@/types/outfit";

export interface OutfitRepository {
  list(filter?: OutfitFilter): Outfit[];
  findById(id: string): Outfit | null;
  create(input: OutfitInput): Outfit;
  update(id: string, input: OutfitInput): Outfit | null;
  remove(id: string): void;
}
