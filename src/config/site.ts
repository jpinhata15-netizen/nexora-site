/**
 * ARQUIVO CENTRAL DE CONFIGURAÇÃO COMERCIAL E INSTITUCIONAL — NORDARA
 * -------------------------------------------------------------------
 * Configure aqui (ou via variáveis de ambiente no arquivo .env.local / painel da Vercel)
 * os canais oficiais de atendimento, e-mail comercial e redes sociais da NORDARA.
 */

export interface SiteConfig {
  name: string;
  tagline: string;
  positioning: string;
  domain: string;
  locale: string;
  contact: {
    whatsappNumber: string;
    whatsappDisplay: string;
    commercialEmail: string;
    businessHours: string;
    locationLabel: string;
  };
  integrations: {
    webhookUrl: string;
  };
  socials: {
    instagram: string;
    linkedin: string;
    github: string;
    behance: string;
  };
  whatsappMessages: {
    default: string;
    portfolioInquiry: (projectName: string) => string;
    serviceInquiry: (serviceName: string) => string;
    customBriefing: (data: {
      name: string;
      company?: string;
      projectType: string;
      investment?: string;
      description: string;
    }) => string;
  };
}

export const siteConfig: SiteConfig = {
  name: "NORDARA",
  tagline: "TECNOLOGIA QUE MOVE NEGÓCIOS.",
  positioning:
    "Criamos sites, sistemas e soluções digitais para transformar ideias em grandes conquistas.",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://www.nordara.com.br",
  locale: "pt-BR",
  contact: {
    whatsappNumber: (
      process.env.NEXT_PUBLIC_NEXORA_WHATSAPP || "5514997090675"
    ).replace(/\D/g, ""),
    whatsappDisplay:
      process.env.NEXT_PUBLIC_NEXORA_WHATSAPP_DISPLAY || "(14) 99709-0675",
    commercialEmail: (
      process.env.NEXT_PUBLIC_NEXORA_EMAIL ||
      "nexoradesenvolvimentodesites@gmail.com"
    ).trim(),
    businessHours: "Segunda a Sexta • Atendimento Executivo e Consultivo",
    locationLabel: "Operação Digital no Brasil • Atendimento Nacional",
  },
  integrations: {
    webhookUrl: process.env.NEXT_PUBLIC_NEXORA_WEBHOOK_URL || "",
  },
  socials: {
    instagram: process.env.NEXT_PUBLIC_NEXORA_INSTAGRAM || "",
    linkedin: process.env.NEXT_PUBLIC_NEXORA_LINKEDIN || "",
    github: process.env.NEXT_PUBLIC_NEXORA_GITHUB || "",
    behance: process.env.NEXT_PUBLIC_NEXORA_BEHANCE || "",
  },
  whatsappMessages: {
    default:
      "Olá! Vim pelo site da NORDARA e gostaria de solicitar um orçamento para criação de um site profissional para minha empresa.",
    portfolioInquiry: (projectName: string) =>
      `Olá! Vi o projeto ${projectName} no portfólio da NORDARA e gostaria de conversar sobre a criação de um site desse nível para o meu negócio.`,
    serviceInquiry: (serviceName: string) =>
      `Olá! Tenho interesse na criação de ${serviceName} com a NORDARA e gostaria de solicitar um orçamento personalizado.`,
    customBriefing: ({ name, company, projectType, investment, description }) => {
      const lines = [
        `Olá, equipe NORDARA! Solicito análise de orçamento para criação de site:`,
        ``,
        `• *Nome:* ${name}`,
        company ? `• *Empresa:* ${company}` : null,
        `• *Tipo de Site:* ${projectType}`,
        investment ? `• *Faixa de Investimento:* ${investment}` : null,
        `• *Escopo / Necessidade:* ${description}`,
      ].filter(Boolean);
      return lines.join("\n");
    },
  },
};

export function isWhatsAppConfigured(): boolean {
  const digits = siteConfig.contact.whatsappNumber.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function isEmailConfigured(): boolean {
  const email = siteConfig.contact.commercialEmail;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getFormattedWhatsApp(): string {
  if (siteConfig.contact.whatsappDisplay) {
    return siteConfig.contact.whatsappDisplay;
  }
  const d = siteConfig.contact.whatsappNumber.replace(/\D/g, "");
  if (d.length === 13 && d.startsWith("55")) {
    return `+${d.slice(0, 2)} (${d.slice(2, 4)}) ${d.slice(4, 9)}-${d.slice(9)}`;
  }
  if (d.length === 12 && d.startsWith("55")) {
    return `+${d.slice(0, 2)} (${d.slice(2, 4)}) ${d.slice(4, 8)}-${d.slice(8)}`;
  }
  return d ? `+${d}` : "Canal aguardando configuração em src/config/site.ts";
}

export function buildWhatsAppUrl(customMessage?: string): string | null {
  if (!isWhatsAppConfigured()) return null;
  const digits = siteConfig.contact.whatsappNumber.replace(/\D/g, "");
  const text = encodeURIComponent(customMessage || siteConfig.whatsappMessages.default);
  return `https://wa.me/${digits}?text=${text}`;
}
