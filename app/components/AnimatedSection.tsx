"use client";

import { motion, useInView } from "motion/react";
import { useRef, memo } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up:    { x: 0,   y: 40 },
  down:  { x: 0,   y: -40 },
  left:  { x: 40,  y: 0 },
  right: { x: -40, y: 0 },
  none:  { x: 0,   y: 0 },
};

interface Props {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  margin?: string | number;
}

const AnimatedSection = memo(function AnimatedSection({
  children,
  direction = "up",
  delay = 0,
  duration = 0.65,
  className = "",
  margin = "-80px",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: margin as never });
  const { x, y } = offsets[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

export default AnimatedSection;
