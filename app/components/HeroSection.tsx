"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, memo } from "react";
import GradientMesh from "./GradientMesh";

interface Props {
  tag?: string;
  headline: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  backgroundImage?: string;
}

const HeroSection = memo(function HeroSection({
  tag = "FENET",
  headline,
  subheadline,
  ctaLabel = "Leia mais",
  ctaHref = "/noticias",
  secondaryLabel,
  secondaryHref,
  backgroundImage,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {backgroundImage ? (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        ) : (
          <GradientMesh />
        )}
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 w-full py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#F4141A]/15 border border-[#F4141A]/30 text-[#F4141A] text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#F4141A] animate-pulse" />
          {tag}
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-[64px] font-black text-white leading-[1.08] tracking-tight mb-6 max-w-3xl">
          {headline}
        </h1>

        {subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="text-white/65 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
          >
            {subheadline}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-2 bg-[#F4141A] hover:bg-[#C01015] text-white font-bold px-7 py-3.5 rounded-lg transition-all duration-200 hover:shadow-[0_8px_24px_rgba(244,20,26,0.4)] hover:-translate-y-0.5 active:translate-y-0 text-[15px] tracking-wide"
          >
            {ctaLabel}
            <motion.svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              className="group-hover:translate-x-1 transition-transform duration-200"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </Link>

          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white/80 hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 hover:bg-white/8 text-[15px]"
            >
              {secondaryLabel}
            </Link>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/40 text-[11px] uppercase tracking-[0.2em] font-medium">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent animate-float" />
      </motion.div>
    </div>
  );
});

export default HeroSection;
