import { motion } from "framer-motion";
import rasaLogo from "@/assets/rasa-logo.png.asset.json";

type Props = {
  className?: string;
  size?: string;
};

export function AnimatedWordmark({ className = "", size = "h-24 md:h-40" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className={`relative inline-block ${className}`}
    >
      <img
        src={rasaLogo.url}
        alt="RASA"
        className={`w-auto ${size}`}
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </motion.div>
  );
}
