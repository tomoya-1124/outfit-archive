import { outfitService } from "@/lib/services/outfit-service";
import { OutfitInput } from "@/types/outfit";

export const createOutfit = (input: OutfitInput) => {
  return outfitService.create(input);
};
