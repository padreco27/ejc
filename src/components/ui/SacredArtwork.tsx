"use client";

import React from "react";

// Lily Flower Vector Line Art (matching top right of the Flor do Carmelo flyer)
export function LilyFlower({ className = "w-16 h-16 text-[#B68A4B]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Central Petal */}
      <path d="M50 15 C45 35 40 45 50 70 C60 45 55 35 50 15 Z" fill="currentColor" fillOpacity="0.08" />
      {/* Left Petal */}
      <path d="M50 45 C35 30 20 35 15 50 C25 60 40 55 50 50" fill="currentColor" fillOpacity="0.05" />
      {/* Right Petal */}
      <path d="M50 45 C65 30 80 35 85 50 C75 60 60 55 50 50" fill="currentColor" fillOpacity="0.05" />
      {/* Lower Left Petal */}
      <path d="M48 55 C35 65 25 75 30 85 C42 80 46 68 48 55" />
      {/* Lower Right Petal */}
      <path d="M52 55 C65 65 75 75 70 85 C58 80 54 68 52 55" />
      {/* Stem */}
      <path d="M50 68 L50 95" strokeWidth="2" />
      {/* Stamens */}
      <path d="M50 35 Q42 22 38 20" />
      <circle cx="38" cy="20" r="2" fill="currentColor" />
      <path d="M50 35 Q58 22 62 20" />
      <circle cx="62" cy="20" r="2" fill="currentColor" />
      <path d="M50 30 L50 18" />
      <circle cx="50" cy="18" r="2" fill="currentColor" />
    </svg>
  );
}

// Our Lady of Mount Carmel Crown & Scapular Emblem
export function CarmelEmblem({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        {/* Outer Sacred Ring */}
        <circle cx="60" cy="60" r="54" stroke="#B68A4B" strokeWidth="1.5" strokeDasharray="4 2" />
        <circle cx="60" cy="60" r="48" stroke="#5A3925" strokeWidth="1" />

        {/* Crown motif */}
        <path d="M40 38 L45 50 L60 35 L75 50 L80 38 L85 55 L35 55 Z" fill="#B68A4B" fillOpacity="0.8" />
        <circle cx="60" cy="32" r="3" fill="#D4A96A" />
        <circle cx="40" cy="35" r="2" fill="#D4A96A" />
        <circle cx="80" cy="35" r="2" fill="#D4A96A" />

        {/* Cross on top of crown */}
        <path d="M60 22 V30 M56 26 H64" stroke="#B68A4B" strokeWidth="2" strokeLinecap="round" />

        {/* Scapular Brown Shields */}
        <rect x="42" y="60" width="14" height="20" rx="2" fill="#5A3925" stroke="#B68A4B" strokeWidth="1" />
        <path d="M49 65 V75 M44 70 H54" stroke="#B68A4B" strokeWidth="1" />

        <rect x="64" y="60" width="14" height="20" rx="2" fill="#5A3925" stroke="#B68A4B" strokeWidth="1" />
        <circle cx="71" cy="70" r="4" stroke="#B68A4B" strokeWidth="1" />

        {/* Stars */}
        <path d="M60 48 L61.5 52 L65.5 52 L62 54.5 L63.5 58.5 L60 56 L56.5 58.5 L58 54.5 L54.5 52 L58.5 52 Z" fill="#B68A4B" />

        {/* Text Ribbon Arc placeholder */}
        <path d="M30 90 Q60 105 90 90" stroke="#B68A4B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Devotional Pill Badge (FÉ • TRADIÇÃO • DEVOÇÃO)
export function DevotionalBadge({ text = "FÉ • TRADIÇÃO • DEVOÇÃO" }: { text?: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#5A3925] text-[#E8D6B8] border border-[#B68A4B]/60 shadow-md font-display tracking-[0.2em] text-xs font-semibold uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-[#B68A4B]" />
      <span>{text}</span>
      <span className="w-1.5 h-1.5 rounded-full bg-[#B68A4B]" />
    </div>
  );
}
