import { outfitService } from "@/lib/services/outfit-service";
import { OutfitFilter } from "@/types/outfit";

export const listOutfits = (filter?: OutfitFilter) => {
  return outfitService.list(filter);
};
