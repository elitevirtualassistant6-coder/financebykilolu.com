import React from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Coins, 
  Users, 
  Calendar, 
  BookOpen, 
  Mail, 
  ArrowLeft 
} from 'lucide-react';

interface GoodCreditViewProps {
  onSetView: (view: 'landing' | 'good-credit') => void;
}

export default function GoodCreditView({ onSetView }: GoodCreditViewProps) {
  return (
    <div className="relative overflow-hidden bg-black py-20 lg:py-28 text-white min-h-[80vh]">
      {/* Premium Warm Golden radial and grid accent overlay */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[60rem] w-full bg-[radial-gradient(ellipse_80%_60%_at_top,rgba(217,119,6,0.12),transparent)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(245,158,11,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_30%,#000_60%,transparent_100%)]" />

      <div className="mx-auto max-w-5xl px-6 sm:px-8 relative z-10">
        
        {/* Navigation Indicator / Back button */}
        <div className="mb-8 flex justify-start">
          <button 
            onClick={() => onSetView('landing')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to credit repair</span>
          </button>
        </div>

        {/* Elite Badge Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-1 ring-1 ring-amber-500/30 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>MBO Gold Elite Private Member Lounge</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl font-display leading-[1.12]">
            If You Have Good Credit, It's Time to <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">Leverage It</span>.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
            You've done the hard work of building and protecting your score. Inside our private Skool community, we show you exactly how to turn that pristine profile into major funding assets.
          </p>
        </div>

        {/* Bullet Matrix Bento Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 text-left">
          
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 p-6 rounded-2xl border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 shadow-xl group">
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white tracking-tight">Excellent Personal Credit</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  How to systematically polish your credit report to hit Tier-1 status, eliminating soft triggers so lenders compete to approve you with maximum limits.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 p-6 rounded-2xl border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 shadow-xl group">
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white tracking-tight">Excellent Business Credit</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Build corporate EIN profiles that carry zero personal guarantor risk. Separate your liabilities and establish heavy-duty trade references securely.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 p-6 rounded-2xl border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 shadow-xl group">
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                <Coins className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white tracking-tight">Access £100,000 - £1,000,000</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Connect straight with custom credit union secrets, corporate credit lines, cards, and liquid capital pools that remain hidden from standard public eyes.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 p-6 rounded-2xl border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 shadow-xl group">
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white tracking-tight">Business Funding &amp; Scale</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Strategies for fast capital deployment, arbitrage, property backing, and structured setups to multiply physical cashflows using other people's money.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Beautiful Community Mockup visual panel to prompt join interest */}
        <div className="mt-16 bg-slate-950/70 border border-amber-500/20 rounded-2xl overflow-hidden p-6 sm:p-8 shadow-2xl relative">
          <div className="absolute inset-0 bg-radial-gradient-amber opacity-30 pointer-events-none" />
          
          <div className="relative space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-amber-500 text-black font-black flex items-center justify-center rounded-xl text-lg tracking-wider">
                  M
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">MBO Gold Community</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Private Skool Mastermind</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] text-slate-300 tracking-wider font-semibold font-mono uppercase bg-slate-900 border border-white/10 px-2 py-0.5 rounded">
                  741+ Members Online
                </span>
              </div>
            </div>

            {/* Skool features breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400">
                  <BookOpen className="h-4 w-4" />
                  <span>The Classroom</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Actionable step-by-step masterclasses spanning corporate entities, tier funding sequences, and application recipes.
                </p>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Users className="h-4 w-4" />
                  <span>The Community</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Exchange real-time lending thresholds, banker updates, joint ventures, and feedback alongside high-caliber founders.
                </p>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Calendar className="h-4 w-4" />
                  <span>Interactive Pipeline</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Join expert-led strategy live stream calls, direct feedback review sessions, and regular guest underwriting guides.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Call to Action buttons */}
        <div className="mt-14 text-center space-y-6">
          <p className="text-xs text-slate-400 font-mono uppercase tracking-widest"> Ready to join the circle? </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <a
              href="https://www.skool.com/mbo-gold-community-7081/about"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black px-8 py-5 text-xs tracking-widest uppercase transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <span>Explore The Skool Community</span>
              <ArrowUpRight className="h-4 w-4 stroke-[3]" />
            </a>

            <button
              onClick={() => onSetView('landing')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-5 text-xs tracking-widest uppercase transition-all active:scale-95 cursor-pointer"
            >
              <span>Or credit repair</span>
            </button>
          </div>
        </div>

        {/* Contact panel for questions */}
        <div className="mt-20 border-t border-white/5 pt-12 text-center max-w-xl mx-auto">
          <div className="inline-flex p-3 rounded-full bg-slate-900 border border-white/5 text-slate-400 mb-4">
            <Mail className="h-5 w-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase">Got Questions First?</h4>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Unsure of which step aligns with your profiles or whether you fit the Skool Gold requirements? Message us directly.
          </p>
          <a
            href="mailto:info@kilolu.co.uk?subject=MBO Gold Elite Community Question"
            className="inline-block mt-4 text-xs font-extrabold text-amber-400 hover:text-amber-300 border-b border-amber-400/30 hover:border-amber-300 pb-0.5 transition-all"
          >
            info@kilolu.co.uk
          </a>
        </div>

      </div>
    </div>
  );
}
