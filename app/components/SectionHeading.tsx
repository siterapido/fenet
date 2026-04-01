"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, className = "", light = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" as never });

  return (
    <div ref={ref} className={`mb-10 ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`text-2xl md:text-3xl font-bold tracking-tight ${light ? "text-white" : "text-[#1A1A1A]"}`}
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        style={{ originX: 0 }}
        className="mt-3 h-[3px] w-12 bg-[#F4141A] rounded-full"
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className={`mt-3 text-base ${light ? "text-white/70" : "text-[#555555]"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
