"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  Layers,
  CheckCircle2,
  Sparkles,
  ZoomIn,
  ZoomOut,
  ArrowRight,
  Palette,
  Type,
  ShieldCheck,
} from "lucide-react";
import { PortfolioProject } from "@/data/portfolio";

interface PortfolioModalProps {
  project: PortfolioProject | null;
  allProjects: PortfolioProject[];
  onClose: () => void;
  onSelectProject: (project: PortfolioProject) => void;
  onRequestQuoteForProject: (project: PortfolioProject) => void;
}

export function PortfolioModal({
  project,
  allProjects,
  onClose,
  onSelectProject,
  onRequestQuoteForProject,
}: PortfolioModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewportFilter, setViewportFilter] = useState<"all" | "desktop" | "mobile">("all");
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset gallery index when project changes
  useEffect(() => {
    setActiveImageIndex(0);
    setViewportFilter("all");
    setIsZoomed(false);
  }, [project?.id]);

  const filteredGallery = project
    ? project.gallery.filter((img) =>
        viewportFilter === "all" ? true : img.viewport === viewportFilter
      )
    : [];

  const safeImageIndex =
    filteredGallery.length > 0
      ? Math.min(activeImageIndex, filteredGallery.length - 1)
      : 0;

  const currentScreenshot = filteredGallery[safeImageIndex] || project?.gallery[0];

  const currentProjectIdx = project
    ? allProjects.findIndex((p) => p.id === project.id)
    : -1;

  const handlePrevProject = useCallback(() => {
    if (currentProjectIdx === -1) return;
    const prevIdx =
      (currentProjectIdx - 1 + allProjects.length) % allProjects.length;
    onSelectProject(allProjects[prevIdx]);
  }, [currentProjectIdx, allProjects, onSelectProject]);

  const handleNextProject = useCallback(() => {
    if (currentProjectIdx === -1) return;
    const nextIdx = (currentProjectIdx + 1) % allProjects.length;
    onSelectProject(allProjects[nextIdx]);
  }, [currentProjectIdx, allProjects, onSelectProject]);

  const handlePrevImage = useCallback(() => {
    if (filteredGallery.length <= 1) return;
    setActiveImageIndex(
      (prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length
    );
  }, [filteredGallery.length]);

  const handleNextImage = useCallback(() => {
    if (filteredGallery.length <= 1) return;
    setActiveImageIndex((prev) => (prev + 1) % filteredGallery.length);
  }, [filteredGallery.length]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, isZoomed, onClose, handlePrevImage, handleNextImage]);

  if (!project || !currentScreenshot) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-[#03050B]/90 backdrop-blur-xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Backdrop click to close */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 flex flex-col w-full max-w-[1440px] max-h-[94vh] rounded-2xl sm:rounded-3xl border border-white/15 bg-[#070C18] shadow-[0_30px_120px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Top Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#050811] px-4 sm:px-6 py-3.5 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex items-center justify-center rounded-lg bg-[#00E5FF]/15 border border-[#00E5FF]/40 px-2.5 py-1 font-mono text-xs font-bold text-[#00E5FF]">
              PROJETO {project.index} / 0{allProjects.length}
            </span>
            <div className="truncate">
              <h2
                id="modal-project-title"
                className="font-display text-base sm:text-xl font-bold text-white truncate"
              >
                {project.title}
              </h2>
              <p className="text-xs text-slate-400 truncate hidden sm:block">
                {project.category} • Galeria Interna Verificada NORDARA
              </p>
            </div>
          </div>

          {/* Project Switcher & Close Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevProject}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-[#00E5FF]/50 hover:bg-white/[0.08]"
              title="Projeto anterior"
            >
              <ChevronLeft className="w-4 h-4 text-[#00E5FF]" />
              <span className="hidden md:inline">Projeto Anterior</span>
            </button>

            <button
              type="button"
              onClick={handleNextProject}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-[#00E5FF]/50 hover:bg-white/[0.08]"
              title="Próximo projeto"
            >
              <span className="hidden md:inline">Próximo Projeto</span>
              <ChevronRight className="w-4 h-4 text-[#00E5FF]" />
            </button>

            <div className="h-5 w-px bg-white/10 mx-1" />

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.05] p-2 text-slate-300 transition-colors hover:border-rose-400/50 hover:bg-rose-500/15 hover:text-white"
              aria-label="Fechar galeria do projeto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Scrollable Content Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {/* Left Column (7 cols): Interactive Visual Gallery & Lightbox */}
          <div className="lg:col-span-7 flex flex-col bg-[#050811]/70 p-4 sm:p-6">
            {/* Viewport Filter & Zoom Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex rounded-xl border border-white/10 bg-[#090F1E] p-1">
                <button
                  type="button"
                  onClick={() => {
                    setViewportFilter("all");
                    setActiveImageIndex(0);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    viewportFilter === "all"
                      ? "bg-[#1D4ED8] text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Todas ({project.gallery.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewportFilter("desktop");
                    setActiveImageIndex(0);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    viewportFilter === "desktop"
                      ? "bg-[#1D4ED8] text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>
                    Desktop (
                    {project.gallery.filter((g) => g.viewport === "desktop").length})
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewportFilter("mobile");
                    setActiveImageIndex(0);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    viewportFilter === "mobile"
                      ? "bg-[#1D4ED8] text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>
                    Mobile (
                    {project.gallery.filter((g) => g.viewport === "mobile").length})
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsZoomed((z) => !z)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-mono text-slate-300 hover:border-[#00E5FF]/50 hover:text-white transition-all"
              >
                {isZoomed ? (
                  <>
                    <ZoomOut className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Ajustar à Tela</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Ampliar Captura</span>
                  </>
                )}
              </button>
            </div>

            {/* Main Screenshot Stage with Device Frame */}
            <div className="relative flex items-center justify-center rounded-2xl border border-white/10 bg-[#03060C] p-3 sm:p-5 overflow-auto">
              {/* Previous Image Button */}
              {filteredGallery.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full border border-white/20 bg-[#050811]/85 p-2.5 text-white shadow-lg backdrop-blur-md transition-all hover:border-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#050811]"
                  aria-label="Captura anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Device Frame Wrapper */}
              {currentScreenshot.viewport === "mobile" ? (
                <div
                  className={`relative mx-auto rounded-[32px] border-[6px] border-slate-800 bg-[#050811] shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 ${
                    isZoomed ? "w-[360px]" : "w-[220px] sm:w-[250px]"
                  }`}
                >
                  {/* Mobile Speaker Notch */}
                  <div className="h-5 bg-slate-900 flex items-center justify-center">
                    <div className="w-14 h-1.5 rounded-full bg-slate-700" />
                  </div>
                  <img
                    src={currentScreenshot.src}
                    alt={`${project.title} — ${currentScreenshot.title}`}
                    className="w-full h-auto object-contain block"
                  />
                </div>
              ) : (
                <div
                  className={`relative w-full rounded-xl border border-white/15 bg-[#0A0F1D] shadow-[0_25px_70px_rgba(0,0,0,0.75)] overflow-hidden transition-all duration-300 ${
                    isZoomed ? "scale-[1.15] origin-top" : "max-w-full"
                  }`}
                >
                  {/* Browser Top Chrome Header */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#060A14] px-3.5 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                    </div>
                    <div className="rounded-md bg-white/[0.04] border border-white/[0.06] px-3 py-0.5 font-mono text-[10px] text-slate-400">
                      nordara://showcase/{project.slug}/{currentScreenshot.id}
                    </div>
                    <div className="font-mono text-[10px] text-[#00E5FF]">
                      REAL CAPTURE
                    </div>
                  </div>
                  <img
                    src={currentScreenshot.src}
                    alt={`${project.title} — ${currentScreenshot.title}`}
                    className="w-full h-auto max-h-[54vh] object-contain bg-[#050811] block mx-auto"
                  />
                </div>
              )}

              {/* Next Image Button */}
              {filteredGallery.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full border border-white/20 bg-[#050811]/85 p-2.5 text-white shadow-lg backdrop-blur-md transition-all hover:border-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#050811]"
                  aria-label="Próxima captura"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Active Screenshot Title & Technical Caption */}
            <div className="mt-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-semibold text-[#00E5FF]">
                    [{safeImageIndex + 1}/{filteredGallery.length}]
                  </span>
                  <h3 className="text-sm font-semibold text-white">
                    {currentScreenshot.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {currentScreenshot.caption}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 self-start sm:self-center shrink-0 rounded-md bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] uppercase text-slate-300">
                {currentScreenshot.viewport === "mobile" ? (
                  <>
                    <Smartphone className="w-3 h-3 text-[#00E5FF]" /> Mobile 390px
                  </>
                ) : (
                  <>
                    <Monitor className="w-3 h-3 text-[#00E5FF]" /> Desktop 1440px
                  </>
                )}
              </span>
            </div>

            {/* Thumbnail Strip */}
            <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-2.5">
              {filteredGallery.map((shot, idx) => {
                const isCurrent = idx === safeImageIndex;
                return (
                  <button
                    key={shot.id}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`group relative overflow-hidden rounded-xl border text-left transition-all ${
                      isCurrent
                        ? "border-[#00E5FF] ring-2 ring-[#00E5FF]/30"
                        : "border-white/10 opacity-65 hover:opacity-100 hover:border-white/30"
                    }`}
                  >
                    <div className="aspect-[16/10] w-full bg-[#050811] overflow-hidden">
                      <img
                        src={shot.src}
                        alt={shot.title}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="bg-[#080E1C] px-2 py-1 flex items-center justify-between">
                      <span className="font-mono text-[9px] text-slate-300 truncate">
                        0{idx + 1}. {shot.viewport === "mobile" ? "Mobile" : "Tela"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (5 cols): Case Study Details, Verified Features & Conversion */}
          <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-7 space-y-6 bg-[#070C18]">
            <div className="space-y-6">
              {/* Category & Title Block */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 px-3 py-1 text-xs font-mono text-[#00E5FF] mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{project.category}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-blue-400 mt-1">
                  {project.subtitle}
                </p>
              </div>

              {/* Full Presentation */}
              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <p>{project.fullDescription}</p>
              </div>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 gap-3">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                    Contexto &amp; Desafio
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.challengeAndContext}
                  </p>
                </div>

                <div className="rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/[0.03] p-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#00E5FF] mb-1">
                    Arquitetura &amp; Solução Entregue
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {project.solutionDelivered}
                  </p>
                </div>
              </div>

              {/* Verified Features List */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-slate-300 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
                  <span>Principais Características Verificadas</span>
                </h4>
                <ul className="space-y-2.5">
                  {project.verifiedFeatures.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inspected Design & Technical Specs */}
              <div className="rounded-2xl border border-white/10 bg-[#050811]/90 p-4 space-y-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  Ficha Técnica Inspecionada
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <Type className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-slate-400">Tipografia</div>
                      <div className="text-white font-medium">
                        {project.inspectedSpecs.typography}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Monitor className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-slate-400">Tipo de Aplicação</div>
                      <div className="text-white font-medium">
                        {project.inspectedSpecs.interfaceType}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Palette Swatches */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                    <Palette className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Paleta Identificada na Inspeção Visual:</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {project.inspectedSpecs.paletteSwatches.map((swatch) => (
                      <div
                        key={swatch.hex}
                        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-1.5"
                      >
                        <span
                          className="w-5 h-5 rounded-md border border-white/20 shrink-0"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <div className="min-w-0">
                          <div className="text-[10px] text-white font-medium truncate">
                            {swatch.label}
                          </div>
                          <div className="font-mono text-[9px] text-slate-400">
                            {swatch.hex}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Modal Commercial CTA */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                type="button"
                onClick={() => onRequestQuoteForProject(project)}
                className="w-full group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#00B4D8] px-6 py-4 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)] transition-all hover:shadow-[0_15px_40px_rgba(0,229,255,0.35)]"
              >
                <span>Solicitar projeto com este padrão de excelência</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-center font-mono text-[11px] text-slate-400">
                Demonstração oficial hospedada internamente na NORDARA • Sem redirecionamentos externos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
