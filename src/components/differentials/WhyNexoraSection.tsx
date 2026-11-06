"use client";

import React from "react";
import { NexoraLogo } from "@/components/brand/NexoraLogo";
import {
  Code2,
  Palette,
  Smartphone,
  Compass,
  Zap,
  Search,
  Cpu,
  Users,
  CheckCircle2,
  XCircle,
  Building2,
} from "lucide-react";
import {
  differentiatorsData,
  targetAudienceSegments,
} from "@/data/methodology";

export function WhyNexoraSection() {
  const icons = [
    Code2,
    Palette,
    Smartphone,
    Compass,
    Zap,
    Cpu,
    Users,
  ];

  return (
    <section
      id="diferenciais"
      className="relative py-24 lg:py-32 border-b border-[#00D4FF]/20 bg-[#02050D] overflow-hidden"
    >
      {/* Cosmic Neon Aura */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#0066FF]/12 blur-[170px]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-5 sm:px-10 lg:px-14 xl:px-20">
        {/* Top Brand Manifesto + Official Attachment 1 Logo Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-16 border-b border-[#00D4FF]/20">
          <div className="lg:col-span-6 space-y-5">
            <h2
              className="text-3xl sm:text-5xl font-black uppercase tracking-wide text-white leading-[1.1]"
              style={{
                fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
              }}
            >
              A FORÇA DE UMA MARCA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#00A8FF] to-[#0066FF] drop-shadow-[0_0_22px_rgba(0,229,255,0.4)]">
                FEITA PARA EVOLUIR NEGÓCIOS.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed border-l-2 border-[#00F5FF] pl-4">
              A <strong className="text-white">NEXORA</strong> nasceu para romper
              com sites genéricos e experiências digitais sem personalidade.
              Unimos design de alto impacto, engenharia moderna e visão comercial
              para posicionar sua empresa sempre à frente.
            </p>
          </div>

          {/* Right Column: 100% Vector Ultra-HD Official NEXORA Logo & Slogan Stage */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-[#00F5FF]/45 bg-[#02050D] p-8 sm:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(0,195,255,0.22)] flex flex-col items-center justify-center min-h-[340px]">
              {/* Diagonal Metallic Blue Beams & PCB Circuit Lines (Matching Attachment 1 in 4K Vector) */}
              <svg
                className="pointer-events-none absolute inset-0 w-full h-full"
                viewBox="0 0 640 360"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="brand-beam-1" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0066FF" stopOpacity="0.28" />
                    <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#0066FF" stopOpacity="0.28" />
                  </linearGradient>
                </defs>
                <polygon points="0,260 220,0 290,0 0,340" fill="url(#brand-beam-1)" />
                <polygon points="410,360 640,90 640,170 480,360" fill="url(#brand-beam-1)" />
                {/* Top-left PCB lines */}
                <path
                  d="M0 42 H85 L112 68 H180 M0 74 H55 L78 96 H135"
                  stroke="#00B4FF"
                  strokeOpacity="0.5"
                  strokeWidth="1.3"
                />
                <circle cx="180" cy="68" r="3" fill="#00F5FF" />
                <circle cx="135" cy="96" r="2.5" fill="#00B4FF" />
                {/* Bottom-right PCB lines */}
                <path
                  d="M640 318 H555 L528 292 H460 M640 286 H585 L562 264 H505"
                  stroke="#00B4FF"
                  strokeOpacity="0.5"
                  strokeWidth="1.3"
                />
                <circle cx="460" cy="292" r="3" fill="#00F5FF" />
                <circle cx="505" cy="264" r="2.5" fill="#00B4FF" />
              </svg>

              {/* Ambient Center Glow */}
              <div
                className="pointer-events-none absolute w-72 h-44 rounded-full bg-[#00A8FF]/20 blur-[65px]"
                aria-hidden="true"
              />

              {/* Crisp Vector Emblem (N+X with Orbital Ring) */}
              <div className="relative z-10 flex items-center justify-center scale-150 my-4">
                <NexoraLogo variant="symbol" size="xl" />
              </div>

              {/* Crisp Vector NEXORΛ Wordmark */}
              <div
                className="relative z-10 mt-2 flex items-center select-none font-black uppercase tracking-[0.16em] text-3xl sm:text-5xl leading-none"
                style={{
                  fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
                }}
              >
                <span className="bg-gradient-to-b from-white via-[#F1F5F9] to-[#94A3B8] bg-clip-text text-transparent">
                  NE
                </span>
                <span className="bg-gradient-to-tr from-[#0055FF] via-[#00B4FF] to-[#00F5FF] bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(0,212,255,0.55)]">
                  X
                </span>
                <span className="bg-gradient-to-b from-white via-[#F1F5F9] to-[#94A3B8] bg-clip-text text-transparent">
                  OR
                </span>
                <span className="bg-gradient-to-b from-white via-[#E2E8F0] to-[#94A3B8] bg-clip-text text-transparent">
                  Λ
                </span>
              </div>

              {/* Official Slogan */}
              <div className="relative z-10 mt-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.34em] text-slate-200 text-center">
                TECNOLOGIA QUE{" "}
                <span className="text-[#00F5FF] drop-shadow-[0_0_10px_rgba(0,245,255,0.6)]">
                  MOVE NEGÓCIOS.
                </span>
              </div>

              {/* Glowing Horizontal Laser Line Under Slogan */}
              <div
                className="relative z-10 mt-3.5 w-64 sm:w-80 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent shadow-[0_0_16px_#00F5FF]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* 7 Differentiators Holographic Bento Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {differentiatorsData.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            const colSpanClass =
              idx === 0
                ? "lg:col-span-7"
                : idx === 1
                ? "lg:col-span-5"
                : idx === 2 || idx === 3 || idx === 4
                ? "lg:col-span-4"
                : "lg:col-span-6";

            return (
              <div
                key={item.id}
                className={`${colSpanClass} group relative rounded-2xl border border-[#00D4FF]/25 bg-gradient-to-b from-[#06132C]/85 to-[#030917]/90 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#00F5FF] hover:shadow-[0_0_35px_rgba(0,212,255,0.2)]`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#00F5FF]/40 bg-[#00F5FF]/10 text-[#00F5FF] shadow-[0_0_18px_rgba(0,245,255,0.25)] transition-transform duration-300 group-hover:scale-105">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#00F5FF]/70 group-hover:text-[#00F5FF] transition-colors">
                      {item.code}
                    </span>
                  </div>

                  <h3
                    className="text-lg sm:text-xl font-bold text-white mb-2.5"
                    style={{
                      fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F5FF] shadow-[0_0_8px_#00F5FF] shrink-0" />
                  <span className="font-mono text-[11px] text-[#00D4FF]">
                    {item.technicalProof}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contrast Matrix: Sites Comuns vs. Padrão NEXORA */}
        <div className="mt-16 rounded-3xl border border-[#00D4FF]/35 bg-gradient-to-b from-[#06142E] to-[#02050D] p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div
            className="pointer-events-none absolute top-0 left-16 right-16 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent shadow-[0_0_15px_#00F5FF]"
            aria-hidden="true"
          />

          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00F5FF]">
              COMPARATIVO DE QUALIDADE //
            </span>
            <h3
              className="text-2xl sm:text-3xl font-extrabold text-white mt-2 uppercase"
              style={{
                fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
              }}
            >
              Templates Comuns vs. Experiência NEXORA
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-rose-500/25 bg-rose-950/15 p-6 space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-rose-300 font-bold">
                Sites Genéricos de Mercado
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                {[
                  "Templates prontos repetidos para várias empresas sem identidade própria",
                  "Visual simples que não transmite autoridade nem valoriza seus serviços",
                  "Lentidão no carregamento e falhas de adaptação no celular",
                  "Botões e formulários sem estratégia comercial para converter visitantes",
                ].map((txt) => (
                  <li key={txt} className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{txt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#00F5FF]/50 bg-[#00A8FF]/10 p-6 space-y-4 shadow-[0_0_30px_rgba(0,212,255,0.15)]">
              <div className="font-mono text-xs uppercase tracking-widest text-[#00F5FF] font-bold">
                Padrão de Excelência NEXORA
              </div>
              <ul className="space-y-3 text-sm text-white">
                {[
                  "Design tecnológico e autoral pensado exclusivamente para a sua empresa",
                  "Impacto visual imediato que destaca sua marca nos primeiros segundos",
                  "Alta performance, carregamento rápido e adaptação perfeita para celular",
                  "Foco total em transformar visitantes em contatos e orçamentos reais",
                ].map((txt) => (
                  <li key={txt} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00F5FF] shrink-0 mt-0.5" />
                    <span>{txt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Target Audience Segments Section */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="mb-8">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00F5FF]">
              SEGMENTOS ATENDIDOS //
            </span>
            <h3
              className="text-2xl sm:text-3xl font-extrabold text-white mt-1 uppercase"
              style={{
                fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
              }}
            >
              Para quem criamos experiências digitais
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {targetAudienceSegments.map((seg) => (
              <div
                key={seg.id}
                className="rounded-2xl border border-[#00D4FF]/20 bg-[#040B1A]/90 p-5 space-y-2.5 hover:border-[#00F5FF]/60 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-[#00F5FF] shrink-0" />
                  <h4 className="font-display text-base font-bold text-white">
                    {seg.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {seg.subtitle}
                </p>
                <div className="pt-2 font-mono text-[11px] text-[#00D4FF]">
                  Ex: {seg.examples}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
