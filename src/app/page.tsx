"use client";

import React, { useState, useCallback } from "react";
import { ArrowLeft, ArrowRight, Eye, Layers, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection, ActiveViewTab } from "@/components/hero/HeroSection";
import { HomePortalsSection } from "@/components/home/HomePortalsSection";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { PortfolioModal } from "@/components/portfolio/PortfolioModal";
import { ServicesSection } from "@/components/services/ServicesSection";
import { WhyNexoraSection } from "@/components/differentials/WhyNexoraSection";
import { MethodologySection } from "@/components/methodology/MethodologySection";
import { CommercialContactSection } from "@/components/contact/CommercialContactSection";
import { FloatingWhatsApp } from "@/components/contact/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { portfolioProjects, PortfolioProject } from "@/data/portfolio";
import { soundEngine } from "@/utils/soundEngine";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<ActiveViewTab>("inicio");
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [preselectedProjectType, setPreselectedProjectType] = useState<
    string | undefined
  >(undefined);
  const [preselectedContextNote, setPreselectedContextNote] = useState<
    string | undefined
  >(undefined);

  const handleNavigateTab = useCallback((tab: ActiveViewTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleScrollToHomeSection = useCallback((sectionId: string) => {
    setActiveTab("inicio");
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  }, []);

  const handleOpenProjectBySlug = useCallback((slug: string) => {
    const found = portfolioProjects.find((p) => p.slug === slug);
    if (found) {
      setSelectedProject(found);
    }
  }, []);

  const handleSelectServiceForQuote = useCallback(
    (projectTypeOption: string, serviceTitle: string) => {
      setPreselectedProjectType(projectTypeOption);
      setPreselectedContextNote(
        `Olá! Tenho interesse na criação de ${serviceTitle} com a NORDARA e gostaria de receber um orçamento personalizado para minha empresa.`
      );
      setActiveTab("inicio");
      setTimeout(() => {
        const el = document.getElementById("formulario-orcamento");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
    },
    []
  );

  const handleRequestQuoteFromProject = useCallback(
    (project: PortfolioProject) => {
      setSelectedProject(null);
      const mapCategoryToType: Record<
        PortfolioProject["categoryFilter"],
        string
      > = {
        "ia-dados": "Site Institucional Profissional",
        "saude-sistemas": "Site para Clínica ou Profissional Liberal",
        "educacao-eventos": "Site para Evento ou Instituição de Ensino",
      };
      setPreselectedProjectType(mapCategoryToType[project.categoryFilter]);
      setPreselectedContextNote(
        `Analisei o projeto ${project.title} (${project.category}) no portfólio da NORDARA e gostaria de orçar um site com esse padrão de qualidade para meu negócio.`
      );
      setActiveTab("inicio");
      setTimeout(() => {
        const el = document.getElementById("formulario-orcamento");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 160);
    },
    []
  );

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#02050D] text-[#F4F7FB] overflow-x-hidden">
      {/* Skip to Content Link for Keyboard Accessibility */}
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#00F5FF] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#02050D]"
      >
        Pular para o conteúdo principal
      </a>

      {/* Top Futuristic Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onNavigateTab={handleNavigateTab}
        onScrollToHomeSection={handleScrollToHomeSection}
      />

      {/* Main Content */}
      <main className="flex-1 w-full">
        {activeTab === "inicio" ? (
          <>
            {/* 1. Início / Hero Section Full-Screen (100dvh, sem sobras laterais) */}
            <HeroSection
              onSelectProjectSlug={handleOpenProjectBySlug}
              onNavigateTab={handleNavigateTab}
              onScrollToHomeSection={handleScrollToHomeSection}
            />

            {/* 2. Painel Executivo de Acesso Rápido (3 Grandes Botões Clicáveis para Portfólio, Serviços e Sobre) */}
            <HomePortalsSection onNavigateTab={handleNavigateTab} />

            {/* 3. Metodologia NEXORA (Mantida na Página Inicial conforme solicitado) */}
            <MethodologySection />

            {/* 4. Contato e Solicitação de Orçamento (Mantido na Página Inicial conforme solicitado) */}
            <CommercialContactSection
              preselectedProjectType={preselectedProjectType}
              preselectedContextNote={preselectedContextNote}
            />
          </>
        ) : (
          /* PÁGINAS EXCLUSIVAS ABERTAS AO CLICAR NOS BOTÕES (PORTFÓLIO, SERVIÇOS, SOBRE) */
          <div className="pt-24 sm:pt-28 min-h-screen flex flex-col justify-between bg-[#02050D]">
            {/* Top Sub-Header Navigation Bar with Large Back Button & View Switcher */}
            <div className="w-full border-b border-[#00D4FF]/20 bg-[#030A1C]/90 backdrop-blur-xl">
              <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 py-4 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    handleNavigateTab("inicio");
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="inline-flex items-center gap-3 rounded-full border border-[#00D4FF]/50 bg-[#04122C] hover:border-[#00F5FF] hover:bg-[#071D44] px-6 py-3 text-sm sm:text-base font-bold text-white shadow-[0_0_20px_rgba(0,195,255,0.2)] transition-all"
                >
                  <ArrowLeft className="w-4 h-4 text-[#00F5FF]" />
                  <span>Voltar para a Página Inicial</span>
                </button>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      handleNavigateTab("portfolio");
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                      activeTab === "portfolio"
                        ? "bg-gradient-to-r from-[#00D4FF] to-[#0066FF] text-[#02050D] shadow-[0_0_20px_rgba(0,212,255,0.5)]"
                        : "border border-white/15 bg-white/[0.04] text-slate-300 hover:text-white"
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Portfólio</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      handleNavigateTab("servicos");
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                      activeTab === "servicos"
                        ? "bg-gradient-to-r from-[#00D4FF] to-[#0066FF] text-[#02050D] shadow-[0_0_20px_rgba(0,212,255,0.5)]"
                        : "border border-white/15 bg-white/[0.04] text-slate-300 hover:text-white"
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>Serviços (Sites)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      handleNavigateTab("sobre");
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                      activeTab === "sobre"
                        ? "bg-gradient-to-r from-[#00D4FF] to-[#0066FF] text-[#02050D] shadow-[0_0_20px_rgba(0,212,255,0.5)]"
                        : "border border-white/15 bg-white/[0.04] text-slate-300 hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Sobre a NORDARA</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Exclusive View Content */}
            <div className="flex-1 w-full">
              {activeTab === "portfolio" && (
                <PortfolioSection onOpenProject={setSelectedProject} />
              )}

              {activeTab === "servicos" && (
                <ServicesSection
                  onSelectServiceForQuote={handleSelectServiceForQuote}
                />
              )}

              {activeTab === "sobre" && <WhyNexoraSection />}
            </div>

            {/* Bottom Call-to-Action Bar on Exclusive Views */}
            <div className="w-full border-t border-[#00D4FF]/20 bg-[#030A1C] py-12 px-5 sm:px-10 lg:px-14 xl:px-20">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center lg:text-left">
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#00F5FF]">
                    PRÓXIMO PASSO // ORÇAMENTO PERSONALIZADO
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-black uppercase text-white"
                    style={{
                      fontFamily:
                        "'Orbitron', var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    Quer levar esse padrão tecnológico para a sua empresa?
                  </h3>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      handleNavigateTab("inicio");
                    }}
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.04] px-7 py-4 text-sm sm:text-base font-bold text-white hover:border-[#00F5FF]"
                  >
                    <ArrowLeft className="w-4 h-4 text-[#00F5FF]" />
                    <span>Voltar ao Início</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      handleScrollToHomeSection("orcamento");
                    }}
                    className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#00F5FF] via-[#00A8FF] to-[#0066FF] px-8 py-4 text-sm sm:text-base font-extrabold text-[#02050D] shadow-[0_0_35px_rgba(0,212,255,0.6)] hover:scale-105 transition-all"
                  >
                    <span>Solicitar Meu Orçamento Agora</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Rodapé Executivo */}
      <Footer
        onOpenProject={setSelectedProject}
        onSelectServiceForQuote={handleSelectServiceForQuote}
        onNavigateTab={handleNavigateTab}
        onScrollToHomeSection={handleScrollToHomeSection}
      />

      {/* Modal Lightbox Interno de Portfólio */}
      <PortfolioModal
        project={selectedProject}
        allProjects={portfolioProjects}
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
        onRequestQuoteForProject={handleRequestQuoteFromProject}
      />

      {/* Botão Flutuante de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
