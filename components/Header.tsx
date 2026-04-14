"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsLoggedIn(!!session);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-white sm:px-6">
        <Link href="/" className="text-xs tracking-[0.28em] text-white/80">
          OUTFIT ARCHIVE
        </Link>

        <nav className="flex flex-wrap items-center gap-3 text-sm text-white/60 sm:gap-4">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/outfits" className="hover:text-white">
            Outfits
          </Link>
          <Link href="/outfits/new" className="hover:text-white">
            New
          </Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:text-white">
              Logout
            </button>
          ) : (
            <Link href="/login" className="hover:text-white">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
