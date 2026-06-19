import React, { useState } from 'react';
import { AppSettings } from '../types';
import { Cog, X, Clipboard, Check, ExternalLink, HelpCircle, Phone, Database, Video } from 'lucide-react';

interface SettingsPanelProps {
  settings: AppSettings;
  onSave: (newSettings: AppSettings) => void;
}

export default function SettingsPanel({ settings, onSave }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [googleWebAppUrl, setGoogleWebAppUrl] = useState(settings.googleWebAppUrl);
  const [whatsAppNumber, setWhatsAppNumber] = useState(settings.whatsAppNumber);
  const [customMessage, setCustomMessage] = useState(settings.customMessage);
  const [freeTrainingUrl, setFreeTrainingUrl] = useState(settings.freeTrainingUrl || 'https://youtube.com/shorts/7JLKIPsRREQ');
  
  const [copied, setCopied] = useState(false);
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
    sheet.appendRow(["Timestamp", "First & Last Name", "Email Address"]);
  }
  
  try {
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    sheet.appendRow([timestamp, data.name, data.email]);
    
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

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(appsScriptCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
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
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-300 shadow-2xl hover:bg-slate-800 hover:text-emerald-400 transition-all duration-300 group"
        aria-label="Open Integration Settings"
      >
        <Cog className="h-6 w-6 animate-spin-slow group-hover:rotate-45 transition-transform" />
      </button>

      {/* Slide-over sidebar panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-md">
          <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
            <div className="w-screen max-w-lg bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col h-full overflow-y-auto">
              
              {/* Header */}
              <div className="px-6 py-6 border-b border-indigo-950/20 bg-slate-950 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Cog className="h-5 w-5 text-emerald-400" />
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">Campaign Settings</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form Core */}
              <div className="flex-1 p-6 space-y-6">
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 text-xs text-slate-400 space-y-2 leading-relaxed">
                  <p className="font-semibold text-emerald-400">⚡ Live Squeeze Page Integrations</p>
                  <p>
                    Update these settings to instantly change where your lead details are stored and how they redirect to WhatsApp. Data is kept locally in your browser.
                  </p>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                  {/* Google Web App URL Field */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Database className="h-3 w-3 text-emerald-400" />
                        Google Sheet APPS Script Web App URL
                      </span>
                    </label>
                    <input
                      type="url"
                      value={googleWebAppUrl}
                      onChange={(e) => setGoogleWebAppUrl(e.target.value)}
                      placeholder="e.g. https://script.google.com/macros/s/.../exec"
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                    <p className="text-[10px] text-slate-500">
                      The sheet destination for logging submissions anonymously.
                    </p>
                  </div>

                  {/* WhatsApp Recipient Phone Number Field */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-emerald-400" />
                        Joshua's WhatsApp Number
                      </span>
                    </label>
                    <input
                      type="text"
                      value={whatsAppNumber}
                      onChange={(e) => setWhatsAppNumber(e.target.value)}
                      placeholder="e.g. 447000000000"
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                    <p className="text-[10px] text-slate-500 font-mono">
                      Must be international format without symbols (e.g. 447123456789).
                    </p>
                  </div>

                  {/* Free Training Video URL Field */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Video className="h-3 w-3 text-emerald-400" />
                        Free Training Video Link (YouTube Shorts / Video)
                      </span>
                    </label>
                    <input
                      type="url"
                      value={freeTrainingUrl}
                      onChange={(e) => setFreeTrainingUrl(e.target.value)}
                      placeholder="e.g. https://youtube.com/shorts/..."
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                    <p className="text-[10px] text-slate-500">
                      The video users are presented with after successfully registering/submitting the lead form.
                    </p>
                  </div>

                  {/* WhatsApp Custom Message Prompt Area */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Custom Pre-Filled WhatsApp Template
                    </label>
                    <textarea
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      rows={4}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition font-mono"
                      placeholder={`Use {NAME} and {EMAIL} as dynamic placeholders.`}
                    />
                    <p className="text-[10px] text-slate-500">
                      You can write any message. "{`{NAME}`}" and "{`{EMAIL}`}" will be replaced automatically.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition"
                  >
                    {isSaved ? (
                      <>
                        <Check className="h-4 w-4" />
                        SETTINGS APPLIED &amp; LOCALIZED
                      </>
                    ) : (
                      'SAVE CONFIGURATIONS'
                    )}
                  </button>
                </form>

                {/* Google Sheets Setup Instructions & Apps Script Source Copying */}
                <div className="border-t border-slate-800 pt-6 space-y-3">
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4 text-emerald-400" />
                    Set Up Your Google Sheets Destination
                  </h3>
                  
                  <ol className="text-xs text-slate-400 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>Create a empty Google Sheet.</li>
                    <li>Go to <b>Extensions &gt; Apps Script</b>.</li>
                    <li>Paste the Apps Script source code shown below.</li>
                    <li>Click <b>Deploy &gt; New deployment</b>.</li>
                    <li>Select Web app type, Execute as: <b>"Me"</b>, Access: <b>"Anyone"</b>.</li>
                    <li>Copy the web app URL into your config box above.</li>
                  </ol>

                  {/* Copy code banner Container */}
                  <div className="relative mt-2 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                    <div className="flex justify-between items-center px-4 py-2 border-b border-slate-800 bg-slate-950">
                      <span className="text-[9px] font-mono text-slate-500">apps-script-source-code.gs</span>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 transition"
                      >
                        {copied ? (
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
                    <pre className="p-4 text-[10px] text-slate-300 font-mono overflow-x-auto max-h-48 leading-normal">
                      {appsScriptCode}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
