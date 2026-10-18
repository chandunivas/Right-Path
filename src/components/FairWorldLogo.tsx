import React from "react";

interface FairWorldLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export const FairWorldLogo: React.FC<FairWorldLogoProps> = ({
  className = "w-10 h-10",
  size = 40,
  animated = true,
}) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg overflow-visible"
      >
        <defs>
          {/* Main Glass Shield / Emblem Backdrop Gradient */}
          <linearGradient id="fairWorldBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="45%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* The Fair World Beacon Sphere */}
          <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </radialGradient>

          {/* Golden Justice Halo */}
          <linearGradient id="goldHalo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Dynamic Light Beam Bridge */}
          <linearGradient id="bridgeStream" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.95" />
          </linearGradient>

          {/* Running Figures Vibrant Gradient */}
          <linearGradient id="runnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
        </defs>

        {/* Outer Shield Emblem (rounded superellipse frame) */}
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="28"
          fill="url(#fairWorldBg)"
          stroke="#34d399"
          strokeWidth="2"
          strokeOpacity="0.6"
        />

        {/* Outer Orbital Ring of the Fair World */}
        <circle
          cx="50"
          cy="32"
          r="22"
          stroke="url(#goldHalo)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          strokeOpacity="0.75"
        >
          {animated && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 32"
              to="360 50 32"
              dur="12s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        {/* Glowing Fair World Beacon (Glorious Glowing Orb) */}
        <circle cx="50" cy="32" r="16" fill="url(#beaconGlow)" />

        {/* Scale of Equity / World Grid Lines inside the Beacon */}
        <ellipse cx="50" cy="32" rx="16" ry="6" stroke="#047857" strokeWidth="1" strokeOpacity="0.5" fill="none" />
        <line x1="50" y1="16" x2="50" y2="48" stroke="#047857" strokeWidth="1" strokeOpacity="0.5" />
        {/* Balanced Scales Pillar in the Globe */}
        <path d="M44 28H56M44 28L41 34M56 28L59 34M50 25V37" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" />

        {/* Upward Arching Pathway "RightPath" leading directly into the Fair World */}
        <path
          d="M8 90C22 88 36 78 45 58C48 52 49 44 50 38"
          stroke="url(#bridgeStream)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Animated Speed Lines on the Path */}
        {animated && (
          <path
            d="M8 90C22 88 36 78 45 58C48 52 49 44 50 38"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="10 35"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="45"
              to="-45"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </path>
        )}

        {/* Runner 1 (Lead Person - Reaching up with joy & energy toward the Fair World) */}
        <g fill="url(#runnerGrad)">
          {/* Head */}
          <circle cx="45" cy="41" r="4.2" />
          {/* Dynamic Body running up */}
          <path d="M43 47C45 46 48 46 51 44L56 38C57.5 36.5 60 37.5 59 39.5L53 47L48 50L53 60C54 62 52 63.5 50.5 62L44 52L38 61C37 62.5 35 61.5 36 60L41 49L39 46Z" />
        </g>

        {/* Runner 2 (Side-by-side companion - Reaching together) */}
        <g fill="url(#runnerGrad)" opacity="0.95">
          {/* Head */}
          <circle cx="31" cy="53" r="4" />
          {/* Dynamic Body */}
          <path d="M29 59C31 58 34 58 37 56L42 50C43.5 48.5 46 49.5 45 51.5L39 59L34 62L39 72C40 74 38 75.5 36.5 74L30 64L24 73C23 74.5 21 73.5 22 72L27 61L25 58Z" />
        </g>

        {/* Runner 3 (Third Person - Joyfully sprinting alongside) */}
        <g fill="url(#runnerGrad)" opacity="0.85">
          {/* Head */}
          <circle cx="17" cy="66" r="3.6" />
          {/* Dynamic Body */}
          <path d="M15 72C17 71 20 71 22 69L27 63C28.5 61.5 31 62.5 30 64.5L24 71L20 74L24 83C25 85 23.5 86 22 85L16 76L11 84C10 85.2 8.5 84.5 9.5 83L14 73L12 70Z" />
        </g>

        {/* Sparkles of Triumph & Justice surrounding the World */}
        <path d="M78 18L79.5 22.5L84 24L79.5 25.5L78 30L76.5 25.5L72 24L76.5 22.5Z" fill="#fef08a" />
        <path d="M22 28L23 31L26 32L23 33L22 36L21 33L18 32L21 31Z" fill="#34d399" opacity="0.9" />
      </svg>
    </div>
  );
};
