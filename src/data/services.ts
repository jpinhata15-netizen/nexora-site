export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  projectTypeOption: string;
  accentColor: string;
  problemSolved: string;
  whatWeBuild: string[];
  benefits: string[];
  deliverablesTag: string[];
  visualBlueprint: {
    architectureType:
      | "institucional"
      | "landing"
      | "saude-clinicas"
      | "eventos-educacao"
      | "catalogo-vitrine"
      | "redesign-performance";
    telemetryLabel: string;
    layers: string[];
  };
}

/**
 * SOLUÇÕES DA NEXORA — FOCO ESPECIALIZADO EM CRIAÇÃO DE SITES DE ALTO NÍVEL
 */
export const servicesData: ServiceItem[] = [
  {
    id: "sites-institucionais",
    number: "01",
    title: "Sites Institucionais Premium",
    shortTitle: "Site Institucional",
    subtitle:
      "Sites empresariais sofisticados que posicionam sua marca como referência, transmitem credibilidade imediata e geram oportunidades de negócios.",
    projectTypeOption: "Site Institucional Profissional",
    accentColor: "#00F5FF",
    problemSolved:
      "Muitas empresas excelentes perdem clientes todos os dias porque possuem um site amador, desatualizado ou não têm presença profissional na internet.",
    whatWeBuild: [
      "Design exclusivo com identidade visual alinhada à força da sua marca",
      "Páginas completas de apresentação, soluções, portfólio, diferenciais e contato",
      "Integração direta com WhatsApp e formulário inteligente de orçamento",
      "Estrutura otimizada para aparecer no Google (SEO) e carregar rapidamente no celular",
    ],
    benefits: [
      "Autoridade imediata logo nos primeiros segundos de visita",
      "Destaque absoluto frente à concorrência do seu setor",
      "Funcionamento impecável em smartphones, tablets e computadores",
      "Canal próprio de captação comercial ativo 24 horas por dia",
    ],
    deliverablesTag: ["Design Exclusivo", "Mobile-First", "SEO Google", "Alta Credibilidade"],
    visualBlueprint: {
      architectureType: "institucional",
      telemetryLabel: "CORPORATE_WEB_EXPERIENCE // HIGH_AUTHORITY",
      layers: [
        "Abertura Impactante & Posicionamento de Marca",
        "Apresentação de Soluções & Prova de Capacidade",
        "Captação Comercial & Integração WhatsApp",
      ],
    },
  },
  {
    id: "landing-pages",
    number: "02",
    title: "Landing Pages de Alta Conversão",
    shortTitle: "Landing Page",
    subtitle:
      "Páginas estratégicas desenhadas com foco total em transformar visitantes de campanhas e anúncios em clientes reais.",
    projectTypeOption: "Landing Page de Alta Conversão",
    accentColor: "#00A8FF",
    problemSolved:
      "Anúncios no Google ou Instagram desperdiçam orçamento quando levam o visitante para páginas lentas, genéricas ou sem persuasão comercial.",
    whatWeBuild: [
      "Páginas de alta velocidade para lançamentos, serviços específicos e campanhas de tráfego",
      "Estrutura visual persuasiva com títulos fortes, benefícios claros e chamadas estratégicas (CTAs)",
      "Botões de conversão imediata no WhatsApp e captação de contatos qualificados",
      "Design imersivo que prende a atenção do visitante do topo ao rodapé",
    ],
    benefits: [
      "Maior retorno sobre o investimento em anúncios e marketing digital",
      "Carregamento ultrarrápido pensado para quem acessa pelo celular",
      "Comunicação direta que elimina objeções e acelera o pedido de orçamento",
      "Visual tecnológico que valoriza o produto ou serviço anunciado",
    ],
    deliverablesTag: ["Foco em Vendas", "Ideal para Tráfego Pago", "Ultra Rápida", "Alta Conversão"],
    visualBlueprint: {
      architectureType: "landing",
      telemetryLabel: "CONVERSION_FUNNEL_SITE // MAX_ROI",
      layers: [
        "Promessa Forte & Impacto Visual nos Primeiros Segundos",
        "Argumentação Estratégica & Quebra de Objeções",
        "Chamada Direta para Ação (CTA) & Fechamento",
      ],
    },
  },
  {
    id: "sites-clinicas-profissionais",
    number: "03",
    title: "Sites para Clínicas, Saúde e Profissionais",
    shortTitle: "Site para Clínica / Profissional",
    subtitle:
      "Presença digital elegante e acolhedora para médicos, clínicas, consultórios, advogados, arquitetos e prestadores de serviços.",
    projectTypeOption: "Site para Clínica ou Profissional Liberal",
    accentColor: "#00F5FF",
    problemSolved:
      "Profissionais liberais e clínicas dependem da confiança do paciente ou cliente, mas redes sociais sozinhas não transmitem a segurança e a organização necessárias.",
    whatWeBuild: [
      "Sites elegantes apresentando especialidades, corpo clínico/técnico e estrutura de atendimento",
      "Áreas dedicadas para agendamento rápido via WhatsApp e localização interativa",
      "Apresentação clara de tratamentos, serviços, convênios ou áreas de atuação",
      "Ambiente seguro, rápido e em total conformidade com boas práticas de privacidade",
    ],
    benefits: [
      "Transmite confiança, seriedade e excelência antes mesmo da primeira consulta ou reunião",
      "Facilita o agendamento de novos pacientes e clientes pelo smartphone",
      "Fortalece o nome do profissional ou da clínica nas buscas da sua região",
      "Organiza todas as informações importantes em um endereço oficial próprio",
    ],
    deliverablesTag: ["Saúde & Consultórios", "Escritórios & Serviços", "Agendamento Fácil", "Design Premium"],
    visualBlueprint: {
      architectureType: "saude-clinicas",
      telemetryLabel: "PROFESSIONAL_AUTHORITY_SITE // TRUST_UI",
      layers: [
        "Apresentação de Especialidades & Corpo Profissional",
        "Ambiente de Confiança & Estrutura de Atendimento",
        "Canal Rápido de Agendamento & Contato",
      ],
    },
  },
  {
    id: "sites-eventos-educacao",
    number: "04",
    title: "Sites para Eventos, Cursos e Instituições",
    shortTitle: "Site para Evento / Educação",
    subtitle:
      "Portais dinâmicos e tecnológicos para congressos, semanas acadêmicas, instituições de ensino, workshops e competições.",
    projectTypeOption: "Site para Evento ou Instituição de Ensino",
    accentColor: "#38BDF8",
    problemSolved:
      "Eventos e cursos perdem inscritos quando a programação, regras, palestrantes e links de inscrição ficam espalhados e difíceis de consultar.",
    whatWeBuild: [
      "Sites completos com programação detalhada, cronograma, trilhas e atrações",
      "Áreas para divulgação de palestrantes, cursos, regulamentos e patrocinadores",
      "Integração com fluxos de inscrição, QR Codes e avisos importantes em tempo real",
      "Visual impactante que gera desejo de participação e engajamento do público",
    ],
    benefits: [
      "Centraliza todas as informações do evento ou curso em uma experiência memorável",
      "Consulta rápida pelo celular durante todos os dias de programação",
      "Valoriza patrocinadores, parceiros e a instituição organizadora",
      "Comprovado na prática em grandes eventos como a Semana de Tecnologia e Ciência de Dados",
    ],
    deliverablesTag: ["Programação & Agenda", "Inscrições & QR Code", "Cursos & Faculdades", "Alto Engajamento"],
    visualBlueprint: {
      architectureType: "eventos-educacao",
      telemetryLabel: "EVENT_AND_ACADEMIC_PORTAL // LIVE_HUB",
      layers: [
        "Identidade do Evento / Curso & Contagem de Abertura",
        "Vitrine de Atrações, Palestrantes & Grade Curricular",
        "Central de Inscrições, Regulamentos & Parceiros",
      ],
    },
  },
  {
    id: "sites-vitrine-catalogo",
    number: "05",
    title: "Sites Vitrine e Catálogos Digitais",
    shortTitle: "Site Vitrine / Catálogo",
    subtitle:
      "Exposição interativa e sofisticada para empresas que desejam apresentar linhas de produtos, portfólio ou empreendimentos com alto impacto.",
    projectTypeOption: "Site Vitrine / Catálogo de Produtos",
    accentColor: "#00D4FF",
    problemSolved:
      "Catálogos em PDF pesados ou fotos soltas em redes sociais dificultam a visualização dos produtos e esfriam o interesse do comprador.",
    whatWeBuild: [
      "Vitrines digitais organizadas por categorias, filtros e galerias em alta definição",
      "Páginas detalhadas de produtos ou empreendimentos com especificações técnicas",
      "Botão de solicitação de cotação ou pedido direto no WhatsApp comercial em cada item",
      "Layout moderno pensado para valorizar a fotografia e os diferenciais de cada produto",
    ],
    benefits: [
      "Transforma seu catálogo em uma vitrine interativa aberta 24h no celular do cliente",
      "Agiliza o trabalho da equipe comercial com pedidos de orçamento já especificados",
      "Fácil navegação por categorias e busca rápida",
      "Eleva o valor percebido dos seus produtos e lançamentos",
    ],
    deliverablesTag: ["Catálogo Interativo", "Galerias em Alta Definição", "Cotação no WhatsApp", "Fácil Navegação"],
    visualBlueprint: {
      architectureType: "catalogo-vitrine",
      telemetryLabel: "PRODUCT_SHOWCASE_SITE // INTERACTIVE_GALLERY",
      layers: [
        "Navegação por Categorias & Filtros Inteligentes",
        "Galeria Visual de Produtos em Alta Resolução",
        "Solicitação Rápida de Cotação Comercial",
      ],
    },
  },
  {
    id: "redesign-modernizacao",
    number: "06",
    title: "Redesign e Modernização de Sites",
    shortTitle: "Redesign de Site",
    subtitle:
      "Transformação completa de sites antigos ou lentos em experiências digitais modernas, tecnológicas e alinhadas ao patamar atual da sua empresa.",
    projectTypeOption: "Redesign e Modernização de Site",
    accentColor: "#00F5FF",
    problemSolved:
      "Empresas que evoluíram continuam mantendo no ar sites criados há anos, com visual ultrapassado, falhas no celular e baixa conversão.",
    whatWeBuild: [
      "Reconstrução completa do design visual, tipografia e experiência de navegação",
      "Adaptação total para telas modernas de smartphones, tablets e monitores widescreen",
      "Otimização profunda de velocidade de carregamento e estrutura para o Google (SEO)",
      "Reorganização comercial dos textos e botões para gerar mais contatos e orçamentos",
    ],
    benefits: [
      "Renova imediatamente a imagem da sua empresa no mercado",
      "Corrige problemas de lentidão e falhas de visualização no celular",
      "Transforma um site estático em uma ferramenta ativa de negócios",
      "Preserva a essência da sua marca elevando-a a um padrão tecnológico superior",
    ],
    deliverablesTag: ["Evolução Visual", "Correção Mobile", "Otimização de Velocidade", "Novo Posicionamento"],
    visualBlueprint: {
      architectureType: "redesign-performance",
      telemetryLabel: "WEBSITE_EVOLUTION // NEXT_GEN_UPGRADE",
      layers: [
        "Diagnóstico do Site Atual & Pontos de Melhoria",
        "Nova Direção Criativa & Arquitetura Moderna",
        "Salto de Performance, Responsividade & Conversão",
      ],
    },
  },
];
