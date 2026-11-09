"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { isWhatsAppConfigured, buildWhatsAppUrl } from "@/config/site";

export function FloatingWhatsApp() {
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
      aria-label="Conversar pelo WhatsApp comercial da NORDARA"
      title="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-40 group flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/50 bg-[#071A17]/95 text-emerald-400 shadow-[0_12px_35px_rgba(16,185,129,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-emerald-400 hover:bg-emerald-500 hover:text-[#02050D]"
    >
      <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
    </a>
  );
}
