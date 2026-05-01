import { Outfit } from "@/types/outfit";
import { AppUser } from "@/types/user";

const getOwnerId = (outfit: Outfit): string => {
  // TODO: once ownerId is added to Outfit model, switch to outfit.ownerId.
  return "demo-user-1";
};

export const canViewOutfit = (user: AppUser, outfit: Outfit): boolean => {
  if (outfit.visibility === "PUBLIC") return true;
  return user.role === "ADMIN" || getOwnerId(outfit) === user.id;
};

export const canEditOutfit = (user: AppUser, outfit: Outfit): boolean => {
  return user.role === "ADMIN" || getOwnerId(outfit) === user.id;
};

export const canDeleteOutfit = (user: AppUser, outfit: Outfit): boolean => {
  return canEditOutfit(user, outfit);
};
