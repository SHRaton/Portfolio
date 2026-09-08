'use client'

import React from 'react'

export interface SliderLogo {
  src: string
  alt: string
}

interface InfiniteSliderProps {
  logos: SliderLogo[]
  speed?: number // animation duration in seconds
  className?: string
}

export function InfiniteSlider({ logos, speed = 28, className = '' }: InfiniteSliderProps) {
  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className="flex w-max items-end gap-5 pb-1"
        style={{ animation: `slider-marquee ${speed}s linear infinite` }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="group relative h-[88px] w-[120px] shrink-0 flex flex-col items-center justify-center gap-2 rounded-xl cursor-default overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Violet glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at center, rgba(124,58,237,0.25), rgba(88,28,135,0.15))' }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(124,58,237,0.35)' }}
            />

            {/* Logo */}
            <img
              src={logo.src}
              alt={logo.alt}
              className="relative z-10 h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />

            {/* Name label */}
            <span className="relative z-10 text-[10px] font-mono text-slate-600 group-hover:text-violet-400 transition-colors duration-300 tracking-wide">
              {logo.alt}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
