import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import { NexoraLogo } from "@/components/brand/NexoraLogo";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Política de Privacidade e Proteção de Dados",
  description:
    "Política de Privacidade, confidencialidade e tratamento de dados comerciais da NEXORA.",
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#050811] text-[#F4F7FB] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link href="/" aria-label="Voltar para a página inicial da NEXORA">
            <NexoraLogo variant="full" theme="dark" size="md" showTagline />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-200 hover:border-[#00E5FF] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#00E5FF]" />
            <span>Voltar ao site</span>
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#080E1C] p-6 sm:p-10 space-y-8">
          <div className="space-y-3 border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00E5FF]">
              <ShieldCheck className="w-4 h-4" />
              <span>GOVERNANÇA E PRIVACIDADE // LGPD</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Política de Privacidade — {siteConfig.name}
            </h1>
            <p className="text-sm text-slate-400">
              Compromisso com a transparência, segurança da informação e sigilo
              comercial em todas as interações digitais.
            </p>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-white">
                1. Coleta de Informações no Formulário Comercial
              </h2>
              <p>
                A <strong>NEXORA</strong> coleta exclusivamente as informações
                fornecidas de maneira voluntária pelo usuário ao solicitar um
                orçamento ou contato comercial: nome, nome da empresa, e-mail,
                telefone/WhatsApp, tipo de projeto desejado, faixa estimada de
                investimento e descrição da necessidade.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-white">
                2. Finalidade do Tratamento dos Dados
              </h2>
              <p>
                Os dados informados são utilizados estritamente para: (a) analisar
                a viabilidade técnica e comercial do projeto solicitado; (b)
                retornar o contato para apresentação de proposta ou agendamento de
                reunião de descoberta; e (c) elaborar o escopo preliminar da
                solução digital.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-white">
                3. Confidencialidade e Não Compartilhamento
              </h2>
              <p>
                Todas as ideias de produtos, regras de negócio e informações
                empresariais compartilhadas conosco são tratadas sob rigoroso
                sigilo profissional. A NEXORA não comercializa, aluga ou cede
                dados de clientes e parceiros a terceiros.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-white">
                4. Direitos do Titular (LGPD — Lei nº 13.709/2018)
              </h2>
              <p>
                Em conformidade com a Lei Geral de Proteção de Dados Pessoais, você
                pode solicitar a qualquer momento a confirmação, atualização ou
                exclusão dos seus dados de contato através dos nossos canais
                oficiais de atendimento.
              </p>
            </section>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Lock className="w-4 h-4 text-[#00E5FF]" />
              <span>NEXORA — Transformando ideias em experiências digitais.</span>
            </div>

            <Link
              href="/#orcamento"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#2563EB] transition-colors"
            >
              <span>Solicitar orçamento com segurança</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

