import React from 'react';
import { X, Play, ShieldAlert, Sparkles } from 'lucide-react';
import OptInForm from './OptInForm';
import { AppSettings } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
}

export default function Modal({ isOpen, onClose, settings }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop element with click interaction */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300" 
      />

      {/* Frame panel */}
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Glow corner elements */}
        <div className="absolute -top-12 -right-12 h-24 w-24 bg-brand/5 rounded-full blur-2xl" />
        
        {/* Close button anchor */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"
          aria-label="Close form Modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header content labels */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-dark uppercase tracking-widest bg-brand-muted px-2.5 py-1 rounded-full border border-brand/20">
            <Sparkles className="h-3 w-3" />
            <span>Instant Access Masterclass</span>
          </div>
          
          <h3 className="text-lg font-extrabold text-slate-900 mt-3">
            🎥 Access Free Training
          </h3>
          <p className="text-xs text-slate-600 leading-normal max-w-xs mx-auto">
            Enter your details to register and launch the credit framework video sequence on WhatsApp instantly
          </p>
        </div>

        {/* Modal Form */}
        <div className="mt-6">
          <OptInForm 
            settings={settings} 
            buttonLabel="WATCH THE TRAINING NOW" 
            sourceLocation="Interactive Modal popup"
          />
        </div>

        {/* Disclaimers */}
        <p className="mt-5 text-center text-[9px] text-slate-500 leading-normal">
          By registering, you agree to receive training links. Your privacy is 100% guarded. Details logged securely to Joshua's spreadsheet.
        </p>
      </div>
    </div>
  );
}
