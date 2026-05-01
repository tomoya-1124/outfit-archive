import { AppUser } from "@/types/user";

export const getCurrentUser = (): AppUser => {
  // Day11 mock user. Replace with real auth context later.
  return {
    id: "demo-user-1",
    role: "USER",
  };
};
