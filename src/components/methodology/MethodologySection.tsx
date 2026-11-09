"use client";

import React, { useState } from "react";
import {
  Search,
  Compass,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { methodologySteps } from "@/data/methodology";
import { soundEngine } from "@/utils/soundEngine";

export function MethodologySection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const stepIcons = [Search, Compass, PenTool, Code2, ShieldCheck, Rocket];
  const activeStep = methodologySteps[activeStepIndex];
  const ActiveIcon = stepIcons[activeStepIndex];

  const scrollToQuote = () => {
    soundEngine.playClick();
    const el = document.getElementById("orcamento");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="metodologia"
      className="relative py-24 lg:py-32 border-b border-[#00D4FF]/20 bg-[#020611] overflow-hidden"
    >
      {/* Blueprint Grid & Neon Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-25"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-[#0088FF]/12 blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-5 sm:px-10 lg:px-14 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#00D4FF]/20">
          <div className="space-y-4 max-w-3xl">
            <h2
              className="text-3xl sm:text-5xl font-black uppercase tracking-wide text-white leading-[1.1]"
              style={{
                fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
              }}
            >
              METODOLOGIA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#00A8FF] to-[#0066FF] drop-shadow-[0_0_22px_rgba(0,229,255,0.4)]">
                DO CONCEITO À ENTREGA.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed border-l-2 border-[#00F5FF] pl-4">
            Cada projeto avança em 6 etapas estruturadas com total transparência,
            garantindo fidelidade visual, alta performance e cumprimento do
            escopo.
          </p>
        </div>

        {/* Interactive Connected Journey Rail */}
        <div className="mt-14">
          <div className="relative">
            {/* Horizontal Laser Line (Desktop) */}
            <div
              className="hidden lg:block absolute top-8 left-10 right-10 h-[2px] bg-white/10"
              aria-hidden="true"
            >
              <div
                className="h-full bg-gradient-to-r from-[#0066FF] via-[#00D4FF] to-[#00F5FF] shadow-[0_0_15px_#00F5FF] transition-all duration-500"
                style={{
                  width: `${(activeStepIndex / (methodologySteps.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* 6 Interactive Nodes */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 relative z-10"
              role="tablist"
              aria-label="Etapas da metodologia NORDARA"
            >
              {methodologySteps.map((step, idx) => {
                const Icon = stepIcons[idx];
                const isCurrent = idx === activeStepIndex;
                const isCompleted = idx <= activeStepIndex;

                return (
                  <button
                    key={step.stepNumber}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveStepIndex(idx);
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className={`group text-left rounded-2xl border p-4 transition-all duration-300 ${
                      isCurrent
                        ? "border-[#00F5FF] bg-gradient-to-b from-[#071C42] to-[#040E24] shadow-[0_0_30px_rgba(0,229,255,0.28)]"
                        : isCompleted
                        ? "border-[#00A8FF]/35 bg-[#040D20]/90 hover:border-[#00F5FF]/60"
                        : "border-white/10 bg-[#030917]/75 hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border font-mono text-xs font-bold transition-all ${
                          isCurrent
                            ? "border-[#00F5FF] bg-[#00F5FF] text-[#02050D] shadow-[0_0_18px_#00F5FF]"
                            : isCompleted
                            ? "border-[#00F5FF]/40 bg-[#00F5FF]/15 text-[#00F5FF]"
                            : "border-white/15 bg-white/[0.03] text-slate-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`font-mono text-xs font-bold ${
                          isCurrent ? "text-[#00F5FF]" : "text-slate-500"
                        }`}
                      >
                        ETAPA {step.stepNumber}
                      </span>
                    </div>

                    <div
                      className="text-sm sm:text-base font-bold text-white uppercase"
                      style={{
                        fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {step.summary}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Holographic Blueprint Panel */}
          <div className="mt-10 rounded-3xl border border-[#00F5FF]/40 bg-gradient-to-br from-[#061636] via-[#040C1E] to-[#02050D] p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(0,180,255,0.15)] relative overflow-hidden">
            <div
              className="pointer-events-none absolute top-0 left-16 right-16 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent shadow-[0_0_15px_#00F5FF]"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00F5FF]/15 border border-[#00F5FF]/50 px-4 py-1 font-mono text-xs font-bold text-[#00F5FF]">
                    ETAPA {activeStep.stepNumber} DE 06
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {activeStep.phaseCode}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00F5FF]/15 border border-[#00F5FF]/50 text-[#00F5FF] shadow-[0_0_25px_rgba(0,245,255,0.3)] shrink-0">
                    <ActiveIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3
                      className="text-2xl sm:text-3xl font-black text-white uppercase"
                      style={{
                        fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {activeStep.title}
                    </h3>
                    <p className="text-sm text-[#00F5FF] font-semibold">
                      {activeStep.summary}
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {activeStep.detailedDescription}
                </p>

                <div className="rounded-2xl border border-[#00D4FF]/30 bg-[#030A1B]/80 p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#00F5FF]">
                      Participação do Cliente nesta Fase
                    </div>
                    <div className="text-xs sm:text-sm text-white font-medium mt-0.5">
                      {activeStep.clientTouchpoint}
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#00F5FF] shrink-0" />
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl border border-[#00D4FF]/30 bg-[#02050D]/90 p-6 space-y-5">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#00F5FF]">
                  Entregas e Atividades desta Etapa:
                </div>
                <ul className="space-y-3">
                  {activeStep.keyOutputs.map((output) => (
                    <li
                      key={output}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00F5FF] shrink-0 mt-0.5" />
                      <span>{output}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveStepIndex(
                        (prev) => (prev + 1) % methodologySteps.length
                      );
                    }}
                    className="text-xs font-mono font-bold text-[#00F5FF] hover:underline"
                  >
                    Próxima etapa (0
                    {((activeStepIndex + 1) % methodologySteps.length) + 1}) →
                  </button>

                  <button
                    type="button"
                    onClick={scrollToQuote}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#0066FF] px-5 py-2.5 text-xs font-extrabold text-[#02050D] shadow-[0_0_20px_rgba(0,212,255,0.45)] hover:scale-105 transition-all"
                  >
                    <span>Iniciar Projeto</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
