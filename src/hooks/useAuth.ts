import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      setLoading(false);

      if (u) {
        await supabase.from("users").upsert({
          id: u.id,
          email: u.email!,
          full_name: u.user_metadata?.full_name ?? u.user_metadata?.name ?? null,
          avatar_url: u.user_metadata?.avatar_url ?? null,
          provider: u.app_metadata?.provider ?? "google",
          last_sign_in: new Date().toISOString(),
        }, { onConflict: "id" });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://wqugkexzzevmbgrtiotk.supabase.co/auth/v1/callback`,
        queryParams: { prompt: "select_account" },
      },
    });
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return { user, loading, signInWithGoogle, signOut };
}
