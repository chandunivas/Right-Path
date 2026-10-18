import React, { useState } from "react";
import Markdown from "react-markdown";
import { CitationSource } from "../types";
import { getSpeechLanguageCode, AZ_LANGUAGES } from "../data/languages";
import {
  ShieldAlert,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ExternalLink,
  Download,
  Share2,
  MessageSquareQuote,
  Sparkles,
  BookOpenCheck,
  Globe,
} from "lucide-react";

interface ReportViewProps {
  reportMarkdown: string;
  sources: CitationSource[];
  language: string;
  queryText: string;
  onSaveHistory?: () => void;
  isSaved?: boolean;
  onChangeLanguage?: (newLanguage: string) => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  reportMarkdown,
  sources,
  language,
  queryText,
  onSaveHistory,
  isSaved = false,
  onChangeLanguage,
}) => {
  const [copied, setCopied] = useState(false);
  const [scriptCopied, setScriptCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Extract smart dealing script from markdown if present
  const extractDealingScript = (): string | null => {
    const scriptMatch =
      reportMarkdown.match(/💬 \*\*Smart Dealing Script\*\*[\s\S]*?(?=\n\n|\n#|$)/) ||
      reportMarkdown.match(/Smart Dealing Script[\s\S]*?(?=\n\n|\n#|$)/);
    return scriptMatch ? scriptMatch[0].replace(/.*Smart Dealing Script.*\n?/, "").trim() : null;
  };

  const dealingScript = extractDealingScript();

  const handleCopyReport = () => {
    navigator.clipboard.writeText(reportMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyScript = () => {
    if (dealingScript) {
      navigator.clipboard.writeText(dealingScript.replace(/\*+/g, ""));
      setScriptCopied(true);
      setTimeout(() => setScriptCopied(false), 2000);
    }
  };

  const handleTextToSpeech = () => {
    if (!("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = reportMarkdown.replace(/[#*`_\[\]()]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 1500)); // Read first section
    
    // Set speech language code based on selected A-Z language
    utterance.lang = getSpeechLanguageCode(language);

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleDownloadReport = () => {
    const element = document.createElement("a");
    const file = new Blob([`RIGHTSGUARD ANTI-FRAUD VERIFICATION REPORT\nQuery: ${queryText}\nDate: ${new Date().toLocaleString()}\n\n${reportMarkdown}`], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `RightsGuard_Report_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden mt-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-md border border-emerald-500/30 uppercase tracking-wider">
                Live Grounded Research Report
              </span>
              <span className="text-xs text-slate-400">• Current Language: {language}</span>
            </div>
            <h3 className="text-base font-bold mt-0.5">Statutory Verification & Legal Defense Report</h3>
          </div>
        </div>

        {/* Action Controls & Language Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Change Language Selector */}
          {onChangeLanguage && (
            <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1">
              <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <label className="text-xs font-semibold text-slate-300 whitespace-nowrap">
                Change Language:
              </label>
              <select
                value={language}
                onChange={(e) => onChangeLanguage(e.target.value)}
                className="bg-slate-900 text-white text-xs font-bold rounded-lg px-2 py-1 border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden cursor-pointer"
                title="Change the report language"
              >
                <option value="Auto / Same as Input Language">🌐 Auto (Same as Input Language)</option>
                {AZ_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.name}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="button"
            onClick={handleTextToSpeech}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isSpeaking
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Stop Audio</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Listen ({language})</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyReport}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? "Copied Report" : "Copy Report"}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadReport}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Download</span>
          </button>

          {onSaveHistory && (
            <button
              type="button"
              onClick={onSaveHistory}
              disabled={isSaved}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isSaved
                  ? "bg-emerald-950/60 text-emerald-300 border-emerald-800/80 cursor-default"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-sm"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isSaved ? "Saved to History" : "Save to History"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Dealing Script Box (If present) */}
      {dealingScript && (
        <div className="bg-amber-50 border-b border-amber-200 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-amber-700 shrink-0" />
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Instant Smart Dealing Script (Speak this directly to Officer/Agent)
              </h4>
            </div>
            <button
              type="button"
              onClick={handleCopyScript}
              className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 text-amber-900 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors shrink-0"
            >
              {scriptCopied ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3 text-amber-800" />}
              <span>{scriptCopied ? "Script Copied!" : "Copy Script"}</span>
            </button>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-amber-200 text-xs text-slate-800 font-mono leading-relaxed shadow-xs">
            {dealingScript.replace(/\*+/g, "")}
          </div>
        </div>
      )}

      {/* Main Report Body */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="markdown-body text-slate-800 text-sm leading-relaxed space-y-4">
          <Markdown>{reportMarkdown}</Markdown>
        </div>

        {/* Verified Sources / Citations */}
        {sources && sources.length > 0 && (
          <div className="pt-6 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Verified Official Government & Regulatory Sources ({sources.length}):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 rounded-xl text-xs transition-all flex items-center justify-between group"
                >
                  <span className="font-medium text-slate-700 group-hover:text-emerald-900 truncate max-w-[85%]">
                    {src.title || src.url}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
