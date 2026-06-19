import React from 'react';
import { Testimonial } from '../types';
import { Play } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
  onClick: () => void;
  onPlayVideo?: (videoUrl: string, clientName: string, title: string) => void;
  key?: string;
}

function getYoutubeThumbnailUrl(url: string = ''): string | null {
  if (!url) return null;
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
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return null;
}

export default function TestimonialCard({ testimonial, onClick, onPlayVideo }: TestimonialCardProps) {
  const youtubeThumbnail = getYoutubeThumbnailUrl(testimonial.videoUrl);
  const imageUrlToUse = youtubeThumbnail || testimonial.imageUrl;
  const isVideo = !!testimonial.videoUrl;

  const CardContent = (
    <>
      {/* Visual aspect-video framework representing the play interface */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center border border-white/5">
        
        {/* Background Image with slight scale fade zoom */}
        <img
          src={imageUrlToUse}
          alt={`Joshua Credit Review from ${testimonial.clientName}`}
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-500 opacity-100"
        />
        
        {/* Custom Play button badge indicator */}
        <div
          className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/90 border border-slate-700/80 text-emerald-400 group-hover:text-slate-950 group-hover:bg-emerald-400 group-hover:border-emerald-500 transition-all duration-350 shadow-lg"
          aria-label={`Play testimonial from ${testimonial.clientName}`}
        >
          <Play className="h-5 w-5 fill-current ml-0.5" />
        </div>
      </div>

      {/* Narrative Client metadata summary */}
      <div className="mt-4 px-2 pb-1.5 flex flex-col justify-end">
        <p className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors leading-relaxed">
          "{testimonial.title}"
        </p>
        <span className="mt-2 text-[10px] text-slate-500 font-medium">
          {testimonial.clientName}, <span className="text-slate-500">{testimonial.role}</span>
        </span>
      </div>
    </>
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (testimonial.videoUrl && onPlayVideo) {
      onPlayVideo(testimonial.videoUrl, testimonial.clientName, testimonial.title);
    } else {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative rounded-2xl border border-white/5 bg-slate-900 p-3 hover:border-white/20 hover:shadow-2xl hover:shadow-emerald-950/15 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {CardContent}
    </div>
  );
}
