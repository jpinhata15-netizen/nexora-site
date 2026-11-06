import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const viewport: Viewport = {
  themeColor: "#050811",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "NEXORA — Experiências Digitais Extraordinárias | Sites, Sistemas e IA",
    template: "%s | NEXORA Digital Studio",
  },
  description:
    "Desenvolvemos experiências digitais, sites institucionais, landing pages, sistemas web personalizados, dashboards e soluções com Inteligência Artificial para empresas e profissionais.",
  keywords: [
    "NEXORA",
    "desenvolvimento de sites",
    "sistemas web personalizados",
    "agência de desenvolvimento digital",
    "landing pages de alta conversão",
    "inteligência artificial para empresas",
    "dashboards e plataformas",
    "design de interfaces UI UX",
  ],
  authors: [{ name: "NEXORA Digital Studio" }],
  creator: "NEXORA",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.domain,
    siteName: "NEXORA",
    title: "NEXORA — Seu próximo salto digital começa aqui.",
    description:
      "Transformamos ideias e necessidades de negócios em experiências digitais modernas, funcionais e visualmente extraordinárias.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXORA — Experiências digitais extraordinárias.",
    description:
      "Desenvolvimento de sites, plataformas, sistemas web e inteligência artificial sob medida.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Orbitron:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-[#050811] text-[#F4F7FB] selection:bg-[#00E5FF] selection:text-[#050811]">
        {children}
      </body>
    </html>
  );
}
