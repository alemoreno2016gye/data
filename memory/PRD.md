# ALTAMA CONSULTING - Landing Page PRD

## Información del Proyecto
**Fecha de Inicio:** Diciembre 2024
**Tipo:** Landing Page Profesional para Consultora Tecnológica

## Problema Original
Crear una landing page profesional y tecnológica para ALTAMA CONSULTING, empresa especializada en:
- Desarrollo de aplicaciones web y móviles
- Automatización de procesos empresariales
- Análisis sofisticado de datos
- Reducción de riesgo operativo
- Estimación de demanda

## Arquitectura Implementada
- **Frontend:** React con componentes modulares
- **Styling:** Tema dark con color primario #00FFD1 (cyan-green)
- **Diseño:** Bordes rectos (border-radius: 0px), tipografía Inter
- **Componentes:** Shadcn UI
- **Estado:** Mock data para demostración

## Requisitos del Usuario
1. **Secciones:** Hero + Servicios + Portafolio + Blog + Contacto
2. **Formulario:** Simple (nombre, email, mensaje)
3. **Contacto:**
   - Email: alemoreno2016gye@gmail.com
   - Teléfono: 0984601052
4. **Visualización:** Gráficos de series de tiempo con datos mock
5. **Tema:** Dark theme profesional

## Componentes Implementados (Fecha: Diciembre 2024)

### ✅ Header (Header.jsx)
- Navegación fija con logo de ALTAMA
- Menú responsive para mobile
- Smooth scroll a secciones

### ✅ Hero (Hero.jsx)
- Título impactante con color de marca
- Descripción de servicios
- Botones CTA primario y secundario
- Estadísticas (50+ proyectos, 98% satisfacción, 5+ años)
- Imagen profesional de equipo

### ✅ Servicios (Services.jsx)
- 6 servicios principales con iconos de Lucide React:
  - Desarrollo de Aplicaciones Web
  - Desarrollo de Aplicaciones Móviles
  - Automatización de Procesos
  - Análisis de Datos
  - Reducción de Riesgo Operativo
  - Estimación de Demanda
- Cards con hover effects

### ✅ Portafolio (Portfolio.jsx)
- Gráfico de series de tiempo interactivo (TimeSeriesChart.jsx)
- 3 proyectos destacados con métricas (eficiencia, tiempo, ROI)
- Sistema de categorías

### ✅ Blog (Blog.jsx)
- 3 artículos con imágenes profesionales
- Categorías: Transformación Digital, Data Science, Automatización
- Metadata (fecha, autor, tiempo de lectura)

### ✅ Contacto (Contact.jsx)
- Formulario simple con validación
- Información de contacto con iconos
- Horario de atención
- Toast notifications con Sonner

### ✅ Footer (Footer.jsx)
- Enlaces rápidos
- Información de contacto
- Redes sociales
- Copyright

### ✅ Mock Data (mockData.js)
- Servicios
- Proyectos de portafolio
- Posts de blog
- Función para generar datos de series de tiempo

## Sistema de Diseño
**Colores:**
- Fondo principal: #000000
- Fondo secundario: #121212
- Color de marca: #00FFD1
- Texto principal: #FFFFFF
- Texto muted: #4D4D4D

**Tipografía:**
- Fuente: Inter
- Display: 66px (Hero), 48px (Secciones)
- Body: 16-20px

**Espaciado:**
- Secciones: 100px padding vertical
- Grid gaps: 8px (tarjetas)

## Backlog Priorizado

### P0 - Crítico (Completado)
- [x] Estructura de navegación
- [x] Sección Hero
- [x] Sección Servicios
- [x] Sección Portafolio con gráficos
- [x] Sección Blog
- [x] Sección Contacto con formulario
- [x] Footer

### P1 - Alta Prioridad (Siguiente fase)
- [ ] Backend para formulario de contacto
- [ ] Integración de email (envío de mensajes)
- [ ] Sistema de gestión de blog (CMS)
- [ ] Animaciones y transiciones mejoradas
- [ ] SEO optimization
- [ ] Analytics tracking

### P2 - Media Prioridad
- [ ] Blog dinámico con backend
- [ ] Portafolio con más proyectos
- [ ] Testimonios de clientes
- [ ] Chat widget
- [ ] Newsletter subscription
- [ ] Multi-idioma (EN/ES)

## Próximos Pasos
1. ✅ Crear frontend con mock data
2. ⏭️ Desarrollar backend para formulario de contacto
3. ⏭️ Implementar sistema de envío de emails
4. ⏭️ Testing completo de funcionalidades
5. ⏭️ Optimización de rendimiento
6. ⏭️ Deployment en producción

## Notas Técnicas
- Logo URL: https://customer-assets.emergentagent.com/job_f48e3a24-1531-44b1-ab33-e0efd1b3fda9/artifacts/y7u8wioc_altama.png
- Imágenes: Unsplash (profesionales de tecnología y negocios)
- Restricción 90/10: Solo fondos negros, color cyan-green solo para acentos
- No emojis, usar Lucide React icons
