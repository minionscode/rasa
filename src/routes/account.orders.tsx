import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/account/orders")({
  head: () => ({
    meta: [
      { title: "My Enquiries — RASA" },
      { name: "description", content: "Track the status of the enquiries you have submitted to RASA." },
      { property: "og:title", content: "My Enquiries — RASA" },
      { property: "og:description", content: "Track the status of the enquiries you have submitted to RASA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrdersPage,
});

const STATUS_COLORS: Record<string, string> = {
  new: "#c9a96e", contacted: "#60a5fa", closed: "#6b7280",
};

function OrdersPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user?.email) return;
    supabase
      .from("enquiries")
      .select("*")
      .eq("email", user.email)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setEnquiries(data ?? []);
        setDataLoading(false);
      });
  }, [user]);

  if (loading || !user) return <div className="min-h-screen bg-ink flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-ink pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-3">Account</p>
        <h1 className="font-serif text-4xl text-foreground mb-10">My Enquiries</h1>

        {dataLoading && <div className="flex justify-center py-20"><div className="w-8 h-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" /></div>}

        {!dataLoading && enquiries.length === 0 && (
          <div className="border border-border/50 bg-surface/30 p-12 text-center">
            <p className="font-serif text-xl text-foreground mb-3">No enquiries yet</p>
            <p className="text-sm text-foreground/60 mb-8 max-w-md mx-auto">Submit a contact enquiry and it will appear here.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-gold/50 text-gold text-[0.65rem] tracking-luxe uppercase hover:bg-gold hover:text-ink transition-all duration-300">
              Contact Us
            </Link>
          </div>
        )}

        {!dataLoading && enquiries.length > 0 && (
          <div className="space-y-4">
            {enquiries.map(eq => (
              <div key={eq.id} className="border border-border/40 p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-serif text-lg">{eq.business}</p>
                    <p className="text-xs text-foreground/60 mt-0.5">{eq.type}</p>
                  </div>
                  <span className="text-[0.6rem] tracking-luxe uppercase px-3 py-1 border shrink-0" style={{ color: STATUS_COLORS[eq.status] ?? "#888", borderColor: `${STATUS_COLORS[eq.status] ?? "#888"}40` }}>
                    {eq.status}
                  </span>
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed">{eq.message}</p>
                <p className="text-[0.65rem] text-foreground/40 mt-3">{new Date(eq.created_at).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
