import React from 'react';
import { ArrowRight, Video } from 'lucide-react';
import KiloluLogo from './KiloluLogo';

interface HeaderProps {
  onOpenModal: () => void;
}

export default function Header({ onOpenModal }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        
        {/* Logo and Name grouping */}
        <div className="flex items-center">
          <KiloluLogo size="custom" width={48} height={48} className="text-brand hover:scale-105 transition-transform duration-300" />
        </div>

        {/* Anchor links inside header */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-450">
          <a href="#what-you-will-learn" className="text-slate-400 hover:text-brand transition-colors duration-200 focus:outline-none">
            What You'll Learn
          </a>
          <a href="#success-stories" className="text-slate-400 hover:text-brand transition-colors duration-200 focus:outline-none">
            Success Stories
          </a>
          <a href="#next-steps" className="text-slate-400 hover:text-brand transition-colors duration-200 focus:outline-none">
            Programs &amp; Services
          </a>
        </nav>

        {/* Watch trigger CTA */}
        <div>
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand hover:bg-brand-hover hover:shadow-brand/20 active:scale-95 transition-all px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg cursor-pointer"
          >
            <Video className="h-3.5 w-3.5 fill-current" />
            <span>Watch Free Training</span>
          </button>
        </div>
      </div>
    </header>
  );
}
