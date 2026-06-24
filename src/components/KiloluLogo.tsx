import React from 'react';
import logoPng from '../../logo.png';

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
    <img
      src={logoPng}
      alt="KILOLU Logo"
      width={w}
      height={h}
      className={`object-contain ${className}`}
    />
  );
}
