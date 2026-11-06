"use client";

import React from "react";
import {
  ArrowRight,
  Zap,
  Gem,
  Rocket,
  Headphones,
  MessageCircle,
  Layers,
  Sparkles,
} from "lucide-react";
import { NexoraHeroCore } from "./NexoraHeroCore";
import { isWhatsAppConfigured, buildWhatsAppUrl } from "@/config/site";
import { soundEngine } from "@/utils/soundEngine";

export type ActiveViewTab =
  | "inicio"
  | "portfolio"
  | "servicos"
  | "sobre";

interface HeroSectionProps {
  onSelectProjectSlug?: (slug: string) => void;
  onNavigateTab: (tab: ActiveViewTab) => void;
  onScrollToHomeSection: (sectionId: string) => void;
}

export function HeroSection({
  onSelectProjectSlug,
  onNavigateTab,
  onScrollToHomeSection,
}: HeroSectionProps) {
  const handleFaleConosco = () => {
    soundEngine.playClick();
    if (isWhatsAppConfigured()) {
      const url = buildWhatsAppUrl();
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
        return;
      }
    }
    onScrollToHomeSection("orcamento");
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] w-full pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-28 lg:pb-10 overflow-hidden flex flex-col justify-between bg-[#02050D] border-b border-[#00D4FF]/20"
    >
      {/* Subtle PCB Electronic Circuit Lines in Top-Left Corner */}
      <svg
        className="pointer-events-none absolute top-0 left-0 w-72 sm:w-96 h-64 opacity-35 z-10"
        viewBox="0 0 320 240"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 45 H95 L130 80 H210 M0 85 H65 L95 115 H165 M40 0 V55 L75 90"
          stroke="#00B4FF"
          strokeWidth="1.2"
        />
        <circle cx="210" cy="80" r="3" fill="#00F5FF" />
        <circle cx="165" cy="115" r="2.5" fill="#00F5FF" />
        <circle cx="75" cy="90" r="2.5" fill="#00B4FF" />
      </svg>

      {/* Cosmic Deep Ambient Lighting */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/5 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#0055FF]/15 blur-[150px]"
        aria-hidden="true"
      />

      {/* Desktop Full-Bleed Right 3D Monolith Stage (Edge-to-edge, zero leftover right margin) */}
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-[58%] xl:w-[60%] z-0">
        <NexoraHeroCore onSelectProjectSlug={onSelectProjectSlug} />
      </div>

      {/* Main Full-Width Hero Stage */}
      <div className="relative z-10 w-full px-5 sm:px-10 lg:px-14 xl:px-20 my-auto py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Monumental Typography, Slogan & Larger Clickable Action Buttons */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 sm:space-y-8 z-20">
            {/* Monumental 3-Line Headline: NEXORΛ / TECNOLOGIA QUE / MOVE NEGÓCIOS. */}
            <div className="space-y-1">
              <h1 className="leading-[1.05] tracking-wide">
                {/* Line 1: NEXORΛ */}
                <span
                  className="block text-4xl sm:text-6xl md:text-7xl xl:text-[78px] font-black uppercase tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-[#93C5FD] drop-shadow-[0_4px_24px_rgba(0,180,255,0.28)]"
                  style={{
                    fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
                  }}
                >
                  NEXORΛ
                </span>

                {/* Line 2: TECNOLOGIA QUE */}
                <span
                  className="block text-3xl sm:text-5xl md:text-6xl xl:text-[62px] font-extrabold italic uppercase tracking-[0.04em] text-white mt-1.5"
                  style={{
                    fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
                  }}
                >
                  TECNOLOGIA QUE
                </span>

                {/* Line 3: MOVE NEGÓCIOS. */}
                <span
                  className="block text-3xl sm:text-5xl md:text-6xl xl:text-[64px] font-black italic uppercase tracking-[0.04em] text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#00B4FF] to-[#0077FF] drop-shadow-[0_0_30px_rgba(0,229,255,0.5)] mt-1"
                  style={{
                    fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
                  }}
                >
                  MOVE NEGÓCIOS.
                </span>
              </h1>
            </div>

            {/* Subtitle with Glowing Vertical Cyan Bar */}
            <div className="flex items-stretch gap-4 max-w-2xl pt-1">
              <div
                className="w-[3.5px] rounded-full bg-gradient-to-b from-[#00F5FF] via-[#0088FF] to-transparent shadow-[0_0_14px_#00F5FF] shrink-0 my-1"
                aria-hidden="true"
              />
              <p className="text-base sm:text-xl xl:text-2xl text-slate-200 leading-relaxed font-normal">
                Criamos sites, sistemas e soluções digitais{" "}
                <br className="hidden sm:inline" />
                para transformar ideias em{" "}
                <strong className="text-white font-semibold">
                  grandes conquistas.
                </strong>
              </p>
            </div>

            {/* Primary Larger Pill CTAs (Full width on mobile, large pills on desktop) */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onNavigateTab("portfolio");
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="group relative inline-flex items-center justify-center gap-3.5 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#0099FF] to-[#0066FF] px-9 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-extrabold text-[#020611] shadow-[0_0_38px_rgba(0,212,255,0.65),inset_0_1px_2px_rgba(255,255,255,0.65)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_55px_rgba(0,245,255,0.9)]"
              >
                <span>Conheça nosso portfólio</span>
                <ArrowRight className="w-5 h-5 text-[#020611] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <button
                type="button"
                onClick={handleFaleConosco}
                onMouseEnter={() => soundEngine.playHover()}
                className="group inline-flex items-center justify-center gap-3.5 rounded-full border-2 border-[#00D4FF]/65 bg-[#041024]/85 px-9 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold text-white backdrop-blur-md shadow-[0_0_24px_rgba(0,180,255,0.22)] transition-all duration-300 hover:border-[#00F5FF] hover:bg-[#071B3B] hover:shadow-[0_0_35px_rgba(0,245,255,0.45)]"
              >
                <span>Fale conosco</span>
                <MessageCircle className="w-5 h-5 text-[#00F5FF] transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>

            {/* Quick Interactive Section Pills to Open Exclusive Views (Serviços & Sobre a NEXORA) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onNavigateTab("servicos");
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:border-[#00F5FF]/60 hover:bg-[#00D4FF]/10 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:text-white transition-all"
              >
                <Layers className="w-4 h-4 text-[#00F5FF]" />
                <span>Ver Serviços (Criação de Sites)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00F5FF]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onNavigateTab("sobre");
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:border-[#00F5FF]/60 hover:bg-[#00D4FF]/10 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:text-white transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#00F5FF]" />
                <span>Por que a marca NEXORA</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00F5FF]" />
              </button>
            </div>
          </div>

          {/* Mobile/Tablet 3D Monolith Stage (Shown below buttons on screens < lg) */}
          <div className="lg:hidden w-full -mx-2 sm:mx-0">
            <NexoraHeroCore onSelectProjectSlug={onSelectProjectSlug} />
          </div>
        </div>
      </div>

      {/* Bottom Full-Width 4-Pillar Bar + "DESIGN • TECNOLOGIA • EVOLUÇÃO" */}
      <div className="relative z-20 w-full px-5 sm:px-10 lg:px-14 xl:px-20 pt-6 mt-4 border-t border-white/10 bg-gradient-to-t from-[#02050D] via-[#02050D]/90 to-transparent">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          {/* 4 Pillars with Glowing Cyan Icons & Vertical Dividers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-white/15">
            {/* 1. Inovação */}
            <div className="flex items-center gap-4 lg:pr-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/35 text-[#00F5FF] shadow-[0_0_16px_rgba(0,245,255,0.25)]">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base font-bold text-white leading-tight">
                  Inovação
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Sempre à frente
                </div>
              </div>
            </div>

            {/* 2. Qualidade */}
            <div className="flex items-center gap-4 lg:px-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/35 text-[#00F5FF] shadow-[0_0_16px_rgba(0,245,255,0.25)]">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base font-bold text-white leading-tight">
                  Qualidade
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Em cada detalhe
                </div>
              </div>
            </div>

            {/* 3. Performance */}
            <div className="flex items-center gap-4 lg:px-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/35 text-[#00F5FF] shadow-[0_0_16px_rgba(0,245,255,0.25)]">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base font-bold text-white leading-tight">
                  Performance
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Sem limites
                </div>
              </div>
            </div>

            {/* 4. Suporte Especializado */}
            <div className="flex items-center gap-4 lg:pl-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/35 text-[#00F5FF] shadow-[0_0_16px_rgba(0,245,255,0.25)]">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base font-bold text-white leading-tight">
                  Suporte Especializado
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Do início ao crescimento
                </div>
              </div>
            </div>
          </div>

          {/* Right Signature Line: ──── DESIGN • TECNOLOGIA • EVOLUÇÃO */}
          <div className="flex items-center gap-4 shrink-0 pt-2 xl:pt-0">
            <span
              className="hidden sm:block h-[1px] w-16 bg-gradient-to-r from-transparent to-[#00F5FF]/70"
              aria-hidden="true"
            />
            <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-slate-300 flex items-center gap-2.5">
              <span>DESIGN</span>
              <span className="text-[#00F5FF]">•</span>
              <span>TECNOLOGIA</span>
              <span className="text-[#00F5FF]">•</span>
              <span>EVOLUÇÃO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
