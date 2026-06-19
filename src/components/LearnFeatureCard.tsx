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
    <div className="relative flex flex-col rounded-2xl border border-white/5 bg-slate-905 bg-slate-900/40 p-6 hover:border-white/20 hover:bg-slate-900/80 transition duration-300 group">
      {/* Decorative gradient radial pulse */}
      <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon frame helper */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/5 text-emerald-400 border border-white/5 group-hover:text-emerald-350 group-hover:bg-emerald-500/10 transition-all">
        <FeatureIcon name={feature.iconName} />
      </div>

      <h3 className="mt-5 text-base font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
        {feature.title}
      </h3>
      
      <p className="mt-2.5 text-xs text-slate-400 leading-relaxed font-normal">
        {feature.description}
      </p>
    </div>
  );
}
