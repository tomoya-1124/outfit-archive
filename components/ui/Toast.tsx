export default function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-white/20 bg-black/80 px-4 py-3 text-sm text-white shadow-lg">
      {message}
    </div>
  );
}
