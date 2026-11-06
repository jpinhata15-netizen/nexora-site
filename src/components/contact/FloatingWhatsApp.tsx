"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { isWhatsAppConfigured, buildWhatsAppUrl } from "@/config/site";

export function FloatingWhatsApp() {
  // Regra estrita da Seção 9:
  // "Inclua um botão flutuante de WhatsApp somente depois que o número real for configurado."
  if (!isWhatsAppConfigured()) {
    return null;
  }

  const url = buildWhatsAppUrl();
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp comercial da NEXORA"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 rounded-full border border-emerald-400/40 bg-[#071A17]/95 pl-4 pr-5 py-3.5 text-white shadow-[0_15px_40px_rgba(16,185,129,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-emerald-400 hover:bg-emerald-600"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
      </span>
      <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors" />
      <span className="text-xs sm:text-sm font-semibold tracking-wide">
        Atendimento NEXORA
      </span>
    </a>
  );
}

