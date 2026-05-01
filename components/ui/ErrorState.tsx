export default function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-400/40 bg-red-950/20 p-4 text-sm text-red-200">
      エラー: {message}
    </div>
  );
}
