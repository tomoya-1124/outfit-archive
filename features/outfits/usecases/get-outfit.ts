import { outfitService } from "@/lib/services/outfit-service";

export const getOutfit = (id: string) => {
  return outfitService.findById(id);
};
