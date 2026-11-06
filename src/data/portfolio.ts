export interface PortfolioScreenshot {
  id: string;
  src: string;
  title: string;
  caption: string;
  viewport: "desktop" | "mobile";
}

export interface PortfolioProject {
  id: string;
  index: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categoryFilter: "ia-dados" | "saude-sistemas" | "educacao-eventos";
  layoutSpan: "hero-wide" | "editorial-tall" | "asymmetric-left" | "asymmetric-right" | "showcase-full";
  shortDescription: string;
  fullDescription: string;
  challengeAndContext: string;
  solutionDelivered: string;
  verifiedFeatures: string[];
  uxHighlights: string[];
  inspectedSpecs: {
    typography: string;
    colorScheme: string;
    paletteSwatches: { label: string; hex: string }[];
    interfaceType: string;
    responsiveness: string;
  };
  gallery: PortfolioScreenshot[];
}

/**
 * DADOS OFICIAIS DO PORTFÓLIO NEXORA
 * ----------------------------------
 * Todos os projetos abaixo foram inspecionados individualmente e possuem
 * capturas reais armazenadas localmente em /public/portfolio/<slug>/.
 * Por diretriz estratégica da NEXORA, a exploração ocorre 100% dentro
 * da galeria interativa interna, sem redirecionamentos externos.
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    id: "titanic-ai",
    index: "01",
    slug: "titanic-ai",
    title: "TITANIC AI",
    subtitle: "Machine Learning Survival Predictor & Simulador Preditivo",
    category: "Inteligência Artificial e Machine Learning",
    categoryFilter: "ia-dados",
    layoutSpan: "hero-wide",
    shortDescription:
      "Aplicação interativa de predição que demonstra o uso de modelos de aprendizado de máquina para análise de variáveis de passageiros e estimativa matemática de sobrevivência.",
    fullDescription:
      "O TITANIC AI traduz o poder de modelos preditivos e redes neurais em uma interface imersiva de altíssimo impacto visual. Desenvolvido para demonstrar na prática como algoritmos de Machine Learning decodificam conjuntos de dados históricos, o sistema coleta variáveis determinantes do passageiro — sexo biológico, faixa etária e classe do bilhete — e processa a probabilidade estimada de sobrevivência acompanhada do grau de confiança do modelo.",
    challengeAndContext:
      "Modelos de aprendizado de máquina muitas vezes permanecem restritos a ambientes técnicos de código. O desafio deste projeto foi transformar uma inferência estatística em uma experiência digital cinematográfica, intuitiva e compreensível para qualquer usuário.",
    solutionDelivered:
      "Uma aplicação web com direção de arte noturna oceânica, tipografia editorial de alto contraste com detalhes em dourado metálico, painel translúcido (glassmorphism) para entrada estruturada de parâmetros, ambientação sonora controlada e retorno visual claro do modelo preditivo.",
    verifiedFeatures: [
      "Módulo interativo de Análise do Passageiro com seleção de sexo biológico, idade e categoria de bilhete",
      "Processamento preditivo sob demanda acionado em tempo real pela interface ('Iniciar Predição')",
      "Apresentação estruturada do Resultado do Modelo com indicador de Grau de Confiança",
      "Ambientação visual imersiva com ilustração histórica em plano de fundo, partículas sutis e controle de áudio integrado",
      "Interface responsiva adaptada tanto para desktops panorâmicos quanto para smartphones",
    ],
    uxHighlights: [
      "Contraste sofisticado entre fundo azul-abissal (#020610) e acentos em ouro imperial (#D4AF37)",
      "Formulário enxuto com ícones semânticos dedicados para cada variável preditiva",
      "Hierarquia tipográfica dramática que guia o olhar do título diretamente ao simulador",
    ],
    inspectedSpecs: {
      typography: "Serifa Editorial Display + Outfit Sans-Serif",
      colorScheme: "Dark Cinematic Navy & Metallic Gold",
      paletteSwatches: [
        { label: "Abissal Noturno", hex: "#020610" },
        { label: "Azul Oceânico", hex: "#0F172A" },
        { label: "Ouro Imperial", hex: "#D4AF37" },
        { label: "Gelo Puro", hex: "#F8FAFC" },
      ],
      interfaceType: "Web App Interativo de Inferência em Machine Learning",
      responsiveness: "Layout Fluido Desktop (1440px) & Mobile (390px)",
    },
    gallery: [
      {
        id: "titanic-1",
        src: "/portfolio/titanic-ai/01-desktop-hero.webp",
        title: "Visão Geral — Simulador Preditivo TitanicAI",
        caption:
          "Abertura cinematográfica com atmosfera oceânica noturna e painel interativo de coleta de variáveis para o modelo de Machine Learning.",
        viewport: "desktop",
      },
      {
        id: "titanic-2",
        src: "/portfolio/titanic-ai/02-desktop-secao.webp",
        title: "Parametrização de Variáveis do Passageiro",
        caption:
          "Configuração dos parâmetros de entrada (Sexo Biológico, Idade e Classe do Bilhete) antes do disparo da inferência neural.",
        viewport: "desktop",
      },
      {
        id: "titanic-3",
        src: "/portfolio/titanic-ai/03-desktop-funcionalidade.webp",
        title: "Execução e Interação do Simulador",
        caption:
          "Interface em estado ativo de simulação com controle de áudio ambiente e feedback visual de processamento do modelo.",
        viewport: "desktop",
      },
      {
        id: "titanic-4",
        src: "/portfolio/titanic-ai/05-mobile-view.webp",
        title: "Experiência Mobile Responsiva",
        caption:
          "Adaptação integral da interface preditiva para telas verticais de smartphones, preservando legibilidade e ergonomia de toque.",
        viewport: "mobile",
      },
    ],
  },
  {
    id: "vitatrack",
    index: "02",
    slug: "vitatrack",
    title: "VITATRACK",
    subtitle: "Plataforma Digital de Saúde, Nutrição e Evolução Pessoal",
    category: "Saúde e Acompanhamento Digital",
    categoryFilter: "saude-sistemas",
    layoutSpan: "asymmetric-left",
    shortDescription:
      "Projeto de plataforma digital voltada ao acompanhamento diário de pesagens, medidas corporais, alimentação, ingestão de proteína e visualização da evolução do usuário.",
    fullDescription:
      "O VitaTrack é um produto digital de wellness e saúde projetado sob o conceito 'Sua evolução, todos os dias'. A plataforma combina uma estética orgânica e acolhedora com engenharia de software orientada ao acompanhamento contínuo de pesagens, medidas corporais e rotina nutricional, oferecendo fluxos de autenticação segura, criação rápida de conta e ambiente interativo de demonstração.",
    challengeAndContext:
      "Aplicações de saúde e acompanhamento corporal costumam apresentar interfaces frias ou excessivamente técnicas, desencorajando o registro diário pelo usuário. O objetivo foi criar uma experiência leve, humana e encorajadora.",
    solutionDelivered:
      "Uma interface split-screen de padrão editorial que une fotografia botânica natural, paleta verde-floresta e areia orgânica, tipografia limpa e fluxos diretos de acesso, recuperação de senha, cadastro de novos usuários e conta de demonstração integrada.",
    verifiedFeatures: [
      "Portal de acesso em tela dividida com posicionamento de marca ('Mais do que números, é sobre o seu progresso')",
      "Fluxo de autenticação com opção de visualização de senha, persistência de sessão e recuperação de acesso",
      "Modo de experimentação imediata integrado à interface para avaliação rápida da plataforma",
      "Fluxo dedicado de cadastro ('Comece sua jornada agora') com validação de credenciais",
      "Design responsivo que reorganiza a composição editorial para uso diário no smartphone",
    ],
    uxHighlights: [
      "Paleta acolhedora em tons de Verde Botânico (#2B6B56) e Creme Orgânico (#F5F1E7)",
      "Comunicação empática focada na constância e leveza do hábito diário",
      "Componentização limpa com cartões de bordas suaves e excelente contraste tipográfico",
    ],
    inspectedSpecs: {
      typography: "Inter UI Sans-Serif",
      colorScheme: "Organic Wellness Cream & Botanical Green",
      paletteSwatches: [
        { label: "Verde Botânico", hex: "#2B6B56" },
        { label: "Floresta Profundo", hex: "#1E4D3D" },
        { label: "Areia Orgânico", hex: "#F5F1E7" },
        { label: "Grafite Suave", hex: "#1F2937" },
      ],
      interfaceType: "Plataforma Web de Saúde & Bem-Estar (Wellness SaaS)",
      responsiveness: "Split-Screen Desktop & Card Adaptativo Mobile",
    },
    gallery: [
      {
        id: "vitatrack-1",
        src: "/portfolio/vitatrack/01-desktop-hero.webp",
        title: "Portal Principal — VitaTrack Wellness",
        caption:
          "Composição em tela dividida combinando manifesto visual da marca à esquerda e módulo de acesso rápido e demonstração à direita.",
        viewport: "desktop",
      },
      {
        id: "vitatrack-2",
        src: "/portfolio/vitatrack/03-desktop-funcionalidade.webp",
        title: "Fluxo de Cadastro — Comece sua Jornada",
        caption:
          "Tela dedicada à criação de conta para novos usuários iniciarem o acompanhamento de evolução corporal e nutricional.",
        viewport: "desktop",
      },
      {
        id: "vitatrack-3",
        src: "/portfolio/vitatrack/02-desktop-secao.webp",
        title: "Módulo de Recuperação e Segurança de Conta",
        caption:
          "Interface minimalista de suporte ao usuário e redefinição segura de credenciais.",
        viewport: "desktop",
      },
      {
        id: "vitatrack-4",
        src: "/portfolio/vitatrack/05-mobile-view.webp",
        title: "Versão Mobile — Acesso Diário no Smartphone",
        caption:
          "Interface otimizada para dispositivos móveis, ideal para registros rápidos de rotina e acompanhamento em qualquer lugar.",
        viewport: "mobile",
      },
    ],
  },
  {
    id: "cliniai",
    index: "03",
    slug: "cliniai",
    title: "CLINIAI",
    subtitle: "Sistema Web SaaS e Inteligência Operacional para Clínicas",
    category: "Sistemas Web e Inteligência Artificial",
    categoryFilter: "saude-sistemas",
    layoutSpan: "asymmetric-right",
    shortDescription:
      "Solução digital multi-tenant para gestão de clínicas e consultórios, integrando agenda inteligente, pacientes, prontuários, comunicação e operação em tempo real.",
    fullDescription:
      "Posicionado como 'A secretária inteligente da sua clínica', o CliniAI é uma plataforma SaaS desenvolvida para modernizar a operação de clínicas médicas e consultórios. Com arquitetura multi-tenant (espaço exclusivo e banco de dados isolado para cada clínica), a solução centraliza agenda sem conflitos, gestão de pacientes, prontuários, finanças e comunicação com a equipe em uma interface limpa e segura.",
    challengeAndContext:
      "Clínicas e consultórios lidam diariamente com agendas fragmentadas, conflitos de horários e sistemas legados complexos. O projeto exigia uma interface que transmitisse máxima segurança de dados clínicos aliada à simplicidade operacional.",
    solutionDelivered:
      "Um ecossistema web SaaS com onboarding self-service ('Cadastre sua clínica em menos de 1 minuto'), isolamento de tenant para cada instituição de saúde, portal de acesso seguro para equipes clínicas e recuperação automatizada de credenciais.",
    verifiedFeatures: [
      "Arquitetura SaaS Multi-Tenant com criação de espaço exclusivo para cada clínica ou consultório",
      "Proposta integrada para gestão de agenda médica sem conflitos, prontuários, finanças e atendimentos",
      "Onboarding ágil ('Criar nova clínica') com configuração de administrador, contato e credenciais de segurança",
      "Portal de autenticação clínica com design institucional azul-marinho e azul-royal de alta legibilidade",
      "Fluxo completo de recuperação de acesso ('Recuperar senha') e adaptação responsiva para tablets e celulares",
    ],
    uxHighlights: [
      "Estética Healthtech corporativa em Azul Profundo (#102542) e Azul Clínico Vibrante (#2563EB)",
      "Comunicação direta dos pilares de valor: banco de dados isolado, agenda inteligente e gestão integrada",
      "Formulários com excelente espaçamento, rótulos claros e foco imediato na produtividade da equipe",
    ],
    inspectedSpecs: {
      typography: "Inter System UI Sans-Serif",
      colorScheme: "Clinical Navy, Ice Blue & Trust Royal",
      paletteSwatches: [
        { label: "Azul Clínico", hex: "#2563EB" },
        { label: "Marinho Institucional", hex: "#102542" },
        { label: "Gelo Hospitalar", hex: "#F4F8FC" },
        { label: "Verde Validação", hex: "#10B981" },
      ],
      interfaceType: "Plataforma SaaS B2B Multi-Tenant para Saúde",
      responsiveness: "Desktop Widescreen & Mobile Clínico Responsivo",
    },
    gallery: [
      {
        id: "cliniai-1",
        src: "/portfolio/cliniai/01-desktop-hero.webp",
        title: "Portal de Acesso — CliniAI Operação Clínica",
        caption:
          "Tela principal de acesso à plataforma com apresentação do posicionamento 'A secretária inteligente da sua clínica'.",
        viewport: "desktop",
      },
      {
        id: "cliniai-2",
        src: "/portfolio/cliniai/02-desktop-secao.webp",
        title: "Onboarding SaaS — Criação de Nova Clínica (Multi-Tenant)",
        caption:
          "Fluxo de provisionamento rápido de espaço exclusivo para clínicas, destacando isolamento de banco de dados, agenda e gestão financeira.",
        viewport: "desktop",
      },
      {
        id: "cliniai-3",
        src: "/portfolio/cliniai/03-desktop-funcionalidade.webp",
        title: "Fluxo de Segurança e Recuperação de Acesso",
        caption:
          "Tela dedicada à recuperação segura de credenciais para profissionais e administradores da clínica.",
        viewport: "desktop",
      },
      {
        id: "cliniai-4",
        src: "/portfolio/cliniai/05-mobile-view.webp",
        title: "Interface Mobile para Médicos e Recepção",
        caption:
          "Visualização responsiva em smartphone, garantindo acesso rápido à operação clínica em qualquer dispositivo.",
        viewport: "mobile",
      },
    ],
  },
  {
    id: "ciencia-de-dados",
    index: "04",
    slug: "ciencia-de-dados",
    title: "CIÊNCIA DE DADOS",
    subtitle: "Portal Institucional de Tecnologia, IA e Formação Superior",
    category: "Desenvolvimento Institucional",
    categoryFilter: "educacao-eventos",
    layoutSpan: "editorial-tall",
    shortDescription:
      "Projeto de presença digital institucional voltado à área de Ciência de Dados, apresentando formação tecnológica, pilha de tecnologias, atuação no mercado e projetos aplicados.",
    fullDescription:
      "Desenvolvido para o curso superior de Tecnologia em Ciência de Dados da Fatec Ourinhos, este portal institucional moderniza a comunicação acadêmica através de uma linguagem visual digna de empresas de tecnologia de ponta. Com navegação multi-página (Início, O Curso, Mercado e Projetos), o site apresenta as competências do cientista de dados, as tecnologias dominadas ao longo da formação e soluções reais de Inteligência Artificial criadas pelos estudantes.",
    challengeAndContext:
      "Instituições de ensino frequentemente possuem páginas estáticas e pouco atrativas para o público jovem e tecnológico. O desafio foi construir uma presença digital que refletisse inovação, Ciência de Dados e Inteligência Artificial desde o primeiro impacto.",
    solutionDelivered:
      "Um portal web escuro com estética cyber-data (gradientes em ciano e violeta sobre grade técnica), ilustração tridimensional temática, barras visuais de multidisciplinaridade, vitrine de tecnologias (Python, SQL & NoSQL, Data Viz, Machine Learning, Big Data e Ética) e galeria de projetos acadêmicos.",
    verifiedFeatures: [
      "Hero section de alto impacto ('Transformando dados em conhecimento') com indicadores de duração e ensino público gratuito",
      "Seção 'O Profissional' detalhando multidisciplinaridade (Programação, Estatística, Matemática Aplicada e Negócios) e responsabilidades",
      "Matriz tecnológica destacando Python, SQL & NoSQL, Data Viz, Machine Learning, Big Data e Ética em Dados",
      "Páginas internas dedicadas ('Sobre o Curso', 'Mercado' e 'Projetos de Destaque' como o sistema de IA 'Is That True')",
      "Arquitetura totalmente responsiva com navegação superior clara e chamadas diretas para inscrição no vestibular",
    ],
    uxHighlights: [
      "Identidade visual tecnológica combinando Preto Profundo (#05050A), Ciano Elétrico (#00F0FF) e Violeta Digital (#8B5CF6)",
      "Barras de progresso e cartões translúcidos que facilitam a leitura rápida da grade tecnológica",
      "Valorização da produção científica e prática dos alunos com estudos de caso reais",
    ],
    inspectedSpecs: {
      typography: "Outfit Geometric Sans-Serif",
      colorScheme: "Cyber-Data Obsidian, Cyan & Violet",
      paletteSwatches: [
        { label: "Obsidiana Tech", hex: "#05050A" },
        { label: "Ciano Dados", hex: "#06B6D4" },
        { label: "Violeta Neural", hex: "#8B5CF6" },
        { label: "Branco Polar", hex: "#F8FAFC" },
      ],
      interfaceType: "Portal Institucional Multi-Página de Educação & Tecnologia",
      responsiveness: "Grid Adaptativo Desktop & Mobile Navigation",
    },
    gallery: [
      {
        id: "cd-1",
        src: "/portfolio/ciencia-de-dados/01-desktop-hero.webp",
        title: "Hero Section — Transformando Dados em Conhecimento",
        caption:
          "Abertura principal do portal com identidade tecnológica, proposta formativa e chamadas estratégicas para conhecer o curso e inscrever-se.",
        viewport: "desktop",
      },
      {
        id: "cd-2",
        src: "/portfolio/ciencia-de-dados/02-desktop-secao.webp",
        title: "Perfil do Profissional e Competências Multidisciplinares",
        caption:
          "Apresentação visual dos pilares de formação (Programação, Estatística, Matemática Aplicada e Negócios) e atribuições no mercado.",
        viewport: "desktop",
      },
      {
        id: "cd-3",
        src: "/portfolio/ciencia-de-dados/03-desktop-funcionalidade.webp",
        title: "Página Interna — Sobre o Curso e Visão Analítica",
        caption:
          "Detalhamento institucional da formação superior e da metodologia 'Pense com Dados'.",
        viewport: "desktop",
      },
      {
        id: "cd-4",
        src: "/portfolio/ciencia-de-dados/04-desktop-detalhes.webp",
        title: "Vitrine de Projetos de Alunos — Inteligência Artificial Aplicada",
        caption:
          "Exibição de soluções reais desenvolvidas no curso, incluindo projetos de Processamento de Linguagem Natural e Machine Learning.",
        viewport: "desktop",
      },
      {
        id: "cd-5",
        src: "/portfolio/ciencia-de-dados/05-mobile-view.webp",
        title: "Versão Mobile — Navegação Institucional em Smartphones",
        caption:
          "Adaptação responsiva completa com menu mobile e leitura fluida para candidatos e estudantes.",
        viewport: "mobile",
      },
    ],
  },
  {
    id: "semanatec",
    index: "05",
    slug: "semanatec",
    title: "SEMANATEC FATEC OURINHOS",
    subtitle: "Plataforma Digital da XX Semana de Tecnologia",
    category: "Eventos e Educação",
    categoryFilter: "educacao-eventos",
    layoutSpan: "showcase-full",
    shortDescription:
      "Plataforma digital completa de evento tecnológico, integrando áreas de competições, Hackathon, Maratona de Programação, Ideathon, Game Fest, minicursos, programação, palestrantes e inscrições.",
    fullDescription:
      "A plataforma oficial da XX Semana de Tecnologia da FATEC Ourinhos centraliza toda a jornada de um grande evento acadêmico e tecnológico. Projetada para engajar estudantes, professores, palestrantes e empresas patrocinadoras, a aplicação organiza sete frentes simultâneas — Maratona de Programação, Hackathon, Ideathon, Game Fest, Palestras, Minicursos (presenciais e online via Webex) e Networking — além de comunicados operacionais de credenciamento mobile, regulamentos oficiais e captação de inscrições.",
    challengeAndContext:
      "Eventos tecnológicos de grande porte reúnem dezenas de atividades simultâneas, regras específicas de competição, cronogramas e avisos importantes. O desafio foi organizar esse volume denso de informações em uma experiência vibrante, clara e fácil de navegar.",
    solutionDelivered:
      "Uma plataforma de evento com estética futurista neon-cyberpunk, navegação rápida por âncoras e categorias, vitrine visual de atrações com tags temáticas, avisos de destaque sobre o novo sistema de controle de presença por smartphone, acesso ao regulamento oficial do Hackathon e integração de inscrição via botão e QR Code.",
    verifiedFeatures: [
      "Abertura impactante com identidade visual da XX Semana de Tecnologia, datas oficiais e atalhos rápidos por categoria",
      "Vitrine completa das 7 frentes do evento: Maratona de Programação, Hackathon, Ideathon, Game Fest, Palestras, Minicursos e Networking",
      "Seção informativa estruturada sobre o Novo Sistema de Controle de Presença via smartphone e prazos de credenciamento",
      "Área dedicada ao Hackathon com acesso ao regulamento oficial e destaque de premiação em parceria com empresas de tecnologia",
      "Seção de inscrições abertas com suporte a QR Code, além de vitrine de empresas parceiras e patrocinadores",
    ],
    uxHighlights: [
      "Direção de arte vibrante com iluminação Ciano (#00E5FF) e Roxo Elétrico (#9333EA) sobre fundo escuro reticulado",
      "Cards de atividades com fotografias temáticas, badges de categoria ('Competição', 'Inovação', 'Empreendedorismo', 'Diversão & eSports') e botões de aprofundamento",
      "Organização escaneável de avisos críticos e cronogramas para orientar centenas de participantes",
    ],
    inspectedSpecs: {
      typography: "Orbitron / Display Tech + Inter Sans-Serif",
      colorScheme: "Futuristic Cyber Event — Deep Navy, Cyan & Neon Purple",
      paletteSwatches: [
        { label: "Noite Tecnológica", hex: "#0B0F19" },
        { label: "Ciano Sintético", hex: "#00E5FF" },
        { label: "Roxo Hackathon", hex: "#9333EA" },
        { label: "Ouro Premiação", hex: "#F59E0B" },
      ],
      interfaceType: "Plataforma Digital de Evento Tecnológico e Competições",
      responsiveness: "Experiência Completa Desktop & Mobile com Menu Gaveta",
    },
    gallery: [
      {
        id: "semanatec-1",
        src: "/portfolio/semanatec/01-desktop-hero.webp",
        title: "Hero Principal — XX Semana de Tecnologia FATEC Ourinhos",
        caption:
          "Abertura oficial do evento com navegação rápida entre Competições, Gamefest, Minicursos, Palestrantes/Agenda e Parceiros.",
        viewport: "desktop",
      },
      {
        id: "semanatec-2",
        src: "/portfolio/semanatec/02-desktop-secao.webp",
        title: "Vitrine de Atrações — Competições, Palestras e Oficinas",
        caption:
          "Apresentação visual da Maratona de Programação, Hackathon, Ideathon, Game Fest, Palestras, Minicursos e Networking.",
        viewport: "desktop",
      },
      {
        id: "semanatec-3",
        src: "/portfolio/semanatec/03-desktop-funcionalidade.webp",
        title: "Agenda Completa e Novo Sistema de Controle de Presença",
        caption:
          "Módulo de orientação aos participantes sobre o credenciamento mobile e registro de frequência por smartphone.",
        viewport: "desktop",
      },
      {
        id: "semanatec-4",
        src: "/portfolio/semanatec/04-desktop-detalhes.webp",
        title: "Destaque Hackathon — Regulamento Oficial e Desafio Tecnológico",
        caption:
          "Seção dedicada às regras da maratona de desenvolvimento e chamada para o desafio oficial com premiação.",
        viewport: "desktop",
      },
      {
        id: "semanatec-5",
        src: "/portfolio/semanatec/05-mobile-view.webp",
        title: "Experiência Mobile — Consulta Rápida Durante o Evento",
        caption:
          "Interface mobile responsiva projetada para que estudantes e visitantes consultem horários, salas e regras pelo celular.",
        viewport: "mobile",
      },
    ],
  },
];

