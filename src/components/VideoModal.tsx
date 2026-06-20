import React from 'react';
import { X, Sparkles, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  clientName: string;
  title: string;
}

// Convert watch/shorts links to embeddable iFrame URLs
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

export default function VideoModal({ isOpen, onClose, videoUrl, clientName, title }: VideoModalProps) {
  if (!isOpen || !videoUrl) return null;

  const embedUrl = getYoutubeEmbedUrl(videoUrl);
  const isShorts = videoUrl.includes('/shorts/');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop element with click interaction */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300" 
      />

      {/* Frame panel */}
      <div className={`relative w-full ${isShorts ? 'max-w-[340px]' : 'max-w-xl'} rounded-2xl border border-slate-250 bg-white p-4 sm:p-5 shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200`}>
        
        {/* Glow corner elements */}
        <div className="absolute -top-12 -right-12 h-24 w-24 bg-brand/5 rounded-full blur-2xl pointer-events-none" />
        
        {/* Close button anchor */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-450 hover:text-slate-900 hover:bg-slate-100 transition z-20 cursor-pointer"
          aria-label="Close video player"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Client Tag & Title */}
        <div className="mb-4 pr-8">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-dark uppercase tracking-widest bg-brand-muted px-2.5 py-0.5 rounded-full border border-brand/20 w-fit">
            <Sparkles className="h-3 w-3" />
            <span>Success Story by {clientName}</span>
          </div>
          <h4 className="text-xs font-semibold text-slate-700 mt-2 line-clamp-1">
            "{title}"
          </h4>
        </div>

        {/* Dynamic Video Player iframe embed */}
        <div className="relative w-full">
          {embedUrl ? (
            <div className={
              isShorts 
                ? "aspect-[9/16] w-full overflow-hidden rounded-xl border border-slate-200 bg-black shadow-inner relative" 
                : "aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-black shadow-inner relative"
            }>
              <iframe
                src={embedUrl}
                title={`Joshua Credit Consulting Success Video for ${clientName}`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video w-full rounded-xl bg-slate-950 flex flex-col items-center justify-center border border-slate-200 gap-3">
              <span className="text-xs text-slate-400">Video Player unavailable</span>
            </div>
          )}
        </div>

        {/* Secondary controls/View on YouTube */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-slate-500 hover:text-brand-dark transition"
          >
            <span>Open on YouTube</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          
          <button 
            onClick={onClose}
            className="text-[10px] uppercase font-bold tracking-widest text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            Close Player
          </button>
        </div>
      </div>
    </div>
  );
}
