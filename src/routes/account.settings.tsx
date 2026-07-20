import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/account/settings")({
  head: () => ({
    meta: [
      { title: "Account Settings — RASA" },
      { name: "description", content: "Manage your RASA account preferences and personal details." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const name = (user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || "";
  const avatar = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div className="min-h-screen bg-ink pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-3">Account</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-10">Settings</h1>

        <div className="border border-border/50 bg-surface/30 p-8">
          <div className="flex items-center gap-5 mb-8 pb-8 border-b border-border/40">
            {avatar ? (
              <img src={avatar} alt="" className="w-16 h-16 rounded-full object-cover border border-gold/30" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold text-xl font-medium">
                {(name || user.email || "U")[0].toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-serif text-xl text-foreground">{name || "Guest"}</p>
              <p className="text-sm text-foreground/60">{user.email}</p>
            </div>
          </div>

          <dl className="grid gap-6 text-sm">
            <div>
              <dt className="text-[0.65rem] tracking-luxe uppercase text-foreground/50 mb-1">Full Name</dt>
              <dd className="text-foreground">{name || "—"}</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-luxe uppercase text-foreground/50 mb-1">Email</dt>
              <dd className="text-foreground">{user.email}</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-luxe uppercase text-foreground/50 mb-1">Sign-in Method</dt>
              <dd className="text-foreground capitalize">{(user.app_metadata?.provider as string) || "google"}</dd>
            </div>
          </dl>

          <p className="mt-10 text-xs text-foreground/50 italic">
            Profile details are managed through your Google account.
          </p>
        </div>
      </div>
    </div>
  );
}
