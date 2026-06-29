import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { sendNewsletterEmail } from "@/lib/api/sendNewsletterEmail.functions";

export const Route = createFileRoute("/test-email")({
  component: TestEmailPage,
});

function TestEmailPage() {
  const [status, setStatus] = useState("Sending test email...");

  useEffect(() => {
    let cancelled = false;
    sendNewsletterEmail({ data: { email: "harshitthareja79@gmail.com" } })
      .then((res) => {
        if (cancelled) return;
        console.log("Test email result:", res);
        setStatus("Test email sent!");
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Test email error:", err);
        setStatus(`Error: ${err?.message ?? String(err)}`);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink text-foreground px-6">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-gold mb-4">Email Test</h1>
        <p className="text-sm text-foreground/80">{status}</p>
        <p className="mt-6 text-xs text-muted-foreground">
          Target: harshitthareja79@gmail.com
        </p>
      </div>
    </div>
  );
}
