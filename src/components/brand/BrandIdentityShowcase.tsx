"use client";

import React, { useState } from "react";
import { NexoraLogo } from "./NexoraLogo";
import { Sparkles, Eye, Layers, Palette } from "lucide-react";

export function BrandIdentityShowcase() {
  const [previewSurface, setPreviewSurface] = useState<
    "dark" | "light" | "mono" | "presentation"
  >("dark");

  return (
    <section
      id="identidade"
      className="relative py-20 lg:py-24 border-b border-white/[0.06] bg-[#050811] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-[#080E1C]/90 p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SISTEMA DE IDENTIDADE VISUAL AUTORAL — NEXORA (N×X)</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Símbolo tecnológico próprio: conexões, movimento e precisão.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                O monograma da NEXORA funde os pilares estruturais da letra{" "}
                <strong className="text-white">N</strong> ao vetor dinâmico da letra{" "}
                <strong className="text-[#00E5FF]">X</strong>, formando um núcleo
                central de conexão projetado para cabeçalhos, rodapés, favicons,
                superfícies claras, escuras e apresentações executivas.
              </p>
            </div>

            {/* Interactive Surface Switcher */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "dark", label: "Versão Escura (Padrão)" },
                { id: "light", label: "Versão Clara (Editorial)" },
                { id: "mono", label: "Monocromática" },
                { id: "presentation", label: "Símbolo & Favicon" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setPreviewSurface(
                      tab.id as "dark" | "light" | "mono" | "presentation"
                    )
                  }
                  className={`rounded-xl px-3.5 py-2 text-xs font-mono transition-all border ${
                    previewSurface === tab.id
                      ? "border-[#00E5FF] bg-[#00E5FF]/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Brand Stage */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Main Logo Preview Box (7 cols) */}
            <div
              className={`lg:col-span-7 rounded-2xl border p-8 sm:p-12 flex flex-col items-center justify-center min-h-[240px] transition-all duration-500 ${
                previewSurface === "light"
                  ? "bg-[#F4F7FB] border-slate-300 text-[#050811]"
                  : "bg-[#050811] border-white/10 text-white"
              }`}
            >
              {previewSurface === "dark" && (
                <div className="flex flex-col items-center gap-5 text-center">
                  <NexoraLogo variant="full" theme="dark" size="xl" showTagline />
                  <p className="font-mono text-xs text-slate-400 max-w-md">
                    Aplicação principal para cabeçalho, rodapé e interfaces digitais
                    em fundo Preto Azulado Profundo (#050811).
                  </p>
                </div>
              )}

              {previewSurface === "light" && (
                <div className="flex flex-col items-center gap-5 text-center">
                  <NexoraLogo variant="full" theme="light" size="xl" showTagline />
                  <p className="font-mono text-xs text-slate-600 max-w-md">
                    Aplicação em fundo Branco Gelo (#F4F7FB) para propostas
                    comerciais, documentos executivos e materiais impressos.
                  </p>
                </div>
              )}

              {previewSurface === "mono" && (
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="rounded-xl border border-white/15 bg-[#090E1A] p-6">
                    <NexoraLogo variant="full" theme="mono-white" size="lg" />
                  </div>
                  <div className="rounded-xl border border-slate-300 bg-[#F4F7FB] p-6">
                    <NexoraLogo variant="full" theme="mono-dark" size="lg" />
                  </div>
                </div>
              )}

              {previewSurface === "presentation" && (
                <div className="flex flex-wrap items-center justify-center gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <NexoraLogo variant="symbol" theme="dark" size="xl" />
                    <span className="font-mono text-[10px] text-slate-400">
                      Símbolo 64px
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <NexoraLogo variant="symbol" theme="dark" size="md" />
                    <span className="font-mono text-[10px] text-slate-400">
                      App Icon 38px
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <NexoraLogo variant="symbol" theme="dark" size="sm" />
                    <span className="font-mono text-[10px] text-slate-400">
                      Favicon 30px
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Color System & Typography Spec (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#050811] p-6 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#00E5FF] mb-3">
                  <Palette className="w-4 h-4" />
                  <span>Paleta Oficial NEXORA</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { name: "Abissal", hex: "#050811" },
                    { name: "Grafite", hex: "#111827" },
                    { name: "Gelo", hex: "#F4F7FB" },
                    { name: "Elétrico", hex: "#1D4ED8" },
                    { name: "Ciano", hex: "#00E5FF" },
                  ].map((color) => (
                    <div key={color.hex} className="space-y-1.5 text-center">
                      <div
                        className="h-10 w-full rounded-lg border border-white/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="text-[10px] font-medium text-white truncate">
                        {color.name}
                      </div>
                      <div className="font-mono text-[9px] text-slate-400">
                        {color.hex}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-300">
                  <Layers className="w-4 h-4 text-[#00E5FF]" />
                  <span>Tipografia &amp; Assinatura</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Display:{" "}
                  <strong className="text-white font-display">Space Grotesk</strong>{" "}
                  • Interface:{" "}
                  <strong className="text-white">Plus Jakarta Sans</strong> •
                  Telemetria:{" "}
                  <strong className="text-white font-mono">JetBrains Mono</strong>
                </p>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#00E5FF]">
                  <Eye className="w-3.5 h-3.5" />
                  <span>&ldquo;Experiências digitais extraordinárias.&rdquo;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

