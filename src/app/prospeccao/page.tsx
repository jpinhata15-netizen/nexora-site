"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Lock,
  Mail,
  Send,
  Copy,
  Check,
  Plus,
  Trash2,
  ArrowLeft,
  Building2,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  FileSpreadsheet,
  LogOut,
} from "lucide-react";
import { NexoraLogo } from "@/components/brand/NexoraLogo";
import { siteConfig, getFormattedWhatsApp } from "@/config/site";

// Senha padrão de acesso ao painel interno da NORDARA
const ACCESS_PINS = [
  process.env.NEXT_PUBLIC_NEXORA_ADMIN_PIN || "nordara2026",
  "nordara2026",
  "nexora2026",
];

type SegmentKey =
  | "clinica-saude"
  | "escritorio-servicos"
  | "empresa-comercio"
  | "sem-site"
  | "redesign-site";

interface LeadItem {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  segment: SegmentKey;
  customObservation: string;
  status: "pendente" | "enviado" | "respondeu";
  createdAt: string;
}

const SEGMENT_TEMPLATES: Record<
  SegmentKey,
  {
    label: string;
    defaultSubject: (company: string) => string;
    openingHook: (company: string, obs?: string) => string;
    valuePitch: string;
  }
> = {
  "clinica-saude": {
    label: "Clínicas, Médicos, Odontologia e Saúde",
    defaultSubject: (company) =>
      `Presença digital e agendamento de pacientes — ${company}`,
    openingHook: (company, obs) =>
      obs?.trim()
        ? obs.trim()
        : `Estava conhecendo o trabalho da ${company} e notei uma excelente oportunidade para fortalecer a presença digital da clínica com um site profissional de alto padrão.`,
    valuePitch:
      "Hoje, grande parte dos pacientes pesquisa no Google e avalia a estrutura da clínica pelo celular antes de agendar. Desenvolvemos sites exclusivos para a área da saúde que transmitem confiança imediata, apresentam o corpo clínico e especialidades e facilitam o agendamento direto pelo WhatsApp.",
  },
  "escritorio-servicos": {
    label: "Escritórios (Advocacia, Contabilidade, Engenharia, Arquitetura)",
    defaultSubject: (company) =>
      `Posicionamento digital e apresentação institucional — ${company}`,
    openingHook: (company, obs) =>
      obs?.trim()
        ? obs.trim()
        : `Conheci a atuação da ${company} e identifiquei como um site institucional mais moderno e tecnológico pode destacar ainda mais a autoridade do escritório.`,
    valuePitch:
      "Para escritórios e prestadores de serviços, a primeira impressão digital é decisiva para fechar contratos de maior valor. Criamos sites sob medida com visual sofisticado, apresentação clara das áreas de atuação e captação direta de clientes pelo WhatsApp.",
  },
  "empresa-comercio": {
    label: "Empresas, Indústrias, Imobiliárias e Comércio",
    defaultSubject: (company) =>
      `Modernização da vitrine digital e captação de clientes — ${company}`,
    openingHook: (company, obs) =>
      obs?.trim()
        ? obs.trim()
        : `Acompanhei a trajetória da ${company} e gostaria de apresentar uma proposta para elevar a presença digital da empresa com um novo site profissional.`,
    valuePitch:
      "Criamos sites institucionais e vitrines digitais rápidas, modernas e 100% adaptadas para celular, pensadas para valorizar seus produtos e serviços e transformar visitantes em pedidos reais de orçamento.",
  },
  "sem-site": {
    label: "Empresas que ainda NÃO têm site (Só Instagram/Redes Sociais)",
    defaultSubject: (company) =>
      `Ideia de site oficial para a ${company}`,
    openingHook: (company, obs) =>
      obs?.trim()
        ? obs.trim()
        : `Estava pesquisando pela ${company} e notei que vocês têm uma ótima presença nas redes sociais, mas ainda não contam com um site oficial próprio.`,
    valuePitch:
      "Depender apenas das redes sociais faz com que muitas empresas percam clientes que buscam um endereço oficial mais completo e profissional. Na NORDARA, desenvolvemos sites exclusivos que funcionam como a sede digital da sua marca, integrados direto ao seu WhatsApp.",
  },
  "redesign-site": {
    label: "Empresas com site antigo ou desatualizado no celular",
    defaultSubject: (company) =>
      `Sugestão de modernização para o site da ${company}`,
    openingHook: (company, obs) =>
      obs?.trim()
        ? obs.trim()
        : `Acessei o site atual da ${company} pelo celular e pelo computador e identifiquei alguns pontos visuais e de navegação que podemos modernizar para gerar mais contatos comerciais.`,
    valuePitch:
      "Nós somos especialistas em redesign e evolução de sites empresariais, transformando páginas antigas em experiências digitais modernas, rápidas no smartphone e focadas em converter visitantes em clientes.",
  },
};

export default function ProspeccaoPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Dados do gerador de e-mail
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [segment, setSegment] = useState<SegmentKey>("empresa-comercio");
  const [customObservation, setCustomObservation] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("https://nexora-site-topaz.vercel.app");

  // Lista de prospecção (CRM salvo no navegador)
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [bulkText, setBulkText] = useState("");
  const [showBulkModal, setShowBulkModal] = useState(false);

  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Detecta automaticamente o domínio atual na Vercel (se não for localhost)
      if (!window.location.hostname.includes("localhost")) {
        setPortfolioUrl(window.location.origin);
      }
      const savedAuth = sessionStorage.getItem("nexora_prospeccao_auth");
      if (savedAuth === "1") {
        setAuthenticated(true);
      }
      const savedLeads = localStorage.getItem("nexora_prospeccao_leads");
      if (savedLeads) {
        try {
          setLeads(JSON.parse(savedLeads));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const saveLeads = (updated: LeadItem[]) => {
    setLeads(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("nexora_prospeccao_leads", JSON.stringify(updated));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (ACCESS_PINS.includes(pinInput.trim().toLowerCase())) {
      setAuthenticated(true);
      setPinError(false);
      sessionStorage.setItem("nexora_prospeccao_auth", "1");
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("nexora_prospeccao_auth");
    setPinInput("");
  };

  const buildEmailContent = (
    comp: string,
    cont: string,
    seg: SegmentKey,
    obs: string
  ) => {
    const cleanCompany = comp.trim() || "[Nome da Empresa]";
    const greeting = cont.trim()
      ? `Olá, ${cont.trim()}, tudo bem?`
      : `Olá, equipe da ${cleanCompany}, tudo bem?`;

    const tpl = SEGMENT_TEMPLATES[seg];
    const subject = tpl.defaultSubject(cleanCompany);

    const body = [
      greeting,
      "",
      tpl.openingHook(cleanCompany, obs),
      "",
      `Eu sou da NORDARA, estúdio especializado no desenvolvimento de sites profissionais e experiências digitais sob medida. ${tpl.valuePitch}`,
      "",
      "Separei o nosso portfólio oficial com alguns projetos recentes para vocês conhecerem o padrão visual e tecnológico que entregamos:",
      `👉 ${portfolioUrl}`,
      "",
      `Se fizer sentido para a ${cleanCompany} neste momento, posso preparar uma proposta personalizada sem compromisso. Preferem que eu envie uma prévia por aqui ou pelo WhatsApp?`,
      "",
      "Atenciosamente,",
      "",
      "Jean Pinhata — NORDARA",
      "Tecnologia que Move Negócios",
      `📱 WhatsApp: ${getFormattedWhatsApp()}`,
      `✉️ E-mail: ${siteConfig.contact.commercialEmail}`,
      `🌐 Portfólio: ${portfolioUrl}`,
    ].join("\n");

    return { subject, body };
  };

  const currentEmail = useMemo(
    () =>
      buildEmailContent(
        companyName,
        contactName,
        segment,
        customObservation
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [companyName, contactName, segment, customObservation, portfolioUrl]
  );

  const openGmailCompose = (to: string, subject: string, body: string) => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      to.trim()
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  const openDefaultMailto = (to: string, subject: string, body: string) => {
    const mailtoUrl = `mailto:${encodeURIComponent(
      to.trim()
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleAddLeadToList = () => {
    if (!companyName.trim() || !recipientEmail.trim()) return;
    const newItem: LeadItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      companyName: companyName.trim(),
      contactName: contactName.trim(),
      email: recipientEmail.trim(),
      segment,
      customObservation: customObservation.trim(),
      status: "pendente",
      createdAt: new Date().toLocaleDateString("pt-BR"),
    };
    saveLeads([newItem, ...leads]);
    setCompanyName("");
    setContactName("");
    setRecipientEmail("");
    setCustomObservation("");
  };

  const handleBulkImport = () => {
    const lines = bulkText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const imported: LeadItem[] = [];
    for (const line of lines) {
      // Aceita formato: Nome da Empresa; email@dominio.com ou Nome da Empresa, email@dominio.com
      const parts = line.includes(";") ? line.split(";") : line.split(",");
      if (parts.length >= 2) {
        const comp = parts[0].trim();
        const em = parts[1].trim();
        if (comp && em.includes("@")) {
          imported.push({
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            companyName: comp,
            contactName: parts[2]?.trim() || "",
            email: em,
            segment,
            customObservation: "",
            status: "pendente",
            createdAt: new Date().toLocaleDateString("pt-BR"),
          });
        }
      }
    }
    if (imported.length > 0) {
      saveLeads([...imported, ...leads]);
      setBulkText("");
      setShowBulkModal(false);
    }
  };

  const handleSendFromLeadRow = (lead: LeadItem) => {
    const { subject, body } = buildEmailContent(
      lead.companyName,
      lead.contactName,
      lead.segment,
      lead.customObservation
    );
    openGmailCompose(lead.email, subject, body);
    const updated = leads.map((item) =>
      item.id === lead.id ? { ...item, status: "enviado" as const } : item
    );
    saveLeads(updated);
  };

  const handleDeleteLead = (id: string) => {
    saveLeads(leads.filter((l) => l.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    const order: LeadItem["status"][] = ["pendente", "enviado", "respondeu"];
    const updated = leads.map((item) => {
      if (item.id !== id) return item;
      const next = order[(order.indexOf(item.status) + 1) % order.length];
      return { ...item, status: next };
    });
    saveLeads(updated);
  };

  // TELA DE BLOQUEIO POR SENHA (NINGUÉM DE FORA CONSEGUE VER)
  if (!authenticated) {
    return (
      <div className="min-h-screen w-full bg-[#02050D] text-white flex flex-col items-center justify-center px-5">
        <div className="w-full max-w-md rounded-3xl border border-[#00D4FF]/40 bg-gradient-to-b from-[#06142E] to-[#030816] p-8 sm:p-10 shadow-[0_25px_90px_rgba(0,0,0,0.9),0_0_40px_rgba(0,180,255,0.2)] space-y-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <NexoraLogo variant="symbol" size="lg" />
            <div className="flex items-center gap-2 text-[#00F5FF] font-mono text-xs uppercase tracking-widest">
              <Lock className="w-3.5 h-3.5" />
              <span>ÁREA RESTRITA // NORDARA</span>
            </div>
            <h1
              className="text-2xl font-black uppercase text-white"
              style={{
                fontFamily: "'Orbitron', var(--font-space-grotesk), sans-serif",
              }}
            >
              Central de Prospecção
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Digite sua senha de administrador para acessar o disparador de
              propostas comerciais.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-pin"
                className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2"
              >
                Senha de Acesso
              </label>
              <input
                id="admin-pin"
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Digite sua senha..."
                className="w-full rounded-xl border border-[#00D4FF]/40 bg-[#02050D] px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-[#00F5FF] focus:outline-none"
                autoFocus
              />
              {pinError && (
                <p className="mt-2 text-xs text-rose-400">
                  Senha incorreta. Tente novamente.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00F5FF] via-[#00A8FF] to-[#0066FF] px-6 py-3.5 text-sm font-extrabold text-[#02050D] shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:scale-[1.02] transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Desbloquear Painel</span>
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-[#00F5FF]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para o site público</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#02050D] text-white pb-20">
      {/* Top Executive Bar */}
      <header className="sticky top-0 z-30 border-b border-[#00D4FF]/25 bg-[#020611]/95 backdrop-blur-xl">
        <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <NexoraLogo variant="full" size="sm" />
            <span className="hidden sm:inline-block font-mono text-xs text-[#00F5FF] border-l border-white/15 pl-4">
              CENTRAL DE PROSPECÇÃO B2B // DISPARO DE E-MAILS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs sm:text-sm font-semibold text-slate-200 hover:border-[#00F5FF] hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 text-[#00F5FF]" />
              <span>Ver Site</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-xs sm:text-sm font-semibold text-rose-300 hover:bg-rose-500/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Bloquear</span>
            </button>
          </div>
        </div>
      </header>

      <main className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 pt-10 space-y-12">
        {/* Main Grid: Left Configurator + Right Live Email Preview & 1-Click Dispatch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 cols): Dados da Empresa Prospectada */}
          <div className="lg:col-span-5 rounded-3xl border border-[#00D4FF]/35 bg-gradient-to-b from-[#06142E] to-[#030917] p-6 sm:p-8 space-y-5 shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
            <div className="border-b border-white/10 pb-4">
              <div className="font-mono text-xs uppercase tracking-widest text-[#00F5FF]">
                PASSO 01 // DADOS DA EMPRESA
              </div>
              <h2
                className="text-xl sm:text-2xl font-black uppercase text-white mt-1"
                style={{
                  fontFamily:
                    "'Orbitron', var(--font-space-grotesk), sans-serif",
                }}
              >
                Configurar Proposta
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                  Nome da Empresa <span className="text-[#00F5FF]">*</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ex: Clínica OdontoPrime / Silva Advocacia"
                  className="w-full rounded-xl border border-[#00D4FF]/30 bg-[#02050D] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#00F5FF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                    E-mail da Empresa <span className="text-[#00F5FF]">*</span>
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="contato@empresa.com.br"
                    className="w-full rounded-xl border border-[#00D4FF]/30 bg-[#02050D] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#00F5FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                    Responsável <span className="text-slate-500">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Ex: Dr. Marcos / Diretoria"
                    className="w-full rounded-xl border border-[#00D4FF]/30 bg-[#02050D] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#00F5FF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                  Perfil / Abordagem Comercial
                </label>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value as SegmentKey)}
                  className="w-full rounded-xl border border-[#00D4FF]/30 bg-[#02050D] px-4 py-3 text-sm text-white focus:border-[#00F5FF] focus:outline-none"
                >
                  {Object.entries(SEGMENT_TEMPLATES).map(([key, item]) => (
                    <option key={key} value={key} className="bg-[#02050D]">
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                  Link do seu Site na Vercel (Incluído no E-mail)
                </label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="w-full rounded-xl border border-[#00D4FF]/30 bg-[#02050D] px-4 py-2.5 text-xs font-mono text-[#00F5FF] focus:border-[#00F5FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                  Observação Personalizada{" "}
                  <span className="text-slate-500">
                    (Deixe em branco para usar o texto automático)
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={customObservation}
                  onChange={(e) => setCustomObservation(e.target.value)}
                  placeholder="Ex: Vi o perfil de vocês no Instagram e notei que ainda não há um site oficial..."
                  className="w-full rounded-xl border border-[#00D4FF]/30 bg-[#02050D] px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-[#00F5FF] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    openGmailCompose(
                      recipientEmail,
                      currentEmail.subject,
                      currentEmail.body
                    )
                  }
                  disabled={!recipientEmail.trim()}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#00F5FF] via-[#00A8FF] to-[#0066FF] px-6 py-4 text-sm font-extrabold text-[#02050D] shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:scale-[1.02] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  <span>Disparar Agora pelo Gmail</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddLeadToList}
                  disabled={!companyName.trim() || !recipientEmail.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#00F5FF]/50 bg-[#04122C] px-5 py-4 text-xs sm:text-sm font-bold text-white hover:border-[#00F5FF] hover:bg-[#071D44] transition-all disabled:opacity-40"
                >
                  <Plus className="w-4 h-4 text-[#00F5FF]" />
                  <span>Salvar na Fila</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Prévia em Tempo Real do E-mail Gerado */}
          <div className="lg:col-span-7 rounded-3xl border border-[#00F5FF]/40 bg-gradient-to-b from-[#06142E] to-[#02050D] p-6 sm:p-8 space-y-5 shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-[#00F5FF]">
                  PASSO 02 // PRÉVIA DO E-MAIL DE PROSPECÇÃO
                </div>
                <h2
                  className="text-xl sm:text-2xl font-black uppercase text-white mt-1"
                  style={{
                    fontFamily:
                      "'Orbitron', var(--font-space-grotesk), sans-serif",
                  }}
                >
                  Mensagem Pronta para Envio
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(currentEmail.subject);
                    setCopiedSubject(true);
                    setTimeout(() => setCopiedSubject(false), 2500);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-mono text-slate-200 hover:border-[#00F5FF]"
                >
                  {copiedSubject ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[#00F5FF]" />
                  )}
                  <span>
                    {copiedSubject ? "Assunto Copiado!" : "Copiar Assunto"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(currentEmail.body);
                    setCopiedBody(true);
                    setTimeout(() => setCopiedBody(false), 2500);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#00F5FF]/50 bg-[#00F5FF]/10 px-4 py-2 text-xs font-mono font-bold text-[#00F5FF] hover:bg-[#00F5FF]/20"
                >
                  {copiedBody ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedBody ? "Texto Copiado!" : "Copiar E-mail"}</span>
                </button>
              </div>
            </div>

            {/* Email Header Simulation */}
            <div className="rounded-2xl border border-white/10 bg-[#030816] p-4 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="font-mono text-xs text-[#00F5FF] w-20 shrink-0">
                  DE:
                </span>
                <span className="text-white font-medium">
                  {siteConfig.contact.commercialEmail}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="font-mono text-xs text-[#00F5FF] w-20 shrink-0">
                  PARA:
                </span>
                <span className="text-white font-medium">
                  {recipientEmail.trim() || "contato@empresa-cliente.com.br"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 pt-1 border-t border-white/10">
                <span className="font-mono text-xs text-[#00F5FF] w-20 shrink-0">
                  ASSUNTO:
                </span>
                <span className="text-white font-bold">
                  {currentEmail.subject}
                </span>
              </div>
            </div>

            {/* Email Body Preview */}
            <pre className="rounded-2xl border border-[#00D4FF]/25 bg-[#02050D] p-5 font-sans text-sm text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {currentEmail.body}
            </pre>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() =>
                  openDefaultMailto(
                    recipientEmail,
                    currentEmail.subject,
                    currentEmail.body
                  )
                }
                disabled={!recipientEmail.trim()}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-[#00F5FF] disabled:opacity-40"
              >
                <Mail className="w-4 h-4 text-[#00F5FF]" />
                <span>Abrir no App de E-mail do Celular / Windows</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  openGmailCompose(
                    recipientEmail,
                    currentEmail.subject,
                    currentEmail.body
                  )
                }
                disabled={!recipientEmail.trim()}
                className="inline-flex items-center gap-2 rounded-full bg-[#00F5FF]/15 border border-[#00F5FF]/50 px-5 py-2.5 text-xs font-bold text-[#00F5FF] hover:bg-[#00F5FF]/25 disabled:opacity-40"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Abrir Direto no Gmail Web</span>
              </button>
            </div>
          </div>
        </div>

        {/* Fila de Empresas / Lista de Disparo em Lote */}
        <div className="rounded-3xl border border-[#00D4FF]/35 bg-gradient-to-b from-[#06142E] to-[#030917] p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#00F5FF]">
                FILA DE PROSPECÇÃO // CONTROLE DE ENVIOS
              </div>
              <h3
                className="text-xl sm:text-2xl font-black uppercase text-white mt-1"
                style={{
                  fontFamily:
                    "'Orbitron', var(--font-space-grotesk), sans-serif",
                }}
              >
                Empresas para Prospectar ({leads.length})
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setShowBulkModal((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-[#00F5FF]/50 bg-[#04122C] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:border-[#00F5FF]"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#00F5FF]" />
              <span>Importar Várias Empresas de Uma Vez</span>
            </button>
          </div>

          {showBulkModal && (
            <div className="rounded-2xl border border-[#00F5FF]/40 bg-[#02050D] p-5 space-y-4">
              <div className="text-xs sm:text-sm text-slate-200 font-semibold">
                Cole abaixo sua lista de empresas (uma por linha, no formato:{" "}
                <code className="text-[#00F5FF]">
                  Nome da Empresa; email@empresa.com.br
                </code>
                ):
              </div>
              <textarea
                rows={5}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder={`Clínica Sorriso; contato@clinicasorriso.com.br\nEscritório Silva; atendimento@silvaadvocacia.com.br\nConstrutora Horizonte; comercial@horizontecivil.com.br`}
                className="w-full rounded-xl border border-[#00D4FF]/30 bg-[#030816] p-4 font-mono text-xs text-white placeholder-slate-500 focus:border-[#00F5FF] focus:outline-none"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(false)}
                  className="rounded-full border border-white/15 px-4 py-2 text-xs text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleBulkImport}
                  className="rounded-full bg-[#00F5FF] px-6 py-2 text-xs font-extrabold text-[#02050D]"
                >
                  Adicionar Empresas à Fila
                </button>
              </div>
            </div>
          )}

          {leads.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#02050D]/70 p-8 text-center space-y-2">
              <Building2 className="w-8 h-8 text-[#00F5FF] mx-auto opacity-75" />
              <div className="text-sm font-bold text-white">
                Sua fila de prospecção está vazia
              </div>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Adicione empresas pelo formulário acima ou clique em{" "}
                <strong className="text-white">
                  &ldquo;Importar Várias Empresas de Uma Vez&rdquo;
                </strong>{" "}
                para colar uma lista e disparar com 1 clique para cada uma.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-2xl border border-white/10 bg-[#02050D]/90 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#00D4FF]/40 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-bold text-white text-sm sm:text-base">
                        {lead.companyName}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(lead.id)}
                        className={`rounded-full px-3 py-0.5 font-mono text-[10px] font-bold uppercase ${
                          lead.status === "pendente"
                            ? "bg-amber-500/15 text-amber-300 border border-amber-500/40"
                            : lead.status === "enviado"
                            ? "bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]/40"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        }`}
                      >
                        {lead.status === "pendente"
                          ? "● Pendente"
                          : lead.status === "enviado"
                          ? "✓ E-mail Enviado"
                          : "★ Respondeu"}
                      </button>
                    </div>
                    <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                      <span className="text-[#00F5FF] font-mono">
                        {lead.email}
                      </span>
                      <span>•</span>
                      <span>{SEGMENT_TEMPLATES[lead.segment].label}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleSendFromLeadRow(lead)}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#0088FF] px-5 py-2.5 text-xs font-extrabold text-[#02050D] shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:scale-105 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>
                        {lead.status === "pendente"
                          ? "Disparar no Gmail"
                          : "Reenviar"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteLead(lead.id)}
                      className="p-2.5 rounded-full border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/40"
                      title="Remover da fila"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

