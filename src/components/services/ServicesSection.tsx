"use client";

import React, { useState } from "react";
import {
  Globe,
  Rocket,
  Stethoscope,
  GraduationCap,
  LayoutGrid,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Layers,
  Sparkles,
} from "lucide-react";
import { servicesData, ServiceItem } from "@/data/services";
import { soundEngine } from "@/utils/soundEngine";

interface ServicesSectionProps {
  onSelectServiceForQuote: (projectTypeOption: string, serviceTitle: string) => void;
}

export function ServicesSection({ onSelectServiceForQuote }: ServicesSectionProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    servicesData[0].id
  );

  const activeService =
    servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];

  const getServiceIcon = (
    type: ServiceItem["visualBlueprint"]["architectureType"]
  ) => {
    switch (type) {
      case "institucional":
        return Globe;
      case "landing":
        return Rocket;
      case "saude-clinicas":
        return Stethoscope;
      case "eventos-educacao":
        return GraduationCap;
      case "catalogo-vitrine":
        return LayoutGrid;
      case "redesign-performance":
        return RefreshCw;
    }
  };

  return (
    <section
      id="servicos"
      className="relative py-24 lg:py-32 border-b border-[#00D4FF]/20 bg-[#020611] overflow-hidden"
    >
      {/* Ambient Neon Glows & Circuit Accents */}
      <div
        className="pointer-events-none absolute top-1/3 left-0 w-[550px] h-[550px] rounded-full bg-[#0066FF]/12 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-[#00F5FF]/10 blur-[160px]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-5 sm:px-10 lg:px-14 xl:px-20">
        {/* Futuristic Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#00D4FF]/20">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#00D4FF]/40 bg-[#04122C]/80 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#00F5FF] shadow-[0_0_10px_#00F5FF]" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#00F5FF]">
                ESPECIALISTAS EM CRIAÇÃO DE SITES
              </span>
            </div>

            <h2
              className="text-3xl sm:text-5xl font-black uppercase tracking-wide text-white leading-[1.1]"
              style={{
                fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
              }}
            >
              SITES QUE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#00A8FF] to-[#0066FF] drop-shadow-[0_0_20px_rgba(0,229,255,0.35)]">
                MOVEM NEGÓCIOS.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed border-l-2 border-[#00F5FF] pl-4">
            Desenvolvemos sites sob medida com visual tecnológico, velocidade
            extrema e estrutura estratégica pensada para atrair e converter
            clientes.
          </p>
        </div>

        {/* Interactive Holographic Deck (6 Website Categories) */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Selector Column (5 cols) */}
          <div
            className="lg:col-span-5 space-y-3"
            role="tablist"
            aria-label="Modalidades de sites desenvolvidos pela NEXORA"
          >
            {servicesData.map((service) => {
              const Icon = getServiceIcon(service.visualBlueprint.architectureType);
              const isSelected = service.id === activeService.id;

              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedServiceId(service.id);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`w-full text-left rounded-2xl border p-4 sm:p-5 transition-all duration-300 flex items-start gap-4 ${
                    isSelected
                      ? "border-[#00F5FF] bg-gradient-to-r from-[#061A3E] via-[#04122C] to-[#030B1B] shadow-[0_0_30px_rgba(0,212,255,0.25),inset_0_0_15px_rgba(0,245,255,0.1)]"
                      : "border-white/10 bg-[#040B1A]/75 hover:border-[#00D4FF]/40 hover:bg-[#061229]"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all ${
                      isSelected
                        ? "border-[#00F5FF] bg-[#00F5FF]/20 text-[#00F5FF] shadow-[0_0_18px_rgba(0,245,255,0.4)]"
                        : "border-white/10 bg-white/[0.03] text-slate-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[#00F5FF]">
                        SOLUÇÃO {service.number}
                      </span>
                      {isSelected && (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#00F5FF]">
                          ATIVO ●
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white mt-0.5">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {service.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Holographic Specification Stage (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-[#00D4FF]/35 bg-gradient-to-b from-[#06132C] to-[#030816] p-6 sm:p-9 lg:p-10 shadow-[0_25px_90px_rgba(0,0,0,0.8),0_0_40px_rgba(0,180,255,0.12)] space-y-8 relative overflow-hidden">
            {/* Top Laser Line */}
            <div
              className="pointer-events-none absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent shadow-[0_0_15px_#00F5FF]"
              aria-hidden="true"
            />

            {/* Header & Tags */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00F5FF]">
                    ARQUITETURA DE SITE // {activeService.number}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-extrabold text-white mt-1"
                    style={{
                      fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    {activeService.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activeService.deliverablesTag.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#00D4FF]/35 bg-[#00D4FF]/10 px-3 py-1 font-mono text-[10px] font-semibold text-[#00F5FF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* O Problema que Resolve */}
            <div className="rounded-2xl border border-[#00A8FF]/30 bg-[#041533]/60 p-5 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#00F5FF]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>O Problema que Este Site Resolve</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {activeService.problemSolved}
              </p>
            </div>

            {/* O Que Desenvolvemos & Benefícios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-[#00F5FF]">
                  O Que Está Incluso no Desenvolvimento
                </h4>
                <ul className="space-y-2.5">
                  {activeService.whatWeBuild.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#00F5FF] shadow-[0_0_8px_#00F5FF] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-[#00F5FF]">
                  Resultados para o Seu Negócio
                </h4>
                <ul className="space-y-2.5">
                  {activeService.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00F5FF] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Glowing Pill CTA */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Projeto 100% personalizado para a identidade da sua empresa.
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onSelectServiceForQuote(
                    activeService.projectTypeOption,
                    activeService.title
                  );
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#0099FF] to-[#0066FF] px-7 py-3.5 text-sm font-extrabold text-[#020611] shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(0,245,255,0.8)] shrink-0"
              >
                <span>Orçar {activeService.shortTitle}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
