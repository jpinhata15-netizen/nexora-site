"use client";

import React from "react";
import { ArrowRight, Eye, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { ActiveViewTab } from "@/components/hero/HeroSection";
import { soundEngine } from "@/utils/soundEngine";

interface HomePortalsSectionProps {
  onNavigateTab: (tab: ActiveViewTab) => void;
}

export function HomePortalsSection({ onNavigateTab }: HomePortalsSectionProps) {
  const portals: {
    tab: ActiveViewTab;
    badge: string;
    title: string;
    highlight: string;
    description: string;
    bullets: string[];
    ctaLabel: string;
    icon: React.ElementType;
  }[] = [
    {
      tab: "portfolio",
      badge: "01 // VITRINE DE PROJETOS",
      title: "PORTFÓLIO",
      highlight: "VERIFICADO.",
      description:
        "Inspecione 5 projetos reais desenvolvidos (Titanic AI, VitaTrack, CliniAI, Ciência de Dados e SemanaTec) em galeria interativa Desktop e Mobile.",
      bullets: [
        "Capturas reais em alta definição (Desktop & Mobile)",
        "Visualização completa dentro da própria plataforma",
        "Zero redirecionamentos externos",
      ],
      ctaLabel: "Abrir Portfólio Completo",
      icon: Eye,
    },
    {
      tab: "servicos",
      badge: "02 // SOLUÇÕES COMERCIAIS",
      title: "CRIAÇÃO DE",
      highlight: "SITES PREMIUM.",
      description:
        "Conheça nossas 6 modalidades de sites profissionais desenhadas sob medida para posicionar sua empresa, atrair clientes e gerar negócios.",
      bullets: [
        "Sites Institucionais, Landing Pages e Clínicas",
        "Sites para Eventos, Catálogos e Redesign Completo",
        "Simulador interativo de escopo e comparativo",
      ],
      ctaLabel: "Explorar Serviços de Sites",
      icon: Layers,
    },
    {
      tab: "sobre",
      badge: "03 // POSICIONAMENTO & DNA",
      title: "POR QUE A",
      highlight: "MARCA NEXORΛ.",
      description:
        "Descubra a filosofia de engenharia, design autoral e visão estratégica que diferencia a NEXORA das agências e templates convencionais.",
      bullets: [
        "Desenvolvimento 100% personalizado para cada cliente",
        "Performance extrema e responsividade em todos os dispositivos",
        "Atendimento consultivo próximo do início à entrega",
      ],
      ctaLabel: "Conhecer a Marca NEXORA",
      icon: Sparkles,
    },
  ];

  return (
    <section className="relative py-20 lg:py-24 border-b border-[#00D4FF]/20 bg-[#02050D] overflow-hidden">
      {/* Ambient Neon Lighting */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] rounded-full bg-[#0066FF]/12 blur-[160px]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-5 sm:px-10 lg:px-14 xl:px-20">
        {/* Executive Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#00D4FF]/20">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#00D4FF]/40 bg-[#04122C]/85 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#00F5FF] shadow-[0_0_10px_#00F5FF]" />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-[#00F5FF]">
                NAVEGAÇÃO EXECUTIVA // ÁREAS EXCLUSIVAS
              </span>
            </div>

            <h2
              className="text-2xl sm:text-4xl xl:text-5xl font-black uppercase tracking-wide text-white leading-[1.1]"
              style={{
                fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
              }}
            >
              EXPLORE O ECOSSISTEMA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#00A8FF] to-[#0066FF]">
                NEXORΛ.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed border-l-2 border-[#00F5FF] pl-4">
            Clique em qualquer uma das áreas abaixo (ou nos botões do menu
            superior) para acessar as páginas dedicadas de Portfólio, Serviços e
            Sobre a Marca.
          </p>
        </div>

        {/* 3 Large Interactive Portal Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.tab}
                onClick={() => {
                  soundEngine.playClick();
                  onNavigateTab(portal.tab);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={() => soundEngine.playHover()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    soundEngine.playClick();
                    onNavigateTab(portal.tab);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="group cursor-pointer rounded-3xl border border-[#00D4FF]/35 bg-gradient-to-b from-[#061534] via-[#040C1E] to-[#02050D] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00F5FF] hover:shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(0,229,255,0.28)] relative overflow-hidden"
              >
                {/* Top Laser Line */}
                <div
                  className="pointer-events-none absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent opacity-60 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />

                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#00F5FF]">
                      {portal.badge}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00F5FF]/15 border border-[#00F5FF]/45 text-[#00F5FF] shadow-[0_0_20px_rgba(0,245,255,0.25)] transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div>
                    <h3
                      className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight"
                      style={{
                        fontFamily:
                          "'Orbitron', var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {portal.title}{" "}
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#0088FF]">
                        {portal.highlight}
                      </span>
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-3">
                      {portal.description}
                    </p>
                  </div>

                  <ul className="space-y-2.5 pt-2 border-t border-white/10">
                    {portal.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00F5FF] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-6">
                  <span className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#0099FF] to-[#0066FF] px-7 py-4 text-sm sm:text-base font-extrabold text-[#020611] shadow-[0_0_28px_rgba(0,212,255,0.45)] transition-all duration-300 group-hover:shadow-[0_0_45px_rgba(0,245,255,0.85)]">
                    <span>{portal.ctaLabel}</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

