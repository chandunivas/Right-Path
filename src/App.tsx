import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { UserProfile, VerificationQuery, CitationSource } from "./types";
import { COUNTRIES } from "./data/countries";
import { Header } from "./components/Header";
import { AuthModal } from "./components/AuthModal";
import { ProfileSettingsModal } from "./components/ProfileSettingsModal";
import { VoiceRecorder } from "./components/VoiceRecorder";
import { ReportView } from "./components/ReportView";
import { HistoryDrawer } from "./components/HistoryDrawer";
import { SplashScreen } from "./components/SplashScreen";
import { AZ_LANGUAGES } from "./data/languages";
import {
  ShieldCheck,
  Search,
  Sparkles,
  Loader2,
  ArrowRight,
  AlertCircle,
  Globe2,
  Globe,
  Mic,
  MessageSquare,
  Volume2,
} from "lucide-react";

const INITIAL_USER: UserProfile = {
  id: "user_default",
  firstName: "Anand",
  middleName: "",
  lastName: "Sharma",
  mobileNumber: "+91 98765 43210",
  email: "anand.sharma@example.com",
  country: "India",
  state: "Delhi",
  preferredLanguage: "English",
  profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  isLoggedIn: true,
};

export default function App() {
  // Persistence state
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("rightsguard_user_profile");
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [history, setHistory] = useState<VerificationQuery[]>(() => {
    const saved = localStorage.getItem("rightsguard_history");
    return saved ? JSON.parse(saved) : [];
  });

  // UI state
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<"verify" | "history">("verify");
  const [inputMode, setInputMode] = useState<"voice" | "text" | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);

// Verification Search State
  const [voiceInputLanguage, setVoiceInputLanguage] = useState<string>("Telugu");
  const [queryText, setQueryText] = useState("");
  const [isResearching, setIsResearching] = useState(false);
  const [researchStep, setResearchStep] = useState<string>("");
  const [activeReport, setActiveReport] = useState<{
    queryText: string;
    reportMarkdown: string;
    sources: CitationSource[];
    language: string;
    timestamp: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("rightsguard_user_profile", JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem("rightsguard_history", JSON.stringify(history));
  }, [history]);

  const selectedCountryObj =
    COUNTRIES.find((c) => c.name === userProfile.country) || COUNTRIES[0];

  const handleRunVerification = async (scenarioText?: string, targetLangOverride?: string) => {
    const textToSubmit = scenarioText || queryText;
    if (!textToSubmit.trim()) {
      setErrorMsg("Please type or speak your fraud, fine, or rights query.");
      return;
    }

    const langToUse = targetLangOverride || userProfile.preferredLanguage || "Auto / Same as Input Language";

    setErrorMsg(null);
    setIsResearching(true);

    // Research progress animation sequence
    const steps = [
      "Analyzing user situation & detecting legal domain...",
      `Searching official ${userProfile.country} regulatory databases & statutory circulars...`,
      `Verifying legal fine formulas & rights for ${userProfile.country} (${userProfile.state || "All Regions"})...`,
      "Compiling verified statutory anti-fraud report & resolution script...",
    ];

    let stepIdx = 0;
    setResearchStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setResearchStep(steps[stepIdx]);
      }
    }, 1100);

    try {
      const response = await fetch("/api/verify-rights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: textToSubmit,
          country: userProfile.country,
          state: userProfile.state,
          category: "Automated Domain Analysis",
          preferredLanguage: langToUse,
          userProfile: {
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
          },
        }),
      });

      const data = await response.json();
      clearInterval(stepInterval);

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch verification report.");
      }

      const reportObj = {
        queryText: textToSubmit,
        reportMarkdown: data.report,
        sources: data.sources || [],
        language: langToUse,
        timestamp: new Date().toISOString(),
      };

      setActiveReport(reportObj);

      // Auto save to history
      const newHistoryItem: VerificationQuery = {
        id: `query_${Date.now()}`,
        queryText: textToSubmit,
        category: "General Inquiry",
        country: userProfile.country,
        state: userProfile.state,
        language: langToUse,
        timestamp: new Date().toISOString(),
        reportMarkdown: data.report,
        sources: data.sources || [],
      };

      setHistory((prev) => [newHistoryItem, ...prev]);
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error("Verification error:", err);
      setErrorMsg(
        err?.message || "Failed to complete research. Please verify internet connectivity and try again."
      );
    } finally {
      setIsResearching(false);
    }
  };

  const handleSelectPopularQuery = (popularQuery: string) => {
    setQueryText(popularQuery);
    handleRunVerification(popularQuery);
  };

  const handleSelectHistoryItem = (item: VerificationQuery) => {
    setActiveReport({
      queryText: item.queryText,
      reportMarkdown: item.reportMarkdown,
      sources: item.sources,
      language: item.language,
      timestamp: item.timestamp,
    });
    setActiveTab("verify");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased flex flex-col">
      {/* Intro Splash Animation */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <Header
        userProfile={userProfile}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfileSettings={() => setIsProfileSettingsOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={history.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Verification Tab */}
        {activeTab === "verify" && (
          <div className="space-y-8">
            {/* Hero Console */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
              {/* Options Selection Header & Options */}
              <div className="space-y-6">
                {inputMode === null ? (
                  <>
                    {/* Big Two Options: Voice vs Text */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Big Voice Option */}
                        <button
                          type="button"
                          onClick={() => setInputMode("voice")}
                          className="p-6 rounded-2xl border-2 border-slate-200 bg-slate-50/80 hover:bg-slate-100 hover:border-emerald-500 hover:shadow-md text-left transition-all duration-200 flex items-start gap-4 cursor-pointer relative overflow-hidden group"
                        >
                          <div className="p-4 rounded-2xl shrink-0 bg-emerald-600 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                            <Mic className="w-8 h-8" />
                          </div>
                          <div className="space-y-1.5 flex-1">
                            <span className="font-extrabold text-base text-slate-900 block">Voice Input (Speak)</span>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                              Speak your problem directly using the circular voice microphone in your local language.
                            </p>
                          </div>
                        </button>

                        {/* Big Text Option */}
                        <button
                          type="button"
                          onClick={() => setInputMode("text")}
                          className="p-6 rounded-2xl border-2 border-slate-200 bg-slate-50/80 hover:bg-slate-100 hover:border-emerald-500 hover:shadow-md text-left transition-all duration-200 flex items-start gap-4 cursor-pointer relative overflow-hidden group"
                        >
                          <div className="p-4 rounded-2xl shrink-0 bg-emerald-600 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                            <MessageSquare className="w-8 h-8" />
                          </div>
                          <div className="space-y-1.5 flex-1">
                            <span className="font-extrabold text-base text-slate-900 block">Text Input</span>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                              Type out your problem or scenario manually using the keyboard.
                            </p>
                          </div>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                          {inputMode === "voice" ? "Voice Input Mode" : "Text Input Mode"}
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setInputMode(null);
                          setQueryText("");
                        }}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Change Input Method</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Input Controls Container */}
                <div className="pt-1 space-y-4">

                  {/* VOICE MODE ONLY */}
                  {inputMode === "voice" && (
                    <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-6 text-center animate-fadeIn">
                      <div className="max-w-md mx-auto space-y-1">
                        <h3 className="text-sm font-extrabold text-slate-900 flex items-center justify-center gap-2">
                          <Mic className="w-4 h-4 text-emerald-600" />
                          <span>Voice Input Mode</span>
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          Tap the round microphone symbol, select your language, and state your problem.
                        </p>
                      </div>

                      {/* Prominent Round Voice Mic Symbol Component */}
                      <VoiceRecorder
                        inputLanguage={voiceInputLanguage}
                        onTranscript={(text) => setQueryText(text)}
                        onInputLanguageChange={(langName) => setVoiceInputLanguage(langName)}
                      />

                      {queryText && (
                        <div className="p-4 bg-emerald-50 border border-emerald-200/80 rounded-xl space-y-2 max-w-2xl mx-auto text-left">
                          <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                            <span>Captured Spoken Scenario (Editable):</span>
                            <button
                              type="button"
                              onClick={() => setQueryText("")}
                              className="text-[11px] text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                            >
                              Clear & Record Again
                            </button>
                          </div>
                          <textarea
                            rows={3}
                            value={queryText}
                            onChange={(e) => setQueryText(e.target.value)}
                            placeholder="Your spoken scenario will appear here. You can also edit or type directly..."
                            className="w-full text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed bg-white p-3 rounded-xl border border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden shadow-xs resize-y"
                          />
                          <p className="text-[11px] text-slate-500 italic">
                            Tip: You can edit or add missing details above before clicking 'Verify Rights'.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TEXT MODE ONLY */}
                  {inputMode === "text" && (
                    <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-4 animate-fadeIn">
                      <div className="space-y-1 pb-2 border-b border-slate-200/80">
                        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-emerald-600" />
                          <span>Text Input Mode</span>
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          Type out your problem or scenario manually using the keyboard.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <textarea
                          rows={5}
                          value={queryText}
                          onChange={(e) => setQueryText(e.target.value)}
                          placeholder="Type your scenario in detail (e.g., T.C on train asking ₹20,000 fine, bank minimum balance debit, cyber fraud call, hotel overcharging...)"
                          className="w-full p-4 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white shadow-xs resize-y font-medium text-slate-800"
                        />
                      </div>
                    </div>
                  )}

                  {errorMsg && (
                    <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit Button (Only shown when an option is selected) */}
                  {inputMode !== null && (
                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        disabled={isResearching}
                        onClick={() => handleRunVerification()}
                        className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                      >
                        {isResearching ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Performing Live Research...</span>
                          </>
                        ) : (
                          <>
                            <Search className="w-4 h-4" />
                            <span>Verify Rights & Rules (Live Search)</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

              {/* Research Progress Animation */}
              {isResearching && (
                <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3 animate-pulse">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Live Grounded Government Research in Progress
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-200">{researchStep}</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-3/4 animate-pulse rounded-full"></div>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Cross-referencing official government databases, gazettes, and statutory fine schedules for {userProfile.country}...
                  </p>
                </div>
              )}
            </div>

            {/* Verification Report Display */}
            {activeReport && !isResearching && (
              <ReportView
                reportMarkdown={activeReport.reportMarkdown}
                sources={activeReport.sources}
                language={activeReport.language}
                queryText={activeReport.queryText}
                onChangeLanguage={(newLang) => handleRunVerification(activeReport.queryText, newLang)}
              />
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <HistoryDrawer
            history={history}
            onSelectQuery={handleSelectHistoryItem}
            onClearHistory={() => setHistory([])}
            onDeleteQuery={(id) => setHistory((prev) => prev.filter((h) => h.id !== id))}
          />
        )}
      </main>


      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(profile) => setUserProfile(profile)}
        currentProfile={userProfile}
      />

      {userProfile && (
        <ProfileSettingsModal
          isOpen={isProfileSettingsOpen}
          onClose={() => setIsProfileSettingsOpen(false)}
          userProfile={userProfile}
          onUpdateProfile={(updated) => setUserProfile(updated)}
          onLogout={() => {
            setUserProfile({
              ...INITIAL_USER,
              isLoggedIn: false,
            });
          }}
        />
      )}
    </div>
  );
}
