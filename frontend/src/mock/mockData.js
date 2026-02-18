// Mock data for ALTAMA CONSULTING landing page

export const services = [
  {
    id: 1,
    title: "Desarrollo de Aplicaciones Web",
    description: "Creamos aplicaciones web robustas y escalables que transforman tu negocio digital.",
    icon: "Code"
  },
  {
    id: 2,
    title: "Desarrollo de Aplicaciones Móviles",
    description: "Apps móviles nativas y multiplataforma que conectan tu empresa con tus clientes.",
    icon: "Smartphone"
  },
  {
    id: 3,
    title: "Automatización de Procesos",
    description: "Soluciones de software personalizadas para automatizar y optimizar operaciones empresariales.",
    icon: "Settings"
  },
  {
    id: 4,
    title: "Análisis de Datos",
    description: "Análisis sofisticado de datos para diseñar propuestas de valor y tomar decisiones estratégicas.",
    icon: "BarChart3"
  },
  {
    id: 5,
    title: "Reducción de Riesgo Operativo",
    description: "Identificamos y mitigamos riesgos mediante análisis predictivo y modelado avanzado.",
    icon: "Shield"
  },
  {
    id: 6,
    title: "Estimación de Demanda",
    description: "Modelos predictivos para estimar la demanda de productos y servicios con precisión.",
    icon: "TrendingUp"
  }
];

export const portfolioProjects = [
  {
    id: 1,
    title: "Sistemas de Gestión Empresarial",
    description: "Desarrollamos plataformas integrales para gestionar operaciones, inventario, ventas y más",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50fGVufDB8fHx8MTc3MTQwODkxOXww&ixlib=rb-4.1.0&q=85",
    benefits: {
      benefit1: "Automatización",
      benefit2: "Escalable",
      benefit3: "Seguro"
    }
  },
  {
    id: 2,
    title: "Dashboards Analíticos",
    description: "Visualizaciones en tiempo real de KPIs y métricas para tomar decisiones basadas en datos",
    category: "Data Analytics",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHw0fHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50fGVufDB8fHx8MTc3MTQwODkxOXww&ixlib=rb-4.1.0&q=85",
    benefits: {
      benefit1: "Tiempo Real",
      benefit2: "Predictivo",
      benefit3: "Intuitivo"
    }
  },
  {
    id: 3,
    title: "Apps Móviles Empresariales",
    description: "Aplicaciones móviles nativas o multiplataforma para conectar con tus clientes y empleados",
    category: "Mobile Development",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50fGVufDB8fHx8MTc3MTQwODkxOXww&ixlib=rb-4.1.0&q=85",
    benefits: {
      benefit1: "Responsive",
      benefit2: "Offline-First",
      benefit3: "Cross-Platform"
    }
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Transformación Digital: El Futuro de las Empresas",
    excerpt: "Descubre cómo la automatización y el análisis de datos están revolucionando el panorama empresarial moderno.",
    date: "2024-12-15",
    author: "ALTAMA Team",
    category: "Transformación Digital",
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwyfHx0ZWNobm9sb2d5JTIwYnVzaW5lc3N8ZW58MHx8fHwxNzcxNDA4OTI0fDA&ixlib=rb-4.1.0&q=85",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Análisis Predictivo: Toma Decisiones Basadas en Datos",
    excerpt: "Aprende cómo el análisis predictivo puede ayudarte a anticipar tendencias y reducir riesgos operativos.",
    date: "2024-12-10",
    author: "ALTAMA Team",
    category: "Data Science",
    image: "https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwzfHx0ZWNobm9sb2d5JTIwYnVzaW5lc3N8ZW58MHx8fHwxNzcxNDA4OTI0fDA&ixlib=rb-4.1.0&q=85",
    readTime: "7 min"
  },
  {
    id: 3,
    title: "Automatización de Procesos: Eficiencia Empresarial",
    excerpt: "Conoce las mejores prácticas para implementar automatización en tu empresa y maximizar la productividad.",
    date: "2024-12-05",
    author: "ALTAMA Team",
    category: "Automatización",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50fGVufDB8fHx8MTc3MTQwODkxOXww&ixlib=rb-4.1.0&q=85",
    readTime: "6 min"
  }
];

// Time series data for charts
export const generateTimeSeriesData = (points = 12) => {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return months.slice(0, points).map((month, index) => ({
    month,
    value: Math.floor(Math.random() * 50) + 50 + (index * 5),
    target: Math.floor(Math.random() * 30) + 70 + (index * 3)
  }));
};

export const companyStats = [
  { label: "Tecnologías Modernas", value: "20+", icon: "CheckCircle" },
  { label: "Consulta Gratuita", value: "100%", icon: "Users" },
  { label: "Soporte Continuo", value: "24/7", icon: "Award" },
  { label: "Soluciones Personalizadas", value: "100%", icon: "TrendingUp" }
];
