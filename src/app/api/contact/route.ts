import { NextRequest, NextResponse } from "next/server";
import {
  siteConfig,
  isWhatsAppConfigured,
  isEmailConfigured,
  buildWhatsAppUrl,
} from "@/config/site";

export interface ContactPayload {
  name: string;
  company?: string;
  email: string;
  whatsapp: string;
  projectType: string;
  description: string;
  investment?: string;
}

const VALID_PROJECT_TYPES = [
  "Site Institucional Profissional",
  "Landing Page de Alta Conversão",
  "Site para Clínica ou Profissional Liberal",
  "Site para Evento ou Instituição de Ensino",
  "Site Vitrine / Catálogo de Produtos",
  "Redesign e Modernização de Site",
  "Site institucional",
  "Landing page",
  "Loja virtual",
  "Sistema web",
  "Dashboard",
  "Projeto com inteligência artificial",
  "Ainda não sei, preciso de orientação",
];

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;

    const name = (body.name || "").trim();
    const company = (body.company || "").trim();
    const email = (body.email || "").trim();
    const whatsapp = (body.whatsapp || "").trim();
    const projectType = (body.projectType || "").trim();
    const description = (body.description || "").trim();
    const investment = (body.investment || "").trim();

    // Validação rigorosa no servidor
    const errors: Record<string, string> = {};

    if (name.length < 2) {
      errors.name = "Informe seu nome completo (mínimo de 2 caracteres).";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Informe um endereço de e-mail corporativo ou pessoal válido.";
    }

    const phoneDigits = whatsapp.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      errors.whatsapp = "Informe um número de WhatsApp válido com DDD.";
    }

    if (!VALID_PROJECT_TYPES.includes(projectType)) {
      errors.projectType = "Selecione um tipo de projeto válido na lista.";
    }

    if (description.length < 15) {
      errors.description =
        "Descreva brevemente sua necessidade (mínimo de 15 caracteres) para prepararmos uma análise adequada.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Verifique os campos destacados antes de enviar.",
          errors,
        },
        { status: 400 }
      );
    }

    const protocolId = `ND-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const structuredBriefing = siteConfig.whatsappMessages.customBriefing({
      name,
      company: company || undefined,
      projectType,
      investment: investment || undefined,
      description,
    });

    // Verifica canais externos configurados
    const webhookUrl =
      process.env.NEXORA_WEBHOOK_URL || siteConfig.integrations.webhookUrl;
    const resendApiKey = process.env.RESEND_API_KEY || "";
    const targetEmail =
      process.env.NEXORA_COMMERCIAL_EMAIL || siteConfig.contact.commercialEmail;

    let externalDispatched = false;
    let dispatchChannel = "none";

    // 1. Disparo via Webhook (n8n, Make, Zapier, Slack, Discord, CRM)
    if (webhookUrl && /^https?:\/\//.test(webhookUrl)) {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          protocolId,
          timestamp,
          source: "NORDARA Official Website",
          lead: {
            name,
            company,
            email,
            whatsapp,
            projectType,
            investment: investment || "Não informado",
            description,
          },
        }),
      });

      if (!webhookRes.ok) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "Ocorreu um erro ao comunicar com o servidor de Webhook configurado. Tente novamente.",
          },
          { status: 502 }
        );
      }

      externalDispatched = true;
      dispatchChannel = "webhook";
    }

    // 2. Disparo via Resend API (se configurado)
    if (!externalDispatched && resendApiKey && targetEmail) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "NORDARA Orçamentos <onboarding@resend.dev>",
          to: [targetEmail],
          reply_to: email,
          subject: `[Orçamento NORDARA ${protocolId}] ${projectType} — ${name}`,
          text: `${structuredBriefing}\n\nE-mail: ${email}\nWhatsApp: ${whatsapp}\nProtocolo: ${protocolId}`,
        }),
      });

      if (!resendRes.ok) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "O serviço de envio de e-mail retornou um erro de autenticação ou entrega. Verifique a chave RESEND_API_KEY.",
          },
          { status: 502 }
        );
      }

      externalDispatched = true;
      dispatchChannel = "resend_email";
    }

    const whatsappUrl = buildWhatsAppUrl(structuredBriefing);

    return NextResponse.json({
      ok: true,
      protocolId,
      timestamp,
      integrationStatus: externalDispatched
        ? "dispatched"
        : "ready_for_channel_activation",
      dispatchChannel,
      channelsConfigured: {
        whatsapp: isWhatsAppConfigured(),
        email: isEmailConfigured(),
        webhook: Boolean(webhookUrl),
      },
      whatsappRedirectUrl: whatsappUrl,
      commercialEmail: isEmailConfigured() ? siteConfig.contact.commercialEmail : null,
      structuredBriefing,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Não foi possível processar a requisição no momento. Verifique os dados informados e tente novamente.",
      },
      { status: 500 }
    );
  }
}

