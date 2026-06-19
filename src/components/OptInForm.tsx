import React, { useState } from 'react';
import { AppSettings } from '../types';
import { Play, ArrowRight, Loader2, Sparkles, Shield, Mail, User, CheckCircle2, ExternalLink, RefreshCw } from 'lucide-react';

interface OptInFormProps {
  settings: AppSettings;
  buttonLabel?: string;
  sourceLocation: string; // e.g. "Hero Form" or "Modal"
}

// Extract video ID and return standard embed URL
function getYoutubeEmbedUrl(url: string = ''): string {
  if (!url) return '';
  let videoId = '';
  const shortsMatch = url.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) {
    videoId = shortsMatch[1];
  } else {
    const watchMatch = url.match(/(?:\?v=|\/embed\/|\/watch\?v=|\/\d\/|vi\/|youtu\.be\/|v\/)([a-zA-Z0-9_-]{11})/);
    if (watchMatch && watchMatch[1]) {
      videoId = watchMatch[1];
    }
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`;
  }
  return url;
}

export default function OptInForm({ settings, buttonLabel = "WATCH THE FREE TRAINING", sourceLocation }: OptInFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please write your name and email.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Send the lead data synchronously/asynchronously to Google Sheets Web App
      if (settings.googleWebAppUrl && settings.googleWebAppUrl !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        await fetch(settings.googleWebAppUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            source: sourceLocation,
            timestamp: new Date().toISOString()
          })
        });
      } else {
        console.warn('Google Sheets Apps Script URL is empty or unconfigured. Lead logged in console instead:', { name, email, sourceLocation });
      }
    } catch (error) {
      console.error('Error logging submission to Google Sheets:', error);
    } finally {
      // Step 2: Personalize the WhatsApp message by replacing placeholders
      let personalizedMsg = settings.customMessage;
      personalizedMsg = personalizedMsg.replace(/{NAME}/g, name.trim());
      personalizedMsg = personalizedMsg.replace(/{EMAIL}/g, email.trim());

      const encodedMessage = encodeURIComponent(personalizedMsg);
      const whatsAppNumberToUse = settings.whatsAppNumber || '447424445868';
      const targetUrl = `https://wa.me/${whatsAppNumberToUse}?text=${encodedMessage}`;

      setWhatsappUrl(targetUrl);
      setIsSubmitted(true);
      setIsSubmitting(false);

      // Attempt redirecting instantly to WhatsApp session or open in new tab
      try {
        window.open(targetUrl, '_blank');
      } catch (err) {
        console.warn('Popup blocked, expecting manual click fallback');
      }
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setIsSubmitted(false);
    setWhatsappUrl('');
    setErrorMsg('');
  };

  const isShorts = settings.freeTrainingUrl ? settings.freeTrainingUrl.includes('/shorts/') : true;
  const embedUrl = getYoutubeEmbedUrl(settings.freeTrainingUrl);

  if (isSubmitted) {
    return (
      <div className="space-y-5 animate-in fade-in duration-300">
        <div className="flex flex-col items-center text-center space-y-2 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-muted text-brand border border-brand/20 shadow-inner">
            <CheckCircle2 className="h-6 w-6 text-brand" />
          </div>
          <h4 className="text-md font-bold text-white tracking-wide uppercase">
            Spot Secured!
          </h4>
          <p className="text-[11px] text-slate-400 max-w-sm">
            Details logged successfully. We've opened your dedicated WhatsApp mentor thread. You can also watch the 5-Step credit masterclass video below:
          </p>
        </div>

        {/* Dynamic Video Player embed */}
        <div className="relative w-full">
          {embedUrl ? (
            <div className={
              isShorts 
                ? "aspect-[9/16] w-full max-w-[210px] mx-auto overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-2xl relative" 
                : "aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-2xl relative"
            }>
              <iframe
                src={embedUrl}
                title="Joshua Credit Consulting Free Training Video masterclass"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video w-full rounded-xl bg-slate-950 flex flex-col items-center justify-center border border-white/10 gap-3">
              <span className="text-xs text-slate-500">Video Player unavailable</span>
            </div>
          )}
        </div>

        {/* Action Call Outs */}
        <div className="space-y-2.5 pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-xs font-extrabold text-slate-950 hover:bg-brand-hover active:scale-[0.99] transition duration-200 shadow-xl shadow-brand-glow uppercase tracking-widest text-center"
          >
            <span>Launch WhatsApp Thread</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-white/5 py-2 text-[10px] text-slate-500 hover:text-slate-300 transition duration-200"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Register a different prospect / Retry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {errorMsg && (
        <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-xl text-center">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
              <User className="h-4 w-4" />
            </span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Thompson"
              className="w-full rounded-lg bg-slate-950 border border-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand transition-all"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
              className="w-full rounded-lg bg-slate-950 border border-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand transition-all"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Submit Actions Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-4 text-sm font-bold text-slate-950 hover:bg-brand-hover active:scale-[0.99] transition-all duration-200 shadow-xl shadow-brand-glow disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest cursor-pointer mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 text-slate-950" />
              Connecting to WhatsApp Securely...
            </>
          ) : (
            <>
              <span>{buttonLabel}</span>
              <Play className="h-3.5 w-3.5 fill-current" />
            </>
          )}
        </button>
      </form>

      <div className="flex justify-center items-center gap-1.5 text-[10px] text-slate-500">
        <Shield className="h-3 w-3 text-brand/60" />
        <span>Secure submission. Leads synced to Spreadsheet instantly.</span>
      </div>
    </div>
  );
}
