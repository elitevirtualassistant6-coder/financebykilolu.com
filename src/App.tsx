import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import OptInForm from './components/OptInForm';
import LearnFeatureCard from './components/LearnFeatureCard';
import TestimonialCard from './components/TestimonialCard';
import Modal from './components/Modal';
import SettingsPanel from './components/SettingsPanel';
import KiloluLogo from './components/KiloluLogo';
import VideoModal from './components/VideoModal';
import { LEARN_FEATURES, TESTIMONIALS, EXPECTED_RESULTS } from './data';
import { AppSettings } from './types';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle, FileQuestion, Star, AlertTriangle, ArrowUpRight, ChevronDown } from 'lucide-react';

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
];

export default function App() {
  const [optInModalOpen, setOptInModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    clientName: string;
    title: string;
  } | null>(null);

  const [settings, setSettings] = useState<AppSettings>(() => {
    const defaultSettings: AppSettings = {
      googleWebAppUrl: 'https://script.google.com/macros/s/AKfycbwqsp-IKfeA43t1VCTVDKbxVk92rwFw-L_JXebDCvKmw9tFsz9zP6nFI7uapf9asx4H/exec',
      whatsAppNumber: '447424445868',
      customMessage: "Hi Joshua, I've just registered for the free credit training. Here are my details:\n\nName: {NAME}\nEmail: {EMAIL}\n\nI look forward to learning the 5-step framework.",
      freeTrainingUrl: 'https://youtube.com/shorts/7JLKIPsRREQ'
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
    <div className="relative min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-brand selection:text-slate-950 font-sans">
      
      {/* Dynamic Background Noise/Glow pattern grids */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[50rem] w-full bg-[radial-gradient(100rem_50rem_at_top,theme(colors.slate.900),transparent)] opacity-80" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Sticky Glass Navigation header */}
      <Header onOpenModal={handleOpenModal} />

      {/* Hero Section with Integrated Squeeze Form */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
            
            {/* Hero Left Content Column */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand-muted text-brand px-3 py-1 ring-1 ring-brand/20 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit">
                <Sparkles className="h-3 w-3 animate-pulse text-brand" />
                <span>Free Credit Framework 2026</span>
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
                Fix Your Credit.<br />
                <span className="text-brand">Access Funding.</span><br />
                Build Freedom.
              </h1>
              
              <p className="text-base sm:text-lg font-medium text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                The exact 5-step framework used to challenge defaults, CCJs, and CIFAS markers, allowing you to unlock over £100,000 in funding potential.
              </p>
              
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Whether you're dealing with a CCJ, Default, Late Payment, or CIFAS Marker, or looking to access funding for business or personal growth, this free training outlines the strategic steps to help you move forward.
              </p>

              {/* +1,200 Professionals Trained Badge in Theme style */}
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-slate-950 bg-slate-800" />
                  <div className="h-8 w-8 rounded-full border-2 border-slate-950 bg-slate-700" />
                  <div className="h-8 w-8 rounded-full border-2 border-slate-950 bg-slate-600" />
                </div>
                <p className="text-xs text-slate-300 font-medium">
                  <span className="text-white font-bold">+1,200 Professionals</span> trained this month
                </p>
              </div>

              {/* Dynamic Feature Badges */}
              <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-y-2 gap-x-4 text-[10px] font-bold text-slate-450 uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  Self-Paced Training
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  No-Reload Sync
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  WhatsApp Redirect
                </span>
              </div>
            </div>

            {/* Hero Right Squeeze Lead Form card */}
            <div className="lg:col-span-5 w-full">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-brand to-brand-dark blur-xl opacity-35 -z-10 animate-pulse" />
                
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8 shadow-2xl">
                  {/* Card indicator */}
                  <div className="text-center space-y-1 mb-6">
                    <h2 className="text-xl font-bold text-white mb-2">Watch the Training</h2>
                    <p className="text-slate-450 text-xs">Instant access to the 5-step masterclass</p>
                  </div>

                  {/* Built-in Core Squeeze OptIn form mapping details */}
                  <div>
                    <OptInForm 
                      settings={settings} 
                      buttonLabel="Access Masterclass Now" 
                      sourceLocation="Hero Masterclass Card"
                    />
                  </div>
                  <p className="text-[9px] text-slate-500 text-center mt-4 uppercase tracking-wider font-semibold">
                    Redirects directly to private WhatsApp training session
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4-Step Process Bar Panel from modern framework layout */}
      <section className="py-8 px-6 sm:px-8 bg-slate-950 border-b border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 hover:border-white/10 transition-colors">
              <div className="h-8 w-8 rounded bg-brand-muted text-brand flex items-center justify-center font-bold text-xs">01</div>
              <div>
                <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">Identify</h4>
                <p className="text-[10px] text-slate-400">Detailed Report Audit</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 hover:border-white/10 transition-colors">
              <div className="h-8 w-8 rounded bg-brand-muted text-brand flex items-center justify-center font-bold text-xs">02</div>
              <div>
                <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">Challenge</h4>
                <p className="text-[10px] text-slate-400">AI-Driven Disputes</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 hover:border-white/10 transition-colors">
              <div className="h-8 w-8 rounded bg-brand-muted text-brand flex items-center justify-center font-bold text-xs">03</div>
              <div>
                <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">Structure</h4>
                <p className="text-[10px] text-slate-400">Lender Architecture</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 hover:border-white/10 transition-colors">
              <div className="h-8 w-8 rounded bg-brand-muted text-brand flex items-center justify-center font-bold text-xs">04</div>
              <div>
                <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">Funding</h4>
                <p className="text-[10px] text-slate-400">Tier 1 Capital Access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust markers category ticker banner */}
      <section className="py-6 bg-slate-900/50 border-b border-white/5 flex flex-col md:flex-row items-center justify-center gap-4 px-6 sm:px-8">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest shrink-0">Negative Markers Addressed:</span>
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 uppercase tracking-widest text-[10px] font-bold text-slate-350">
          <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>CCJ REMOVAL</span>
          <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>DEFAULT REMOVAL</span>
          <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>CIFAS CHALLENGES</span>
          <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>SCORE ENHANCEMENT</span>
          <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>LATE PAYMENTS</span>
        </div>
      </section>

      {/* What You'll Learn Grid section */}
      <section id="what-you-will-learn" className="py-24 sm:py-32 scroll-mt-12 bg-slate-950/20 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          
          {/* Headline layout */}
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              What You'll Learn
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
              In this free training, Joshua reveals the exact 5-step framework that helped him go from poor credit to accessing over £100,000 in personal and business funding.
            </p>
          </div>

          {/* Grid distribution */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {LEARN_FEATURES.map((feat) => (
                <LearnFeatureCard key={feat.id} feature={feat} />
              ))}
            </div>
          </div>

          {/* Squeeze trigger highlight button */}
          <div className="mt-16 text-center">
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center gap-2 rounded-lg bg-brand hover:bg-brand-hover text-slate-950 px-8 py-4 text-xs font-bold leading-none tracking-widest uppercase transition-all shadow-xl shadow-brand-glow active:scale-95 cursor-pointer"
            >
              <span>ACCESS THE 5-STEP TRAINING NOW</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>


      {/* Success Stories video mockup category section */}
      <section id="success-stories" className="bg-slate-950/60 py-24 sm:py-32 border-b border-white/5 scroll-mt-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          
          {/* Header block info */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Real Client Success Stories
            </h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
              Don't just take our word for it. Review real clients share their experiences and structural improvements after implementing our framework.
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
          <div className="mx-auto mt-20 max-w-5xl rounded-2xl border border-white/10 bg-slate-900 p-8 sm:p-12 shadow-lg shadow-brand-glow/5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 space-y-3">
                <span className="text-[10px] font-bold text-brand tracking-widest uppercase bg-brand-muted px-2.5 py-1 rounded">
                  Expected Guidelines
                </span>
                <h3 className="text-xl font-extrabold text-white sm:text-2xl tracking-tight leading-snug">
                  Results May Include:
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Individual circumstances differ. However, clients who consistently follow the structured modules typically observe the following outcomes.
                </p>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {EXPECTED_RESULTS.map((item, index) => (
                    <div key={index} className="bg-slate-950 border border-white/10 hover:border-brand/40 hover:shadow-md p-4 rounded-xl flex items-start gap-3 transition-all duration-300 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-[3px] h-full bg-[#48C0CE]" />
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-muted text-brand-dark text-[10px] font-bold mt-0.5">
                        ✓
                      </span>
                      <span className="text-xs font-semibold text-slate-300 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Next Steps: Pricing/Offers cards detailed category */}
      <section id="next-steps" className="py-24 sm:py-32 relative overflow-hidden scroll-mt-12 bg-slate-950 border-b border-white/5">
        {/* Ambient light glow in the background to add premium style */}

        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-display">
              Work With Joshua
            </h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
              Select the option that matches your timing, budget, and preference for involvement.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 items-stretch">
            
            {/* Package Option A: DIY course */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/20 bg-slate-950/85 backdrop-blur-md p-6 sm:p-8 shadow-2xl hover:border-white/40 hover:scale-[1.01] transition duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-cyan-950/60 border border-brand/35 px-3.5 py-1 text-[11px] font-bold text-brand uppercase tracking-wider">
                    Self-Paced Learning
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    DIY Credit Repair Course
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-cyan-100/90">
                    Learn the exact AI-powered process we use to help clients create professional dispute letters and improve their credit profiles.
                  </p>
                </div>

                {/* Scope items */}
                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-[10px] font-bold tracking-wider text-cyan-200/80 uppercase">
                    What's Included
                  </h4>
                  <ul className="mt-4 space-y-3.5 text-xs text-white/90">
                    <li className="flex items-start gap-2.5">
                      <span className="text-brand font-bold">✓</span>
                      <span>90-Minute AI Credit Repair Masterclass</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-brand font-bold">✓</span>
                      <span>Proven AI Prompts for Dispute Drafting</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-brand font-bold">✓</span>
                      <span>Tested Dispute Letter Templates</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-brand font-bold">✓</span>
                      <span>Strategic Escalation Frameworks</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-brand font-bold">✓</span>
                      <span>Official Documentation Guidance</span>
                    </li>
                  </ul>
                </div>

                {/* Included extra bonus highlights card */}
                <div className="rounded-xl bg-cyan-950/60 border border-cyan-800/40 p-4 space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-extrabold text-brand uppercase tracking-widest bg-cyan-900/60 px-1.5 py-0.5 rounded">
                      Bonus
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-white mt-1">
                    The Science of Excellent Credit
                  </h5>
                  <p className="text-[11px] text-cyan-100/90 leading-relaxed mt-1">
                    A structured breakdown detailing how premier credit ratings are designed, scored, and preserved over long periods.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <button
                  onClick={handleOpenModal}
                  className="block w-full text-center rounded-lg bg-brand hover:bg-white text-slate-950 px-6 py-4 text-xs font-bold leading-none tracking-widest uppercase transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  ENROLL IN THE DIY COURSE
                </button>
              </div>
            </div>

            {/* Package Option B: Fully managed support */}
            <div className="flex flex-col justify-between rounded-2xl border-2 border-brand/80 bg-slate-900/95 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative hover:border-brand hover:scale-[1.01] transition duration-300 ring-4 ring-brand/10">
              <div className="absolute -top-4 right-6 rounded-full bg-slate-950 border border-brand/35 px-4 py-1.5 text-[9px] font-extrabold text-brand uppercase tracking-wider shadow-md">
                Application Only
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-cyan-950/60 border border-brand/35 px-3.5 py-1 text-[11px] font-bold text-brand uppercase tracking-wider">
                    Fully Managed Service
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    1-2-1 Done-For-You Service
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-cyan-100/90">
                    Prefer expert hand-guided support? We'll conduct a detailed review of your situation and guide you through the process on a personalized basis.
                  </p>
                </div>

                {/* Included list items */}
                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-[10px] font-bold tracking-wider text-cyan-200/80 uppercase">
                    What's Included
                  </h4>
                  <ul className="mt-4 space-y-3.5 text-xs text-white/90">
                    <li className="flex items-start gap-2.5">
                      <span className="text-brand font-bold">✓</span>
                      <span>Detailed Personal Circumstance Audit</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-brand font-bold">✓</span>
                      <span>Bespoke Action Plan Construction</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-brand font-bold">✓</span>
                      <span>Direct Communication with our Expert Team</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-brand font-bold">✓</span>
                      <span>Comprehensive Audit of Reference Agencies</span>
                    </li>
                  </ul>
                </div>

                {/* Warnings warning alert container inside pricing */}
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4">
                  <div className="flex gap-2.5 items-start">
                    <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                        Please Note
                      </span>
                      <p className="text-[11px] text-amber-100/90 leading-relaxed mt-1">
                        Due to high demand, availability is extremely limited. Detailed applications detailing personal circumstances are required; thin profiles will not be accepted.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <button
                  onClick={handleOpenModal}
                  className="block w-full text-center rounded-lg bg-brand hover:bg-white px-6 py-4 text-xs font-bold leading-none tracking-widest text-slate-950 transition shadow-lg shadow-brand-glow cursor-pointer"
                >
                  APPLY FOR 1-2-1 SUPPORT
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Instant WhatsApp Support direct banner panel */}
      <section className="bg-slate-900/40 py-20 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center space-y-6">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-brand-muted text-brand border border-white/5 shadow-md">
            <MessageCircle className="h-6 w-6 text-brand fill-current" />
          </div>
          
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Need Answers Fast?
          </h2>
          
          <p className="mx-auto max-w-lg text-xs sm:text-sm text-slate-400 leading-relaxed">
            Have urgent questions or specific concerns about your file? Message Joshua directly on WhatsApp to clear doubts instantly.
          </p>
          
          <div className="pt-2">
            <a
              href={`https://wa.me/${settings.whatsAppNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-850 hover:text-brand border border-white/10 px-6 py-3.5 text-[11px] font-bold tracking-widest uppercase transition-all shadow-lg"
            >
              <span>MESSAGE JOSHUA ON WHATSAPP</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 border-t border-white/5 bg-slate-950">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="text-center space-y-2 mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-muted text-brand px-3 py-1 ring-1 ring-brand/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <FileQuestion className="h-3 w-3" />
              <span>FAQs</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-3">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500">Everything you need to know before getting started.</p>
          </div>

          <div className="space-y-2">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl border transition-colors duration-200 ${
                    isOpen ? 'border-brand/30 bg-brand-muted/30' : 'border-white/5 bg-slate-900/60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  >
                    <span className={`text-xs font-semibold leading-snug transition-colors duration-150 ${
                      isOpen ? 'text-brand' : 'text-slate-200'
                    }`}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand' : 'text-slate-500'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5">
                      <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Final conversion Masterclass block */}
           <section className="relative overflow-hidden py-24 sm:py-32 border-t border-white/5 bg-slate-950">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(40rem_40rem_at_center,theme(colors.slate.900),theme(colors.slate.950))] opacity-80" />
        
        <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Start With The Free Training
          </h2>
          
          <p className="mx-auto max-w-lg text-xs sm:text-sm text-slate-400 leading-relaxed">
            The first step is understanding the framework. Watch the free training today and discover how to position yourself for better financial opportunities.
          </p>

          <div className="pt-4 flex flex-col items-center justify-center gap-4">
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              👇 Ready to Get Started?
            </span>
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center gap-2 rounded-lg bg-brand hover:bg-brand-hover text-slate-950 px-10 py-5 text-xs font-bold tracking-widest leading-none uppercase transition-all shadow-2xl shadow-brand-glow active:scale-95 cursor-pointer"
            >
              <span>WATCH THE FREE TRAINING</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </section>

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
        videoUrl={activeVideo?.url || ''}
        clientName={activeVideo?.clientName || ''}
        title={activeVideo?.title || ''}
      />

      {/* Squeeze Campaign config slides */}
      <SettingsPanel 
        settings={settings} 
        onSave={handleUpdateSettings} 
      />

      {/* Main Footer parameters content */}
           <footer className="border-t border-white/5 bg-slate-950 py-12 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Logo */}
            <div className="flex items-center">
              <KiloluLogo size="custom" width={42} height={42} className="text-brand" />
            </div>
            
            <p className="text-center md:text-right text-[10px] text-slate-500 max-w-md leading-relaxed">
              Disclaimer: Credit repair outcomes depend on specific client history. We provide education, strategies, and audits but cannot guarantee outcomes with third-party reference agencies.
            </p>
          </div>

          <div className="mt-8 border-t border-white/5 pt-8 text-center text-[10px] text-slate-600">
            <p>&copy; 2026 Joshua Credit Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
