import React from 'react';
import { ArrowRight, Video } from 'lucide-react';
import KiloluLogo from './KiloluLogo';

interface HeaderProps {
  currentView: 'landing' | 'good-credit';
  onSetView: (view: 'landing' | 'good-credit') => void;
  onOpenModal: () => void;
}

export default function Header({ currentView, onSetView, onOpenModal }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        
        {/* Logo and Name grouping */}
        <button 
          onClick={() => onSetView('landing')} 
          className="flex items-center cursor-pointer focus:outline-none"
          aria-label="Go to home"
        >
          <KiloluLogo size="custom" width={48} height={48} className="text-brand hover:scale-105 transition-transform duration-300" />
        </button>

        {/* Anchor links inside header / Conditional on currentView */}
        {currentView === 'landing' ? (
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
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
        ) : (
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <button 
              onClick={() => onSetView('landing')}
              className="text-slate-400 hover:text-brand transition-colors duration-200 focus:outline-none cursor-pointer"
            >
              ← Back to Credit Repair
            </button>
            <span className="text-amber-500/60 select-none">|</span>
            <span className="text-amber-400 uppercase tracking-widest">MBO Gold Elite Community</span>
          </nav>
        )}

        {/* CTAs */}
        <div className="flex items-center gap-3">
          {currentView === 'landing' ? (
            <>
              <button
                onClick={() => onSetView('good-credit')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] active:scale-95 transition-all px-4 py-2 text-[10px] font-black uppercase tracking-wider text-amber-400 cursor-pointer"
              >
                <span>I have good credit</span>
              </button>
              
              <button
                onClick={onOpenModal}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-brand hover:bg-brand-hover hover:shadow-brand-glow active:scale-95 transition-all px-4 py-2 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-md cursor-pointer"
              >
                <Video className="h-3 w-3 fill-current" />
                <span>Free Training</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => onSetView('landing')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900 hover:bg-slate-800 active:scale-95 transition-all px-4 py-2 text-[10px] font-black uppercase tracking-wider text-slate-200 cursor-pointer"
            >
              <span>Need Credit Repair?</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
