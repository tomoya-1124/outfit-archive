import { ISODateString } from "@/types/common";
import { OutfitVisibility, Season } from "@/types/outfit";

export type OutfitResponseDto = {
  id: string;
  title: string;
  description: string;
  brand: string;
  season: Season;
  tags: string[];
  visibility: OutfitVisibility;
  image_url: string;
  created_at: ISODateString;
  updated_at: ISODateString;
};
