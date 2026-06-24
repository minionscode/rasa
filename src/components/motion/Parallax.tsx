import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** translate range in px; negative moves up faster */
  range?: number;
  scale?: boolean;
};

export function Parallax({ children, className, range = 80, scale = false }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [range, -range]);
  const s = useTransform(scrollYProgress, [0, 0.5, 1], scale ? [1.08, 1.0, 1.08] : [1, 1, 1]);
  return (
    <motion.div ref={ref} className={className} style={{ y, scale: s, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
