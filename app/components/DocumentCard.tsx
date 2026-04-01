"use client";

import { motion } from "motion/react";

interface Props {
  title: string;
  type: string;
  size: string;
  date: string;
  href?: string;
}

export default function DocumentCard({ title, type, size, date, href = "#" }: Props) {
  return (
    <motion.a
      href={href}
      whileHover={{ x: 6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex items-center gap-5 bg-white rounded-xl p-5 border border-[#E0E0E0] hover:border-[#F4141A]/30 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 cursor-pointer"
    >
      {/* PDF icon */}
      <div className="flex-shrink-0 w-12 h-12 bg-[#FFF0F0] rounded-lg flex items-center justify-center group-hover:bg-[#F4141A] transition-colors duration-200">
        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          className="text-[#F4141A] group-hover:text-white transition-colors duration-200"
        >
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M14 2v6h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[#1A1A1A] text-[15px] truncate group-hover:text-[#F4141A] transition-colors duration-200">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#999999] text-xs">{type}</span>
          <span className="text-[#E0E0E0]">·</span>
          <span className="text-[#999999] text-xs">{size}</span>
          <span className="text-[#E0E0E0]">·</span>
          <span className="text-[#999999] text-xs">{date}</span>
        </div>
      </div>

      {/* Download icon */}
      <motion.div
        animate={{ y: 0 }}
        whileHover={{ y: 2 }}
        transition={{ duration: 0.15 }}
        className="flex-shrink-0 text-[#E0E0E0] group-hover:text-[#F4141A] transition-colors duration-200"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v13M7 11l5 5 5-5M3 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </motion.a>
  );
}
