import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function SharePage({
  params,
}: {
  params: { id: string };
}) {
  const { data, error } = await supabase
    .from("outfits")
    .select("*")
    .eq("share_id", params.id)
    .eq("is_public", true)
    .single();

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <img src={data.image_url} className="w-full rounded-2xl" />

        <h1 className="text-2xl font-bold">{data.title}</h1>

        <p className="text-white/60">{data.date}</p>

        <p>{data.brand}</p>

        <p className="text-white/70">{data.memo}</p>
      </div>
    </main>
  );
}
