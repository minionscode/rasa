import { motion } from "framer-motion";
import rasaLogo from "@/assets/rasa-logo.png.asset.json";

type Props = {
  className?: string;
  /** Tailwind height utility for the logo image */
  size?: string;
  /** Show a soft gold halo behind the logo */
  halo?: boolean;
  /** Continuous gentle float animation */
  float?: boolean;
  /** Shimmer sweep animation (defaults to true) */
  shimmer?: boolean;
  /** Reveal animation when entering viewport */
  reveal?: boolean;
};

/**
 * AnimatedWordmark — the RASA logo, treated like a luxury hallmark.
 * - Soft gold halo
 * - Continuous float
 * - Recurring shimmer sweep across the mark
 */
export function AnimatedWordmark({
  className = "",
  size = "h-24 md:h-40",
  halo = true,
  float = true,
  shimmer = true,
  reveal = true,
}: Props) {
  return (
    <motion.div
      initial={reveal ? { opacity: 0, y: 30, filter: "blur(14px)" } : false}
      whileInView={reveal ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative inline-block ${className}`}
    >
      /* {halo && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -m-12 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 30%, transparent) 0%, transparent 65%)",
            filter: "blur(20px)",
          }}
          animate={{ opacity: [0.55, 0.9, 0.55], scale: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )} */

      {/* <motion.div
        animate={float ? { y: [0, -6, 0] } : undefined}
        transition={float ? { duration: 7, repeat: Infinity, ease: "easeInOut" } : undefined}
        className="relative"
      >
        <img
          src={rasaLogo.url}
          alt="RASA"
          className={`relative z-10 w-auto crisp-img ${size}`}
          loading="eager"
          decoding="async"
        />

        {shimmer && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              WebkitMaskImage: `url(${rasaLogo.url})`,
              maskImage: `url(${rasaLogo.url})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              background:
                "linear-gradient(115deg, transparent 30%, color-mix(in oklab, var(--gold-soft) 85%, white 15%) 50%, transparent 70%)",
              mixBlendMode: "screen",
            }}
            animate={{ x: ["-120%", "120%"] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
          />
        )}
      </motion.div> */}
    {/* </motion.div> */}
  );
}
