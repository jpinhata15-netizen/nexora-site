"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Shield, Lock } from "lucide-react";
import { NexoraLogo } from "@/components/brand/NexoraLogo";
import {
  siteConfig,
  isWhatsAppConfigured,
  isEmailConfigured,
  getFormattedWhatsApp,
  buildWhatsAppUrl,
} from "@/config/site";
import { portfolioProjects, PortfolioProject } from "@/data/portfolio";
import { servicesData } from "@/data/services";

import { ActiveViewTab } from "@/components/hero/HeroSection";

interface FooterProps {
  onOpenProject: (project: PortfolioProject) => void;
  onSelectServiceForQuote: (projectTypeOption: string, serviceTitle: string) => void;
  onNavigateTab: (tab: ActiveViewTab) => void;
  onScrollToHomeSection: (sectionId: string) => void;
}

export function Footer({
  onOpenProject,
  onSelectServiceForQuote,
  onNavigateTab,
  onScrollToHomeSection,
}: FooterProps) {
  const handleFooterNav = (id: string) => {
    if (id === "inicio") {
      onNavigateTab("inicio");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "portfolio") {
      onNavigateTab("portfolio");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "servicos") {
      onNavigateTab("servicos");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "diferenciais") {
      onNavigateTab("sobre");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "metodologia" || id === "orcamento") {
      onScrollToHomeSection(id);
    }
  };

  const whatsappReady = isWhatsAppConfigured();
  const emailReady = isEmailConfigured();
  const whatsappUrl = buildWhatsAppUrl();

  const configuredSocials = [
    { label: "Instagram", href: siteConfig.socials.instagram },
    { label: "LinkedIn", href: siteConfig.socials.linkedin },
    { label: "GitHub", href: siteConfig.socials.github },
    { label: "Behance", href: siteConfig.socials.behance },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="relative border-t border-white/10 bg-[#04060E] pt-20 pb-12 text-slate-400">
      <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Column 1 (4 cols): Brand & Presentation */}
          <div className="lg:col-span-4 space-y-5">
            <NexoraLogo variant="full" theme="dark" size="lg" showTagline />

            <p className="font-display text-base font-semibold text-white">
              NEXORA — Transformando ideias em experiências digitais.
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {siteConfig.positioning}
            </p>
          </div>

          {/* Column 2 (2 cols): Navegação */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { id: "inicio", label: "Início" },
                { id: "portfolio", label: "Portfólio" },
                { id: "servicos", label: "Serviços (Sites)" },
                { id: "diferenciais", label: "Sobre a NEXORA" },
                { id: "metodologia", label: "Metodologia" },
                { id: "orcamento", label: "Solicitar Orçamento" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => handleFooterNav(link.id)}
                    className="hover:text-[#00E5FF] transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 (3 cols): Serviços */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white">
              Soluções &amp; Serviços
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {servicesData.map((srv) => (
                <li key={srv.id}>
                  <button
                    type="button"
                    onClick={() =>
                      onSelectServiceForQuote(srv.projectTypeOption, srv.title)
                    }
                    className="hover:text-[#00E5FF] transition-colors text-left"
                  >
                    {srv.number}. {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (3 cols): Portfólio (Abertura Interna em Modal) & Contato */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white">
                Portfólio Verificado
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                {portfolioProjects.map((proj) => (
                  <li key={proj.id}>
                    <button
                      type="button"
                      onClick={() => onOpenProject(proj)}
                      className="inline-flex items-center gap-1.5 hover:text-[#00E5FF] transition-colors text-left"
                    >
                      <span>
                        {proj.index}. {proj.title}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-[#00E5FF]" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
              <div className="font-mono uppercase tracking-wider text-white">
                Atendimento Comercial
              </div>
              {whatsappReady && whatsappUrl ? (
                <div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline"
                  >
                    WhatsApp: {getFormattedWhatsApp()}
                  </a>
                </div>
              ) : (
                <div className="text-slate-500">
                  WhatsApp configurável em{" "}
                  <code className="text-slate-300">src/config/site.ts</code>
                </div>
              )}

              {emailReady ? (
                <div>
                  <a
                    href={`mailto:${siteConfig.contact.commercialEmail}`}
                    className="text-[#00E5FF] hover:underline"
                  >
                    {siteConfig.contact.commercialEmail}
                  </a>
                </div>
              ) : (
                <div className="text-slate-500">
                  E-mail configurável em{" "}
                  <code className="text-slate-300">src/config/site.ts</code>
                </div>
              )}

              {configuredSocials.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {configuredSocials.map((soc) => (
                    <a
                      key={soc.label}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-300 hover:text-[#00E5FF]"
                    >
                      {soc.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} NEXORA — Agência de Desenvolvimento
            Digital, Design e Tecnologia. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/privacidade"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#00E5FF] transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Política de Privacidade</span>
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-mono text-slate-400 hover:text-white transition-colors"
            >
              Voltar ao topo ↑
            </button>
            <Link
              href="/prospeccao"
              title="Acesso restrito NEXORA"
              aria-label="Acesso restrito NEXORA"
              className="text-slate-600 hover:text-[#00E5FF] transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

