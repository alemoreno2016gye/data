// Mock data for ALTAMA SaaS Platform

export const valuePropositions = [
  {
    id: 1,
    title: "Inteligencia Operativa",
    description: "Transformamos datos complejos en insights accionables que optimizan tu operación en tiempo real",
    icon: "Brain"
  },
  {
    id: 2,
    title: "Automatización IA",
    description: "Automatización inteligente de procesos que aprende y mejora continuamente",
    icon: "Zap"
  },
  {
    id: 3,
    title: "Reducción de Riesgo",
    description: "Modelos predictivos que identifican y mitigan riesgos antes de que ocurran",
    icon: "Shield"
  },
  {
    id: 4,
    title: "Optimización de Rentabilidad",
    description: "Maximiza la eficiencia operativa y reduce costos mediante análisis econométrico avanzado",
    icon: "TrendingUp"
  }
];

export const solutions = [
  {
    id: 1,
    title: "Data Analytics & Dashboards",
    description: "Visualización en tiempo real de KPIs operativos con análisis predictivo integrado",
    icon: "BarChart3",
    features: ["Real-time monitoring", "Custom KPIs", "Predictive alerts"]
  },
  {
    id: 2,
    title: "Plataformas de Automatización",
    description: "Automatización de procesos end-to-end con IA y machine learning",
    icon: "Workflow"
  },
  {
    id: 3,
    title: "Modelos de Riesgo Predictivo",
    description: "Análisis econométrico y scoring de riesgo operativo, financiero y de mercado",
    icon: "AlertTriangle"
  },
  {
    id: 4,
    title: "Optimización Supply Chain",
    description: "Gestión inteligente de inventarios, demanda y logística con ML",
    icon: "Package"
  },
  {
    id: 5,
    title: "Gestión de Activos & Logística",
    description: "Tracking, mantenimiento predictivo y optimización de rutas",
    icon: "MapPin"
  },
  {
    id: 6,
    title: "Soluciones Gubernamentales",
    description: "Plataformas para sector público: gestión de proyectos, presupuesto y transparencia",
    icon: "Building2"
  }
];

export const industries = [
  { id: 1, name: "Sector Público", icon: "Landmark" },
  { id: 2, name: "Logística & Transporte", icon: "Truck" },
  { id: 3, name: "Retail & Supply Chain", icon: "ShoppingCart" },
  { id: 4, name: "Finanzas", icon: "DollarSign" },
  { id: 5, name: "Manufactura", icon: "Factory" },
  { id: 6, name: "Operaciones Institucionales", icon: "Building" }
];

export const pricingTiers = [
  {
    id: 1,
    name: "Starter Intelligence",
    subtitle: "Para equipos que inician su transformación digital",
    features: [
      "Dashboard básico con KPIs",
      "Análisis de datos históricos",
      "Reportes automatizados",
      "Hasta 5 usuarios",
      "Soporte por email"
    ],
    cta: "Contactar"
  },
  {
    id: 2,
    name: "Operational Pro",
    subtitle: "Para operaciones que requieren inteligencia avanzada",
    features: [
      "Todo en Starter +",
      "Modelos predictivos personalizados",
      "Automatización de procesos",
      "Análisis en tiempo real",
      "Hasta 20 usuarios",
      "Soporte prioritario 24/7",
      "Integración con sistemas existentes"
    ],
    cta: "Contactar",
    featured: true
  },
  {
    id: 3,
    name: "Enterprise Intelligence",
    subtitle: "Plataforma completa para organizaciones complejas",
    features: [
      "Todo en Operational Pro +",
      "IA personalizada a medida",
      "Arquitectura multi-tenant",
      "Usuarios ilimitados",
      "SLA garantizado 99.9%",
      "Equipo dedicado",
      "Infraestructura on-premise disponible",
      "Cumplimiento normativo completo"
    ],
    cta: "Contactar"
  }
];

export const caseStudies = [
  {
    id: 1,
    title: "Optimización de Flota Logística",
    industry: "Logística",
    challenge: "Costos elevados de combustible y tiempos de entrega inconsistentes",
    solution: "Implementación de sistema de ruteo inteligente con ML y análisis predictivo de mantenimiento",
    results: [
      "35% reducción en costos operativos",
      "28% mejora en tiempos de entrega",
      "40% menos mantenimientos no planificados"
    ],
    metric: "35%",
    metricLabel: "Reducción de costos"
  },
  {
    id: 2,
    title: "Predicción de Demanda Retail",
    industry: "Retail",
    challenge: "Exceso de inventario en algunas categorías y quiebres de stock en otras",
    solution: "Modelo econométrico de forecasting con variables externas y estacionalidad",
    results: [
      "45% reducción en exceso de inventario",
      "60% menos quiebres de stock",
      "22% mejora en rotación"
    ],
    metric: "60%",
    metricLabel: "Menos quiebres"
  },
  {
    id: 3,
    title: "Control de Activos Gubernamentales",
    industry: "Sector Público",
    challenge: "Falta de trazabilidad y control sobre activos y proyectos en ejecución",
    solution: "Plataforma centralizada con GIS, tracking en tiempo real y dashboards de transparencia",
    results: [
      "100% trazabilidad de activos",
      "50% reducción en tiempos de auditoría",
      "Transparencia pública automatizada"
    ],
    metric: "100%",
    metricLabel: "Trazabilidad"
  },
  {
    id: 4,
    title: "Mantenimiento Predictivo Industrial",
    industry: "Manufactura",
    challenge: "Paros no planificados causando pérdidas millonarias",
    solution: "IA para predecir fallas de maquinaria basado en sensores IoT y patrones históricos",
    results: [
      "70% reducción en paros no planificados",
      "30% extensión vida útil de equipos",
      "ROI en 8 meses"
    ],
    metric: "70%",
    metricLabel: "Menos paros"
  }
];

export const techStack = [
  {
    category: "Modelos de IA",
    description: "Machine Learning, Deep Learning, y algoritmos econométricos avanzados para predicción y optimización",
    technologies: ["Python", "Scikit-learn", "TensorFlow", "PyTorch"]
  },
  {
    category: "Análisis & Visualización",
    description: "Herramientas de análisis estadístico y visualización interactiva de datos",
    technologies: ["Stata", "React", "Streamlit", "D3.js"]
  },
  {
    category: "Arquitectura Cloud",
    description: "Infraestructura escalable y segura con alta disponibilidad",
    technologies: ["Microservicios", "Containers", "CI/CD", "Load Balancing"]
  },
  {
    category: "Geoespacial",
    description: "Análisis y visualización de datos geográficos para logística y operaciones",
    technologies: ["GIS", "Mapbox", "Spatial Analytics", "Route Optimization"]
  },
  {
    category: "Data Pipelines",
    description: "Procesamiento ETL y flujos de datos en tiempo real",
    technologies: ["Event Streaming", "Data Lakes", "Real-time Processing", "Data Warehousing"]
  },
  {
    category: "Automatización",
    description: "Orquestación de procesos y workflows inteligentes",
    technologies: ["JavaScript", "Workflow Engines", "RPA", "API Integrations"]
  }
];

// Time series data for dashboard visualization
export const generateOperationalData = () => {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return months.map((month, index) => ({
    month,
    efficiency: 65 + index * 2.5 + Math.random() * 5,
    cost: 100 - index * 1.8 - Math.random() * 3,
    risk: 45 - index * 2 + Math.random() * 4
  }));
};

export const kpiMetrics = [
  { label: "Eficiencia Operativa", value: "94%", trend: "+12%", positive: true },
  { label: "Reducción de Costos", value: "$2.4M", trend: "-18%", positive: true },
  { label: "Score de Riesgo", value: "23", trend: "-34%", positive: true },
  { label: "Uptime Sistema", value: "99.97%", trend: "+0.02%", positive: true }
];
