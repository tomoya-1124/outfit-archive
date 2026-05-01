import OutfitsPageClient from "./OutfitsPageClient";

type OutfitsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

export default async function OutfitsPage({ searchParams }: OutfitsPageProps) {
  const params = (await searchParams) ?? {};

  return (
    <OutfitsPageClient
      initialQuery={first(params.q) ?? ""}
      initialSeason={first(params.season) ?? "ALL"}
      initialVisibility={first(params.visibility) ?? "ALL"}
      initialMessage={first(params.message)}
    />
  );
}
