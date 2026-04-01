"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { memo } from "react";

interface Props {
  category: string;
  title: string;
  summary?: string;
  date: string;
  readTime?: string;
  href?: string;
  featured?: boolean;
  image?: string;
}

const NewsCard = memo(function NewsCard({
  category,
  title,
  summary,
  date,
  readTime,
  href = "#",
  featured = false,
  image,
}: Props) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`group bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 flex flex-col ${
        featured ? "h-full" : ""
      }`}
    >
      <div className={`relative overflow-hidden bg-[#F5F5F5] ${featured ? "h-52" : "h-44"}`}>
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#F5F5F5] to-[#E0E0E0] flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#E0E0E0] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#999999]">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                <path d="m21 15-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className="bg-[#F4141A] text-white text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <Link href={href}>
          <h3 className={`font-bold text-[#1A1A1A] leading-snug group-hover:text-[#F4141A] transition-colors duration-200 line-clamp-2 ${
            featured ? "text-[18px]" : "text-[16px]"
          }`}>
            {title}
          </h3>
        </Link>

        {summary && (
          <p className="text-[#555555] text-sm leading-relaxed mt-2 line-clamp-2 flex-1">
            {summary}
          </p>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F5F5F5]">
          <span className="text-[#999999] text-xs">{date}</span>
          {readTime && (
            <span className="text-[#999999] text-xs flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {readTime}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
});

export default NewsCard;
