import React, { useState } from 'react';
import { AppSettings } from '../types';
import { Cog, X, Clipboard, Check, ExternalLink, HelpCircle, Phone, Database, Video, Globe, Download, Sparkles } from 'lucide-react';

interface SettingsPanelProps {
  settings: AppSettings;
  onSave: (newSettings: AppSettings) => void;
}

export default function SettingsPanel({ settings, onSave }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'script' | 'standalone'>('config');
  
  const [googleWebAppUrl, setGoogleWebAppUrl] = useState(settings.googleWebAppUrl);
  const [whatsAppNumber, setWhatsAppNumber] = useState(settings.whatsAppNumber);
  const [customMessage, setCustomMessage] = useState(settings.customMessage);
  const [freeTrainingUrl, setFreeTrainingUrl] = useState(settings.freeTrainingUrl || 'https://youtube.com/shorts/7JLKIPsRREQ');
  
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Exact Google Apps Script web app template code
  const appsScriptCode = `/**
 * Google Apps Script - Append Squeeze Page Leads to Google Sheet
 * 1. Open Google Sheets (sheets.google.com) and create or open a sheet.
 * 2. Click Extensions > Apps Script.
 * 3. Delete any default code and paste this script there.
 * 4. Click Deploy > New deployment.
 * 5. Select type "Web app". Set:
 *    - Description: Credit Lead Script
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 6. Click Deploy, authorize permissions, and copy the Web App URL.
 * 7. Paste that URL into the Settings config in this Squeeze Page!
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Set up header column if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Name", "Email Address", "Q1", "Q2", "Q3", "Q4", "Phone Number"]);
  }
  
  try {
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    
    // Extract key variables securely
    var name = data.name || "";
    var email = data.email || "";
    var phone = data.phone || data.Phone || data.phoneNumber || data.phone_number || "";
    var q1 = data.q1 || data.Q1 || "";
    var q2 = data.q2 || data.Q2 || "";
    var q3 = data.q3 || data.Q3 || "";
    var q4 = data.q4 || data.Q4 || "";
    
    // Append in the correct header order
    // Prefix phone with apostrophe to force Google Sheets to store as plain text (prevents + being parsed as formula)
    var phoneSafe = phone ? ("'" + phone) : "";
    sheet.appendRow([timestamp, name, email, q1, q2, q3, q4, phoneSafe]);

    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*'
      });
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*'
      });
  }
}

// Allows pre-flight check options or testing
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}
`;

  const generateStandaloneHtml = () => {
    const isShorts = freeTrainingUrl ? freeTrainingUrl.includes('/shorts/') : false;
    
    // Extractor of YouTube Video ID
    let ytId = '7JLKIPsRREQ';
    const shortsMatch = freeTrainingUrl.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch && shortsMatch[1]) {
      ytId = shortsMatch[1];
    } else {
      const watchMatch = freeTrainingUrl.match(/(?:\?v=|\/embed\/|\/watch\?v=|\/\d\/|vi\/|youtu\.be\/|v\/)([a-zA-Z0-9_-]{11})/);
      if (watchMatch && watchMatch[1]) {
        ytId = watchMatch[1];
      }
    }

    const embedUrl = `https://www.youtube.com/embed/${ytId}`;

    return `<!-- Joshua's Credit Framework - Squeeze Landing Page Content Block (Paste directly into custom HTML/vsl widgets in builders like GoHighLevel, WordPress, Shopify, or WooCommerce) -->
<div id="joshua-credit-framework-root" class="relative min-h-screen bg-[#F8FAFC] text-slate-800 antialiased font-sans m-0 p-0" style="scroll-behavior: smooth;">
  
  <!-- Squeeze Page Asset Bootloader Script (No head/body tags required, avoids builder crashes) -->
  <script>
    (function() {
      // 1. Dynamic Font Injection
      if (!document.getElementById('joshua-google-fonts')) {
        var fontsNode = document.createElement('link');
        fontsNode.id = 'joshua-google-fonts';
        fontsNode.rel = 'stylesheet';
        fontsNode.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap';
        document.head.appendChild(fontsNode);
      }

      // 2. Dynamic Play Tailwind CDN Injection
      if (!window.tailwind) {
        var tailwindScript = document.createElement('script');
        tailwindScript.id = 'joshua-tailwind-cdn';
        tailwindScript.src = 'https://cdn.tailwindcss.com';
        tailwindScript.onload = function() {
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  sans: ['Inter', 'sans-serif'],
                  display: ['Space Grotesk', 'sans-serif'],
                },
                colors: {
                  brand: {
                    DEFAULT: '#48C0CE',
                    dark: '#379FA9',
                    muted: '#E6F8FA',
                    hover: '#5CE1F1'
                  }
                },
                boxShadow: {
                  'brand-glow': '0 0 25px -5px rgba(72,192,206,0.3)',
                }
              }
            }
          };
        };
        document.head.appendChild(tailwindScript);
      } else {
        // Extend existing Tailwind setup
        try {
          tailwind.config = tailwind.config || {};
          tailwind.config.theme = tailwind.config.theme || {};
          tailwind.config.theme.extend = tailwind.config.theme.extend || {};
          tailwind.config.theme.extend.fontFamily = {
            sans: ['Inter', 'sans-serif'],
            display: ['Space Grotesk', 'sans-serif'],
          };
          tailwind.config.theme.extend.colors = {
            brand: {
              DEFAULT: '#48C0CE',
              dark: '#379FA9',
              muted: '#E6F8FA',
              hover: '#5CE1F1'
            }
          };
        } catch (e) {
          console.warn('Tailwind config extension bypassed gracefully:', e);
        }
      }

      // 3. Dynamic Stylesheet Animations Injection
      if (!document.getElementById('joshua-custom-keyframes')) {
        var styleEl = document.createElement('style');
        styleEl.id = 'joshua-custom-keyframes';
        styleEl.textContent = "@keyframes pulse-glow { 0%, 100% { opacity: 0.35; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.02); } } .animate-pulse-glow { animation: pulse-glow 3s infinite ease-in-out; }";
        document.head.appendChild(styleEl);
      }
    })();
  </script>

  <!-- Main Grid Background Overlay -->
  <div class="relative min-h-screen overflow-x-hidden">
    <!-- Blue/Green subtle dynamic top gradient -->
    <div class="absolute inset-x-0 top-0 -z-10 h-[50rem] w-full bg-[radial-gradient(100rem_50rem_at_top,rgba(72,192,206,0.14),transparent)] opacity-95"></div>
    <div class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

    <!-- Header navigation bar -->
    <header class="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <div class="flex items-center gap-2">
          <!-- Inline Crisp Vector Kilolu Logo -->
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" class="text-brand hover:scale-105 transition-all duration-300">
            <rect width="100" height="100" rx="20" fill="#E6F8FA"/>
            <path d="M30 25C30 22.2386 32.2386 20 35 20H45C47.7614 20 50 22.2386 50 25V40C50 42.7614 47.7614 45 45 45H35C32.2386 45 30 42.7614 30 40V25Z" fill="#48C0CE"/>
            <path d="M50 55C50 52.2386 52.2386 50 55 50H65C67.7614 50 70 52.2386 70 55V75C70 77.7614 67.7614 80 65 80H55C52.2386 80 50 77.7614 50 75V55Z" fill="#379FA9"/>
            <circle cx="60" cy="32.5" r="12.5" fill="#48C0CE" opacity="0.8"/>
            <circle cx="40" cy="67.5" r="12.5" fill="#379FA9" opacity="0.8"/>
          </svg>
          <span class="font-display font-bold text-slate-900 tracking-tight text-sm hidden sm:inline uppercase">Joshua's Credit Desk</span>
        </div>
        
        <nav class="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-600">
          <a href="#what-you-will-learn" class="hover:text-brand-dark transition-colors duration-200">What You'll Learn</a>
          <a href="#success-stories" class="hover:text-brand-dark transition-colors duration-200">Success Stories</a>
          <a href="#services" class="hover:text-brand-dark transition-colors duration-200">Programs</a>
        </nav>

        <div>
          <a href="#form-card" class="inline-flex items-center gap-1.5 rounded-lg bg-brand hover:bg-brand-hover tracking-wider text-slate-950 font-bold text-xs uppercase px-5 py-2.5 shadow-md hover:shadow-brand-glow/15 transition-all">
            <span>Watch Training</span>
          </a>
        </div>
      </div>
    </header>

    <!-- Hero Content -->
    <main class="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-20">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
        
        <!-- Left Banner Column -->
        <div class="lg:col-span-7 text-center lg:text-left space-y-6">
          <div class="inline-flex items-center gap-2 bg-brand-muted text-brand-dark px-3 py-1 ring-1 ring-brand/20 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit">
            <span class="h-2 w-2 rounded-full bg-brand-dark animate-pulse"></span>
            <span>Free Credit Framework 2026</span>
          </div>
          
          <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1] font-display">
            Fix Your Credit.<br>
            <span class="text-brand-dark">Access Funding.</span><br>
            Build Freedom.
          </h1>
          
          <p class="text-base sm:text-lg font-medium text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            The exact 5-step framework used to challenge defaults, CCJs, and CIFAS markers, allowing you to unlock over £100,000 in funding potential.
          </p>
          
          <p class="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Whether you're dealing with a CCJ, Default, Late Payment, or CIFAS Marker, or looking to access funding for business or personal growth, this free training outlines the strategic steps to help you move forward.
          </p>

          <div class="mt-8 flex items-center justify-center lg:justify-start gap-4">
            <div class="flex -space-x-2">
              <div class="h-8 w-8 rounded-full border-2 border-white bg-slate-200"></div>
              <div class="h-8 w-8 rounded-full border-2 border-white bg-slate-300"></div>
              <div class="h-8 w-8 rounded-full border-2 border-white bg-slate-400"></div>
            </div>
            <p class="text-xs text-slate-600 font-medium font-semibold">
              <span class="text-slate-900 font-bold">+1,200 Professionals</span> trained this month
            </p>
          </div>
        </div>

        <!-- Right Squeeze Form Column -->
        <div id="form-card" class="lg:col-span-5 w-full">
          <div class="relative mx-auto max-w-md">
            <div class="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-brand to-brand-dark blur-xl opacity-35 -z-10 animate-pulse"></div>
            
            <div class="relative overflow-hidden rounded-2xl border-2 border-brand/25 bg-white p-6 sm:p-8 shadow-2xl bg-gradient-to-b from-white via-white to-brand-muted/40">
              <div id="form-header" class="text-center space-y-1 mb-6">
                <h2 class="text-xl font-bold text-slate-900 mb-2">Watch the Training</h2>
                <p class="text-slate-500 text-xs">Instant access to the 5-step masterclass</p>
              </div>

              <!-- Main OptIn Form -->
              <form id="optin-form" class="space-y-4">
                <div class="space-y-1.5">
                  <label class="text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <svg class="h-3.5 w-3.5 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    Name
                  </label>
                  <input type="text" id="lead-name" required placeholder="e.g. John Doe" class="w-full rounded-lg bg-white border border-slate-300 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-dark focus:border-brand-dark transition">
                </div>

                <div class="space-y-1.5">
                  <label class="text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <svg class="h-3.5 w-3.5 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    Email Address
                  </label>
                  <input type="email" id="lead-email" required placeholder="name@domain.com" class="w-full rounded-lg bg-white border border-slate-300 px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-dark focus:border-brand-dark transition">
                </div>

                <button type="submit" id="submit-btn" class="w-full flex items-center justify-center gap-2 rounded-lg bg-brand hover:bg-brand-hover tracking-wider text-slate-950 font-bold text-xs uppercase px-4 py-3.5 shadow-md active:scale-95 transition-all">
                  <span>ACCESS MASTERCLASS NOW</span>
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </form>

              <!-- Success Output Section -->
              <div id="success-view" class="hidden space-y-5">
                <div class="flex flex-col items-center text-center space-y-2 mb-2">
                  <div class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-muted text-brand border border-brand/20 shadow-inner">
                    <svg class="h-6 w-6 text-brand-dark animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <h4 class="text-md font-bold text-slate-900 tracking-wide uppercase">Spot Secured!</h4>
                  <p class="text-[11px] text-slate-600 max-w-sm">
                    Details logged successfully. Dedicated WhatsApp mentor thread opened. You can now watch the 5-Step credit masterclass video below:
                  </p>
                </div>

                <!-- Video Frame Embed -->
                <div class="relative w-full">
                  <div class="${isShorts ? 'aspect-[9/16] w-full max-w-[210px] mx-auto' : 'aspect-video w-full'} overflow-hidden rounded-xl border-2 border-brand/30 bg-black shadow-lg relative bg-slate-950">
                    <iframe src="${embedUrl}?autoplay=1&mute=0&rel=0" title="Joshua Credit Consulting Masterclass Video" class="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
                </div>

                <div class="text-center pt-2">
                  <a id="whatsapp-click-btn" href="#" target="_blank" class="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark hover:text-brand transition-all">
                    <span>Reopen WhatsApp Directly</span>
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </a>
                </div>
              </div>

              <p class="text-[9px] text-slate-500 text-center mt-4 uppercase tracking-wider font-semibold">
                Redirects directly to private WhatsApp training session
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- 4-Step Process Section -->
    <section class="py-12 px-6 sm:px-8 bg-slate-50 border-y border-slate-200/60 font-display">
      <div class="mx-auto max-w-7xl">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div class="p-4 rounded-xl bg-gradient-to-br from-white to-brand-muted/30 border border-brand/20 flex items-center gap-3 hover:border-brand/50 hover:shadow-md transition-all duration-300 shadow-sm bg-white">
            <div class="h-8 w-8 rounded bg-brand-muted text-brand-dark flex items-center justify-center font-bold text-xs shrink-0">01</div>
            <div>
              <h4 class="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Identify</h4>
              <p class="text-[10px] text-slate-500">Detailed Report Audit</p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-gradient-to-br from-white to-brand-muted/30 border border-brand/20 flex items-center gap-3 hover:border-brand/50 hover:shadow-md transition-all duration-300 shadow-sm bg-white">
            <div class="h-8 w-8 rounded bg-brand-muted text-brand-dark flex items-center justify-center font-bold text-xs shrink-0">02</div>
            <div>
              <h4 class="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Challenge</h4>
              <p class="text-[10px] text-slate-500">AI-Driven Disputes</p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-gradient-to-br from-white to-brand-muted/30 border border-brand/20 flex items-center gap-3 hover:border-brand/50 hover:shadow-md transition-all duration-300 shadow-sm bg-white">
            <div class="h-8 w-8 rounded bg-brand-muted text-brand-dark flex items-center justify-center font-bold text-xs shrink-0">03</div>
            <div>
              <h4 class="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Structure</h4>
              <p class="text-[10px] text-slate-500">Lender Architecture</p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-gradient-to-br from-white to-brand-muted/30 border border-brand/20 flex items-center gap-3 hover:border-brand/50 hover:shadow-md transition-all duration-300 shadow-sm bg-white">
            <div class="h-8 w-8 rounded bg-brand-muted text-brand-dark flex items-center justify-center font-bold text-xs shrink-0">04</div>
            <div>
              <h4 class="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Funding</h4>
              <p class="text-[10px] text-slate-500">Tier 1 Capital Access</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Trusted Addressing Negative Markers -->
    <section class="py-6 bg-slate-100/60 border-b border-slate-200 flex flex-col md:flex-row items-center justify-center gap-4 px-6 sm:px-8 text-center sm:text-left">
      <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest shrink-0">Negative Markers Addressed:</span>
      <div class="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 uppercase tracking-widest text-[10px] font-bold text-slate-600">
        <span class="flex items-center gap-1.5"><div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>CCJ REMOVAL</span>
        <span class="flex items-center gap-1.5"><div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>DEFAULT REMOVAL</span>
        <span class="flex items-center gap-1.5"><div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>CIFAS CHALLENGES</span>
        <span class="flex items-center gap-1.5"><div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>SCORE ENHANCEMENT</span>
        <span class="flex items-center gap-1.5"><div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>LATE PAYMENTS</span>
      </div>
    </section>

    <!-- What You'll Learn Grid Section -->
    <section id="what-you-will-learn" class="py-24 sm:py-32 bg-white border-b border-slate-200">
      <div class="mx-auto max-w-7xl px-6 sm:px-8">
        <div class="mx-auto max-w-3xl text-center space-y-4">
          <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-display">What You'll Learn</h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            In this free training, Joshua reveals the exact 5-step framework that helped him go from poor credit to accessing over £100,000 in personal and business funding.
          </p>
        </div>

        <!-- Static Features map -->
        <div class="mx-auto mt-16 max-w-5xl">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            <div class="relative flex flex-col rounded-2xl border border-brand/20 bg-gradient-to-br from-white to-brand-muted/20 p-6 shadow-sm hover:shadow-lg hover:border-brand transition duration-300">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-muted text-brand-dark border border-brand/20">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              </div>
              <h3 class="mt-5 text-base font-bold text-slate-900 tracking-tight">Review Credit Reports</h3>
              <p class="mt-2 text-xs text-slate-600 leading-relaxed">How to properly obtain, inspect, and analyze your credit files across multiple credit reference agencies.</p>
            </div>

            <div class="relative flex flex-col rounded-2xl border border-brand/20 bg-gradient-to-br from-white to-brand-muted/20 p-6 shadow-sm hover:shadow-lg hover:border-brand transition duration-300">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-muted text-brand-dark border border-brand/20">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <h3 class="mt-5 text-base font-bold text-slate-900 tracking-tight">Avoid Common Mistakes</h3>
              <p class="mt-2 text-xs text-slate-600 leading-relaxed">Discover key errors and common traps that inadvertently lock people into poor credit brackets.</p>
            </div>

            <div class="relative flex flex-col rounded-2xl border border-brand/20 bg-gradient-to-br from-white to-brand-muted/20 p-6 shadow-sm hover:shadow-lg hover:border-brand transition duration-300">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-muted text-brand-dark border border-brand/20">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 class="mt-5 text-base font-bold text-slate-900 tracking-tight">Challenge Reporting Errors</h3>
              <p class="mt-2 text-xs text-slate-600 leading-relaxed">The practical process to identify factual inaccuracies and formal ways to challenge them.</p>
            </div>

            <div class="relative flex flex-col rounded-2xl border border-brand/20 bg-gradient-to-br from-white to-brand-muted/20 p-6 shadow-sm hover:shadow-lg hover:border-brand transition duration-300">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-muted text-brand-dark border border-brand/20">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <h3 class="mt-5 text-base font-bold text-slate-900 tracking-tight">Understand Lender Criteria</h3>
              <p class="mt-2 text-xs text-slate-600 leading-relaxed">What underwriters and scoring algorithms look for during physical and automated reviews.</p>
            </div>

            <div class="relative flex flex-col rounded-2xl border border-brand/20 bg-gradient-to-br from-white to-brand-muted/20 p-6 shadow-sm hover:shadow-lg hover:border-brand transition duration-300">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-muted text-brand-dark border border-brand/20">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              </div>
              <h3 class="mt-5 text-base font-bold text-slate-900 tracking-tight">Strengthen Your Profile</h3>
              <p class="mt-2 text-xs text-slate-600 leading-relaxed">Steps to consistently build positive credit history and structural stability over time.</p>
            </div>

            <div class="relative flex flex-col rounded-2xl border border-brand/20 bg-gradient-to-br from-white to-brand-muted/20 p-6 shadow-sm hover:shadow-lg hover:border-brand transition duration-300">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-muted text-brand-dark border border-brand/20">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v12"></path><path d="M17 12H7"></path></svg>
              </div>
              <h3 class="mt-5 text-base font-bold text-slate-900 tracking-tight">Position for Funding</h3>
              <p class="mt-2 text-xs text-slate-600 leading-relaxed">Build credit architecture optimized for securing commercial, property, or growth funding.</p>
            </div>

          </div>
        </div>

        <div class="mt-16 text-center">
          <a href="#form-card" class="inline-flex items-center gap-2 rounded-lg bg-brand hover:bg-brand-hover text-slate-950 px-8 py-4 text-xs font-bold leading-none tracking-widest uppercase shadow-md transition-all">
            <span>ACCESS THE 5-STEP TRAINING NOW</span>
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Success Stories Section -->
    <section id="success-stories" class="bg-[#F8FAFC] py-24 sm:py-32 border-b border-slate-200">
      <div class="mx-auto max-w-7xl px-6 sm:px-8">
        <div class="text-center space-y-4">
          <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-display">Real Client Success Stories</h2>
          <p class="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
            Don't just take our word for it. Review real clients share their experiences and structural improvements after implementing our framework.
          </p>
        </div>

        <!-- Stories interactive grid -->
        <div class="mx-auto mt-16 max-w-6xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          <div onclick="playClientVideo('GFZ5r9O3dDs', 'David K.', 'CIFAS Marker removed')" class="group relative rounded-2xl border border-brand/20 bg-gradient-to-br from-white to-brand-muted/15 p-4 hover:border-brand/50 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between">
            <div class="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
              <img src="https://img.youtube.com/vi/GFZ5r9O3dDs/hqdefault.jpg" alt="David K. Success" class="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-slate-950 shadow-xl group-hover:scale-110 transition duration-300">
                  <svg class="h-6 w-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <div class="absolute bottom-4 left-4 right-4">
                <span class="rounded bg-brand/90 px-2 py-0.5 text-[9px] font-bold text-slate-950 tracking-wider uppercase">SUCCESS STORY</span>
                <p class="mt-1.5 text-xs font-bold text-white line-clamp-2">CIFAS Marker successfully challenged &amp; removed</p>
              </div>
            </div>
            <div class="flex items-center gap-3 pt-4">
              <div class="h-8 w-8 rounded-full bg-brand-muted flex items-center justify-center text-xs font-bold text-brand-dark">DK</div>
              <div>
                <h4 class="text-xs font-bold text-slate-800 leading-none">David K.</h4>
                <p class="text-[10px] text-slate-500">Professional Services</p>
              </div>
            </div>
          </div>

          <div onclick="playClientVideo('PXCALQrqkhA', 'Michelle O.', 'Secured £45,000 corporate finance')" class="group relative rounded-2xl border border-brand/20 bg-gradient-to-br from-white to-brand-muted/15 p-4 hover:border-brand/50 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between">
            <div class="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
              <img src="https://img.youtube.com/vi/PXCALQrqkhA/hqdefault.jpg" alt="Michelle" class="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-slate-950 shadow-xl group-hover:scale-110 transition duration-300">
                  <svg class="h-6 w-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <div class="absolute bottom-4 left-4 right-4">
                <span class="rounded bg-brand/90 px-2 py-0.5 text-[9px] font-bold text-slate-950 tracking-wider uppercase">SUCCESS STORY</span>
                <p class="mt-1.5 text-xs font-bold text-white line-clamp-2">Secured £45,000 corporate finance in 3 months</p>
              </div>
            </div>
            <div class="flex items-center gap-3 pt-4">
              <div class="h-8 w-8 rounded-full bg-brand-muted flex items-center justify-center text-xs font-bold text-brand-dark">MO</div>
              <div>
                <h4 class="text-xs font-bold text-slate-800 leading-none">Michelle O.</h4>
                <p class="text-[10px] text-slate-500">Tech Founder</p>
              </div>
            </div>
          </div>

          <div onclick="playClientVideo('2XOn6X1eROY', 'Sarah T.', 'Bought my family home')" class="group relative rounded-2xl border border-brand/20 bg-gradient-to-br from-white to-brand-muted/15 p-4 hover:border-brand/50 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between">
            <div class="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
              <img src="https://img.youtube.com/vi/2XOn6X1eROY/hqdefault.jpg" alt="Sarah" class="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-slate-950 shadow-xl group-hover:scale-110 transition duration-300">
                  <svg class="h-6 w-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <div class="absolute bottom-4 left-4 right-4">
                <span class="rounded bg-brand/90 px-2 py-0.5 text-[9px] font-bold text-slate-950 tracking-wider uppercase">SUCCESS STORY</span>
                <p class="mt-1.5 text-xs font-bold text-white line-clamp-2">Clean profile allowed me to buy my family home</p>
              </div>
            </div>
            <div class="flex items-center gap-3 pt-4">
              <div class="h-8 w-8 rounded-full bg-brand-muted flex items-center justify-center text-xs font-bold text-brand-dark">ST</div>
              <div>
                <h4 class="text-xs font-bold text-slate-800 leading-none">Sarah T.</h4>
                <p class="text-[10px] text-slate-500">Retail Manager</p>
              </div>
            </div>
          </div>

        </div>

        <!-- Expected results list -->
        <div class="mx-auto mt-20 max-w-5xl rounded-2xl border border-brand/35 bg-gradient-to-br from-white via-white to-brand-muted/35 p-8 sm:p-12 shadow-lg">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-transparent">
            <div class="lg:col-span-4 space-y-3">
              <span class="text-[10px] font-bold text-brand-dark tracking-widest uppercase bg-brand-muted px-2.5 py-1 rounded">Expected Guidelines</span>
              <h3 class="text-xl font-extrabold text-slate-900 sm:text-2xl font-display leading-snug">Results May Include:</h3>
              <p class="text-xs text-slate-600 leading-relaxed">Individual circumstances differ. However, clients who consistently follow the structured modules typically observe the following outcomes.</p>
            </div>
            <div class="lg:col-span-8">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="bg-white border border-brand/20 hover:border-[#48C0CE]/50 hover:shadow-md p-4 rounded-xl flex items-start gap-3 transition-all duration-300 shadow-sm relative overflow-hidden group">
                  <div class="absolute top-0 left-0 w-[3px] h-full bg-[#48C0CE]"></div>
                  <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-muted text-brand-dark text-[10px] font-bold mt-0.5">✓</span>
                  <span class="text-xs font-semibold text-slate-800 leading-snug">Improved credit scores across major credit reference agencies.</span>
                </div>
                <div class="bg-white border border-brand/20 hover:border-[#48C0CE]/50 hover:shadow-md p-4 rounded-xl flex items-start gap-3 transition-all duration-300 shadow-sm relative overflow-hidden group">
                  <div class="absolute top-0 left-0 w-[3px] h-full bg-[#48C0CE]"></div>
                  <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-muted text-brand-dark text-[10px] font-bold mt-0.5">✓</span>
                  <span class="text-xs font-semibold text-slate-800 leading-snug">Identification and challenge of inaccurate negative reporting.</span>
                </div>
                <div class="bg-white border border-brand/20 hover:border-[#48C0CE]/50 hover:shadow-md p-4 rounded-xl flex items-start gap-3 transition-all duration-300 shadow-sm relative overflow-hidden group">
                  <div class="absolute top-0 left-0 w-[3px] h-full bg-[#48C0CE]"></div>
                  <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-muted text-brand-dark text-[10px] font-bold mt-0.5">✓</span>
                  <span class="text-xs font-semibold text-slate-800 leading-snug">Greater confidence when submitting loan or mortgage applications.</span>
                </div>
                <div class="bg-white border border-brand/20 hover:border-[#48C0CE]/50 hover:shadow-md p-4 rounded-xl flex items-start gap-3 transition-all duration-300 shadow-sm relative overflow-hidden group">
                  <div class="absolute top-0 left-0 w-[3px] h-full bg-[#48C0CE]"></div>
                  <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-muted text-brand-dark text-[10px] font-bold mt-0.5">✓</span>
                  <span class="text-xs font-semibold text-slate-800 leading-snug">Access to competitive rates and higher tier funding limits.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Services Option packages pricing grid -->
    <section id="services" class="py-24 sm:py-32 relative overflow-hidden bg-[#48C0CE] text-white">
      <!-- Ambient light glow in the background to add premium style -->
      <div class="absolute inset-x-0 top-0 -z-0 h-96 w-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent)] pointer-events-none"></div>

      <div class="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
        <div class="text-center space-y-4">
          <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-display">Work With Joshua</h2>
          <p class="mx-auto max-w-2xl text-sm sm:text-base text-cyan-50/90 leading-relaxed font-medium">
            Select the direct engagement path that aligns with your private credit repair strategy and financial leverage goals.
          </p>
        </div>

        <div class="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 items-stretch">
          
          <!-- Course Package -->
          <div class="flex flex-col justify-between rounded-2xl border border-white/20 bg-slate-950/85 backdrop-blur-md p-6 sm:p-8 shadow-2xl hover:border-white/40 hover:scale-[1.01] transition duration-300">
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <span class="rounded-full bg-cyan-950/60 border border-brand/35 px-3.5 py-1 text-[11px] font-bold text-brand uppercase tracking-wider">Online Masterclass</span>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-white font-display">5-Step Credit Framework</h3>
                <p class="mt-3 text-xs leading-relaxed text-cyan-100/90">
                  Our comprehensive, self-paced masterclass teaching you every legal dispute loophole and underwriting secrets to fix and build credit on your own.
                </p>
              </div>
              <div class="border-t border-white/10 pt-6">
                <h4 class="text-[10px] font-bold tracking-wider text-cyan-200/80 uppercase">What's Included</h4>
                <ul class="mt-4 space-y-3 text-xs text-white/90">
                  <li class="flex gap-2"><span>✓</span> 15 HD step-by-step video modules</li>
                  <li class="flex gap-2"><span>✓</span> Collection of 8 dispute letters</li>
                  <li class="flex gap-2"><span>✓</span> Lifetime community chat updates</li>
                </ul>
              </div>
            </div>
            <div class="mt-8 pt-4 border-t border-white/10">
              <a href="#form-card" class="block w-full text-center rounded-lg bg-brand hover:bg-white text-slate-950 text-xs font-bold py-4 tracking-widest uppercase transition-colors">ENROLL IN THE DIY COURSE</a>
            </div>
          </div>

          <!-- Done-For-You Package -->
          <div class="flex flex-col justify-between rounded-2xl border-2 border-brand/80 bg-slate-900/95 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative scale-100 hover:scale-[1.01] hover:border-brand transition duration-300 ring-4 ring-brand/10">
            <div class="absolute -top-4 right-6 rounded-full bg-slate-950 border border-brand/35 px-4 py-1.5 text-[9px] font-extrabold text-brand uppercase tracking-wider shadow-md">Application Only</div>
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <span class="rounded-full bg-cyan-950/60 border border-brand/35 px-3.5 py-1 text-[11px] font-bold text-brand uppercase tracking-wider">Direct Consultation</span>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-white font-display">1-2-1 Done-For-You Service</h3>
                <p class="mt-3 text-xs leading-relaxed text-cyan-100/90">
                  Collaborate directly with Joshua's private analysis group to let experts identify inaccuracies, build dispute profiles, and structure lender architecture for you.
                </p>
              </div>
              <div class="border-t border-white/10 pt-6">
                <h4 class="text-[10px] font-bold tracking-wider text-cyan-200/80 uppercase">What's Included</h4>
                <ul class="mt-4 space-y-3 text-xs text-white/90">
                  <li class="flex gap-2 text-brand"><span>✓</span> Bespoke CIFAS / CCJ dispute team</li>
                  <li class="flex gap-2 text-brand"><span>✓</span> Personal 1-2-1 secure direct messaging</li>
                  <li class="flex gap-2 text-brand"><span>✓</span> Integrated funding introductions</li>
                </ul>
              </div>
            </div>
            <div class="mt-8 pt-4 border-t border-white/10">
              <a href="#form-card" class="block w-full text-center rounded-lg bg-brand hover:bg-white text-slate-950 text-xs font-bold py-4 tracking-widest uppercase transition-colors">APPLY FOR 1-2-1 SUPPORT</a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Support banner -->
    <section class="bg-gradient-to-b from-slate-50 via-brand-muted/20 to-slate-50 py-20 border-y border-brand/10 text-center">
      <div class="mx-auto max-w-4xl px-6 sm:px-8 space-y-6">
        <h2 class="text-2xl font-extrabold text-slate-900 font-display">Have Questions Before Requesting?</h2>
        <p class="text-sm text-slate-600 max-w-xl mx-auto">Get directly connected with Joshua's personal WhatsApp consulting queue. Receive instant feedback response.</p>
        <a href="https://wa.me/${whatsAppNumber}?text=Hi%20Joshua,%20I%20have%20questions" target="_blank" class="inline-flex items-center gap-2 rounded-lg bg-white border-2 border-brand/20 hover:border-brand-dark text-slate-900 font-bold px-6 py-3.5 text-[11px] tracking-widest uppercase shadow-md transition-all">
          <span>MESSAGE JOSHUA ON WHATSAPP</span>
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-950 text-slate-400 py-12 px-6 sm:px-8 text-xs text-center border-t border-slate-900">
      <div class="mx-auto max-w-4xl space-y-4">
        <p>&copy; 2026 Joshua's Credit Framework. All rights reserved.</p>
        <p class="text-[10px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Disclaimer: Credit improvement results can vary based on individual circumstances. All information shared here is for educational leverage, and does not substitute professional legal representation or financial banking advising.
        </p>
      </div>
    </footer>

  </div>

  <!-- Video Success Story Pop-up Modal -->
  <div id="video-modal" class="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md hidden flex items-center justify-center p-4">
    <div class="relative bg-black rounded-2xl w-full max-w-lg overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
      <div class="flex justify-between items-center px-4 py-3 bg-slate-900 text-white font-display border-b border-slate-800">
        <span id="modal-client-title" class="text-xs font-bold tracking-wide">Client Review</span>
        <button onclick="closeVideoModal()" class="text-slate-400 hover:text-white transition">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="aspect-[9/16] w-full max-w-[280px] mx-auto p-4 flex items-center justify-center bg-black">
        <iframe id="modal-iframe" class="w-full h-full rounded-xl bg-black" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>

  <!-- Main Submission JavaScript Handlers -->
  <script>
    // Form handling & fetch submission logic
    const googleWebAppUrl = "${googleWebAppUrl !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL' ? googleWebAppUrl : ''}";
    const whatsAppNumber = "${whatsAppNumber}";
    const customMessageTemplate = \`${customMessage}\`;

    const optInForm = document.getElementById('optin-form');
    const leadNameInput = document.getElementById('lead-name');
    const leadEmailInput = document.getElementById('lead-email');
    const submitBtn = document.getElementById('submit-btn');
    const successView = document.getElementById('success-view');
    const formHeader = document.getElementById('form-header');
    const whatsappClickBtn = document.getElementById('whatsapp-click-btn');

    optInForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const nameVal = leadNameInput.value.trim();
      const emailVal = leadEmailInput.value.trim();
      
      if (!nameVal || !emailVal) return;

      // Show loader state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Processing Securing...</span>';

      try {
        if (googleWebAppUrl) {
          await fetch(googleWebAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: nameVal,
              email: emailVal,
              source: 'Standalone Squeeze HTML Page',
              timestamp: new Date().toISOString()
            })
          });
        }
      } catch (err) {
        console.error('Error logging to spreadsheet:', err);
      } finally {
        // Build customized WhatsApp Redirect Link
        let message = customMessageTemplate
          .replace(/{NAME}/g, nameVal)
          .replace(/{EMAIL}/g, emailVal);
          
        const targetWaUrl = "https://wa.me/" + whatsAppNumber + "?text=" + encodeURIComponent(message);
        
        // Hide form and open Success
        optInForm.classList.add('hidden');
        formHeader.classList.add('hidden');
        successView.classList.remove('hidden');
        whatsappClickBtn.href = targetWaUrl;

        // Auto-attempt opening whatsapp in new tab
        window.open(targetWaUrl, '_blank');
      }
    });

    // Story Video Overlays trigger
    function playClientVideo(videoId, name, title) {
      const modal = document.getElementById('video-modal');
      const iframe = document.getElementById('modal-iframe');
      const titleSpan = document.getElementById('modal-client-title');
      
      titleSpan.innerText = name + " - " + title;
      iframe.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&mute=0&rel=0";
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeVideoModal() {
      const modal = document.getElementById('video-modal');
      const iframe = document.getElementById('modal-iframe');
      
      iframe.src = '';
      modal.classList.remove('flex');
      modal.classList.add('hidden');
    }
  </script>
</div>`;
  };

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(appsScriptCode);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(generateStandaloneHtml());
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadHtml = () => {
    try {
      const htmlContent = generateStandaloneHtml();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'joshua-credit-squeeze-page.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download html: ', err);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      googleWebAppUrl: googleWebAppUrl.trim(),
      whatsAppNumber: whatsAppNumber.replace(/[^0-9]/g, '').trim(),
      customMessage: customMessage,
      freeTrainingUrl: freeTrainingUrl.trim()
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <>
      {/* Settings Toggle Trigger Button floating in bottom-right anchor */}
      <button
        id="settings-trigger-btn"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 border border-white/10 text-slate-400 shadow-2xl hover:bg-slate-800 hover:text-brand hover:border-brand/30 transition-all duration-300 group cursor-pointer"
        aria-label="Open Integration Settings"
      >
        <Cog className="h-6 w-6 animate-spin-slow group-hover:rotate-45 transition-transform" />
      </button>

      {/* Slide-over sidebar panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
            <div className="w-screen max-w-lg bg-slate-950 border-l border-white/10 shadow-2xl flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="px-6 py-6 border-b border-white/10 bg-slate-900 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <Cog className="h-5 w-5 text-brand" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                    Campaign Orchestrator
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Sub-Tabs Selector menu list */}
              <div className="flex border-b border-white/10 bg-slate-900/60 p-1 shrink-0">
                <button
                  onClick={() => setActiveTab("config")}
                  className={`flex-1 py-2 text-[10px] font-bold tracking-wide uppercase rounded transition-all text-center ${
                    activeTab === "config"
                      ? "bg-slate-800 text-brand shadow-sm ring-1 ring-white/10"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  1. Config
                </button>
                <button
                  onClick={() => setActiveTab("script")}
                  className={`flex-1 py-2 text-[10px] font-bold tracking-wide uppercase rounded transition-all text-center ${
                    activeTab === "script"
                      ? "bg-slate-800 text-brand shadow-sm ring-1 ring-white/10"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  2. Google Script
                </button>
                <button
                  onClick={() => setActiveTab("standalone")}
                  className={`flex-1 py-2 text-[10px] font-bold tracking-wide uppercase rounded transition-all text-center ${
                    activeTab === "standalone"
                      ? "bg-slate-800 text-brand shadow-sm ring-1 ring-white/10 animate-pulse"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  3. Export HTML
                </button>
              </div>

              {/* Form Core scrollable contents */}
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                {activeTab === "config" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="rounded-xl bg-slate-900 p-4 border border-white/10 text-xs text-slate-400 space-y-2 leading-relaxed">
                      <p className="font-semibold text-brand">
                        ⚡ Live Campaign Variables
                      </p>
                      <p>
                        Configure where your opt-ins are recorded and how
                        mentors and client success stories redirect to private
                        channels. Updates are propagated immediately.
                      </p>
                    </div>

                    <form onSubmit={handleSave} className="space-y-4">
                      {/* Google Web App URL Field */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Database className="h-3.5 w-3.5 text-brand" />
                            Google sheets Apps Script Web App URL
                          </span>
                        </label>
                        <input
                          type="url"
                          value={googleWebAppUrl}
                          onChange={(e) => setGoogleWebAppUrl(e.target.value)}
                          placeholder="e.g. https://script.google.com/macros/s/.../exec"
                          className="w-full rounded-lg bg-slate-900 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition"
                        />
                        <p className="text-[10px] text-slate-500">
                          Deploy as Apps Script (Tab 2) to log anonymous
                          submissions instantly.
                        </p>
                      </div>

                      {/* WhatsApp Recipient Phone Number Field */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5 text-brand" />
                            Joshua's WhatsApp Number
                          </span>
                        </label>
                        <input
                          type="text"
                          value={whatsAppNumber}
                          onChange={(e) => setWhatsAppNumber(e.target.value)}
                          placeholder="e.g. 447424445868"
                          className="w-full rounded-lg bg-slate-900 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition"
                        />
                        <p className="text-[10px] text-slate-500 font-mono font-semibold">
                          Must be international format only without
                          symbols/spaces (e.g. 447123456789).
                        </p>
                      </div>

                      {/* Free Training Video URL Field */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Video className="h-3.5 w-3.5 text-brand" />
                            Free Masterclass Video Link (YouTube Shorts / Video)
                          </span>
                        </label>
                        <input
                          type="url"
                          value={freeTrainingUrl}
                          onChange={(e) => setFreeTrainingUrl(e.target.value)}
                          placeholder="e.g. https://youtube.com/shorts/7JLKIPsRREQ"
                          className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                        />
                        <p className="text-[10px] text-slate-500">
                          Presented key training video loaded in post-submission
                          iframe view.
                        </p>
                      </div>

                      {/* WhatsApp Custom Message Prompt Area */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Custom Pre-filled WhatsApp Prompt
                        </label>
                        <textarea
                          value={customMessage}
                          onChange={(e) => setCustomMessage(e.target.value)}
                          rows={4}
                          className="w-full rounded-lg bg-slate-900 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition font-mono"
                          placeholder="Use {NAME} and {EMAIL} as dynamic placeholders."
                        />
                        <p className="text-[10px] text-slate-500">
                          You can write any text message. "{`{NAME}`}" and "
                          {`{EMAIL}`}" will be replaced automatically.
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-brand hover:bg-brand-hover px-4 py-2.5 text-xs font-bold text-slate-950 transition cursor-pointer shadow-md"
                      >
                        {isSaved ? (
                          <>
                            <Check className="h-4 w-4" />
                            SETTINGS INSTANTLY LOCALIZED
                          </>
                        ) : (
                          "SAVE CONFIGURATIONS"
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {activeTab === "script" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="border-t border-white/10 pt-1 space-y-3">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wide flex items-center gap-1.5">
                        <HelpCircle className="h-4 w-4 text-brand" />
                        Set Up Your Google Sheets Infrastructure
                      </h3>

                      <ol className="text-xs text-slate-400 space-y-2 list-decimal list-inside leading-relaxed">
                        <li>Create an empty Google Sheet.</li>
                        <li>
                          Go to <b>Extensions &gt; Apps Script</b>.
                        </li>
                        <li>Paste the Apps Script source code shown below.</li>
                        <li>
                          Click <b>Deploy &gt; New deployment</b>.
                        </li>
                        <li>
                          Select Web app type, Execute as: <b>"Me"</b>, Access:{" "}
                          <b>"Anyone"</b>.
                        </li>
                        <li>
                          Copy the web app URL into your config box in Tab 1.
                        </li>
                      </ol>

                      {/* Copy code banner Container */}
                      <div className="relative mt-2 rounded-xl bg-slate-900 border border-white/10 overflow-hidden">
                        <div className="flex justify-between items-center px-4 py-2 border-b border-white/10 bg-slate-800/60">
                          <span className="text-[9px] font-mono text-slate-500">
                            apps-script-source-code.gs
                          </span>
                          <button
                            onClick={handleCopyScript}
                            className="flex items-center gap-1 text-[10px] text-brand hover:text-brand/80 transition-all font-semibold cursor-pointer"
                          >
                            {copiedScript ? (
                              <>
                                <Check className="h-3.5 w-3.5" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Clipboard className="h-3.5 w-3.5" />
                                Copy Code
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-[10px] text-slate-400 font-mono overflow-x-auto max-h-56 leading-normal bg-slate-900/50">
                          {appsScriptCode}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "standalone" && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="rounded-xl bg-brand-muted/10 p-4 border border-brand/20 text-xs text-slate-400 space-y-2 leading-relaxed">
                      <p className="font-semibold text-brand flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5 text-brand" />
                        Aesthetic Standalone Squeeze Page
                      </p>
                      <p>
                        This dynamically gathers all variables configured in Tab
                        1 (your WhatsApp redirect template, lead spreadsheet
                        triggers, video playback URLs, brand color grids) and
                        bundles them into an{" "}
                        <b>optimal, standalone single-file HTML landing page</b>
                        .
                      </p>
                      <p className="text-[11px] font-semibold text-slate-300">
                        No React server node required! Save and host it anywhere
                        (Netlify, Vercel, cPanel, or local folders) instantly.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 shrink-0">
                      <button
                        onClick={handleCopyHtml}
                        className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 text-white font-bold text-xs py-3 px-2 shadow hover:bg-slate-800 transition cursor-pointer"
                      >
                        {copiedHtml ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-brand" />
                            Copied Standalone!
                          </>
                        ) : (
                          <>
                            <Clipboard className="h-3.5 w-3.5" />
                            Copy HTML Code
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleDownloadHtml}
                        className="flex items-center justify-center gap-2 rounded-lg bg-brand hover:bg-brand-hover text-slate-950 font-bold text-xs py-3 px-2 shadow transition cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download HTML File
                      </button>
                    </div>

                    {/* Interactive Code preview box */}
                    <div className="rounded-xl bg-slate-900 border border-white/10 overflow-hidden">
                      <div className="flex justify-between items-center px-4 py-2 border-b border-white/10 bg-slate-800/60">
                        <span className="text-[9px] font-mono text-slate-500">
                          compiled-standalone-squeeze.html
                        </span>
                        <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Tailwind Play CDN Ready
                        </span>
                      </div>
                      <pre className="p-4 text-[9px] text-slate-400 font-mono overflow-x-auto max-h-56 leading-normal bg-slate-900/50">
                        {generateStandaloneHtml()}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
