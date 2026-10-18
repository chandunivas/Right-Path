import React from "react";
import { UserProfile } from "../types";
import { COUNTRIES } from "../data/countries";
import { motion } from "motion/react";
import { FairWorldLogo } from "./FairWorldLogo";
import {
  ShieldCheck,
  User,
  History,
  Search,
  Globe,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

interface HeaderProps {
  userProfile: UserProfile | null;
  onOpenAuth: () => void;
  onOpenProfileSettings: () => void;
  activeTab: "verify" | "history";
  setActiveTab: (tab: "verify" | "history") => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  onOpenAuth,
  onOpenProfileSettings,
  activeTab,
  setActiveTab,
  historyCount,
}) => {
  const currentCountryObj = COUNTRIES.find(
    (c) => c.name === (userProfile?.country || "India")
  ) || COUNTRIES[0];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Animated Logo & Brand Name */}
          <div
            onClick={() => setActiveTab("verify")}
            className="flex items-center gap-3 cursor-pointer group shrink-0 py-1"
          >
            {/* Logo: People running toward the fair world */}
            <motion.div
              className="relative flex items-center justify-center shrink-0"
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Animated Glow Aura */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-2xl blur-md"
                animate={{
                  opacity: [0.45, 0.85, 0.45],
                  scale: [0.96, 1.05, 0.96],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <FairWorldLogo className="w-10 h-10 relative z-10" size={42} animated={true} />
            </motion.div>

            {/* App Name & Single-Line Tagline with Animations */}
            <div className="space-y-0.5">
              <motion.div
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h1 className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-white via-emerald-100 to-teal-300 bg-clip-text text-transparent leading-tight drop-shadow-xs">
                  RightPath
                </h1>
                <motion.span
                  className="inline-flex text-emerald-400"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 fill-emerald-400/20" />
                </motion.span>
              </motion.div>

              {/* Tagline: Single Line Guaranteed */}
              <motion.div
                className="relative overflow-hidden"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <p className="text-[10px] sm:text-[11px] font-medium tracking-wide flex items-center gap-1 whitespace-nowrap overflow-hidden">
                  <motion.span
                    className="text-emerald-300 font-bold whitespace-nowrap"
                    animate={{ color: ["#6ee7b7", "#a7f3d0", "#6ee7b7"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    Know Your Rights.
                  </motion.span>
                  <span className="text-teal-200/90 font-medium whitespace-nowrap">
                    Make Confident Decisions.
                  </span>
                </p>

                {/* Subtle animated beam line under tagline */}
                <motion.div
                  className="h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full"
                  animate={{
                    x: ["-100%", "100%"],
                    opacity: [0, 0.85, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab("verify")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "verify"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/60"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Verify Rights & Fines</span>
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "history"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/60"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Chat History</span>
              {historyCount > 0 && (
                <span className="px-1.5 py-0.2 bg-emerald-500/30 text-emerald-300 text-[10px] font-bold rounded-full">
                  {historyCount}
                </span>
              )}
            </button>
          </nav>

          {/* User Account / Sign In Widget */}
          <div className="flex items-center gap-3">
            {userProfile?.isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenProfileSettings}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-xl transition-all group"
                  title="Profile Settings"
                >
                  <img
                    src={userProfile.profilePicture}
                    alt={userProfile.firstName}
                    className="w-7 h-7 rounded-full object-cover border border-emerald-500 shrink-0"
                  />
                  <div className="text-left hidden lg:block">
                    <div className="text-xs font-bold text-slate-100 flex items-center gap-1">
                      <span>{userProfile.firstName}</span>
                      <span className="text-xs">{currentCountryObj.flag}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {userProfile.preferredLanguage} • {userProfile.country}
                    </div>
                  </div>
                  <Settings className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In / Sign Up</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab("verify")}
            className={`py-1 px-2 rounded-lg flex flex-col items-center gap-0.5 ${
              activeTab === "verify" ? "text-emerald-400 font-bold" : "text-slate-400"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Verify</span>
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`py-1 px-2 rounded-lg flex flex-col items-center gap-0.5 ${
              activeTab === "history" ? "text-emerald-400 font-bold" : "text-slate-400"
            }`}
          >
            <History className="w-4 h-4" />
            <span>History ({historyCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
