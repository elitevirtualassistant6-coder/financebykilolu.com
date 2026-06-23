import React from "react";
import { X, Play, ShieldAlert, Sparkles } from "lucide-react";
import OptInForm from "./OptInForm";
import { AppSettings } from "../types";

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
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Glow corner elements */}
        {/* <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-brand to-cyan-500 blur-xl opacity-15 -z-10 animate-pulse" 
             style={{
               animationDuration: '6s'
             }} /> */}

        {/* Close button anchor */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close form Modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header content labels */}
        <div className="text-center space-y-1 mb-6">
          <h2 className="text-xl font-bold text-white mb-2">
            100% FREE CONSULTATION
          </h2>
          <p className="text-slate-400 text-xs">
            ONLY 10 SLOTS AVAILABLE WEEKLY
          </p>
        </div>

        {/* Modal Form */}
        <div>
          <OptInForm
            settings={settings}
            buttonLabel="Access Masterclass Now"
            sourceLocation="Interactive Modal popup"
          />
        </div>

        <p className="text-[9px] text-slate-400 text-center mt-4 uppercase tracking-wider font-semibold">
          Please only complete if you are serious about fixing your credit
        </p>
      </div>
    </div>
  );
}
