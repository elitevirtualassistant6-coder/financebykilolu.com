import React from 'react';
import { LearnFeature } from '../types';
import { FileText, AlertTriangle, ShieldCheck, Eye, TrendingUp, CircleDollarSign } from 'lucide-react';

interface LearnFeatureCardProps {
  feature: LearnFeature;
  key?: string;
}

// Icon mapper for simple, rigid compile safety
function FeatureIcon({ name }: { name: string }) {
  const iconProps = { className: "h-6 w-6" };
  switch (name) {
    case 'FileText':
      return <FileText {...iconProps} />;
    case 'AlertTriangle':
      return <AlertTriangle {...iconProps} />;
    case 'ShieldCheck':
      return <ShieldCheck {...iconProps} />;
    case 'Eye':
      return <Eye {...iconProps} />;
    case 'TrendingUp':
      return <TrendingUp {...iconProps} />;
    case 'CircleDollarSign':
      return <CircleDollarSign {...iconProps} />;
    default:
      return <FileText {...iconProps} />;
  }
}

export default function LearnFeatureCard({ feature }: LearnFeatureCardProps) {
  return (
    <div className="relative flex flex-col rounded-2xl border border-white/10 bg-slate-900/60 p-6 hover:border-brand/50 hover:shadow-lg hover:shadow-brand-glow/8 transition-all duration-300 group">
      {/* Decorative gradient radial pulse */}
      <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-brand/10 to-teal-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon frame helper */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950/60 text-brand border border-brand/20 group-hover:text-white group-hover:bg-brand transition-all">
        <FeatureIcon name={feature.iconName} />
      </div>

      <h3 className="mt-5 text-base font-bold text-white tracking-tight group-hover:text-brand transition-colors">
        {feature.title}
      </h3>
      
      <p className="mt-2.5 text-xs text-slate-450 text-slate-400 leading-relaxed font-normal">
        {feature.description}
      </p>
    </div>
  );
}
