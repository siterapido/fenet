"use client";

import { useState, useCallback } from "react";
import Image, { ImageProps } from "next/image";
import { motion } from "motion/react";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "placeholder" | "blurDataURL"> {
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  showLoading?: boolean;
}

const aspectRatios = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  auto: "",
};

export default function OptimizedImage({
  src,
  alt,
  aspectRatio = "auto",
  className = "",
  showLoading = true,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
    setIsLoading(false);
  }, []);

  const containerClass = aspectRatio !== "auto" ? aspectRatios[aspectRatio] : "";

  if (error) {
    return (
      <div className={`bg-[#F5F5F5] flex items-center justify-center ${containerClass} ${className}`}>
        <div className="w-10 h-10 rounded-full bg-[#E0E0E0] flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#999999]">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            <path d="m21 15-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F5F5F5] ${containerClass} ${className}`}>
      {isLoading && showLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-10 bg-gradient-to-br from-[#F5F5F5] to-[#E8E8E8]"
        >
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.div>
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-all duration-500 ${
          isLoading ? "scale-105 blur-lg" : "scale-100 blur-0"
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />
    </div>
  );
}