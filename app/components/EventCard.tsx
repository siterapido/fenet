"use client";

import { motion } from "motion/react";
import { memo } from "react";

interface Props {
  day: string;
  month: string;
  title: string;
  location: string;
  type: string;
  typeColor?: "red" | "gray" | "green";
}

const typeColors = {
  red:   "bg-[#FFF0F0] text-[#F4141A]",
  gray:  "bg-[#F5F5F5] text-[#555555]",
  green: "bg-[#f0fff4] text-[#28A745]",
};

const EventCard = memo(function EventCard({ day, month, title, location, type, typeColor = "gray" }: Props) {
  return (
    <motion.div
      whileHover={{ x: 6, boxShadow: "0 6px 24px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex items-start gap-5 bg-white rounded-xl p-5 border border-[#E0E0E0] hover:border-[#F4141A]/25 transition-colors duration-200 cursor-pointer"
    >
      <div className="flex-shrink-0 w-14 bg-[#F4141A] rounded-lg flex flex-col items-center justify-center py-3 text-white">
        <span className="text-[22px] font-black leading-none">{day}</span>
        <span className="text-[11px] font-semibold uppercase tracking-wider mt-0.5">{month}</span>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[#1A1A1A] text-[15px] leading-snug truncate">{title}</h3>
        <p className="text-[#999999] text-sm mt-1 flex items-center gap-1.5 truncate">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          {location}
        </p>
        <span className={`inline-block mt-2.5 text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${typeColors[typeColor]}`}>
          {type}
        </span>
      </div>

      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#E0E0E0] flex-shrink-0 mt-1">
        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.div>
  );
});

export default EventCard;
