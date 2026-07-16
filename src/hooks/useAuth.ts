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
          full_name: u.user_metadata?.full_name ?? null,
          avatar_url: u.user_metadata?.avatar_url ?? null,
          provider: "email",
          last_sign_in: new Date().toISOString(),
        }, { onConflict: "id" });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const sendMagicLink = useCallback(async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.href },
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return { user, loading, sendMagicLink, signOut };
}
