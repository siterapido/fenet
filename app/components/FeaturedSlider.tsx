"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import OptimizedImage from "./OptimizedImage";

interface Slide {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image?: string;
}

interface FeaturedSliderProps {
  slides: Slide[];
}

export default function FeaturedSlider({ slides }: FeaturedSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full">
      <div className="relative h-[480px] md:h-[520px] rounded-2xl overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {currentSlide.image ? (
              <OptimizedImage
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full"
                showLoading={false}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] via-[#2D2D2D] to-[#1A1A1A]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-8 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="max-w-2xl"
              >
                <span className="inline-block bg-[#F4141A] text-white text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-4">
                  {currentSlide.category}
                </span>
                <h2 className="text-white text-2xl md:text-[32px] font-black leading-tight mb-3 line-clamp-2">
                  {currentSlide.title}
                </h2>
                <p className="text-white/75 text-base md:text-lg leading-relaxed mb-5 line-clamp-2">
                  {currentSlide.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-white/60 text-sm">{currentSlide.date}</span>
                  <span className="text-white/40">·</span>
                  <span className="text-white/60 text-sm">{currentSlide.readTime} de leitura</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white/25 transition-all duration-300"
          aria-label="Slide anterior"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white/25 transition-all duration-300"
          aria-label="Próximo slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-white w-7" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {slides.slice(0, 2).map((slide, i) => (
          <Link
            key={i}
            href="#"
            className="group block bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex">
              <div className="w-28 md:w-32 h-full min-h-[110px] relative flex-shrink-0">
                {slide.image ? (
                  <OptimizedImage
                    src={slide.image}
                    alt=""
                    className="w-full h-full"
                    aspectRatio="auto"
                    showLoading={false}
                  />
                ) : (
                  <div className="w-full h-full bg-[#F5F5F5]" />
                )}
              </div>
              <div className="p-4 flex flex-col justify-center">
                <span className="text-[#F4141A] text-[10px] font-bold uppercase tracking-[0.12em]">
                  {slide.category}
                </span>
                <h3 className="text-[#1A1A1A] text-[15px] font-bold leading-snug mt-1 line-clamp-2 group-hover:text-[#F4141A] transition-colors">
                  {slide.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[#999999] text-xs">{slide.date}</span>
                  <span className="text-[#DDD]">·</span>
                  <span className="text-[#999999] text-xs">{slide.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}