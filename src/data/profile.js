// Fields written as { en, es } are localized; read them with pick() from useLanguage().

export const profile = {
  firstName: "Franco",
  lastName: "Tillard",
  fullName: "Franco Tillard",
  role: {
    en: "FullStack Developer",
    es: "Desarrollador FullStack",
  },
  bio: {
    en: "FullStack developer and final-year Software Engineering student. I build web products with React, Java and Spring Boot, from idea to production.",
    es: "Desarrollador FullStack y estudiante de último año de Ingeniería en Software. Construyo productos web con React, Java y Spring Boot, de la idea a producción.",
  },
  motto: {
    en: ["From idea", "to production"],
    es: ["De la idea", "a producción"],
  },
  email: "tillardtomasfranco@gmail.com",
  photo: "/profile-photo.png",
  cv: "/CurriculumVitae-TillardFrancoTomas.pdf",
  available: true,
  links: {
    linkedin: "https://www.linkedin.com/in/tillardfrancotomas/",
    github: "https://github.com/tillardfranco",
  },
};

export const projects = [
  {
    title: "Aires del Lago",
    subtitle: {
      en: "Cabin rental promotional website",
      es: "Sitio promocional de alquiler de cabañas",
    },
    description: {
      en: "Promotional website for a cabin rental business, built end to end with responsive design, performance optimization and SEO and UX best practices.",
      es: "Sitio promocional para un complejo de cabañas, desarrollado de punta a punta con diseño responsive, optimización de rendimiento y buenas prácticas de SEO y UX.",
    },
    tags: ["React", "Vite", "Tailwind CSS"],
    image: "/AiresDelLago.png",
    link: "https://airesdellagolosmolinos.com.ar/home",
    github: "https://github.com/TillardFranco/aires-del-lago",
  },
  {
    title: "Farmaser",
    subtitle: {
      en: "Pharmacy management system",
      es: "Sistema de gestión para farmacias",
    },
    description: {
      en: "Pharmacy management system with inventory control, sales and reports. Spring Boot backend secured with JWT, React frontend on Vite and Tailwind CSS.",
      es: "Sistema de gestión para farmacias con control de inventario, ventas y reportes. Backend en Spring Boot protegido con JWT y frontend en React con Vite y Tailwind CSS.",
    },
    tags: ["Java", "Spring Boot", "Spring Security", "JWT", "MySQL", "React"],
    image: "/farmaser.jpg",
    imageIsLogo: true,
    link: null,
    github: null,
  },
  {
    title: {
      en: "Internal management system",
      es: "Sistema de gestión interno",
    },
    subtitle: {
      en: "Modular ERP backend",
      es: "Backend ERP modular",
    },
    description: {
      en: "Generic, modular ERP backend built with Spring Boot 3 and Java 17. Integrates inventory, sales and management so it adapts to pharmacies, retail stores or supermarkets.",
      es: "Backend ERP genérico y modular construido con Spring Boot 3 y Java 17. Integra inventario, ventas y gestión para adaptarse a farmacias, comercios o supermercados.",
    },
    tags: ["Java", "Spring Boot", "Spring Data JPA", "Spring Security", "MapStruct", "MySQL"],
    image: "/Sistema-Gestion-Backend.png",
    link: null,
    github: "https://github.com/TillardFranco/Sistema-Gestion-Backend-ERP",
  },
];

export const experience = [
  {
    id: "metrotec",
    role: { en: "Analyst Developer", es: "Desarrollador Analista" },
    company: "MetroTec",
    period: { en: "Feb 2026 - Present", es: "Feb. 2026 - Actualidad" },
    description: {
      en: "I turn functional requirements from about 30 client companies into working software on an enterprise ERP. Before coding, I validate each spec against the real database, which has surfaced issues nobody had reported.",
      es: "Convierto requerimientos funcionales de unas 30 empresas cliente en software funcionando sobre un ERP empresarial. Antes de codificar, valido cada especificación contra la base de datos real, lo que me permitió detectar errores que nadie había reportado.",
    },
    highlights: [
      {
        name: { en: "REST integrations", es: "Integraciones REST" },
        detail: {
          en: "Mercado Libre, WooCommerce and ARCA/AFIP e-invoicing",
          es: "Mercado Libre, WooCommerce y factura electrónica de ARCA/AFIP",
        },
      },
      {
        name: { en: "Database migration", es: "Migración de base de datos" },
        detail: { en: "SQL Server to PostgreSQL", es: "SQL Server a PostgreSQL" },
      },
      {
        name: { en: "Data tooling", es: "Herramientas de datos" },
        detail: {
          en: "Bulk importers with error logging and custom reports",
          es: "Importadores masivos con control de errores e informes a medida",
        },
      },
    ],
  },
  {
    id: "devbit",
    role: { en: "Co-founder", es: "Cofundador" },
    company: "Dev.Bit",
    period: { en: "2024 - Present", es: "2024 - Actualidad" },
    description: {
      en: "Custom websites and systems for entrepreneurs and small businesses, built with React + Vite and managed hosting.",
      es: "Sitios web y sistemas a medida para emprendedores y pequeñas empresas, desarrollados con React + Vite y hosting administrado.",
    },
    highlights: [
      {
        name: "Aires del Lago",
        detail: { en: "Frontend Developer", es: "Desarrollador Frontend" },
      },
      {
        name: "Farmaser",
        detail: {
          en: "Backend & Frontend Developer",
          es: "Desarrollador Backend y Frontend",
        },
      },
    ],
  },
];

export const education = [
  {
    id: "siglo21",
    title: { en: "Software Engineering", es: "Ingeniería en Software" },
    place: "Universidad Siglo 21",
    period: {
      en: "Final-year student",
      es: "Estudiante de último año",
    },
    description: {
      en: "Solid foundation in engineering principles and software development.",
      es: "Base sólida en principios de ingeniería y desarrollo de software.",
    },
  },
  {
    id: "self-learning",
    title: {
      en: "Continuous self-learning",
      es: "Aprendizaje autodidacta continuo",
    },
    place: null,
    period: { en: "Ongoing", es: "En curso" },
    description: {
      en: "Backend development, REST APIs, artificial intelligence and modern frontend technologies.",
      es: "Desarrollo backend, APIs REST, inteligencia artificial y tecnologías frontend modernas.",
    },
  },
];

export const stack = [
  "Java",
  "Spring Boot",
  "React",
  "Node.js",
  "MySQL",
  "PostgreSQL",
  "JavaScript",
  "Tailwind CSS",
  "Vite",
  "Maven",
  "Git",
  "HTML",
  "CSS",
];
