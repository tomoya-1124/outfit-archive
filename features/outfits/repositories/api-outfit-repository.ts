import { ApiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { Outfit, OutfitFilter, OutfitInput } from "@/types/outfit";
import { OutfitRepository } from "./outfit-repository";

export class ApiOutfitRepository implements OutfitRepository {
  constructor(private readonly client: ApiClient) {}

  asyncNotImplemented(): never {
    throw new Error(
      "ApiOutfitRepository is a Day10 scaffold. Implement Spring Boot API integration before enabling it.",
    );
  }

  list(_filter?: OutfitFilter): Outfit[] {
    this.asyncNotImplemented();
  }

  findById(_id: string): Outfit | null {
    this.asyncNotImplemented();
  }

  create(_input: OutfitInput): Outfit {
    this.asyncNotImplemented();
  }

  update(_id: string, _input: OutfitInput): Outfit | null {
    this.asyncNotImplemented();
  }

  remove(_id: string): void {
    this.asyncNotImplemented();
  }

  // Future async methods (reference)
  _futureMethodsExample() {
    return [this.client.get(endpoints.outfits), this.client.post(endpoints.outfits, {})];
  }
}
