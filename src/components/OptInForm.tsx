import React, { useState, useRef } from 'react';
import { AppSettings } from '../types';
import { ArrowRight, ArrowLeft, Loader2, Mail, User, Phone, CheckCircle2, ExternalLink, BookOpen } from 'lucide-react';

interface OptInFormProps {
  settings: AppSettings;
  buttonLabel?: string;
  sourceLocation: string; // e.g. "Hero Form" or "Modal"
}

const DIY_COURSE_URL = 'https://brand.kilolu.co.uk/payment-link/68e3de2fc3d7dfdf7d267439';

const MARKER_FORM_LINKS = {
  latePayment: '#', // 100% SOLD OUT
  default: 'https://forms.gle/sYk17KQb2PwMa2SD7',
  ccj: 'https://forms.gle/a2zmDMCtuqrLjQer5',
  cifas: 'https://brand.kilolu.co.uk/widget/survey/QVIWDF3OCDlx3gXCyqhZ',
};

const CREDIT_MARKER_OPTIONS = [
  'Late payment',
  'Default',
  'CCJ',
  'Fraud marker',
  'More than one of the above',
];

const SERVICE_OPTIONS = [
  {
    value: 'diy',
    label: "I want the simplest, lowest-cost option and I'm happy to use AI with guidance",
  },
  {
    value: 'dfy',
    label: 'I want expert help and would prefer a 1-2-1 done-for-you service',
  },
];

interface RadioOptionProps {
  key?: React.Key;
  value: string;
  label: string;
  currentValue: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

function RadioOption({ value, label, currentValue, onChange, disabled }: RadioOptionProps) {
  const selected = currentValue === value;
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(value)}
      disabled={disabled}
      className={`w-full text-left flex items-start gap-3 rounded-lg border px-4 py-3 text-xs transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
        selected
          ? 'border-brand bg-brand/10 text-white'
          : 'border-white/10 bg-slate-950 text-slate-400 hover:border-brand/40 hover:text-slate-300'
      }`}
    >
      <span
        className={`mt-0.5 flex-shrink-0 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors ${
          selected ? 'border-brand' : 'border-slate-600'
        }`}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-brand block" />}
      </span>
      <span className="leading-relaxed">{label}</span>
    </button>
  );
}

export default function OptInForm({ settings, sourceLocation }: OptInFormProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [q1Answer, setQ1Answer] = useState('');
  const [q2Answer, setQ2Answer] = useState('');
  const [q3Answer, setQ3Answer] = useState('');
  const [q4Answer, setQ4Answer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [routeOutcome, setRouteOutcome] = useState<'diy' | 'dfy' | null>(null);
  const [routeReason, setRouteReason] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const submitToSheets = async (extraData: Record<string, string> = {}) => {
    if (settings.googleWebAppUrl && settings.googleWebAppUrl !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
      try {
        await fetch(settings.googleWebAppUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            source: sourceLocation,
            timestamp: new Date().toISOString(),
            ...extraData,
          }),
        });
      } catch (error) {
        console.error('Error logging submission to Google Sheets:', error);
      }
    } else {
      console.warn('Google Sheets URL unconfigured. Lead:', { name, email, sourceLocation, ...extraData });
    }
  };

  const goBack = () => {
    setErrorMsg('');
    setDirection('back');
    if (step === 1) setQ1Answer('');
    if (step === 2) setQ2Answer('');
    if (step === 3) setQ3Answer('');
    if (step === 4) setQ4Answer('');
    setStep((s) => s - 1);
  };

  const handleNext = async () => {
    setErrorMsg('');

    if (step === 0) {
      if (!name.trim() || !phone.trim() || !email.trim()) {
        setErrorMsg('Please enter your name, phone number and email address.');
        return;
      }
      setDirection('forward');
      setStep(1);
      return;
    }

    if (step === 1) {
      if (!q1Answer) {
        setErrorMsg('Please select an option to continue.');
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!q2Answer) {
        setErrorMsg('Please select an option to continue.');
        return;
      }
      if (q2Answer === 'diy') {
        setIsSubmitting(true);
        await submitToSheets({ Q1: q1Answer, Q2: 'DIY', Q3: '', Q4: '' });
        setRouteOutcome('diy');
        setRouteReason('');
        setIsSubmitted(true);
        setIsSubmitting(false);
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!q3Answer) {
        setErrorMsg('Please select an option to continue.');
        return;
      }
      if (q3Answer === 'no') {
        setIsSubmitting(true);
        await submitToSheets({ Q1: q1Answer, Q2: SERVICE_OPTIONS.find((o) => o.value === q2Answer)?.label ?? q2Answer, Q3: 'No', Q4: '' });
        setRouteOutcome('diy');
        setRouteReason('Based on your answers, our DIY course is the best fit for you right now.');
        setIsSubmitted(true);
        setIsSubmitting(false);
        return;
      }
      setStep(4);
      return;
    }

    if (step === 4) {
      if (!q4Answer) {
        setErrorMsg('Please select an option to continue.');
        return;
      }
      setIsSubmitting(true);
      if (q4Answer === 'no') {
        await submitToSheets({ Q1: q1Answer, Q2: SERVICE_OPTIONS.find((o) => o.value === q2Answer)?.label ?? q2Answer, Q3: 'Yes', Q4: 'No' });
        setRouteOutcome('diy');
        setRouteReason('To qualify for 1-2-1, we need full details, screenshots and correspondence. For now, the DIY course is the better route.');
        setIsSubmitted(true);
        setIsSubmitting(false);
        return;
      }
      await submitToSheets({ Q1: q1Answer, Q2: SERVICE_OPTIONS.find((o) => o.value === q2Answer)?.label ?? q2Answer, Q3: 'Yes', Q4: 'Yes' });
      setRouteOutcome('dfy');
      setIsSubmitted(true);
      setIsSubmitting(false);
      return;
    }
  };

  // --- Submitted: DIY outcome ---
  if (isSubmitted && routeOutcome === 'diy') {
    return (
      <div className="space-y-5 animate-in fade-in duration-300">
        <div className="flex flex-col items-center text-center space-y-2 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-muted text-brand border border-brand/20 shadow-inner">
            <BookOpen className="h-6 w-6 text-brand" />
          </div>
          <h4 className="text-md font-bold text-white tracking-wide uppercase">
            DIY Course — Perfect Fit
          </h4>
          {routeReason && (
            <p className="text-[11px] text-amber-400 max-w-sm bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-lg">
              {routeReason}
            </p>
          )}
          <p className="text-[11px] text-slate-400 max-w-sm leading-relaxed">
            Our DIY course gives you AI prompts, legal documents, perfected dispute scripts, and escalation strategy to follow yourself.
          </p>
        </div>
        <div className="space-y-2.5 pt-1">
          <a
            href={DIY_COURSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-xs font-extrabold text-slate-950 hover:bg-brand-hover active:scale-[0.99] transition duration-200 shadow-xl shadow-brand-glow uppercase tracking-widest text-center"
          >
            <span>View DIY Course</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <p className="text-[11px] text-amber-400 text-center bg-amber-500/10 border border-amber-500/20 px-3 py-3 rounded-lg leading-relaxed">
          Thanks for completing the form — Joshua will WhatsApp you as soon as possible. Please be ready with your phone as demand is extremely high.
        </p>
      </div>
    );
  }

  // --- Submitted: DFY success — show 4 marker-specific form buttons ---
  if (isSubmitted && routeOutcome === 'dfy') {
    return (
      <div className="space-y-5 animate-in fade-in duration-300">
        <div className="flex flex-col items-center text-center space-y-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-muted text-brand border border-brand/20 shadow-inner">
            <CheckCircle2 className="h-6 w-6 text-brand" />
          </div>
          <h4 className="text-md font-bold text-white tracking-wide uppercase">
            You're Pre-Qualified
          </h4>
          <p className="text-[11px] text-slate-400 max-w-sm leading-relaxed">
            Thank you, {name.trim()}. Choose the form that matches your negative marker and apply for the 1-2-1 done-for-you service.
          </p>
          <p className="text-[10px] text-brand font-semibold uppercase tracking-wider">
            Spaces are limited — only serious applications reviewed.
          </p>
        </div>

        {/* 1-2-1 application form options */}
        <div className="space-y-2.5">
          {/* Late Payment - SOLD OUT */}
          <button
            disabled
            className="w-full text-center rounded-lg bg-slate-800 border border-white/10 text-slate-500 px-4 py-3 text-[11px] font-bold leading-none tracking-widest uppercase transition-all cursor-not-allowed opacity-60"
          >
            <span className="flex items-center justify-center gap-2">
              <span>LATE PAYMENT FORM</span>
              <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-[9px] font-black">100% SOLD OUT</span>
            </span>
          </button>

          {/* Default Form - 5 spaces left */}
          <a
            href={MARKER_FORM_LINKS.default}
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
            href={MARKER_FORM_LINKS.ccj}
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
            href={MARKER_FORM_LINKS.cifas}
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

        <p className="text-[11px] text-amber-400 text-center bg-amber-500/10 border border-amber-500/20 px-3 py-3 rounded-lg leading-relaxed">
          Thanks for completing the form — Joshua will WhatsApp you as soon as possible. Please be ready with your phone as demand is extremely high.
        </p>
      </div>
    );
  }

  // --- Multi-step Form ---
  const stepAnim = direction === 'forward'
    ? 'animate-in slide-in-from-right-4 fade-in duration-20'
    : 'animate-in slide-in-from-left-4 fade-in duration-20';

  return (
    <div className="space-y-5">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step
                ? 'w-5 bg-brand'
                : i < step
                ? 'w-1.5 bg-brand/40'
                : 'w-1.5 bg-white/10'
            }`}
          />
        ))}
      </div>

      {errorMsg && (
        <div className="text-xs text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-xl text-center">
          {errorMsg}
        </div>
      )}

      {/* Step 0: Name + Email */}
      {step === 0 && (
        <div className={`space-y-4 ${stepAnim}`}>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') emailRef.current?.focus(); }}
                placeholder="Alex Thompson"
                className="w-full rounded-lg bg-slate-950 border border-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Phone Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                <Phone className="h-4 w-4" />
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') emailRef.current?.focus(); }}
                autoComplete="tel"
                placeholder="+44 7700 000000"
                className="w-full rounded-lg bg-slate-950 border border-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                <Mail className="h-4 w-4" />
              </span>
              <input
                ref={emailRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleNext(); }}
                placeholder="alex@company.com"
                className="w-full rounded-lg bg-slate-950 border border-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand transition-all"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-4 text-sm font-bold text-slate-950 hover:bg-brand-hover active:scale-[0.99] transition-all duration-200 shadow-xl shadow-brand-glow uppercase tracking-widest cursor-pointer mt-2"
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Step 1: Q1 — Negative credit markers */}
      {step === 1 && (
        <div className={`space-y-4 ${stepAnim}`}>
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">
              Do you have any negative credit markers?
            </p>
            <p className="text-[10px] text-slate-500 mb-3">We help with early negative marker removals.</p>
            <div className="space-y-2">
              {CREDIT_MARKER_OPTIONS.map((opt) => (
                <RadioOption
                  key={opt}
                  value={opt}
                  label={opt}
                  currentValue={q1Answer}
                  onChange={(val) => { setQ1Answer(val); setDirection('forward'); setStep(2); }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={goBack}
              title="Previous question"
              className="flex items-center justify-center rounded-lg bg-slate-950 hover:bg-slate-900 border border-white/10 px-4 py-3 text-slate-400 hover:text-white transition duration-200 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Q2 — Service preference */}
      {step === 2 && (
        <div className={`space-y-4 ${stepAnim}`}>
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">
              Which option sounds most like what you want?
            </p>
            <p className="text-[10px] text-slate-500 mb-3">
              Our DIY course gives you AI prompts, legal documents, perfected dispute scripts, and escalation strategy to follow yourself. Our 1-2-1 done-for-you service is for people who want us to do the writing and guide them directly.
            </p>
            <div className="space-y-2">
              {SERVICE_OPTIONS.map((opt) => (
                <RadioOption
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  currentValue={q2Answer}
                  disabled={isSubmitting}
                  onChange={async (val) => {
                    setQ2Answer(val);
                    const q2Label = SERVICE_OPTIONS.find((o) => o.value === val)?.label ?? val;
                    if (val === 'diy') {
                      setIsSubmitting(true);
                      await submitToSheets({ Q1: q1Answer, Q2: q2Label, Q3: '', Q4: '' });
                      setRouteOutcome('diy');
                      setRouteReason('');
                      setIsSubmitted(true);
                      setIsSubmitting(false);
                    } else {
                      setDirection('forward');
                      setStep(3);
                    }
                  }}
                />
              ))}
            </div>
            {isSubmitting && (
              <div className="flex items-center justify-center gap-2 pt-1 text-[10px] text-slate-500">
                <Loader2 className="animate-spin h-3 w-3" />
                <span>Processing...</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={goBack}
              disabled={isSubmitting}
              title="Previous question"
              className="flex items-center justify-center rounded-lg bg-slate-950 hover:bg-slate-900 border border-white/10 px-4 py-3 text-slate-400 hover:text-white transition duration-200 cursor-pointer disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Q3 — £1,000 investment */}
      {step === 3 && (
        <div className={`space-y-4 ${stepAnim}`}>
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">
              Are you able to invest at least £1,000 if you are accepted for our 1-2-1 done-for-you service?
            </p>
            <p className="text-[10px] text-slate-500 mb-3">
              Please answer honestly. Our 1-2-1 done-for-you service is only for people who can afford to invest at least £1,000 if accepted. If not, the DIY course is the best route and is very effective.
            </p>
            <div className="space-y-2">
              {[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }].map((opt) => (
                <RadioOption
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  currentValue={q3Answer}
                  disabled={isSubmitting}
                  onChange={async (val) => {
                    setQ3Answer(val);
                    if (val === 'no') {
                      setIsSubmitting(true);
                      await submitToSheets({ Q1: q1Answer, Q2: SERVICE_OPTIONS.find((o) => o.value === q2Answer)?.label ?? q2Answer, Q3: 'No', Q4: '' });
                      setRouteOutcome('diy');
                      setRouteReason('Based on your answers, our DIY course is the best fit for you right now.');
                      setIsSubmitted(true);
                      setIsSubmitting(false);
                    } else {
                      setDirection('forward');
                      setStep(4);
                    }
                  }}
                />
              ))}
            </div>
            {isSubmitting && (
              <div className="flex items-center justify-center gap-2 pt-1 text-[10px] text-slate-500">
                <Loader2 className="animate-spin h-3 w-3" />
                <span>Processing...</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={goBack}
              disabled={isSubmitting}
              title="Previous question"
              className="flex items-center justify-center rounded-lg bg-slate-950 hover:bg-slate-900 border border-white/10 px-4 py-3 text-slate-400 hover:text-white transition duration-200 cursor-pointer disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Q4 — Full details */}
      {step === 4 && (
        <div className={`space-y-4 ${stepAnim}`}>
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">
              Are you willing to provide full details about what happened, including screenshots, emails, correspondence, and a detailed written explanation?
            </p>
            <p className="text-[10px] text-slate-500 mb-3">
              For 1-2-1 applications, we expect full details, screenshots, emails, and correspondence where relevant. Short or vague applications are automatically rejected – we only review serious applications.
            </p>
            <div className="space-y-2">
              {[
                { value: 'yes', label: 'Yes, I can provide full detail' },
                { value: 'no', label: 'No, not right now' },
              ].map((opt) => (
                <RadioOption
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  currentValue={q4Answer}
                  disabled={isSubmitting}
                  onChange={async (val) => {
                    setQ4Answer(val);
                    setIsSubmitting(true);
                    if (val === 'no') {
                      await submitToSheets({ Q1: q1Answer, Q2: SERVICE_OPTIONS.find((o) => o.value === q2Answer)?.label ?? q2Answer, Q3: 'Yes', Q4: 'No' });
                      setRouteOutcome('diy');
                      setRouteReason('To qualify for 1-2-1, we need full details, screenshots and correspondence. For now, the DIY course is the better route.');
                      setIsSubmitted(true);
                      setIsSubmitting(false);
                    } else {
                      await submitToSheets({ Q1: q1Answer, Q2: SERVICE_OPTIONS.find((o) => o.value === q2Answer)?.label ?? q2Answer, Q3: 'Yes', Q4: 'Yes' });
                      setRouteOutcome('dfy');
                      setIsSubmitted(true);
                      setIsSubmitting(false);
                    }
                  }}
                />
              ))}
            </div>
            {isSubmitting && (
              <div className="flex items-center justify-center gap-2 pt-1 text-[10px] text-slate-500">
                <Loader2 className="animate-spin h-3 w-3" />
                <span>Submitting your application...</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={goBack}
              disabled={isSubmitting}
              title="Previous question"
              className="flex items-center justify-center rounded-lg bg-slate-950 hover:bg-slate-900 border border-white/10 px-4 py-3 text-slate-400 hover:text-white transition duration-200 cursor-pointer disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* <div className="flex justify-center items-center gap-1.5 text-[10px] text-slate-500">
        <Shield className="h-3 w-3 text-brand-dark/60" />
        <span>Secure submission. Leads synced to Spreadsheet instantly.</span>
      </div> */}
    </div>
  );
}
