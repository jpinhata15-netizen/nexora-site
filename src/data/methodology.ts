export interface MethodologyStep {
  stepNumber: string;
  phaseCode: string;
  title: string;
  summary: string;
  detailedDescription: string;
  keyOutputs: string[];
  clientTouchpoint: string;
}

export interface DifferentiatorItem {
  id: string;
  code: string;
  title: string;
  description: string;
  technicalProof: string;
  category: "arquitetura" | "design" | "performance" | "parceria";
}

export interface TargetAudienceSegment {
  id: string;
  title: string;
  subtitle: string;
  examples: string;
}

export const methodologySteps: MethodologyStep[] = [
  {
    stepNumber: "01",
    phaseCode: "PHASE_01 // DISCOVERY",
    title: "Descoberta",
    summary: "Entendimento do negócio, objetivos, público e necessidades.",
    detailedDescription:
      "Mergulhamos na realidade da sua empresa antes de traçar a primeira linha de interface. Analisamos o modelo comercial, o perfil de quem compra de você, as dores operacionais e o posicionamento que sua marca precisa ocupar.",
    keyOutputs: [
      "Mapeamento de objetivos comerciais e operacionais",
      "Diagnóstico de público-alvo e jornada de decisão",
      "Levantamento de requisitos funcionais e técnicos",
    ],
    clientTouchpoint: "Reunião de alinhamento estratégico e imersão no negócio",
  },
  {
    stepNumber: "02",
    phaseCode: "PHASE_02 // STRATEGY",
    title: "Estratégia",
    summary: "Definição da estrutura, funcionalidades e direcionamento visual.",
    detailedDescription:
      "Transformamos as descobertas em um plano arquitetural claro. Estruturamos o mapa de páginas ou módulos do sistema, a hierarquia das mensagens comerciais e a direção criativa que guiará toda a experiência.",
    keyOutputs: [
      "Arquitetura de informação e fluxos de navegação",
      "Especificação de funcionalidades e integrações",
      "Direcionamento visual, tipográfico e conceitual",
    ],
    clientTouchpoint: "Validação da estrutura estratégica e escopo navegável",
  },
  {
    stepNumber: "03",
    phaseCode: "PHASE_03 // UI_UX_DESIGN",
    title: "Design",
    summary: "Criação da experiência visual e organização das interfaces.",
    detailedDescription:
      "Projetamos interfaces autorais que fogem de modelos prontos. Cada tela, componente, microinteração e adaptação mobile é desenhada para transmitir autoridade, clareza visual e facilidade de uso.",
    keyOutputs: [
      "Design de interface (UI) autoral em alta fidelidade",
      "Sistema de componentes, cores e tipografia da marca",
      "Planejamento específico para telas mobile, tablet e desktop",
    ],
    clientTouchpoint: "Apresentação visual e aprovação das telas do projeto",
  },
  {
    stepNumber: "04",
    phaseCode: "PHASE_04 // ENGINEERING",
    title: "Desenvolvimento",
    summary: "Transformação do projeto em uma aplicação funcional.",
    detailedDescription:
      "Construímos a aplicação com código limpo, arquitetura moderna e tecnologias consolidadas no mercado. Implementamos front-end, regras de negócio, formulários, bancos de dados e integrações com precisão técnica.",
    keyOutputs: [
      "Codificação moderna (React, Next.js, TypeScript e APIs)",
      "Implementação de interações, animações suaves e formulários reais",
      "Desenvolvimento responsivo e acabamento visual de alta precisão",
    ],
    clientTouchpoint: "Demonstrações de progresso em ambiente de homologação",
  },
  {
    stepNumber: "05",
    phaseCode: "PHASE_05 // QA_REFINEMENT",
    title: "Testes e refinamento",
    summary: "Verificação de responsividade, funcionalidades, desempenho e experiência.",
    detailedDescription:
      "Submetemos o projeto a uma bateria rigorosa de verificações. Testamos cada botão, formulário, galeria, carregamento de imagem, contraste de leitura e comportamento em diferentes resoluções e navegadores.",
    keyOutputs: [
      "Auditoria de responsividade em smartphones, tablets e desktops",
      "Otimização de imagens, Core Web Vitals e tempo de resposta",
      "Testes funcionais de ponta a ponta em fluxos e formulários",
    ],
    clientTouchpoint: "Revisão final assistida e ajustes finos de acabamento",
  },
  {
    stepNumber: "06",
    phaseCode: "PHASE_06 // DEPLOYMENT",
    title: "Entrega",
    summary: "Publicação e entrega do projeto ao cliente, conforme o escopo contratado.",
    detailedDescription:
      "Realizamos a publicação oficial em infraestrutura moderna e segura, configuramos domínio, certificados SSL, canais de conversão e entregamos a solução pronta para gerar valor real ao seu negócio.",
    keyOutputs: [
      "Deploy em produção com SSL e configuração de domínio",
      "Ativação dos canais de contato, WhatsApp e formulários",
      "Documentação técnica e orientações de uso da plataforma",
    ],
    clientTouchpoint: "Lançamento oficial e entrega estruturada do projeto",
  },
];

export const differentiatorsData: DifferentiatorItem[] = [
  {
    id: "desenvolvimento-personalizado",
    code: "ND-01",
    title: "Desenvolvimento personalizado",
    description:
      "Cada projeto nasce do zero a partir da realidade e dos objetivos da sua empresa. Não adaptamos templates genéricos nem forçamos seu negócio a caber em estruturas prontas.",
    technicalProof: "Arquitetura modular sob medida para o escopo de cada cliente",
    category: "arquitetura",
  },
  {
    id: "design-para-cada-negocio",
    code: "ND-02",
    title: "Design pensado para cada negócio",
    description:
      "Uma clínica médica, uma instituição educacional e uma startup de IA exigem linguagens visuais distintas. Construímos direção de arte autoral alinhada ao seu público.",
    technicalProof: "Composição editorial, paleta e tipografia exclusivas por projeto",
    category: "design",
  },
  {
    id: "experiencia-responsiva",
    code: "ND-03",
    title: "Experiência responsiva",
    description:
      "Mais do que encaixar elementos na tela do celular, planejamos a ergonomia de toque, a leitura tipográfica e os menus especificamente para smartphones, tablets e monitores widescreen.",
    technicalProof: "Layouts fluidos verificados de 360px a 2560px+",
    category: "design",
  },
  {
    id: "navegacao-intuitiva",
    code: "ND-04",
    title: "Navegação intuitiva",
    description:
      "Organizamos informações complexas em fluxos claros e naturais, permitindo que o visitante compreenda sua proposta de valor e encontre o que procura sem esforço.",
    technicalProof: "Hierarquia visual orientada à clareza e conversão comercial",
    category: "design",
  },
  {
    id: "performance-otimizacao",
    code: "ND-05",
    title: "Performance e otimização",
    description:
      "Desenvolvemos aplicações enxutas, com imagens otimizadas em formatos modernos, carregamento inteligente e transições fluidas que não sacrificam a velocidade.",
    technicalProof: "Ativos em WebP/AVIF, Lazy Loading e boas práticas de Core Web Vitals",
    category: "performance",
  },
  {
    id: "tecnologias-modernas",
    code: "ND-06",
    title: "Tecnologias modernas",
    description:
      "Utilizamos o mesmo ecossistema tecnológico adotado pelas principais empresas globais de tecnologia, garantindo segurança, estabilidade e facilidade de evolução futura.",
    technicalProof: "React, Next.js, TypeScript, Tailwind CSS e APIs modernas",
    category: "arquitetura",
  },
  {
    id: "acompanhamento-desenvolvimento",
    code: "ND-07",
    title: "Acompanhamento durante o desenvolvimento",
    description:
      "Você participa das decisões-chave com transparência e proximidade, validando a estratégia, o design e a evolução funcional em etapas claras do início à entrega.",
    technicalProof: "Comunicação direta e validações estruturadas em cada fase",
    category: "parceria",
  },
];

export const targetAudienceSegments: TargetAudienceSegment[] = [
  {
    id: "pmes",
    title: "Pequenas e Médias Empresas",
    subtitle: "Negócios em expansão que precisam posicionar sua marca em um patamar superior de credibilidade e captação comercial.",
    examples: "Indústrias, comércio especializado, construtoras e distribuidoras",
  },
  {
    id: "saude",
    title: "Clínicas e Profissionais da Saúde",
    subtitle: "Consultórios, clínicas médicas, odontológicas e plataformas de bem-estar que exigem confiança, organização e agendamento digital.",
    examples: "Clínicas multidisciplinares, médicos, centros diagnósticos e healthtechs",
  },
  {
    id: "servicos",
    title: "Escritórios e Prestadores de Serviços",
    subtitle: "Profissionais liberais e consultorias cuja contratação depende diretamente da autoridade e sofisticação transmitidas no ambiente digital.",
    examples: "Advocacia, contabilidade, arquitetura, engenharia e consultorias B2B",
  },
  {
    id: "educacao",
    title: "Instituições Educacionais e Eventos",
    subtitle: "Faculdades, cursos, centros de treinamento e eventos tecnológicos que necessitam organizar programas, inscrições e conteúdo.",
    examples: "Ensino superior, escolas técnicas, congressos, hackathons e portais acadêmicos",
  },
  {
    id: "tecnologia",
    title: "Empresas de Tecnologia e Startups",
    subtitle: "Negócios digitais que buscam desenvolver produtos SaaS, interfaces de Inteligência Artificial, dashboards ou landing pages de produto.",
    examples: "Startups SaaS, projetos de IA/Machine Learning e softwares proprietários",
  },
  {
    id: "empreendedores",
    title: "Empreendedores e Novos Negócios",
    subtitle: "Fundadores que desejam tirar uma ideia do papel ou modernizar completamente a presença digital de uma operação existente.",
    examples: "Lançamento de novos produtos, rebranding digital e plataformas sob medida",
  },
];

