"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    router.push("/outfits");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-md px-6 py-16">
        <div className="mb-10 space-y-3">
          <p className="text-sm tracking-[0.3em] text-white/40">AUTH</p>
          <h1 className="text-4xl font-bold tracking-tight">
            {isLogin ? "ログイン" : "新規登録"}
          </h1>
          <p className="text-white/60">
            Outfit Archive を自分専用で使うための認証です。
          </p>
        </div>

        <form
          onSubmit={handleAuth}
          className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-white/70">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-white/30"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-white/70">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-white/30"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-85 disabled:opacity-50"
          >
            {loading ? "処理中..." : isLogin ? "ログインする" : "新規登録する"}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-6 text-sm text-white/60 hover:text-white"
        >
          {isLogin
            ? "アカウントがない場合は新規登録"
            : "すでにアカウントがある場合はログイン"}
        </button>
      </section>
    </main>
  );
}
