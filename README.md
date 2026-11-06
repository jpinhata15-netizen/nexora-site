# NEXORA — Agência de Desenvolvimento Digital, Design e Tecnologia

> **"Experiências digitais extraordinárias."**

Aplicação web oficial da **NEXORA**, projetada com direção criativa autoral, arquitetura full-stack em **Next.js 14 (App Router)**, **TypeScript** e **Tailwind CSS**.

---

## 1. Estrutura da Arquitetura

```text
├── public/
│   ├── favicon.svg                      # Símbolo vetorial N×X da NEXORA
│   └── portfolio/                       # Capturas reais em alta resolução (Desktop + Mobile)
│       ├── titanic-ai/                  # 4 capturas reais verificadas (.webp)
│       ├── vitatrack/                   # 4 capturas reais verificadas (.webp)
│       ├── cliniai/                     # 4 capturas reais verificadas (.webp)
│       ├── ciencia-de-dados/            # 5 capturas reais verificadas (.webp)
│       └── semanatec/                   # 5 capturas reais verificadas (.webp)
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts         # Endpoint de validação e disparo comercial
│   │   ├── privacidade/page.tsx         # Política de Privacidade e LGPD
│   │   ├── globals.css                  # Tokens visuais, animações e acessibilidade
│   │   ├── icon.svg                     # Favicon integrado ao App Router
│   │   ├── layout.tsx                   # Tipografia (Space Grotesk, Plus Jakarta, JetBrains Mono) + SEO
│   │   ├── page.tsx                     # Orquestração da experiência principal
│   │   ├── robots.ts                    # Geração dinâmica de robots.txt
│   │   └── sitemap.ts                   # Geração dinâmica de sitemap.xml
│   ├── components/
│   │   ├── brand/                       # Logotipo N×X (NexoraLogo) e Mostruário de Identidade Visual
│   │   ├── contact/                     # Seção Comercial, Formulário de Orçamento e WhatsApp Flutuante
│   │   ├── differentials/               # Seção "Por que NEXORA?", Matriz Comparativa e Público-Alvo
│   │   ├── hero/                        # Hero Section e Núcleo Interativo 3D/Espacial NEXORA
│   │   ├── layout/                      # Cabeçalho Responsivo (Navbar) e Rodapé Executivo (Footer)
│   │   ├── methodology/                 # Jornada Interativa de 6 Etapas da Metodologia
│   │   ├── portfolio/                   # Vitrine Editorial Assimétrica e Modal Lightbox Interno
│   │   └── services/                    # Seção de 6 Serviços com Diagramas Arquiteturais Próprios
│   ├── config/
│   │   └── site.ts                      # ARQUIVO ÚNICO DE CONFIGURAÇÃO DE CONTATOS E INTEGRAÇÕES
│   └── data/
│       ├── methodology.ts               # Dados das 6 etapas, 8 diferenciais e segmentos atendidos
│       ├── portfolio.ts                 # Dados inspecionados dos 5 projetos reais (sem links externos)
│       └── services.ts                  # Dados comerciais e técnicos dos 6 serviços
```

---

## 2. Como Configurar Contatos (WhatsApp, E-mail e Redes Sociais)

Todos os canais comerciais estão centralizados em **um único arquivo**:
👉 [`src/config/site.ts`](./src/config/site.ts)

Você pode configurá-los editando diretamente `src/config/site.ts` ou definindo variáveis de ambiente (`.env.local` ou painel da Vercel):

1. **WhatsApp Comercial**:
   - Preencha `whatsappNumber` em `src/config/site.ts` (ex: `"5514999999999"`) ou defina `NEXT_PUBLIC_NEXORA_WHATSAPP="5514999999999"`.
   - Assim que um número válido é configurado, o **Botão Flutuante de WhatsApp** e o botão de **Encaminhamento Direto pós-orçamento** são ativados automaticamente com mensagens profissionais pré-preenchidas.
2. **E-mail Comercial**:
   - Preencha `commercialEmail` em `src/config/site.ts` (ex: `"contato@nexora.com.br"`) ou defina `NEXT_PUBLIC_NEXORA_EMAIL`.
3. **Redes Sociais**:
   - Preencha `socials.instagram`, `socials.linkedin`, `socials.github` ou `socials.behance` em `src/config/site.ts`.

---

## 3. Integrações Externas do Formulário Comercial (`/api/contact`)

O formulário comercial possui validação no cliente e no servidor (`/api/contact`), gerando um protocolo único (`NX-...`) e formatando o briefing completo. Para disparo externo automático, basta configurar uma das opções abaixo:

- **Webhook (n8n, Make, Zapier, Slack, Discord ou CRM)**:
  - Defina a variável `NEXORA_WEBHOOK_URL` com a URL do seu webhook receptor.
- **E-mail Transacional Automático (Resend)**:
  - Defina `RESEND_API_KEY` e `NEXORA_COMMERCIAL_EMAIL`.

---

## 4. Instruções para Publicação na Vercel

1. Suba o repositório para o GitHub, GitLab ou Bitbucket (ou utilize a Vercel CLI com `npx vercel`).
2. No painel da **Vercel**, clique em **Add New Project** e importe o repositório.
3. Framework Preset: **Next.js** (detectado automaticamente).
4. Em **Environment Variables**, adicione (quando desejar ativar):
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_NEXORA_WHATSAPP`
   - `NEXT_PUBLIC_NEXORA_EMAIL`
   - `NEXORA_WEBHOOK_URL` ou `RESEND_API_KEY`
5. Clique em **Deploy**.

