import majlisLogo from "@/assets/majlis-logo.png.asset.json";
import makhmalLogo from "@/assets/makhmal-logo.png.asset.json";
import tarkibLogo from "@/assets/tarkib-logo.png.asset.json";

export type Flavour = { name: string; notes: string };

export type Collection = {
  slug: "majlis" | "makhmal" | "tarkib";
  name: string;
  label: string;
  expression: string;
  tagline: string;
  intro: string;
  signature: string[];
  philosophy: string;
  featured: Flavour[];
  flavours: Flavour[];
  closing: string;
  bgVar: string;
  accentVar: string;
  pattern: string;
  logo: string;
};

export const formats = ["20g", "60g", "250g", "500g", "1kg"];

export const collections: Collection[] = [
  {
    slug: "majlis",
    name: "Majlis",
    label: "Collection I",
    expression: "The Expression of Heritage",
    tagline: "Tradition Lives On.",
    intro:
      "Majlis is a tribute to gathering. Rooted in heritage, warmed by hospitality, it carries the timeless character of an evening spent in good company.",
    signature: ["Heritage Profile", "Warm & Aromatic", "Crafted for Conviviality"],
    philosophy:
      "Some rituals never need reinvention. Majlis preserves them with the discipline of a house that respects its origins.",
    featured: [
      { name: "Commissioner", notes: "Dark Berries · Exotic Fruits · Arabian Spice" },
      { name: "Paan Mint Cigar", notes: "Royal Paan · Fresh Mint · Aged Cigar Leaf" },
      { name: "Brain Freezer", notes: "Arctic Mint · Icy Menthol · Frosted Finish" },
      { name: "Paan Raas", notes: "Royal Paan · Gulkand · Sweet Supari" },
    ],
    flavours: [
      { name: "Commissioner", notes: "Dark Berries · Exotic Fruits · Arabian Spice" },
      { name: "Paan Mint Cigar", notes: "Royal Paan · Fresh Mint · Aged Cigar Leaf" },
      { name: "Brain Freezer", notes: "Arctic Mint · Icy Menthol · Frosted Finish" },
      { name: "Paan Raas", notes: "Royal Paan · Gulkand · Sweet Supari" },
      { name: "Two Apples", notes: "Anise · Spiced Apple · Char" },
      { name: "Rose", notes: "Damask Rose · Honey · Soft Smoke" },
      { name: "Cardamom", notes: "Green Cardamom · Cream · Wood" },
      { name: "Lemon Mint", notes: "Citrus Zest · Spearmint · Cool" },
      { name: "Grape", notes: "Black Grape · Ice · Lush" },
      { name: "Mixed Fruit", notes: "Stone Fruit · Berry · Bright" },
      { name: "Watermelon Mint", notes: "Watermelon · Mint · Crisp" },
      { name: "Peach", notes: "Ripe Peach · Honey · Warmth" },
    ],
    closing: "Tradition Lives On.",
    bgVar: "var(--majlis)",
    accentVar: "var(--majlis-accent)",
    pattern: "pattern-arabesque",
    logo: majlisLogo.url,
  },
  {
    slug: "makhmal",
    name: "Makhmal",
    label: "Collection II",
    expression: "The Expression of Refinement",
    tagline: "Refinement Endures.",
    intro:
      "Makhmal is velvet made vapour. Quiet, composed, and effortlessly elegant — it is luxury without volume, refinement without effort.",
    signature: ["Velvet Profile", "Soft & Composed", "Crafted for Stillness"],
    philosophy:
      "True luxury requires no attention. It is found in balance, in comfort, in the confidence of simplicity executed well.",
    featured: [
      { name: "Double Apple", notes: "Red Apple · Green Apple · Anise Spice" },
      { name: "Spring Water", notes: "Crisp Mint · Cool Eucalyptus · Fresh Breeze" },
      { name: "Ice Mango", notes: "Golden Mango · Tropical Nectar · Icy Finish" },
      { name: "Watermelon", notes: "Juicy Watermelon · Summer Melon · Crisp Finish" },
    ],
    flavours: [
      { name: "Double Apple", notes: "Red Apple · Green Apple · Anise Spice" },
      { name: "Spring Water", notes: "Crisp Mint · Cool Eucalyptus · Fresh Breeze" },
      { name: "Ice Mango", notes: "Golden Mango · Tropical Nectar · Icy Finish" },
      { name: "Watermelon", notes: "Juicy Watermelon · Summer Melon · Crisp Finish" },
      { name: "Velvet Peach", notes: "Ripe Peach · Cream · Silk" },
      { name: "Silk Mango", notes: "Alphonso · Saffron · Smooth" },
      { name: "Lychee Bloom", notes: "Lychee · Rose · Linen" },
      { name: "Vanilla Mist", notes: "Bourbon Vanilla · Cloud · Warm" },
      { name: "Coconut Cream", notes: "Toasted Coconut · Cream · Calm" },
      { name: "Honey Melon", notes: "Honeydew · Honey · Soft" },
      { name: "Soft Berry", notes: "Mixed Berry · Cream · Plush" },
      { name: "Passion Fruit", notes: "Passion Fruit · Citrus · Bright" },
    ],
    closing: "Refinement Endures.",
    bgVar: "var(--makhmal)",
    accentVar: "var(--makhmal-accent)",
    pattern: "pattern-velvet",
    logo: makhmalLogo.url,
  },
  {
    slug: "tarkib",
    name: "Tarkib",
    label: "Collection III",
    expression: "The Expression of Innovation",
    tagline: "Discovery Never Ends.",
    intro:
      "Tarkib is curiosity bottled. Bold, modern, and progressive — it is the House of RASA looking forward, composing flavours the way a bartender composes a cocktail.",
    signature: ["Modern Profile", "Bold & Layered", "Crafted for Discovery"],
    philosophy:
      "Innovation begins with the willingness to question what exists. Tarkib is the proof that tradition and progress are not opposites.",
    featured: [
      { name: "Lychee Bliss", notes: "Exotic Lychee · White Blossom · Citrus Spark" },
      { name: "White Rose", notes: "White Rose · Velvet Petals · Soft Sweetness" },
      { name: "Marbella", notes: "Blood Orange · Dark Grapes · Herbal Finish" },
      { name: "Dubai Special", notes: "Arabian Fruits · Golden Dates · Oriental Spice" },
    ],
    flavours: [
      { name: "Lychee Bliss", notes: "Exotic Lychee · White Blossom · Citrus Spark" },
      { name: "White Rose", notes: "White Rose · Velvet Petals · Soft Sweetness" },
      { name: "Marbella", notes: "Blood Orange · Dark Grapes · Herbal Finish" },
      { name: "Dubai Special", notes: "Arabian Fruits · Golden Dates · Oriental Spice" },
      { name: "Smoked Old Fashioned", notes: "Bourbon · Orange · Oak" },
      { name: "Espresso Martini", notes: "Espresso · Cocoa · Cream" },
      { name: "Yuzu Spritz", notes: "Yuzu · Soda · Bright" },
      { name: "Negroni Noir", notes: "Bitter Orange · Vermouth · Spice" },
      { name: "Saffron Tonic", notes: "Saffron · Tonic · Floral" },
      { name: "Pineapple Mezcal", notes: "Pineapple · Smoke · Lime" },
      { name: "Hibiscus Gin", notes: "Hibiscus · Juniper · Petal" },
      { name: "Black Cherry Bourbon", notes: "Black Cherry · Bourbon · Vanilla" },
    ],
    closing: "Discovery Never Ends.",
    bgVar: "var(--tarkib)",
    accentVar: "var(--tarkib-accent)",
    pattern: "pattern-geometric",
    logo: tarkibLogo.url,
  },
];

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);
