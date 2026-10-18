import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FairWorldLogo } from "./FairWorldLogo";
import { ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fill progress bar smoothly over 2.5s
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    // Auto complete at 2.8s
    const timeout = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden select-none"
    >
      {/* Immersive Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Emerald Glow */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.35, 0.65, 0.35],
            x: ["-10%", "10%", "-10%"],
            y: ["-10%", "5%", "-10%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
        />

        {/* Bottom Teal Glow */}
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
            x: ["10%", "-10%", "10%"],
            y: ["10%", "-5%", "10%"],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
        />

        {/* Center Accent Aura */}
        <motion.div
          animate={{
            scale: [0.8, 1.15, 0.8],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-600/15 via-cyan-500/10 to-transparent rounded-full blur-2xl"
        />

        {/* Subtle Floating Spark Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 600),
              opacity: 0.1,
            }}
            animate={{
              y: ["-20px", "20px"],
              opacity: [0.2, 0.7, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            className="absolute w-2 h-2 bg-emerald-400 rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* Main Container Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg px-6 space-y-8">
        {/* Super Attractive & People-Friendly Animated Logo */}
        <div className="relative">
          {/* Pulsing Outer Rings */}
          <motion.div
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            className="absolute -inset-4 rounded-3xl bg-emerald-500/30 blur-md"
          />

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.1, 0.4],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
            className="absolute -inset-8 rounded-full border border-emerald-400/30"
          />

          {/* Central Logo Badge */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative cursor-pointer group"
            onClick={onComplete}
          >
            <div className="relative p-2 bg-slate-900/80 rounded-3xl border border-emerald-400/40 shadow-2xl shadow-emerald-900/60 backdrop-blur-md">
              <FairWorldLogo className="w-24 h-24 sm:w-28 sm:h-28" size={112} animated={true} />
            </div>

            {/* Sparkle Accent */}
            <motion.div
              animate={{ rotate: [0, 180, 360], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1.5 rounded-full shadow-lg border border-amber-200"
            >
              <Sparkles className="w-4 h-4 text-slate-950 fill-amber-300" />
            </motion.div>
          </motion.div>
        </div>

        {/* App Name & Tagline Animations */}
        <div className="space-y-3">
          {/* App Name: RightPath */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white flex items-center justify-center gap-2"
          >
            <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-300 bg-clip-text text-transparent drop-shadow-sm">
              RightPath
            </span>
            <motion.span
              animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block text-emerald-400"
            >
              <Sparkles className="w-6 h-6 fill-emerald-400/30" />
            </motion.span>
          </motion.h1>

          {/* Tagline: Know Your Rights. Make Confident Decisions. (Single Line) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-full overflow-hidden"
          >
            <p className="text-xs sm:text-sm md:text-base font-semibold tracking-wide flex items-center justify-center gap-1.5 text-slate-200 whitespace-nowrap overflow-hidden">
              <span className="text-emerald-400 font-extrabold whitespace-nowrap">
                Know Your Rights.
              </span>
              <span className="text-teal-200 font-medium whitespace-nowrap">
                Make Confident Decisions.
              </span>
            </p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-full max-w-xs pt-2"
        >
          {/* Sleek Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
