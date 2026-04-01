"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import GradientMesh from "./GradientMesh";

interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  backgroundImage?: string;
}

export default function PageHeader({ title, subtitle, breadcrumbs, backgroundImage }: Props) {
  return (
    <div className="relative py-20 md:py-28 overflow-hidden">
      {backgroundImage ? (
        <>
          {/* Foto de fundo */}
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt={title}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>
          {/* Overlay escuro com gradiente */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
          {/* Tint vermelho sutil */}
          <div className="absolute inset-0 bg-[#F4141A]/10" />
        </>
      ) : (
        <GradientMesh />
      )}

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Breadcrumb */}
        {breadcrumbs && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-2 text-[12px] text-white/50 mb-6 font-medium uppercase tracking-wider"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="opacity-40">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white/80 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/75">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight max-w-2xl drop-shadow-lg"
        >
          {title}
        </motion.h1>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
          style={{ originX: 0 }}
          className="mt-5 h-[3px] w-16 bg-[#F4141A] rounded-full"
        />

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-4 text-white/75 text-lg max-w-xl leading-relaxed drop-shadow"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
