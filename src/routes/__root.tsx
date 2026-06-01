import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AgeGate } from "../components/AgeGate";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-gold">404</h1>
        <h2 className="mt-4 font-serif text-2xl text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This path drifts beyond our atelier.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex px-8 py-3 border border-gold/40 text-gold text-xs tracking-luxe uppercase hover:bg-gold hover:text-primary-foreground transition-all duration-500"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-foreground">Something went amiss</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Please try again or return home.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="px-6 py-3 bg-gold text-primary-foreground text-xs tracking-luxe uppercase hover:bg-gold-soft transition-colors"
          >
            Try Again
          </button>
          <a href="/" className="px-6 py-3 border border-border text-xs tracking-luxe uppercase hover:border-gold/50 transition-all">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RASA — Smoke, Perfected." },
      { name: "description", content: "A luxury hookah lifestyle house uniting premium tobacco collections, hookah systems, and curated accessories." },
      { name: "author", content: "RASA" },
      { property: "og:title", content: "RASA — Smoke, Perfected." },
      { property: "og:description", content: "A luxury hookah lifestyle house uniting premium tobacco collections, hookah systems, and curated accessories." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "RASA" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AgeGate />
      <SiteHeader />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
