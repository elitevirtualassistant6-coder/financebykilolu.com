import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import OptInForm from './components/OptInForm';
import LearnFeatureCard from './components/LearnFeatureCard';
import TestimonialCard from './components/TestimonialCard';
import Modal from './components/Modal';
import SettingsPanel from './components/SettingsPanel';
import KiloluLogo from './components/KiloluLogo';
import VideoModal from './components/VideoModal';
import GoodCreditView from './components/GoodCreditView';
import { LEARN_FEATURES, TESTIMONIALS, EXPECTED_RESULTS } from './data';
import { AppSettings } from './types';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle, FileQuestion, Star, AlertTriangle, ArrowUpRight, Play, ChevronDown } from 'lucide-react';

const FAQS: { q: string; a: string }[] = [
  { q: 'What negative credit markers do you help with?', a: 'We help with early negative marker removals for late payments, defaults, CCJs, and fraud markers.' },
  { q: `What's the difference between the DIY course and the 1-2-1 done-for-you service?`, a: 'The DIY course gives you the exact AI prompts, legal documents, dispute scripts, and escalation strategy to follow yourself. The 1-2-1 done-for-you service is where the writing is done for you and we guide you directly on a 1-2-1 basis.' },
  { q: 'Who is the DIY course for?', a: "The DIY course is for people who want the simplest, lowest-cost option and are happy to use AI with guidance. It's built to help you take action without needing full 1-2-1 done-for-you support." },
  { q: 'Who is the 1-2-1 done-for-you service for?', a: 'The 1-2-1 service is for people who want expert help, don\'t have time, and are serious about moving forward. We do not accept everyone into this service due to high demand — everyone wants done-for-you. For us to know if this service can work for you, you will need to apply first.' },
  { q: 'Do I need at least £1,000 for the 1-2-1 service?', a: 'Yes. You must be able to invest at least £1,000 if you are accepted for our 1-2-1 done-for-you service. If not, the DIY course is the best route for you — and honestly we give away all that we do for our 1-2-1 done-for-you clients.' },
  { q: 'Why do you ask for so much detail in the 1-2-1 application?', a: 'Because proper case assessment needs proper detail. We want to see what happened, what has already been said, and any screenshots, emails, or correspondence that support your case.' },
  { q: 'What happens if my 1-2-1 application is too short or vague?', a: 'Short or vague applications are automatically rejected. We only review serious applications with enough detail for us to assess properly. We ask for paragraphs of detail — the more the better.' },
  { q: 'Do I need to already know how to use AI to use the DIY course?', a: 'No. The DIY course shows you how to use AI properly and gives you the exact prompts and materials to work from. You do not need to be an AI expert before you start.' },
  { q: 'Why might I be directed to the DIY course instead of the 1-2-1 service?', a: "Usually because the DIY course is the better fit for where you are right now. If you are not ready to invest at least £1,000 or not ready to provide full detail, the DIY route will serve you better." },
  { q: `Is the DIY option still strong if I'm not going for 1-2-1?`, a: 'Yes. The DIY course is a serious and effective option for people who are ready to follow the process and use the guidance provided, even if they never apply for the 1-2-1 service.' },
  { q: 'How long does it take to fix my credit or remove a negative marker?', a: 'Every case is different, so no one can guarantee a specific timeframe. Some people see movement within days, others take months, depending on the type of marker, how the lender responds, and how quickly you take action. The sooner you take action to tackle a negative marker, the sooner we will find out — you can only control your side of things.' },
  { q: 'Can you guarantee that my negative credit marker will be removed?', a: 'No. No genuine service can guarantee removal, because lenders and agencies make the final decision. What we do is give you the strongest possible strategy, arguments, and documentation to push for an early removal.' },
  { q: 'Will this work if I have more than one negative marker?', a: 'It can. The principles and strategies can apply across multiple markers, but each case still needs to be assessed on its own merits. In some situations it makes the most sense to focus on the most damaging markers first.' },
  { q: 'What if I\'ve already complained or tried to fix this myself before?', a: "That's fine. Many people come to us after trying on their own. We look at what you have already done, what was said, and where there may still be stronger arguments or escalation routes you have not used yet — most people will have not exhausted ALL options and avenues." },
  { q: 'Is it guaranteed that my marker will be removed?', a: "We cannot absolutely guarantee. Results vary, there is no guarantee of removal, especially if we have not reviewed your case in full. Please note that this isn't financial or legal advice." },
];

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'good-credit'>('landing');
  const [optInModalOpen, setOptInModalOpen] = useState(false);

  // Automatically scroll to top of viewport when changing active view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [playPricingVideo, setPlayPricingVideo] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    clientName: string;
    title: string;
  } | null>(null);

  const [settings, setSettings] = useState<AppSettings>(() => {
    const defaultSettings: AppSettings = {
      googleWebAppUrl: 'https://script.google.com/macros/s/AKfycbyiapwqtU_k0ZJIlnX3-xwByerB5uA3Qlw9JZUk0vbWIOEqoxhBFjtGaAU96xrsNVmO/exec',
      whatsAppNumber: '447424445868',
      customMessage: "Hi Joshua, I've just registered for the free credit training. Here are my details:\n\nName: {NAME}\nEmail: {EMAIL}\n\nI look forward to learning the 5-step framework.",
      freeTrainingUrl: 'https://youtu.be/V-hrJnIMMpU?si=EnPglEEjEyDNY-CF'
    };
    const stored = localStorage.getItem('joshua_credit_campaign_settings');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (!parsed.googleWebAppUrl || parsed.googleWebAppUrl === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL' || parsed.googleWebAppUrl === '') {
          parsed.googleWebAppUrl = defaultSettings.googleWebAppUrl;
        }
        if (!parsed.whatsAppNumber || parsed.whatsAppNumber === '447000000000' || parsed.whatsAppNumber === '') {
          parsed.whatsAppNumber = defaultSettings.whatsAppNumber;
        }
        if (!parsed.freeTrainingUrl) {
          parsed.freeTrainingUrl = defaultSettings.freeTrainingUrl;
        }
        return { ...defaultSettings, ...parsed };
      } catch (e) {
        console.error('Error loading stored settings', e);
      }
    }
    // Fallback default setups
    return defaultSettings;
  });

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem('joshua_credit_campaign_settings', JSON.stringify(newSettings));
  };

  const handleOpenModal = () => {
    setOptInModalOpen(true);
  };

  const handleCloseModal = () => {
    setOptInModalOpen(false);
  };

  const handlePlayVideo = (url: string, clientName: string, title: string) => {
    setActiveVideo({ url, clientName, title });
  };

  return (
    <div className="relative min-h-screen bg-black text-slate-100 antialiased selection:bg-brand selection:text-slate-950 font-sans">
      {/* Dynamic Background Noise/Glow pattern grids */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[50rem] w-full bg-[radial-gradient(100rem_50rem_at_top,rgba(72,192,206,0.12),transparent)] opacity-80" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Sticky Glass Navigation header */}
      <Header
        currentView={currentView}
        onSetView={setCurrentView}
        onOpenModal={handleOpenModal}
      />

      {currentView === "landing" ? (
        <>
          {/* Hero Section with Integrated Squeeze Form */}
          <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-black border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 sm:px-8">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
                {/* Hero Left Content Column */}
                <div className="lg:col-span-7 text-center lg:text-left space-y-6">
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                    <div className="inline-flex items-center gap-2 bg-cyan-950/60 text-brand px-3 py-1 ring-1 ring-brand/35 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      <Sparkles className="h-3 w-3 animate-pulse text-brand" />
                      <span>Free Credit Framework 2026</span>
                    </div>
                    <button
                      onClick={() => setCurrentView("good-credit")}
                      className="inline-flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 px-3 py-1 border border-amber-500/30 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer animate-pulse"
                    >
                      <Sparkles className="h-3 w-3 text-amber-400 group-hover:text-amber-950" />
                      <span>I Have Good Credit →</span>
                    </button>
                  </div>

                  <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.15] mb-6 font-display">
                    Got a{" "}
                    <span className="text-brand font-extrabold">Default</span>,{" "}
                    <span className="text-brand font-extrabold">CCJ</span>,{" "}
                    <span className="text-brand font-extrabold">
                      Late Payment
                    </span>{" "}
                    or{" "}
                    <span className="text-brand font-extrabold">
                      CIFAS Marker
                    </span>{" "}
                    Dragging Your Credit Down?
                  </h1>

                  {/* Interactive YouTube Shorts video player below headliner */}
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="relative aspect-video w-full mx-auto overflow-hidden rounded-2xl border border-brand/35 bg-slate-900 shadow-2xl group cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:border-brand">
                      {playPricingVideo ? (
                        <iframe
                          src="https://www.youtube.com/embed/ZyKeoA0ko_U?autoplay=1&rel=0&modestbranding=1"
                          title="Which option is right for you?"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <div
                          className="absolute inset-0 w-full h-full"
                          onClick={() => setPlayPricingVideo(true)}
                        >
                          {/* Video Thumbnail placeholder from live asset */}
                          <img
                            src="https://img.youtube.com/vi/ZyKeoA0ko_U/0.jpg"
                            alt="Learn which option is best for your situation"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />

                          {/* Dark sleek gradient layer */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                          {/* Glowing Play mechanism */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-slate-950 group-hover:scale-110 shadow-lg shadow-brand/20 transition-all duration-200">
                              <Play className="h-5 w-5 fill-current ml-0.5" />
                            </div>

                            <span className="mt-3.5 px-3 py-1 rounded-full bg-slate-950/85 border border-white/10 text-[9px] font-bold uppercase tracking-wider text-brand">
                              Quick Guide Video
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hero Right Squeeze Lead Form card */}
                <div id="hero-form" className="lg:col-span-5 w-full scroll-mt-30 lg:scroll-mt-30">
                  <div className="relative mx-auto max-w-md">
                    <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-brand to-cyan-500 blur-xl opacity-35 -z-10 animate-pulse" />

                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 shadow-2xl">
                      {/* Card indicator */}
                      <div className="text-center space-y-1 mb-6">
                        <h2 className="text-xl font-bold text-white mb-2">
                          100% FREE CONSULTATION
                        </h2>
                        <p className="text-slate-400 text-xs">
                          ONLY 10 SLOTS AVAILABLE WEEKLY
                        </p>
                      </div>

                      {/* Built-in Core Squeeze OptIn form mapping details */}
                      <div>
                        <OptInForm
                          settings={settings}
                          buttonLabel="Access Masterclass Now"
                          sourceLocation="Hero Masterclass Card"
                        />
                      </div>
                      <p className="text-[9px] text-slate-400 text-center mt-4 uppercase tracking-wider font-semibold">
                        Please only complete if you are serious about fixing
                        your credit
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* THE GAME CHANGER SECTION */}
          <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
            {/* Glow accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(72,192,206,0.15),transparent)] pointer-events-none" />
            <div className="mx-auto max-w-5xl px-6 sm:px-8 relative z-10">
              <div className="text-center md:text-left grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 space-y-3">
                  <span className="text-[10px] font-bold text-brand tracking-widest uppercase bg-cyan-950/60 border border-brand/35 px-3 py-1 rounded">
                    THE GAME CHANGER
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display leading-tight">
                    AI Changed What's Possible Here
                  </h2>
                </div>

                <div className="md:col-span-7 space-y-4 text-sm text-cyan-100/90 leading-relaxed md:border-l md:border-white/10 md:pl-8">
                  <span className="inline-block text-brand font-bold">
                    If you know how to use it properly.
                  </span>
                  <p>
                    Not generic prompts. Not "write me a dispute letter"
                    copy-paste nonsense.
                  </p>
                  <p>
                    We've built the exact system -{" "}
                    <strong className="text-white font-bold">
                      the prompts, the legal documents, the escalation sequence
                    </strong>{" "}
                    - that gets results, whether it's a late payment, a default,
                    a CCJ, or a fraud marker.
                  </p>
                  <p>
                    We use this system ourselves with our 1-2-1 done-for-you
                    clients.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* What You'll Learn / WHY US Grid section */}
          <section
            id="what-you-will-learn"
            className="py-24 sm:py-32 scroll-mt-12 bg-black border-b border-white/10"
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-8">
              {/* Headline layout */}
              <div className="mx-auto max-w-3xl text-center space-y-4">
                <span className="text-[10px] font-bold text-brand tracking-widest uppercase bg-cyan-950/60 border border-brand/35 px-2.5 py-1 rounded">
                  WHY US
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-display">
                  We've Helped 100s of People Remove Negative Markers Early
                </h2>
                <p className="text-sm font-semibold text-brand leading-relaxed max-w-2xl mx-auto">
                  Not by waiting six years, but by disputing properly, with the
                  right legal grounding and the right escalation path.
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  Whatever your marker - missed payment, default, CCJ, or fraud
                  - there's a strategy for it. We've built it. We use it daily.
                </p>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  We've helped people remove negative markers early - using AI
                  tools most people don't even know exists yet.
                </p>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  Most people think a negative marker is just something you wait
                  out.{" "}
                  <strong className="text-white font-bold">
                    Six years. Limited control. Limited options.
                  </strong>{" "}
                  That's what the banks want you to believe.
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  The truth is - disputes get won every day, and most people are
                  doing it wrong. Weak letters. Generic templates. No legal
                  grounding. No escalation strategy. That's why they get
                  rejected - and give up.
                </p>

                {/* +1,200 Professionals Trained Badge in Theme style */}
                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-800" />
                    <div className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-700" />
                    <div className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-600" />
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    <span className="text-white font-bold">
                      +1,200 Professionals
                    </span>{" "}
                    trained this month
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* Success Stories video mockup category section */}
          <section
            id="success-stories"
            className="bg-black py-24 sm:py-32 border-b border-white/10 scroll-mt-12"
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-8">
              {/* Header block info */}
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Real Client Success Stories
                </h2>
                <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
                  Don't just take our word for it. Review real clients share
                  their experiences and structural improvements after
                  implementing our framework.
                </p>
              </div>

              {/* Interactive grid container */}
              <div className="mx-auto mt-16 max-w-6xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {TESTIMONIALS.map((test) => (
                  <TestimonialCard
                    key={test.id}
                    testimonial={test}
                    onClick={handleOpenModal}
                    onPlayVideo={handlePlayVideo}
                  />
                ))}
              </div>

              {/* Outcomes highlights summary box */}
              <div className="mx-auto mt-20 max-w-5xl rounded-2xl border border-white/10 bg-slate-900/60 p-8 sm:p-12 shadow-lg shadow-brand-glow/5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-4 space-y-3">
                    <span className="text-[10px] font-bold text-brand tracking-widest uppercase bg-cyan-950/60 border border-brand/35 px-2.5 py-1 rounded">
                      Expected Guidelines
                    </span>
                    <h3 className="text-xl font-extrabold text-white sm:text-2xl tracking-tight leading-snug">
                      Results May Include:
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Individual circumstances differ. However, clients who
                      consistently follow the structured modules typically
                      observe the following outcomes.
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {EXPECTED_RESULTS.map((item, index) => (
                        <div
                          key={index}
                          className="bg-slate-950 border border-white/10 hover:border-brand/40 p-4 rounded-xl flex items-start gap-3 transition-all duration-300 shadow-sm relative overflow-hidden group"
                        >
                          <div className="absolute top-0 left-0 w-[3px] h-full bg-[#48C0CE]" />
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-950/60 text-brand text-[10px] font-bold mt-0.5">
                            ✓
                          </span>
                          <span className="text-xs font-semibold text-slate-200 leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>{" "}
          {/* Next Steps: Pricing/Offers cards detailed category */}
          <section
            id="next-steps"
            className="py-24 sm:py-32 relative overflow-hidden scroll-mt-12 bg-black border-b border-white/10 text-white"
          >
            {/* Ambient light glow in the background to add premium style */}
            <div className="absolute inset-x-0 top-0 -z-0 h-96 w-full bg-[radial-gradient(ellipse_at_top,rgba(72,192,206,0.15),transparent)] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
              <div className="text-center space-y-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl font-display">
                  WHICH ONE IS RIGHT FOR YOU?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left pt-2">
                  <div className="bg-slate-900/40 p-5 rounded-xl border border-white/5 space-y-2 hover:bg-slate-900/60 transition-colors">
                    <h4 className="text-sm font-black uppercase text-brand tracking-widest">
                      Choose DIY if:
                    </h4>
                    <p className="text-xs sm:text-sm text-white leading-relaxed">
                      You want the exact system at a lower entry point and
                      you're happy to action it yourself with AI doing the
                      legwork.
                    </p>
                  </div>
                  <div className="bg-cyan-950/30 p-5 rounded-xl border border-brand/20 space-y-2 hover:bg-cyan-950/45 transition-colors">
                    <h4 className="text-sm font-black uppercase text-brand tracking-widest">
                      Choose 1-2-1 Done-For-You if:
                    </h4>
                    <p className="text-xs sm:text-sm text-white leading-relaxed">
                      Your time is better spent elsewhere, you want it handled
                      end-to-end, and you're ready to give us the full detail we
                      need to fight your case properly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 items-stretch">
                {/* Package Option A: DIY course */}
                <div className="flex flex-col justify-between rounded-2xl border-2 border-white/20 bg-slate-900/60 p-6 sm:p-8 shadow-2xl hover:border-white/50 hover:scale-[1.01] transition duration-300">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h1 className="text-lg sm:text-xl font-black tracking-wider text-brand uppercase font-display select-none">
                        OPTION 1: THE DIY COURSE
                      </h1>
                    </div>

                    <div>
                      <h2 className="text-xl font-black text-white tracking-tight font-display">
                        Do it yourself - with the exact system we use.
                      </h2>
                      <p className="mt-3 text-xs leading-relaxed text-white font-sans">
                        This isn't a generic "how credit works" course. This is
                        the precise method we use for our 1-2-1 done-for-you
                        clients, handed straight to you.
                      </p>
                    </div>

                    {/* Scope items */}
                    <div className="border-t border-white/10 pt-6">
                      <h4 className="text-[10px] font-bold tracking-wider text-brand uppercase">
                        Inside, you get:
                      </h4>
                      <ul className="mt-4 space-y-3.5 text-xs text-white/90">
                        <li className="flex items-start gap-2.5">
                          <span className="text-brand font-bold shrink-0">
                            ✓
                          </span>
                          <span>
                            The exact AI prompts we use to build perfected
                            dispute scripts for 1-2-1 clients
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="text-brand font-bold shrink-0">
                            ✓
                          </span>
                          <span>
                            The legal documents to feed the AI - so it generates
                            properly grounded, perfected dispute scripts
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="text-brand font-bold shrink-0">
                            ✓
                          </span>
                          <span>
                            The specific escalation strategy for your exact
                            marker type - late payment, default, CCJ, or fraud
                            marker
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* Included extra bonus highlights card */}
                    <div className="rounded-xl bg-cyan-950/20 border border-cyan-900/50 p-4 space-y-2">
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Watch the first lesson - twice if you need to. Then get
                        to work with AI doing the heavy lifting alongside you.
                      </p>
                      <p className="text-[11px] text-brand font-semibold leading-relaxed">
                        Best for:{" "}
                        <span className="text-white font-normal">
                          people who want the system, are happy to put in the
                          work, and want it at a fraction of the 1-2-1 price.
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10">
                    <a
                      href="https://brand.kilolu.co.uk/payment-link/68e3de2fc3d7dfdf7d267439"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center rounded-lg bg-brand hover:bg-white text-slate-950 px-6 py-4 text-xs font-bold leading-none tracking-widest uppercase transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      GET THE DIY COURSE
                    </a>
                  </div>
                </div>

                {/* Package Option B: Fully managed support */}
                <div className="flex flex-col justify-between rounded-2xl border-2 border-brand bg-slate-900/90 p-6 sm:p-8 shadow-2xl relative hover:border-brand hover:scale-[1.01] transition duration-300 ring-4 ring-brand/10">
                  <div className="absolute -top-4 right-6 rounded-full bg-slate-950 border border-brand/35 px-4 py-1.5 text-[9px] font-extrabold text-brand uppercase tracking-wider shadow-md">
                    Application Only
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h1 className="text-lg sm:text-xl font-black tracking-wider text-brand uppercase font-display select-none">
                        OPTION 2: THE 1-2-1 DONE-FOR-YOU SERVICE
                      </h1>
                    </div>

                    <div>
                      <h2 className="text-xl font-black text-white tracking-tight font-display">
                        We write for you. You just bring the details.
                      </h2>
                      <p className="mt-3 text-xs leading-relaxed text-brand font-semibold font-display">
                        This is our most popular service - and our most
                        exclusive.
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-slate-300 font-sans">
                        We draft the perfected scripts. We run the strategy. You
                        get guided 1-2-1, with none of the time spent watching
                        training videos and writing it yourself.
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <h4 className="text-[10px] font-bold tracking-wider text-slate-200 uppercase">
                        This isn't for everyone - and that's by design.
                      </h4>
                      <p className="mt-2 text-xs text-slate-300 leading-relaxed font-sans">
                        We only take on people who are serious. Here's what that
                        means:{" "}
                        <strong className="text-white">
                          You have to apply.
                        </strong>{" "}
                        Not fill in three lines and hope. We need the full
                        picture - what, why, who, when, everything. We want
                        paragraphs of detail.
                      </p>
                      <p className="mt-2 text-xs text-amber-100/95 leading-relaxed bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg font-sans">
                        If you submit two or three lines, it's an automatic
                        rejection - because we can't build a winning case from
                        barely much, and we're not here to waste your time or
                        ours.
                      </p>
                    </div>

                    {/* Included list items */}
                    <div className="border-t border-white/10 pt-6">
                      <h4 className="text-[10px] font-bold tracking-wider text-brand uppercase">
                        This service is for people who:
                      </h4>
                      <ul className="mt-4 space-y-3.5 text-xs text-white/90">
                        <li className="flex items-start gap-2.5">
                          <span className="text-brand font-bold shrink-0 font-sans">
                            ✓
                          </span>
                          <span>Can afford it</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="text-brand font-bold shrink-0 font-sans">
                            ✓
                          </span>
                          <span>Are serious about getting this resolved</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="text-brand font-bold shrink-0 font-sans">
                            ✓
                          </span>
                          <span>Want it handled, not taught</span>
                        </li>
                      </ul>
                      <p className="mt-4 text-xs font-semibold text-brand italic">
                        If that's you, apply below.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 space-y-3">
                    {/* Late Payment - SOLD OUT */}
                    <div className="relative">
                      <button
                        disabled
                        className="w-full text-center rounded-lg bg-slate-800 border border-white/10 text-slate-500 px-4 py-3 text-[11px] font-bold leading-none tracking-widest uppercase transition-all cursor-not-allowed opacity-60"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span>LATE PAYMENT FORM</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-[9px] font-black">100% SOLD OUT</span>
                        </span>
                      </button>
                    </div>

                    {/* Default Form - 5 spaces left */}
                    <a
                      href="https://forms.gle/sYk17KQb2PwMa2SD7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center rounded-lg bg-brand hover:bg-white text-slate-950 px-4 py-3 text-[11px] font-bold leading-none tracking-widest uppercase transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>DEFAULT FORM</span>
                        <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-[9px] font-black">5 SPACES LEFT</span>
                      </span>
                    </a>

                    {/* CCJ Form - 5 spaces left */}
                    <a
                      href="https://forms.gle/a2zmDMCtuqrLjQer5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center rounded-lg bg-brand hover:bg-white text-slate-950 px-4 py-3 text-[11px] font-bold leading-none tracking-widest uppercase transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>CCJ FORM</span>
                        <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-[9px] font-black">5 SPACES LEFT</span>
                      </span>
                    </a>

                    {/* CIFAS Marker Form - 8 spaces left */}
                    <a
                      href="https://forms.gle/yKmiSFQTuhhimwfr6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center rounded-lg bg-brand hover:bg-white text-slate-950 px-4 py-3 text-[11px] font-bold leading-none tracking-widest uppercase transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>CIFAS MARKER FORM</span>
                        <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-[9px] font-black">8 SPACES LEFT</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Instant WhatsApp Support direct banner panel */}
          <section className="bg-gradient-to-b from-black via-slate-950/40 to-black py-20 border-y border-white/10">
            <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center space-y-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-cyan-950/60 text-brand border border-brand/35 shadow-md">
                <MessageCircle className="h-6 w-6 text-brand fill-current" />
              </div>

              <h2 className="text-2xl font-bold text-white tracking-tight">
                Need Answers Fast?
              </h2>

              <p className="mx-auto max-w-lg text-xs sm:text-sm text-slate-400 leading-relaxed">
                Have urgent questions or specific concerns about your unique
                situation? Message Joshua directly to clear doubts instantly.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 border border-white/15 hover:border-brand hover:bg-slate-800 text-white px-6 py-3.5 text-[11px] font-bold tracking-widest uppercase transition-all shadow-md cursor-pointer animate-pulse"
                >
                  <span>CONTACT US </span>
                  <ArrowUpRight className="h-4 w-4 text-brand" />
                </button>
              </div>
            </div>
          </section>
          {/* FAQ Accordion Section */}
          <section className="py-20 border-t border-white/5 bg-gradient-to-b from-black via-slate-950/40 to-black ">
            <div className="mx-auto max-w-3xl px-6 sm:px-8">
              <div className="text-center space-y-2 mb-12">
                <div className="inline-flex items-center gap-2 bg-brand-muted text-brand px-3 py-1 ring-1 ring-brand/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  <FileQuestion className="h-3 w-3" />
                  <span>FAQs</span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight mt-3">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-slate-500">
                  Everything you need to know before getting started.
                </p>
              </div>

              <div className="space-y-2">
                {FAQS.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className={`rounded-xl border transition-colors duration-200 ${
                        isOpen
                          ? "border-brand/30 bg-brand-muted/30"
                          : "border-white/5 bg-slate-900/60"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                      >
                        <span
                          className={`text-xs font-semibold leading-snug transition-colors duration-150 ${
                            isOpen ? "text-brand" : "text-slate-200"
                          }`}
                        >
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-brand" : "text-slate-500"
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5">
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          {/* Bottom Final conversion CTA block */}
          <section className="relative overflow-hidden py-24 sm:py-32 border-t border-white/10 bg-black">
            <div className="absolute inset-x-0 top-0 -z-10 h-full w-full bg-[radial-gradient(60rem_40rem_at_center,rgba(72,192,206,0.12),transparent)] opacity-85" />

            <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center space-y-6">
              <span className="text-[10px] font-bold text-brand tracking-widest uppercase bg-cyan-950/60 border border-brand/35 px-2.5 py-1 rounded">
                FINAL CTA
              </span>

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-display">
                Start Your Journey Here
              </h2>

              <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-medium">
                If you're tired of poor credit holding you back, and you're
                ready to actually do something about it instead of waiting it
                out - this is where you start.
              </p>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleOpenModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white border border-white/10 px-8 py-4 text-xs font-bold leading-none tracking-widest uppercase transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>GET THE DIY COURSE</span>
                  <ArrowRight className="h-4 w-4 text-brand" />
                </button>
                <button
                  onClick={handleOpenModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-brand hover:bg-brand-hover text-slate-950 px-8 py-4 text-xs font-bold leading-none tracking-widest uppercase transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>APPLY FOR 1-2-1 DONE-FOR-YOU</span>
                  <Sparkles className="h-4 w-4 text-slate-950" />
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <GoodCreditView onSetView={setCurrentView} />
      )}

      {/* Form Dialog Modal */}
      <Modal
        isOpen={optInModalOpen}
        onClose={handleCloseModal}
        settings={settings}
      />

      {/* Video Modal Player popup */}
      <VideoModal
        isOpen={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.url || ""}
        clientName={activeVideo?.clientName || ""}
        title={activeVideo?.title || ""}
      />

      {/* Squeeze Campaign config slides */}
      <SettingsPanel settings={settings} onSave={handleUpdateSettings} />

      {/* Main Footer parameters content */}
      <footer className="border-t border-white/10 bg-[#02050b] py-12 text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center">
              <KiloluLogo
                size="custom"
                width={72}
                height={72}
                className="text-white"
              />
            </div>

            <p className="text-center md:text-left text-[10px] text-slate-500 max-w-md leading-relaxed">
              Important Disclaimer: Fixed credit outcomes depend on specific
              client history. We provide education, strategies, and audits but
              cannot guarantee outcomes with third-party companies.
            </p>
          </div>

          <div className="mt-8 border-t border-white/5 pt-8 text-center text-[10px] text-slate-500">
            <p>&copy; 2026 KILOLU. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
