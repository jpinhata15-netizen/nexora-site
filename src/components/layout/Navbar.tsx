"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { NexoraLogo } from "@/components/brand/NexoraLogo";
import { ActiveViewTab } from "@/components/hero/HeroSection";
import { soundEngine } from "@/utils/soundEngine";

export type NavItemId =
  | "inicio"
  | "portfolio"
  | "servicos"
  | "metodologia"
  | "sobre"
  | "contato";

interface NavbarProps {
  activeTab: ActiveViewTab;
  onNavigateTab: (tab: ActiveViewTab) => void;
  onScrollToHomeSection: (sectionId: string) => void;
}

const NAV_ITEMS: {
  id: NavItemId;
  label: string;
  type: "tab" | "home-scroll";
  targetTab?: ActiveViewTab;
  scrollTarget?: string;
}[] = [
  { id: "inicio", label: "Início", type: "tab", targetTab: "inicio" },
  { id: "portfolio", label: "Portfólio", type: "tab", targetTab: "portfolio" },
  { id: "servicos", label: "Serviços", type: "tab", targetTab: "servicos" },
  {
    id: "metodologia",
    label: "Metodologia",
    type: "home-scroll",
    scrollTarget: "metodologia",
  },
  { id: "sobre", label: "Sobre", type: "tab", targetTab: "sobre" },
  {
    id: "contato",
    label: "Contato",
    type: "home-scroll",
    scrollTarget: "contato",
  },
];

export function Navbar({
  activeTab,
  onNavigateTab,
  onScrollToHomeSection,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [homeScrollActive, setHomeScrollActive] = useState<
    "inicio" | "metodologia" | "contato"
  >("inicio");
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (activeTab !== "inicio") return;

      const scrollPos = window.scrollY + 260;
      const contatoEl = document.getElementById("orcamento");
      const metodologiaEl = document.getElementById("metodologia");

      if (
        contatoEl &&
        contatoEl.getBoundingClientRect().top + window.scrollY <= scrollPos
      ) {
        setHomeScrollActive("contato");
      } else if (
        metodologiaEl &&
        metodologiaEl.getBoundingClientRect().top + window.scrollY <= scrollPos
      ) {
        setHomeScrollActive("metodologia");
      } else {
        setHomeScrollActive("inicio");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab]);

  const handleNavClick = (item: (typeof NAV_ITEMS)[number]) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);

    if (item.id === "inicio") {
      setHomeScrollActive("inicio");
      onNavigateTab("inicio");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (item.type === "tab" && item.targetTab) {
      onNavigateTab(item.targetTab);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (item.type === "home-scroll" && item.scrollTarget) {
      onScrollToHomeSection(item.scrollTarget);
    }
  };

  const isItemActive = (item: (typeof NAV_ITEMS)[number]) => {
    if (activeTab !== "inicio") {
      return item.targetTab === activeTab;
    }
    return homeScrollActive === item.id;
  };

  const handleToggleAudio = () => {
    const state = soundEngine.toggle();
    setAudioEnabled(state);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled || activeTab !== "inicio"
          ? "bg-[#020611]/92 backdrop-blur-2xl border-b border-[#00D4FF]/25 py-3.5 shadow-[0_10px_40px_rgba(0,0,0,0.85)]"
          : "bg-gradient-to-b from-[#02050E]/95 via-[#02050E]/60 to-transparent py-5"
      }`}
    >
      <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 flex items-center justify-between gap-4">
        {/* Left: Official NEXORA Orbital Symbol | NEXORA Wordmark */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            setMobileMenuOpen(false);
            onNavigateTab("inicio");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onMouseEnter={() => soundEngine.playHover()}
          className="text-left focus:outline-none rounded-xl shrink-0"
          aria-label="NEXORA — Ir para a página inicial"
        >
          <NexoraLogo variant="full" theme="dark" size="md" showDivider />
        </button>

        {/* Center Navigation: Larger, Prominent Clickable Buttons */}
        <nav
          className="hidden lg:flex items-center gap-2 xl:gap-3"
          aria-label="Navegação principal"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = isItemActive(item);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`relative px-4 xl:px-5 py-2.5 rounded-full text-sm xl:text-base font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? "bg-[#00D4FF]/15 text-[#00F5FF] border border-[#00F5FF]/50 shadow-[0_0_20px_rgba(0,229,255,0.28)]"
                    : "text-slate-200 border border-transparent hover:text-white hover:bg-white/[0.06] hover:border-white/15"
                }`}
              >
                <span>{item.label}</span>
                {/* Glowing Cyan Laser Underline */}
                <span
                  className={`absolute left-4 right-4 -bottom-0.5 h-[2.5px] rounded-full bg-gradient-to-r from-[#0088FF] via-[#00F5FF] to-[#0088FF] shadow-[0_0_12px_#00F5FF] transition-all duration-300 ${
                    isActive
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right: Audio Synth Toggle + Larger Glowing Pill Button "Solicitar Orçamento →" */}
        <div className="hidden lg:flex items-center gap-3.5 shrink-0">
          <button
            type="button"
            onClick={handleToggleAudio}
            title={
              audioEnabled
                ? "Desativar efeitos sonoros de interface"
                : "Ativar efeitos sonoros de interface"
            }
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
              audioEnabled
                ? "border-[#00E5FF] bg-[#00E5FF]/15 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.35)]"
                : "border-white/15 bg-white/[0.04] text-slate-300 hover:border-[#00E5FF]/50 hover:text-white"
            }`}
            aria-label="Alternar áudio de interface"
          >
            {audioEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onScrollToHomeSection("orcamento");
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="group relative inline-flex items-center gap-3 rounded-full border-2 border-[#00D4FF]/85 bg-[#04132D]/90 px-7 py-3 text-sm xl:text-base font-bold text-white shadow-[0_0_25px_rgba(0,195,255,0.4),inset_0_0_16px_rgba(0,195,255,0.22)] transition-all duration-300 hover:border-[#00F5FF] hover:bg-[#0088FF]/30 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(0,245,255,0.65)]"
          >
            <span>Solicitar Orçamento</span>
            <ArrowRight className="w-4 h-4 text-[#00F5FF] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((o) => !o)}
          className="lg:hidden inline-flex items-center justify-center rounded-full border border-[#00D4FF]/60 bg-[#04132D]/90 p-3 text-white shadow-[0_0_18px_rgba(0,212,255,0.3)]"
          aria-expanded={mobileMenuOpen}
          aria-label={
            mobileMenuOpen ? "Fechar menu" : "Abrir menu de navegação"
          }
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#00D4FF]/25 bg-[#020611]/98 backdrop-blur-2xl px-5 pt-5 pb-7 space-y-5 max-h-[85vh] overflow-y-auto">
          <nav className="grid grid-cols-1 gap-2.5" aria-label="Menu mobile">
            {NAV_ITEMS.map((item) => {
              const isActive = isItemActive(item);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center justify-between rounded-2xl px-5 py-4 text-left text-base font-bold transition-all ${
                    isActive
                      ? "bg-[#0088FF]/25 text-[#00F5FF] border border-[#00F5FF]/50 shadow-[0_0_18px_rgba(0,245,255,0.25)]"
                      : "text-slate-100 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-5 h-5 text-[#00F5FF]" />
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToHomeSection("orcamento");
              }}
              className="w-full inline-flex items-center justify-center gap-3 rounded-full border border-[#00F5FF] bg-gradient-to-r from-[#00D4FF] via-[#0099FF] to-[#0066FF] px-6 py-4 text-base font-extrabold text-[#020611] shadow-[0_0_28px_rgba(0,195,255,0.55)]"
            >
              <span>Solicitar Orçamento</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
