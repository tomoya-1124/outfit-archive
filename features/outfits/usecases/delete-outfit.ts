import { outfitService } from "@/lib/services/outfit-service";

export const deleteOutfit = (id: string) => {
  outfitService.remove(id);
};
