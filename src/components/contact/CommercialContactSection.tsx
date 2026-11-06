"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  MessageCircle,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ArrowRight,
  Clock,
  Globe,
  ShieldCheck,
  Terminal,
  RefreshCw,
} from "lucide-react";
import {
  siteConfig,
  isWhatsAppConfigured,
  isEmailConfigured,
  getFormattedWhatsApp,
  buildWhatsAppUrl,
} from "@/config/site";
import { soundEngine } from "@/utils/soundEngine";

export const PROJECT_TYPES = [
  "Site Institucional Profissional",
  "Landing Page de Alta Conversão",
  "Site para Clínica ou Profissional Liberal",
  "Site para Evento ou Instituição de Ensino",
  "Site Vitrine / Catálogo de Produtos",
  "Redesign e Modernização de Site",
  "Ainda não sei, preciso de orientação",
];

export const INVESTMENT_RANGES = [
  "Prefiro definir após conversa inicial",
  "Até R$ 2.500",
  "De R$ 2.500 a R$ 5.000",
  "De R$ 5.000 a R$ 10.000",
  "Acima de R$ 10.000 (Portal Completo / Escopo Especial)",
];

interface CommercialContactSectionProps {
  preselectedProjectType?: string;
  preselectedContextNote?: string;
}

interface SubmissionResponse {
  ok: boolean;
  protocolId: string;
  timestamp: string;
  integrationStatus: "dispatched" | "ready_for_channel_activation";
  dispatchChannel: string;
  channelsConfigured: {
    whatsapp: boolean;
    email: boolean;
    webhook: boolean;
  };
  whatsappRedirectUrl: string | null;
  commercialEmail: string | null;
  structuredBriefing: string;
}

export function CommercialContactSection({
  preselectedProjectType,
  preselectedContextNote,
}: CommercialContactSectionProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [investment, setInvestment] = useState("");
  const [description, setDescription] = useState("");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResponse | null>(null);
  const [copiedBriefing, setCopiedBriefing] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      preselectedProjectType &&
      PROJECT_TYPES.includes(preselectedProjectType)
    ) {
      setProjectType(preselectedProjectType);
    }
    if (preselectedContextNote && !description) {
      setDescription(preselectedContextNote);
    }
  }, [preselectedProjectType, preselectedContextNote, description]);

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length === 0) {
      setWhatsapp("");
    } else if (digits.length <= 2) {
      setWhatsapp(`(${digits}`);
    } else if (digits.length <= 6) {
      setWhatsapp(`(${digits.slice(0, 2)}) ${digits.slice(2)}`);
    } else if (digits.length <= 10) {
      setWhatsapp(
        `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
      );
    } else {
      setWhatsapp(
        `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
      );
    }
    if (fieldErrors.whatsapp) {
      setFieldErrors((prev) => ({ ...prev, whatsapp: "" }));
    }
  };

  const validateClientSide = () => {
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) {
      errs.name = "Por favor, informe seu nome.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Informe um e-mail válido para retorno.";
    }
    const phoneDigits = whatsapp.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      errs.whatsapp = "Informe um WhatsApp válido com DDD.";
    }
    if (description.trim().length < 15) {
      errs.description =
        "Conte um pouco mais sobre o site que você precisa (mínimo de 15 caracteres).";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    setSubmitError(null);

    if (!validateClientSide()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          projectType,
          investment: investment || undefined,
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        setSubmitError(
          data.message ||
            "Não foi possível concluir o envio. Verifique os campos e tente novamente."
        );
        return;
      }

      setSubmissionResult(data as SubmissionResponse);
    } catch {
      setSubmitError(
        "Falha de conexão ao processar a solicitação. Verifique sua rede e tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyBriefing = async () => {
    if (!submissionResult) return;
    try {
      await navigator.clipboard.writeText(submissionResult.structuredBriefing);
      setCopiedBriefing(true);
      setTimeout(() => setCopiedBriefing(false), 3000);
    } catch {
      // Fallback
    }
  };

  const handleResetForm = () => {
    setSubmissionResult(null);
    setSubmitError(null);
    setFieldErrors({});
  };

  const focusForm = () => {
    soundEngine.playClick();
    const el = document.getElementById("formulario-orcamento");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => nameInputRef.current?.focus(), 400);
  };

  const whatsappReady = isWhatsAppConfigured();
  const emailReady = isEmailConfigured();
  const directWhatsAppUrl = buildWhatsAppUrl();

  return (
    <section
      id="orcamento"
      className="relative py-24 lg:py-32 border-b border-[#00D4FF]/20 bg-[#02050D] overflow-hidden"
    >
      {/* Cosmic Neon Lighting */}
      <div
        className="pointer-events-none absolute top-0 left-1/3 w-[700px] h-[500px] rounded-full bg-[#0066FF]/15 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-[600px] h-[450px] rounded-full bg-[#00F5FF]/12 blur-[160px]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-5 sm:px-10 lg:px-14 xl:px-20">
        {/* Futuristic Callout Banner */}
        <div className="rounded-[32px] border border-[#00F5FF]/45 bg-gradient-to-r from-[#05142E] via-[#071E46] to-[#040E24] p-8 sm:p-12 lg:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.85),0_0_50px_rgba(0,195,255,0.2)] mb-16 relative overflow-hidden">
          <div
            className="pointer-events-none absolute top-0 left-16 right-16 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent shadow-[0_0_15px_#00F5FF]"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2
                className="text-3xl sm:text-5xl font-black text-white uppercase tracking-wide leading-[1.08]"
                style={{
                  fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
                }}
              >
                SEU NEGÓCIO MERECE UM SITE{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#0088FF]">
                  À ALTURA.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl border-l-2 border-[#00F5FF] pl-4">
                Vamos construir uma experiência digital que represente o valor da
                sua empresa e aproxime você dos seus próximos clientes.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                type="button"
                onClick={focusForm}
                onMouseEnter={() => soundEngine.playHover()}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#00F5FF] via-[#00A8FF] to-[#0066FF] px-8 py-4 text-sm sm:text-base font-extrabold text-[#02050D] shadow-[0_0_40px_rgba(0,229,255,0.65)] transition-all hover:scale-105 hover:shadow-[0_0_55px_rgba(0,245,255,0.9)]"
              >
                <span>Solicitar meu orçamento</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Contact & Commercial Form Grid */}
        <div
          id="contato"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >
          {/* Left Column (5 cols): Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="font-mono text-xs uppercase tracking-[0.22em] text-[#00F5FF]">
                ATENDIMENTO COMERCIAL // NEXORA
              </div>
              <h3
                className="text-2xl sm:text-3xl font-extrabold text-white uppercase"
                style={{
                  fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
                }}
              >
                Fale com nossa equipe
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Escolha o tipo de site desejado no formulário ao lado para
                receber uma proposta personalizada para o seu negócio.
              </p>
            </div>

            <div className="space-y-4">
              {/* WhatsApp Card */}
              <div className="rounded-2xl border border-[#00D4FF]/30 bg-[#040C1E] p-5 space-y-3 shadow-[0_0_25px_rgba(0,180,255,0.1)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00F5FF]/15 border border-[#00F5FF]/40 text-[#00F5FF] shadow-[0_0_15px_rgba(0,245,255,0.25)]">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        WhatsApp Comercial
                      </div>
                      <div className="text-sm font-bold text-white">
                        {whatsappReady
                          ? getFormattedWhatsApp()
                          : "Canal pronto para ativação"}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-0.5 font-mono text-[10px] font-bold ${
                      whatsappReady
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]/40"
                    }`}
                  >
                    {whatsappReady ? "ONLINE" : "CONFIGURÁVEL"}
                  </span>
                </div>

                {whatsappReady && directWhatsAppUrl ? (
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#00F5FF] hover:underline"
                  >
                    <span>Iniciar conversa no WhatsApp →</span>
                  </a>
                ) : (
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Configure seu número oficial em{" "}
                    <code className="text-[#00F5FF] font-mono">
                      src/config/site.ts
                    </code>{" "}
                    para ativar o redirecionamento direto e o botão flutuante.
                  </p>
                )}
              </div>

              {/* E-mail Card */}
              <div className="rounded-2xl border border-[#00D4FF]/30 bg-[#040C1E] p-5 space-y-3 shadow-[0_0_25px_rgba(0,180,255,0.1)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00F5FF]/15 border border-[#00F5FF]/40 text-[#00F5FF] shadow-[0_0_15px_rgba(0,245,255,0.25)]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        E-mail Comercial
                      </div>
                      <div className="text-sm font-bold text-white">
                        {emailReady
                          ? siteConfig.contact.commercialEmail
                          : "Canal pronto para ativação"}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-0.5 font-mono text-[10px] font-bold ${
                      emailReady
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]/40"
                    }`}
                  >
                    {emailReady ? "ONLINE" : "CONFIGURÁVEL"}
                  </span>
                </div>

                {emailReady ? (
                  <a
                    href={`mailto:${siteConfig.contact.commercialEmail}?subject=${encodeURIComponent(
                      "Solicitação de Orçamento de Site — NEXORA"
                    )}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#00F5FF] hover:underline"
                  >
                    <span>Enviar e-mail direto →</span>
                  </a>
                ) : (
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Configure seu e-mail oficial em{" "}
                    <code className="text-[#00F5FF] font-mono">
                      src/config/site.ts
                    </code>
                    .
                  </p>
                )}
              </div>

              {/* Operational Info */}
              <div className="rounded-2xl border border-white/10 bg-[#040B1A]/80 p-5 space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#00F5FF] shrink-0" />
                  <span>{siteConfig.contact.businessHours}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-[#00F5FF] shrink-0" />
                  <span>{siteConfig.contact.locationLabel}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#00F5FF] shrink-0" />
                  <span>
                    Atendimento consultivo do planejamento à publicação do site.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Futuristic Commercial Form */}
          <div
            id="formulario-orcamento"
            className="lg:col-span-7 rounded-3xl border border-[#00F5FF]/40 bg-gradient-to-b from-[#06142E] to-[#030816] p-6 sm:p-9 lg:p-10 shadow-[0_25px_90px_rgba(0,0,0,0.85),0_0_40px_rgba(0,180,255,0.15)] relative overflow-hidden"
          >
            <div
              className="pointer-events-none absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent shadow-[0_0_15px_#00F5FF]"
              aria-hidden="true"
            />

            {submissionResult ? (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#00F5FF]/15 border border-[#00F5FF]/50 text-[#00F5FF] shadow-[0_0_20px_rgba(0,245,255,0.3)]">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#00F5FF]">
                        PROTOCOLO GERADO // {submissionResult.protocolId}
                      </span>
                      <h4
                        className="text-2xl font-bold text-white mt-1 uppercase"
                        style={{
                          fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
                        }}
                      >
                        Solicitação Validada!
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1">
                        Seu pedido de orçamento foi estruturado com sucesso.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-500/35 bg-emerald-500/10 p-4 text-xs sm:text-sm text-emerald-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-white">
                      Orçamento pronto para atendimento imediato:
                    </strong>{" "}
                    Clique abaixo para encaminhar seu resumo diretamente para o
                    nosso WhatsApp{" "}
                    <strong className="text-white">(14) 99709-0675</strong> ou
                    para o nosso e-mail oficial{" "}
                    <strong className="text-white">
                      nexoradesenvolvimentodesites@gmail.com
                    </strong>
                    .
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                      Resumo do Orçamento ({submissionResult.protocolId}):
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyBriefing}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#00F5FF]/40 bg-[#00F5FF]/10 px-3.5 py-1 text-xs font-mono text-[#00F5FF] hover:bg-[#00F5FF]/20"
                    >
                      {copiedBriefing ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar Escopo</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="rounded-2xl border border-white/10 bg-[#02050D] p-4 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {submissionResult.structuredBriefing}
                  </pre>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-3">
                    {submissionResult.whatsappRedirectUrl && (
                      <a
                        href={submissionResult.whatsappRedirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#0088FF] px-6 py-3 text-xs sm:text-sm font-extrabold text-[#02050D] shadow-[0_0_25px_rgba(0,245,255,0.5)] hover:scale-105 transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Enviar pelo WhatsApp</span>
                      </a>
                    )}
                    {submissionResult.commercialEmail && (
                      <a
                        href={`mailto:${
                          submissionResult.commercialEmail
                        }?subject=${encodeURIComponent(
                          `Orçamento de Site [${submissionResult.protocolId}] — ${name}`
                        )}&body=${encodeURIComponent(
                          submissionResult.structuredBriefing
                        )}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[#00F5FF]/60 bg-[#04122C] px-6 py-3 text-xs sm:text-sm font-bold text-white hover:border-[#00F5FF] hover:bg-[#071D44] transition-all"
                      >
                        <Mail className="w-4 h-4 text-[#00F5FF]" />
                        <span>Enviar por E-mail</span>
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-medium text-slate-300 hover:text-white"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Nova solicitação</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="border-b border-white/10 pb-4 mb-2">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00F5FF]">
                    ORÇAMENTO PERSONALIZADO // CRIAÇÃO DE SITES
                  </span>
                  <h4
                    className="text-xl sm:text-2xl font-black text-white mt-1 uppercase"
                    style={{
                      fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    Solicitar meu orçamento
                  </h4>
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs sm:text-sm text-rose-200 flex items-start gap-2.5"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Seu Nome <span className="text-[#00F5FF]">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (fieldErrors.name)
                          setFieldErrors((p) => ({ ...p, name: "" }));
                      }}
                      placeholder="Ex: Rodrigo Almeida"
                      className={`w-full rounded-xl border bg-[#02050D] px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-colors focus:outline-none ${
                        fieldErrors.name
                          ? "border-rose-500 focus:border-rose-400"
                          : "border-[#00D4FF]/30 focus:border-[#00F5FF]"
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="mt-1.5 text-xs text-rose-400">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Nome da Empresa{" "}
                      <span className="text-slate-500">(Opcional)</span>
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ex: Clínica Vida / Sua Empresa"
                      className="w-full rounded-xl border border-[#00D4FF]/30 bg-[#02050D] px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-[#00F5FF] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                    >
                      E-mail <span className="text-[#00F5FF]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldErrors.email)
                          setFieldErrors((p) => ({ ...p, email: "" }));
                      }}
                      placeholder="voce@suaempresa.com.br"
                      className={`w-full rounded-xl border bg-[#02050D] px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-colors focus:outline-none ${
                        fieldErrors.email
                          ? "border-rose-500 focus:border-rose-400"
                          : "border-[#00D4FF]/30 focus:border-[#00F5FF]"
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1.5 text-xs text-rose-400">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-whatsapp"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                    >
                      WhatsApp com DDD <span className="text-[#00F5FF]">*</span>
                    </label>
                    <input
                      id="contact-whatsapp"
                      name="whatsapp"
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className={`w-full rounded-xl border bg-[#02050D] px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-colors focus:outline-none ${
                        fieldErrors.whatsapp
                          ? "border-rose-500 focus:border-rose-400"
                          : "border-[#00D4FF]/30 focus:border-[#00F5FF]"
                      }`}
                    />
                    {fieldErrors.whatsapp && (
                      <p className="mt-1.5 text-xs text-rose-400">
                        {fieldErrors.whatsapp}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-project-type"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Tipo de Site Desejado{" "}
                      <span className="text-[#00F5FF]">*</span>
                    </label>
                    <select
                      id="contact-project-type"
                      name="projectType"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full rounded-xl border border-[#00D4FF]/30 bg-[#02050D] px-4 py-3.5 text-sm text-white transition-colors focus:border-[#00F5FF] focus:outline-none"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option
                          key={type}
                          value={type}
                          className="bg-[#02050D] text-white"
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-investment"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Faixa de Investimento{" "}
                      <span className="text-slate-500">(Opcional)</span>
                    </label>
                    <select
                      id="contact-investment"
                      name="investment"
                      value={investment}
                      onChange={(e) => setInvestment(e.target.value)}
                      className="w-full rounded-xl border border-[#00D4FF]/30 bg-[#02050D] px-4 py-3.5 text-sm text-white transition-colors focus:border-[#00F5FF] focus:outline-none"
                    >
                      <option value="" className="bg-[#02050D] text-slate-400">
                        Selecionar faixa estimada (opcional)
                      </option>
                      {INVESTMENT_RANGES.map((range) => (
                        <option
                          key={range}
                          value={range}
                          className="bg-[#02050D] text-white"
                        >
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-description"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                  >
                    Conte sobre o seu Projeto{" "}
                    <span className="text-[#00F5FF]">*</span>
                  </label>
                  <textarea
                    id="contact-description"
                    name="description"
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (fieldErrors.description)
                        setFieldErrors((p) => ({ ...p, description: "" }));
                    }}
                    placeholder="Descreva o objetivo do site, o ramo da sua empresa e o que você gostaria de apresentar aos seus clientes..."
                    className={`w-full rounded-xl border bg-[#02050D] px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-colors focus:outline-none ${
                      fieldErrors.description
                        ? "border-rose-500 focus:border-rose-400"
                        : "border-[#00D4FF]/30 focus:border-[#00F5FF]"
                    }`}
                  />
                  {fieldErrors.description && (
                    <p className="mt-1.5 text-xs text-rose-400">
                      {fieldErrors.description}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="w-full group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#00F5FF] via-[#00A8FF] to-[#0066FF] px-8 py-4 text-sm sm:text-base font-extrabold text-[#02050D] shadow-[0_0_35px_rgba(0,212,255,0.6)] transition-all hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(0,245,255,0.9)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processando seu orçamento...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 stroke-[2.5]" />
                      <span>Solicitar meu orçamento</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
