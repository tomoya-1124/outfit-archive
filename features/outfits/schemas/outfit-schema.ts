import { OutfitInput, OutfitVisibility, Season } from "@/types/outfit";

const seasons: Season[] = ["SPRING", "SUMMER", "AUTUMN", "WINTER"];
const visibilities: OutfitVisibility[] = ["PUBLIC", "PRIVATE"];

export const validateOutfitInput = (input: OutfitInput) => {
  const errors: string[] = [];

  if (!input.title.trim()) errors.push("title is required");
  if (!input.brand.trim()) errors.push("brand is required");
  if (!input.imageUrl.trim()) errors.push("imageUrl is required");
  if (!seasons.includes(input.season)) errors.push("season is invalid");
  if (!visibilities.includes(input.visibility)) errors.push("visibility is invalid");

  return {
    success: errors.length === 0,
    errors,
  };
};
