"use client";

import React, { useState } from "react";
import {
  Eye,
  Layers,
  Monitor,
  Smartphone,
  Sparkles,
  CheckCircle2,
  Maximize2,
  ArrowRight,
} from "lucide-react";
import { portfolioProjects, PortfolioProject } from "@/data/portfolio";
import { soundEngine } from "@/utils/soundEngine";

interface PortfolioSectionProps {
  onOpenProject: (project: PortfolioProject) => void;
}

export function PortfolioSection({ onOpenProject }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "ia-dados" | "saude-sistemas" | "educacao-eventos"
  >("all");
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const filteredProjects = portfolioProjects.filter((p) =>
    activeFilter === "all" ? true : p.categoryFilter === activeFilter
  );

  return (
    <section
      id="portfolio"
      className="relative py-24 lg:py-32 border-b border-[#00D4FF]/20 bg-[#02050D] overflow-hidden"
    >
      {/* Cosmic Neon Background Auras */}
      <div
        className="pointer-events-none absolute top-1/4 right-0 w-[650px] h-[650px] rounded-full bg-[#0066FF]/12 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 left-0 w-[550px] h-[550px] rounded-full bg-[#00F5FF]/10 blur-[160px]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-5 sm:px-10 lg:px-14 xl:px-20">
        {/* Futuristic Header Matching Hero Style */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#00D4FF]/20">
          <div className="space-y-4 max-w-3xl">
            <h2
              className="text-3xl sm:text-5xl font-black uppercase tracking-wide text-white leading-[1.1]"
              style={{
                fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
              }}
            >
              PROJETOS QUE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#00B4FF] to-[#0066FF] drop-shadow-[0_0_25px_rgba(0,229,255,0.4)]">
                COMPROVAM NOSSA CAPACIDADE.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed border-l-2 border-[#00F5FF] pl-4">
              Explore as capturas reais em alta definição dos projetos
              desenvolvidos. Clique em qualquer vitrine para abrir a demonstração
              completa em tela cheia dentro da própria NORDARA.
            </p>
          </div>

          {/* Glowing Pill Filter Tabs */}
          <div
            className="flex flex-wrap items-center gap-2.5"
            role="tablist"
            aria-label="Filtrar projetos por especialidade"
          >
            {[
              { id: "all", label: "Todos os Projetos (05)" },
              { id: "educacao-eventos", label: "Sites Institucionais & Eventos" },
              { id: "saude-sistemas", label: "Saúde & Plataformas" },
              { id: "ia-dados", label: "IA & Tecnologia" },
            ].map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveFilter(
                      tab.id as
                        | "all"
                        | "ia-dados"
                        | "saude-sistemas"
                        | "educacao-eventos"
                    );
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all border ${
                    active
                      ? "border-[#00F5FF] bg-gradient-to-r from-[#00D4FF] to-[#0066FF] text-[#020611] font-extrabold shadow-[0_0_25px_rgba(0,229,255,0.55)]"
                      : "border-[#00D4FF]/30 bg-[#041024]/80 text-slate-300 hover:border-[#00F5FF] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Holographic Exhibition Stage */}
        <div className="mt-16 space-y-20 lg:space-y-28">
          {filteredProjects.map((project, idx) => {
            const isHovered = hoveredProjectId === project.id;
            const heroShot = project.gallery[0];
            const secondShot = project.gallery[1] || project.gallery[0];
            const mobileShot =
              project.gallery.find((g) => g.viewport === "mobile") ||
              project.gallery[project.gallery.length - 1];

            const isEven = idx % 2 === 0;
            const isShowcaseFull = project.layoutSpan === "showcase-full";

            if (isShowcaseFull) {
              return (
                <article
                  key={project.id}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  className="group relative rounded-[32px] border border-[#00D4FF]/40 bg-gradient-to-b from-[#061531] via-[#040C1E] to-[#02050D] p-6 sm:p-10 lg:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.85),0_0_45px_rgba(0,180,255,0.15)] transition-all duration-500 hover:border-[#00F5FF]"
                >
                  {/* Top Laser Horizon Line */}
                  <div
                    className="pointer-events-none absolute top-0 left-16 right-16 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent shadow-[0_0_15px_#00F5FF]"
                    aria-hidden="true"
                  />

                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
                    <div className="space-y-3 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className="text-sm font-extrabold text-[#00F5FF]"
                          style={{
                            fontFamily:
                              "'Orbitron', var(--font-space-grotesk), sans-serif",
                          }}
                        >
                          PROJETO {project.index} //
                        </span>
                        <span className="rounded-full border border-[#00F5FF]/40 bg-[#00F5FF]/10 px-3.5 py-1 font-mono text-xs text-[#00F5FF]">
                          {project.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-slate-300">
                          <Layers className="w-3.5 h-3.5 text-[#00F5FF]" />
                          {project.gallery.length} Capturas Reais
                        </span>
                      </div>

                      <h3
                        className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide uppercase"
                        style={{
                          fontFamily:
                            "'Orbitron', var(--font-space-grotesk), sans-serif",
                        }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        onOpenProject(project);
                      }}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="self-start lg:self-end inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#0099FF] to-[#0066FF] px-7 py-4 text-sm font-extrabold text-[#020611] shadow-[0_0_30px_rgba(0,212,255,0.55)] transition-all hover:scale-105 hover:shadow-[0_0_45px_rgba(0,245,255,0.85)] shrink-0"
                    >
                      <Eye className="w-4 h-4 stroke-[2.5]" />
                      <span>Ver Galeria Completa ({project.gallery.length} Telas)</span>
                    </button>
                  </div>

                  {/* Multi-Screen Panoramic Exhibition Grid */}
                  <div
                    onClick={() => {
                      soundEngine.playClick();
                      onOpenProject(project);
                    }}
                    className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch cursor-pointer"
                  >
                    <div className="lg:col-span-8 relative overflow-hidden rounded-2xl border border-[#00D4FF]/35 bg-[#030712] shadow-[0_0_35px_rgba(0,180,255,0.18)]">
                      <div className="flex items-center justify-between border-b border-white/10 bg-[#050C1D] px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#00F5FF]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0088FF]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                        </div>
                        <span className="font-mono text-[11px] text-slate-300">
                          {heroShot.title}
                        </span>
                        <span className="font-mono text-[10px] text-[#00F5FF] flex items-center gap-1">
                          <Maximize2 className="w-3 h-3" /> Ampliar
                        </span>
                      </div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <img
                          src={heroShot.src}
                          alt={`${project.title} — ${heroShot.title}`}
                          loading="lazy"
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#02050D]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <span className="inline-flex items-center gap-2 rounded-full bg-[#00F5FF] px-5 py-2.5 text-xs font-extrabold text-[#02050D] shadow-[0_0_25px_#00F5FF]">
                            <Eye className="w-4 h-4" />
                            Abrir Demonstração Interna
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col justify-between gap-4">
                      <div className="relative overflow-hidden rounded-2xl border border-[#00D4FF]/30 bg-[#030712] flex-1">
                        <div className="border-b border-white/10 bg-[#050C1D] px-3.5 py-2 font-mono text-[10px] text-[#00F5FF] flex items-center justify-between">
                          <span>Seção de Competições &amp; Atrações</span>
                          <Monitor className="w-3.5 h-3.5 text-[#00F5FF]" />
                        </div>
                        <img
                          src={secondShot.src}
                          alt={`${project.title} — ${secondShot.title}`}
                          loading="lazy"
                          className="w-full h-48 sm:h-52 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="rounded-2xl border border-[#00D4FF]/25 bg-[#041026]/80 p-5 space-y-3">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#00F5FF]">
                          Destaques Verificados
                        </div>
                        <ul className="space-y-2">
                          {project.verifiedFeatures.slice(0, 3).map((f) => (
                            <li
                              key={f}
                              className="flex items-start gap-2 text-xs text-slate-200"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00F5FF] shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={project.id}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Visual Stage with Holographic Pedestal Glow (7 cols) */}
                <div
                  onClick={() => {
                    soundEngine.playClick();
                    onOpenProject(project);
                  }}
                  className={`lg:col-span-7 relative cursor-pointer ${
                    !isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  {/* Neon Pedestal Underglow */}
                  <div
                    className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-12 rounded-full bg-[#00D4FF]/30 blur-2xl transition-all duration-500 group-hover:bg-[#00F5FF]/50"
                    aria-hidden="true"
                  />

                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#00D4FF]/35 bg-[#040C1E] shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_30px_rgba(0,180,255,0.15)] transition-all duration-500 group-hover:border-[#00F5FF] group-hover:shadow-[0_25px_90px_rgba(0,229,255,0.3)]">
                    {/* Futuristic Window Header */}
                    <div className="flex items-center justify-between border-b border-[#00D4FF]/20 bg-[#020611] px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00F5FF] shadow-[0_0_8px_#00F5FF]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0077FF]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                        <span className="ml-2 font-mono text-[11px] text-slate-300 truncate max-w-[200px] sm:max-w-xs">
                          {project.title} — {isHovered ? secondShot.title : heroShot.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/[0.05] px-2.5 py-0.5 font-mono text-[10px] text-slate-300">
                          <Monitor className="w-3 h-3 text-[#00F5FF]" />
                          Desktop +{" "}
                          <Smartphone className="w-3 h-3 text-[#00F5FF] ml-0.5" />
                          Mobile
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#00F5FF]/15 border border-[#00F5FF]/40 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#00F5FF]">
                          {project.gallery.length} telas
                        </span>
                      </div>
                    </div>

                    {/* Image Container with Hover Crossfade */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#02050D]">
                      <img
                        src={heroShot.src}
                        alt={`${project.title} — Captura Principal`}
                        loading={idx === 0 ? "eager" : "lazy"}
                        className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                          isHovered && secondShot.id !== heroShot.id
                            ? "scale-105 opacity-0"
                            : "scale-100 opacity-100"
                        }`}
                      />
                      {secondShot.id !== heroShot.id && (
                        <img
                          src={secondShot.src}
                          alt={`${project.title} — Segunda Seção`}
                          loading="lazy"
                          className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                            isHovered
                              ? "scale-100 opacity-100"
                              : "scale-105 opacity-0 pointer-events-none"
                          }`}
                        />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#02050D]/90 via-[#02050D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5 sm:p-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#0088FF] px-5 py-2.5 text-xs font-extrabold text-[#02050D] shadow-[0_0_25px_rgba(0,245,255,0.6)]">
                          <Eye className="w-4 h-4" />
                          <span>Abrir Galeria do Projeto</span>
                        </div>

                        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#020611]/90 border border-[#00F5FF]/40 px-3.5 py-1.5 font-mono text-[11px] text-white backdrop-blur-md">
                          <Sparkles className="w-3.5 h-3.5 text-[#00F5FF]" />
                          Clique para ampliar telas
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Mobile Viewport Preview Card */}
                  {mobileShot && (
                    <div
                      className={`hidden sm:block absolute -bottom-6 ${
                        isEven ? "-right-5" : "-left-5"
                      } z-20 w-28 lg:w-32 rounded-2xl border-2 border-[#00F5FF]/50 bg-[#02050D] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(0,245,255,0.25)] transition-transform duration-500 group-hover:-translate-y-2`}
                    >
                      <div className="w-8 h-1 rounded-full bg-[#00F5FF]/60 mx-auto mb-1" />
                      <div className="aspect-[9/19] w-full overflow-hidden rounded-xl bg-[#040C1E]">
                        <img
                          src={mobileShot.src}
                          alt={`${project.title} Mobile View`}
                          loading="lazy"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Editorial Details Column (5 cols) */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    !isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#00F5FF] to-[#0066FF]"
                        style={{
                          fontFamily:
                            "'Orbitron', var(--font-space-grotesk), sans-serif",
                        }}
                      >
                        {project.index}
                      </span>
                      <div className="h-[1.5px] flex-1 bg-gradient-to-r from-[#00F5FF]/50 to-transparent" />
                      <span className="rounded-full border border-[#00F5FF]/40 bg-[#00F5FF]/10 px-3.5 py-1 font-mono text-[11px] font-semibold text-[#00F5FF]">
                        {project.category}
                      </span>
                    </div>

                    <h3
                      className="text-2xl sm:text-4xl font-black text-white tracking-wide uppercase"
                      style={{
                        fontFamily:
                          "'Orbitron', var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {project.title}
                    </h3>

                    <p className="text-sm font-semibold text-[#00D4FF]">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed border-l-2 border-[#00F5FF]/60 pl-4">
                    {project.shortDescription}
                  </p>

                  {/* Verified Highlights List */}
                  <div className="space-y-2.5 pt-1">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[#00F5FF]">
                      Destaques Verificados no Projeto:
                    </div>
                    <ul className="space-y-2">
                      {project.verifiedFeatures.slice(0, 3).map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#00F5FF] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        onOpenProject(project);
                      }}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="group/btn inline-flex items-center gap-3 rounded-full border border-[#00F5FF]/70 bg-[#04132D]/90 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_0_25px_rgba(0,212,255,0.3)] transition-all hover:bg-gradient-to-r hover:from-[#00D4FF] hover:to-[#0066FF] hover:text-[#020611] hover:shadow-[0_0_40px_rgba(0,245,255,0.75)]"
                    >
                      <Eye className="w-4 h-4 text-[#00F5FF] group-hover/btn:text-[#020611]" />
                      <span>Ver Demonstração ({project.gallery.length} Telas)</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
