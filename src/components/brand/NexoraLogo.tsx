import React, { useId } from "react";

interface NexoraLogoProps {
  variant?: "full" | "symbol" | "wordmark" | "stacked";
  theme?: "dark" | "light" | "mono-white" | "mono-dark";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  showDivider?: boolean;
  className?: string;
}

/**
 * LOGOTIPO OFICIAL NORDARA — Fiel à identidade visual:
 * Símbolo N entrelaçado com anel orbital luminoso em ciano/azul elétrico,
 * tipografia sci-fi larga (com destaque bicolor e 'A' em chevron 'Λ') e slogan
 * "TECNOLOGIA QUE MOVE NEGÓCIOS."
 */
export function NexoraLogo({
  variant = "full",
  theme = "dark",
  size = "md",
  showTagline = false,
  showDivider = true,
  className = "",
}: NexoraLogoProps) {
  const uid = useId().replace(/:/g, "");

  const dimensions = {
    sm: { symbolW: 42, symbolH: 32, text: "text-base", sub: "text-[8px]" },
    md: { symbolW: 52, symbolH: 40, text: "text-xl", sub: "text-[9px]" },
    lg: { symbolW: 68, symbolH: 52, text: "text-2xl", sub: "text-[10px]" },
    xl: { symbolW: 110, symbolH: 84, text: "text-4xl", sub: "text-xs" },
  }[size];

  const isLightSurface = theme === "light" || theme === "mono-dark";
  const isMono = theme === "mono-white" || theme === "mono-dark";

  const renderOrbitalSymbol = (w: number, h: number) => (
    <svg
      width={w}
      height={h}
      viewBox="0 0 96 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-500 ease-out group-hover:scale-105 shrink-0 overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`nx-metal-${uid}`}
          x1="20"
          y1="10"
          x2="65"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor={
              isMono
                ? isLightSurface
                  ? "#050811"
                  : "#FFFFFF"
                : isLightSurface
                ? "#0F172A"
                : "#FFFFFF"
            }
          />
          <stop
            offset="55%"
            stopColor={
              isMono
                ? isLightSurface
                  ? "#050811"
                  : "#FFFFFF"
                : isLightSurface
                ? "#1E3A8A"
                : "#DCEBFF"
            }
          />
          <stop
            offset="100%"
            stopColor={
              isMono
                ? isLightSurface
                  ? "#050811"
                  : "#FFFFFF"
                : "#00C8FF"
            }
          />
        </linearGradient>

        <linearGradient
          id={`nx-cyan-wing-${uid}`}
          x1="72"
          y1="14"
          x2="30"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor={
              isMono ? (isLightSurface ? "#050811" : "#FFFFFF") : "#00F5FF"
            }
          />
          <stop
            offset="55%"
            stopColor={
              isMono ? (isLightSurface ? "#050811" : "#FFFFFF") : "#0088FF"
            }
          />
          <stop
            offset="100%"
            stopColor={
              isMono ? (isLightSurface ? "#050811" : "#FFFFFF") : "#0040B8"
            }
          />
        </linearGradient>

        <linearGradient
          id={`nx-orbit-ring-${uid}`}
          x1="6"
          y1="56"
          x2="90"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor={
              isMono ? (isLightSurface ? "#050811" : "#FFFFFF") : "#00F5FF"
            }
          />
          <stop
            offset="50%"
            stopColor={
              isMono ? (isLightSurface ? "#050811" : "#FFFFFF") : "#0077FF"
            }
            stopOpacity="0.35"
          />
          <stop
            offset="100%"
            stopColor={
              isMono ? (isLightSurface ? "#050811" : "#FFFFFF") : "#00F5FF"
            }
          />
        </linearGradient>

        <filter id={`nx-glow-${uid}`} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Back Half of Tilted Orbital Swoop */}
      <path
        d="M 12 51 A 42 15 0 0 1 84 21"
        transform="rotate(-21 48 36)"
        stroke={`url(#nx-orbit-ring-${uid})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Upper-Right Cyan Wing of X */}
      <path
        d="M52 29L64 16H77L60 35L52 29Z"
        fill={`url(#nx-cyan-wing-${uid})`}
      />

      {/* Inner Parallel Cyan Diagonal Ribbon */}
      <path
        d="M28 24L54 56H63L35 22L28 24Z"
        fill={`url(#nx-cyan-wing-${uid})`}
      />

      {/* Left Metallic Vertical Pillar of N (with curved lower-right inner edge) */}
      <path
        d="M24 56V20L34 30V48C34 52.8 30 56 24 56Z"
        fill={`url(#nx-metal-${uid})`}
      />

      {/* Main Metallic Silver-to-Cyan Diagonal of N/X */}
      <path
        d="M27 14H39L74 56H62L27 14Z"
        fill={`url(#nx-metal-${uid})`}
      />

      {/* Front Half of Tilted Orbital Swoop with Neon Glow */}
      <path
        d="M 84 21 A 42 15 0 0 1 12 51"
        transform="rotate(-21 48 36)"
        stroke={`url(#nx-orbit-ring-${uid})`}
        strokeWidth="2.8"
        strokeLinecap="round"
        filter={!isMono ? `url(#nx-glow-${uid})` : undefined}
      />

      {/* Glowing Orbital Nodes */}
      {!isMono && (
        <>
          <circle cx="12" cy="50" r="2.8" fill="#00F5FF" />
          <circle cx="84" cy="22" r="2.8" fill="#00F5FF" />
        </>
      )}
    </svg>
  );

  const renderWordmark = () => (
    <div
      className={`font-display font-extrabold ${dimensions.text} tracking-[0.18em] flex items-center leading-none ${
        isLightSurface ? "text-[#050811]" : "text-white"
      }`}
      style={{ fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif" }}
    >
      <span>NO</span>
      <span
        className={
          isMono
            ? ""
            : "text-transparent bg-clip-text bg-gradient-to-tr from-[#0055FF] via-[#00D4FF] to-[#00F5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.45)]"
        }
      >
        RD
      </span>
      <span>AR</span>
      {/* Stylized Crossbar-less Chevron 'A' ('Λ') matching the official logo */}
      <span className="inline-block">Λ</span>
    </div>
  );

  if (variant === "stacked") {
    return (
      <div
        className={`inline-flex flex-col items-center text-center select-none group ${className}`}
      >
        {renderOrbitalSymbol(dimensions.symbolW * 1.4, dimensions.symbolH * 1.4)}
        <div className="mt-2">{renderWordmark()}</div>
        {showTagline && (
          <div className="mt-2 flex flex-col items-center">
            <div
              className={`font-sans font-semibold uppercase tracking-[0.28em] ${dimensions.sub} ${
                isLightSurface ? "text-slate-700" : "text-white"
              }`}
            >
              TECNOLOGIA QUE{" "}
              <span className="text-[#00E5FF] font-bold">MOVE NEGÓCIOS.</span>
            </div>
            <div className="mt-1.5 h-[1.5px] w-48 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_12px_#00E5FF]" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {variant !== "wordmark" &&
        renderOrbitalSymbol(dimensions.symbolW, dimensions.symbolH)}

      {variant === "full" && showDivider && (
        <span
          className={`h-6 w-[1.5px] ${
            isLightSurface ? "bg-slate-300" : "bg-white/25"
          }`}
          aria-hidden="true"
        />
      )}

      {variant !== "symbol" && (
        <div className="flex flex-col justify-center leading-none">
          {renderWordmark()}
          {showTagline && (
            <span
              className={`font-sans font-semibold uppercase tracking-[0.24em] ${dimensions.sub} mt-1.5 ${
                isLightSurface ? "text-slate-600" : "text-slate-300"
              }`}
            >
              TECNOLOGIA QUE{" "}
              <span className="text-[#00E5FF]">MOVE NEGÓCIOS.</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
