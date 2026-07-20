import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/account/orders")({
  head: () => ({
    meta: [
      { title: "Your Orders — RASA" },
      { name: "description", content: "Review your RASA enquiries and orders." },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-ink pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-3">Account</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-10">Your Orders</h1>

        <div className="border border-border/50 bg-surface/30 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gold/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="font-serif text-xl text-foreground mb-3">No orders yet</p>
          <p className="text-sm text-foreground/60 mb-8 max-w-md mx-auto">
            When you submit an enquiry or place an order through RASA, it will appear here.
          </p>
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold/50 text-gold text-[0.65rem] tracking-luxe uppercase hover:bg-gold hover:text-primary-foreground transition-all duration-300"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    </div>
  );
}
