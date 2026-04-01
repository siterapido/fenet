"use client";

import { useState } from "react";

interface Props {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
  className?: string;
}

export default function FloatingLabel({ label, type = "text", name, required, className = "" }: Props) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const lifted = focused || value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full h-14 px-4 pt-5 pb-2 bg-white border-2 rounded-lg text-[#1A1A1A] text-sm outline-none transition-all duration-200 peer"
        style={{ borderColor: focused ? "#F4141A" : "#E0E0E0" }}
      />
      <label
        className="absolute left-4 font-medium pointer-events-none transition-all duration-200"
        style={{
          top: lifted ? "8px" : "50%",
          transform: lifted ? "none" : "translateY(-50%)",
          fontSize: lifted ? "10px" : "14px",
          color: focused ? "#F4141A" : lifted ? "#999999" : "#999999",
          letterSpacing: lifted ? "0.08em" : "normal",
          textTransform: lifted ? "uppercase" : "none",
        }}
      >
        {label}
      </label>
    </div>
  );
}

interface TextareaProps {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

export function FloatingTextarea({ label, name, required, rows = 4, className = "" }: TextareaProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const lifted = focused || value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <textarea
        name={name}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-6 pb-3 bg-white border-2 rounded-lg text-[#1A1A1A] text-sm outline-none transition-all duration-200 resize-none"
        style={{ borderColor: focused ? "#F4141A" : "#E0E0E0" }}
      />
      <label
        className="absolute left-4 font-medium pointer-events-none transition-all duration-200"
        style={{
          top: lifted ? "10px" : "18px",
          fontSize: lifted ? "10px" : "14px",
          color: focused ? "#F4141A" : "#999999",
          letterSpacing: lifted ? "0.08em" : "normal",
          textTransform: lifted ? "uppercase" : "none",
        }}
      >
        {label}
      </label>
    </div>
  );
}
