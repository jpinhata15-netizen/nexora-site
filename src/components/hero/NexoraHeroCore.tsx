"use client";

import React, { useState, useRef, useId } from "react";

interface NexoraHeroCoreProps {
  onSelectProjectSlug?: (slug: string) => void;
}

/**
 * ESCULTURA MONOLÍTICA 3D 'N' SOBRE PEDESTAL HOLOGRÁFICO — 100% VETORIAL ULTRA-HD (4K/8K)
 * Com IDs de SVG únicos por instância (useId) e filtros compatíveis com Android/iOS,
 * garantindo renderização perfeita tanto no celular quanto no desktop.
 */
export function NexoraHeroCore({
  onSelectProjectSlug: _onSelectProjectSlug,
}: NexoraHeroCoreProps) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const ry = (x - 0.5) * 10;
    const rx = (0.5 - y) * 7;
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[340px] sm:h-[440px] lg:h-full flex items-center justify-center select-none overflow-hidden"
      aria-label="Monólito 3D NEXORA em Ultra-HD sobre pedestal holográfico"
    >
      {/* Ambient Deep Space & Pedestal Glows */}
      <div
        className="pointer-events-none absolute top-[18%] right-[12%] w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] rounded-full bg-[#0066FF]/20 blur-[90px] sm:blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[10%] left-[52%] -translate-x-1/2 w-[75%] h-28 sm:h-36 rounded-full bg-[#00D4FF]/25 blur-[60px] sm:blur-[80px]"
        aria-hidden="true"
      />

      {/* Interactive 3D Vector Stage */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1400px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        <svg
          viewBox="110 75 760 635"
          className="w-full h-full max-h-[760px] overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Monólito 3D NEXORA"
        >
          <defs>
            {/* Neon Bloom Filters (100% Mobile & Desktop Compatible) */}
            <filter
              id={`${uid}-glow-strong`}
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
            >
              <feGaussianBlur stdDeviation="8" result="blur1" />
              <feGaussianBlur stdDeviation="18" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter
              id={`${uid}-glow-soft`}
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter
              id={`${uid}-pedestal-shadow`}
              x="-25%"
              y="-25%"
              width="150%"
              height="150%"
            >
              <feGaussianBlur in="SourceAlpha" stdDeviation="14" result="blur" />
              <feOffset in="blur" dx="0" dy="16" result="offsetBlur" />
              <feMerge>
                <feMergeNode in="offsetBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Cosmic Planet Gradients */}
            <radialGradient
              id={`${uid}-planet-fill`}
              cx="32%"
              cy="32%"
              r="68%"
            >
              <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#0B1938" stopOpacity="0.85" />
              <stop offset="82%" stopColor="#030816" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#02050D" stopOpacity="0" />
            </radialGradient>

            <linearGradient
              id={`${uid}-planet-rim`}
              x1="0%"
              y1="0%"
              x2="85%"
              y2="85%"
            >
              <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.75" />
              <stop offset="35%" stopColor="#00B4FF" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#0066FF" stopOpacity="0" />
            </linearGradient>

            {/* Horizon & Wet Floor Gradients */}
            <radialGradient
              id={`${uid}-horizon-mist`}
              cx="54%"
              cy="68%"
              r="48%"
            >
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.32" />
              <stop offset="45%" stopColor="#0066FF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#02050D" stopOpacity="0" />
            </radialGradient>

            <linearGradient
              id={`${uid}-water-reflection`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#02050D" stopOpacity="0" />
              <stop offset="25%" stopColor="#0077FF" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#00F5FF" stopOpacity="0.7" />
              <stop offset="75%" stopColor="#0077FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#02050D" stopOpacity="0" />
            </linearGradient>

            {/* Cylindrical Metallic Pedestal Gradients */}
            <linearGradient
              id={`${uid}-metal-cylinder`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#030712" />
              <stop offset="18%" stopColor="#0D1F40" />
              <stop offset="34%" stopColor="#061024" />
              <stop offset="48%" stopColor="#1E3A6D" />
              <stop offset="53%" stopColor="#38BDF8" />
              <stop offset="58%" stopColor="#172E58" />
              <stop offset="78%" stopColor="#070F22" />
              <stop offset="92%" stopColor="#102347" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>

            <linearGradient
              id={`${uid}-pedestal-top`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#081734" />
              <stop offset="50%" stopColor="#040B1A" />
              <stop offset="100%" stopColor="#0C244E" />
            </linearGradient>

            <linearGradient
              id={`${uid}-hologram-beam`}
              x1="50%"
              y1="100%"
              x2="50%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#00A8FF" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
            </linearGradient>

            {/* 3D Monolith 'N' Brushed Obsidian & Titanium Gradients */}
            <linearGradient
              id={`${uid}-n-front-diag`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="18%" stopColor="#334155" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="82%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* 3D Extruded Side & Bevel Gradients */}
            <linearGradient
              id={`${uid}-extrude-right`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="28%" stopColor="#0B2247" />
              <stop offset="65%" stopColor="#061229" />
              <stop offset="100%" stopColor="#00B4FF" />
            </linearGradient>

            <linearGradient
              id={`${uid}-extrude-inner-left`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#091B3A" />
              <stop offset="55%" stopColor="#0F3166" />
              <stop offset="100%" stopColor="#00F5FF" />
            </linearGradient>

            <linearGradient
              id={`${uid}-top-bevel`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            <linearGradient
              id={`${uid}-bottom-bounce`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#00F5FF" />
              <stop offset="55%" stopColor="#0088FF" />
              <stop offset="100%" stopColor="#061B40" />
            </linearGradient>

            {/* Neon Cyan Energy Channel Gradients */}
            <linearGradient
              id={`${uid}-neon-channel`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#00F5FF" />
              <stop offset="75%" stopColor="#0099FF" />
              <stop offset="100%" stopColor="#00F5FF" />
            </linearGradient>

            <linearGradient
              id={`${uid}-orbit-ring-1`}
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.08" />
              <stop offset="25%" stopColor="#00F5FF" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#38BDF8" stopOpacity="0.45" />
              <stop offset="85%" stopColor="#00F5FF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#00F5FF" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient
              id={`${uid}-orbit-ring-2`}
              x1="100%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.05" />
              <stop offset="40%" stopColor="#00D4FF" stopOpacity="0.7" />
              <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00F5FF" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* ==============================================================
              1. PLANETA CÓSMICO & ESTRELAS NO HORIZONTE SUPERIOR DIREITO
             ============================================================== */}
          <g opacity="0.9">
            <circle
              cx="730"
              cy="220"
              r="255"
              fill={`url(#${uid}-planet-fill)`}
            />
            <path
              d="M 520 365 A 255 255 0 0 1 865 5"
              stroke={`url(#${uid}-planet-rim)`}
              strokeWidth="3"
              filter={`url(#${uid}-glow-soft)`}
            />
            <circle cx="430" cy="108" r="1.5" fill="#93C5FD" opacity="0.7" />
            <circle cx="515" cy="92" r="1.2" fill="#FFFFFF" opacity="0.5" />
            <circle cx="320" cy="125" r="1.4" fill="#38BDF8" opacity="0.6" />
            <circle cx="845" cy="115" r="1.8" fill="#00F5FF" opacity="0.75" />
            <circle cx="215" cy="195" r="1.2" fill="#93C5FD" opacity="0.45" />
          </g>

          {/* ==============================================================
              2. SKYLINE FUTURISTA VETORIAL & MONTANHAS NO HORIZONTE
             ============================================================== */}
          <ellipse
            cx="520"
            cy="525"
            rx="380"
            ry="140"
            fill={`url(#${uid}-horizon-mist)`}
          />

          <g opacity="0.78">
            <path
              d="M 480 560 V 475 H 502 V 560 Z M 510 560 V 450 H 532 V 560 Z M 542 560 V 485 H 560 V 560 Z M 675 560 V 440 H 702 V 560 Z M 710 560 V 395 L 728 375 V 560 Z M 736 560 V 430 H 762 V 560 Z M 770 560 V 360 H 796 V 560 Z M 804 560 V 325 L 822 300 L 826 560 Z M 834 560 V 380 H 860 V 560 Z"
              fill="#06132C"
              stroke="#00A8FF"
              strokeOpacity="0.22"
              strokeWidth="1"
            />
            <path
              d="M 565 560 V 462 H 586 V 560 Z M 594 560 V 438 H 614 V 560 Z M 748 560 V 408 H 774 V 560 Z M 786 560 V 352 H 812 V 560 Z M 846 560 V 368 H 872 V 560 Z"
              fill="#030A1A"
              stroke="#00D4FF"
              strokeOpacity="0.35"
              strokeWidth="1.2"
            />
            <line
              x1="818"
              y1="315"
              x2="818"
              y2="520"
              stroke="#00F5FF"
              strokeOpacity="0.55"
              strokeWidth="1.5"
            />
            <line
              x1="798"
              y1="365"
              x2="798"
              y2="530"
              stroke="#00B4FF"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
            <line
              x1="722"
              y1="390"
              x2="722"
              y2="535"
              stroke="#00B4FF"
              strokeOpacity="0.4"
              strokeWidth="1.2"
            />
          </g>

          <path
            d="M 120 565 L 185 498 L 235 524 L 305 468 L 365 508 L 420 492 L 475 565 Z"
            fill="#040B1B"
            stroke="#0088FF"
            strokeOpacity="0.22"
            strokeWidth="1.2"
          />

          {/* ==============================================================
              3. PISO REFLEXIVO ESPELHADO & ONDAS DE LUZ NO CHÃO
             ============================================================== */}
          <line
            x1="120"
            y1="565"
            x2="870"
            y2="565"
            stroke={`url(#${uid}-water-reflection)`}
            strokeWidth="2"
          />

          <ellipse
            cx="500"
            cy="642"
            rx="360"
            ry="40"
            stroke={`url(#${uid}-water-reflection)`}
            strokeWidth="1.4"
            opacity="0.65"
          />
          <ellipse
            cx="500"
            cy="652"
            rx="310"
            ry="32"
            stroke="#00D4FF"
            strokeOpacity="0.3"
            strokeWidth="1"
          />

          <ellipse
            cx="500"
            cy="665"
            rx="255"
            ry="28"
            fill={`url(#${uid}-water-reflection)`}
            opacity="0.55"
            filter={`url(#${uid}-glow-strong)`}
          />
          <ellipse
            cx="500"
            cy="682"
            rx="155"
            ry="16"
            fill="#00F5FF"
            opacity="0.35"
            filter={`url(#${uid}-glow-strong)`}
          />

          {/* ==============================================================
              4. PEDESTAL HOLOGRÁFICO CIRCULAR EM 3 NÍVEIS METÁLICOS
             ============================================================== */}
          <g>
            {/* Sombra Vetorial Nativa sob a Base (100% compatível com GPU Mobile) */}
            <ellipse
              cx="500"
              cy="638"
              rx="315"
              ry="34"
              fill="#000000"
              opacity="0.75"
            />
            {/* TIER 1 (Base Larga Metálica) */}
            <path
              d="M 195 604 L 195 632 A 305 32 0 0 0 805 632 L 805 604 Z"
              fill={`url(#${uid}-metal-cylinder)`}
            />
            <ellipse
              cx="500"
              cy="604"
              rx="305"
              ry="30"
              fill={`url(#${uid}-pedestal-top)`}
              stroke="#00D4FF"
              strokeOpacity="0.55"
              strokeWidth="1.6"
            />
            <path
              d="M 195 632 A 305 32 0 0 0 805 632"
              stroke="#00F5FF"
              strokeWidth="3.5"
            />
            <path
              d="M 390 618 A 305 30 0 0 0 510 622"
              stroke="#00F5FF"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* TIER 2 (Anel Intermediário) */}
            <path
              d="M 255 574 L 255 598 A 245 24 0 0 0 745 598 L 745 574 Z"
              fill={`url(#${uid}-metal-cylinder)`}
            />
            <ellipse
              cx="500"
              cy="574"
              rx="245"
              ry="22"
              fill={`url(#${uid}-pedestal-top)`}
              stroke="#38BDF8"
              strokeOpacity="0.65"
              strokeWidth="1.5"
            />
            <path
              d="M 255 598 A 245 24 0 0 0 745 598"
              stroke="#00B4FF"
              strokeOpacity="0.8"
              strokeWidth="2"
            />
            <path
              d="M 415 585 A 245 22 0 0 0 475 587"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* TIER 3 (Emissor Holográfico Superior) */}
            <path
              d="M 335 552 L 335 570 A 165 16 0 0 0 665 570 L 665 552 Z"
              fill={`url(#${uid}-metal-cylinder)`}
            />
            <ellipse
              cx="500"
              cy="552"
              rx="165"
              ry="15"
              fill="#041533"
              stroke="#00F5FF"
              strokeWidth="2.5"
            />
          </g>

          {/* Holographic Levitation Rings & Vertical Energy Curtain */}
          <path
            d="M 345 552 L 335 450 L 665 450 L 655 552 Z"
            fill={`url(#${uid}-hologram-beam)`}
          />
          <ellipse
            cx="500"
            cy="536"
            rx="155"
            ry="13"
            stroke="#00F5FF"
            strokeWidth="2.5"
            filter={`url(#${uid}-glow-strong)`}
          />
          <ellipse
            cx="500"
            cy="522"
            rx="145"
            ry="11"
            stroke="#7DD3FC"
            strokeOpacity="0.85"
            strokeWidth="1.6"
            strokeDasharray="18 10"
          />

          {/* ==============================================================
              5. ANEL ORBITAL TRASEIRO (PASSA POR TRÁS DO MONÓLITO 3D)
             ============================================================== */}
          <g transform="rotate(-19 500 305)">
            <ellipse
              cx="500"
              cy="305"
              rx="340"
              ry="108"
              stroke={`url(#${uid}-orbit-ring-2)`}
              strokeWidth="1.8"
            />
            <ellipse
              cx="500"
              cy="285"
              rx="310"
              ry="92"
              stroke={`url(#${uid}-orbit-ring-1)`}
              strokeWidth="1.4"
              strokeDasharray="220 140"
            />
          </g>

          {/* ==============================================================
              6. ESCULTURA MONOLÍTICA 3D 'N' (EXTRUDADA EM ALTA PRECISÃO)
             ============================================================== */}
          <g>
            {/* Base Inferior 3D da Perna Esquerda */}
            <polygon
              points="250,468 345,478 398,496 303,486"
              fill={`url(#${uid}-bottom-bounce)`}
              stroke="#00F5FF"
              strokeWidth="1.5"
            />

            {/* Parede Lateral Interna 3D da Perna Esquerda */}
            <polygon
              points="345,478 390,295 442,315 398,496"
              fill={`url(#${uid}-extrude-inner-left)`}
              stroke="#00D4FF"
              strokeOpacity="0.7"
              strokeWidth="1.2"
            />

            {/* Topo Chanfrado 3D do Vértice Superior Esquerdo */}
            <polygon
              points="322,158 412,146 462,166 372,178"
              fill={`url(#${uid}-top-bevel)`}
              stroke="#E2E8F0"
              strokeOpacity="0.6"
              strokeWidth="1"
            />

            {/* Parede Superior/Interna 3D da Barra Diagonal */}
            <polygon
              points="412,146 462,166 626,306 582,288"
              fill="#0D1F3D"
              stroke="#38BDF8"
              strokeOpacity="0.45"
              strokeWidth="1"
            />

            {/* Face Inferior 3D sob a Barra Diagonal */}
            <polygon
              points="390,295 442,315 658,488 608,468"
              fill="#07152E"
              stroke="#00B4FF"
              strokeOpacity="0.5"
              strokeWidth="1.2"
            />

            {/* Topo Chanfrado 3D da Coluna Direita */}
            <polygon
              points="618,112 702,122 752,146 668,136"
              fill={`url(#${uid}-top-bevel)`}
              stroke="#7DD3FC"
              strokeOpacity="0.7"
              strokeWidth="1.2"
            />

            {/* Parede Lateral Direita 3D da Coluna Direita */}
            <polygon
              points="702,122 752,146 694,458 644,436"
              fill={`url(#${uid}-extrude-right)`}
              stroke="#00F5FF"
              strokeOpacity="0.8"
              strokeWidth="1.5"
            />

            {/* Base Inferior 3D da Coluna Direita */}
            <polygon
              points="608,468 644,436 694,458 658,488"
              fill="#081C3E"
              stroke="#00D4FF"
              strokeOpacity="0.6"
              strokeWidth="1.2"
            />

            {/* Face Frontal Unificada em Obsidiana/Titânio do 'N' */}
            <polygon
              points="250,468 322,158 412,146 582,288 618,112 702,122 644,436 608,468 386,274 345,478"
              fill={`url(#${uid}-n-front-diag)`}
              stroke="#64748B"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />

            {/* Chanfro de Luz Superior no Vértice Esquerdo e Direito do 'N' */}
            <polyline
              points="250,468 322,158 412,146 582,288 618,112 702,122"
              fill="none"
              stroke="#E2E8F0"
              strokeOpacity="0.8"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Canal de Luz Neon Interno em 'V' Invertido (Camada de Halo Vetorial + Núcleo Branco) */}
            <polyline
              points="345,478 386,274 608,464"
              fill="none"
              stroke="#00F5FF"
              strokeOpacity="0.35"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="345,478 386,274 608,464"
              fill="none"
              stroke={`url(#${uid}-neon-channel)`}
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="345,478 386,274 608,464"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Canal de Luz Neon na Aresta 3D da Coluna Direita */}
            <polyline
              points="702,122 644,436 608,468"
              fill="none"
              stroke="#00F5FF"
              strokeOpacity="0.35"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="702,122 644,436 608,468"
              fill="none"
              stroke="#00F5FF"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="702,122 644,436 608,468"
              fill="none"
              stroke="#E0F2FE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Brilho Neon na Base da Perna Esquerda */}
            <line
              x1="250"
              y1="468"
              x2="345"
              y2="478"
              stroke="#00F5FF"
              strokeOpacity="0.4"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <line
              x1="250"
              y1="468"
              x2="345"
              y2="478"
              stroke="#00F5FF"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>

          {/* ==============================================================
              7. ANEL ORBITAL FRONTAL & ESTRELAS DE ENERGIA (PRIMEIRO PLANO)
             ============================================================== */}
          <g transform="rotate(-19 500 305)">
            <path
              d="M 160 305 A 340 108 0 0 0 840 305"
              stroke={`url(#${uid}-orbit-ring-1)`}
              strokeWidth="3.2"
              filter={`url(#${uid}-glow-soft)`}
            />
            <path
              d="M 190 285 A 310 92 0 0 0 810 285"
              stroke="#7DD3FC"
              strokeOpacity="0.65"
              strokeWidth="1.5"
              strokeDasharray="160 90"
            />
          </g>

          {/* Lens Flares & Star Nodes */}
          <g filter={`url(#${uid}-glow-strong)`}>
            <circle cx="215" cy="378" r="4.5" fill="#FFFFFF" />
            <line
              x1="195"
              y1="378"
              x2="235"
              y2="378"
              stroke="#00F5FF"
              strokeWidth="1.8"
            />
            <line
              x1="215"
              y1="358"
              x2="215"
              y2="398"
              stroke="#00F5FF"
              strokeWidth="1.8"
            />
          </g>

          <g filter={`url(#${uid}-glow-strong)`}>
            <circle cx="672" cy="285" r="5.5" fill="#FFFFFF" />
            <line
              x1="642"
              y1="285"
              x2="702"
              y2="285"
              stroke="#00F5FF"
              strokeWidth="2"
            />
            <line
              x1="672"
              y1="255"
              x2="672"
              y2="315"
              stroke="#00F5FF"
              strokeWidth="2"
            />
          </g>

          <g filter={`url(#${uid}-glow-strong)`}>
            <circle cx="702" cy="122" r="4" fill="#FFFFFF" />
          </g>

          <g filter={`url(#${uid}-glow-strong)`}>
            <circle cx="345" cy="478" r="4.5" fill="#FFFFFF" />
          </g>
        </svg>
      </div>

      {/* Desktop Left Edge Gradient to Blend Seamlessly Behind Left Typography */}
      <div
        className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#02050D] via-[#02050D]/60 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
