import React from 'react';

interface KiloluLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  width?: number | string;
  height?: number | string;
}

export default function KiloluLogo({ 
  className = '', 
  size = 'md', 
  width, 
  height 
}: KiloluLogoProps) {
  // Determine standard dimensions based on preset size
  let dims = { w: '120px', h: '120px' };
  if (size === 'sm') {
    dims = { w: '40px', h: '40px' };
  } else if (size === 'md') {
    dims = { w: '80px', h: '80px' };
  } else if (size === 'lg') {
    dims = { w: '140px', h: '140px' };
  } else if (size === 'xl') {
    dims = { w: '240px', h: '240px' };
  }

  // Override if custom width/height passed
  const w = width || dims.w;
  const h = height || dims.h;

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 500" 
      width={w} 
      height={h} 
      className={`fill-none stroke-current ${className}`}
      aria-label="KILOLU Logo"
    >
      <g 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* Crown Contour - Elegant outline vector representing the crown spikes */}
        <path 
          d="M 125 185 
             Q 250 197 375 185 
             L 395 140 
             Q 355 155 330 145 
             L 322 125 
             Q 285 142 250 132 
             L 250 100 
             L 250 132
             Q 215 142 178 125
             L 170 145
             Q 145 155 105 140
             Z" 
        />
        
        {/* Sparkle 1 (Left peak point inside crown space) */}
        <path 
          d="M 170 152 Q 170 159 163 159 Q 170 159 170 166 Q 170 159 177 159 Q 170 159 170 152 Z" 
          strokeWidth="6"
        />
        
        {/* Sparkle 2 (Center peak point inside crown space) */}
        <path 
          d="M 250 140 Q 250 149 240 149 Q 250 149 250 158 Q 250 149 260 149 Q 250 149 250 140 Z" 
          strokeWidth="6"
        />
        
        {/* Sparkle 3 (Right peak point inside crown space) */}
        <path 
          d="M 330 152 Q 330 159 323 159 Q 330 159 330 166 Q 330 159 337 159 Q 330 159 330 152 Z" 
          strokeWidth="6"
        />

        {/* Tall vertical elegant skeletal letters of "K I L O L U" */}
        
        {/* K */}
        <path d="M 140 210 L 140 370 M 140 290 L 180 210 M 140 290 L 180 370" />
        
        {/* I */}
        <path d="M 210 210 L 210 370" />
        
        {/* L (First L) - tall vertical line, with a bottom hook that gracefully curves left */}
        <path d="M 240 210 L 240 360 Q 240 370 250 370" />
        
        {/* O */}
        <path d="M 270 230 C 270 210 320 210 320 230 L 320 350 C 320 370 270 370 270 350 Z" />
        
        {/* L (Second L) */}
        <path d="M 350 210 L 350 370 L 390 370" />
        
        {/* U */}
        <path d="M 420 210 L 420 350 A 25 25 0 0 0 470 350 L 470 210" />
        
        {/* Lower custom hand-swooped elegant underline bar that cradles the branding */}
        <path 
          d="M 120 410 Q 250 445 380 410" 
          strokeWidth="12"
        />
      </g>
    </svg>
  );
}
