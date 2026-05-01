import { outfitService } from "@/lib/services/outfit-service";
import { OutfitInput } from "@/types/outfit";

export const updateOutfit = (id: string, input: OutfitInput) => {
  return outfitService.update(id, input);
};
