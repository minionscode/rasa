import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { CollectionExperience } from "@/components/CollectionExperience";
import { getCollection, type Collection } from "@/data/collections";

export const Route = createFileRoute("/collections/$slug")({
  beforeLoad: ({ params }) => {
    if (!getCollection(params.slug)) throw notFound();
  },
  loader: ({ params }) => ({ collection: getCollection(params.slug)! }),
  head: ({ params }) => {
    const c = getCollection(params.slug);
    const title = c ? `${c.name} — ${c.expression} | RASA` : "Collection — RASA";
    const description = c?.intro ?? "A collection within the House of RASA.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CollectionPage,
  notFoundComponent: CollectionNotFound,
});

function CollectionPage() {
  const data = Route.useLoaderData() as { collection: Collection };

  return <CollectionExperience collection={data.collection} />;
}

function CollectionNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-6xl text-gold">Collection not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Explore Majlis, Makhmal, or Tarkib inside the House of RASA.
        </p>
        <div className="mt-8">
          <Link
            to="/collections"
            className="inline-flex px-8 py-3 border border-gold/40 text-gold text-xs tracking-luxe uppercase hover:bg-gold hover:text-primary-foreground transition-all duration-500"
          >
            View Collections
          </Link>
        </div>
      </div>
    </div>
  );
}
