import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { portfolioProjects, generateTimeSeriesData } from '../mock/mockData';
import TimeSeriesChart from './TimeSeriesChart';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const timeSeriesData = generateTimeSeriesData();

  return (
    <section id="portafolio" style={{ background: '#121212', padding: '100px 0' }}>
      <div className="max-w-[1400px] mx-auto px-[7.6923%]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: '600', 
            lineHeight: '1.1', 
            color: '#FFFFFF',
            marginBottom: '16px'
          }}>
            Soluciones Tecnológicas
          </h2>
          <p style={{ 
            fontSize: '20px', 
            fontWeight: '500', 
            lineHeight: '1.5', 
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Ejemplos de cómo nuestras soluciones pueden transformar tu negocio
          </p>
        </div>

        {/* Data Visualization */}
        <div className="mb-16">
          <div style={{
            background: '#000000',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '40px',
            borderRadius: '0px'
          }}>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              color: '#FFFFFF',
              marginBottom: '12px'
            }}>
              Ejemplo: Visualización de Datos en Tiempo Real
            </h3>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: '24px'
            }}>
              Así se vería un dashboard de análisis de rendimiento con métricas reales vs objetivos
            </p>
            <TimeSeriesChart data={timeSeriesData} />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project) => (
            <div
              key={project.id}
              className="portfolio-card"
              style={{
                background: '#000000',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '0px',
                overflow: 'hidden',
                transition: 'all 0.4s ease-in-out',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = '#D4AF37';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(212, 175, 55, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden" style={{ height: '240px' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 0.4s ease-in-out' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div 
                  className="absolute top-4 right-4 px-3 py-1"
                  style={{ 
                    background: 'rgba(212, 175, 55, 0.9)',
                    borderRadius: '0px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#000000'
                  }}
                >
                  {project.category}
                </div>
              </div>

              <div style={{ padding: '32px' }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  {project.title}
                  <ArrowUpRight size={20} style={{ color: '#D4AF37' }} />
                </h3>

                <p style={{ 
                  fontSize: '16px', 
                  fontWeight: '400', 
                  lineHeight: '1.5', 
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginBottom: '24px'
                }}>
                  {project.description}
                </p>

                {/* Benefits */}
                <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}>
                  <span style={{
                    padding: '6px 12px',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    fontSize: '14px',
                    color: '#D4AF37',
                    fontWeight: '500'
                  }}>
                    {project.benefits.benefit1}
                  </span>
                  <span style={{
                    padding: '6px 12px',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    fontSize: '14px',
                    color: '#D4AF37',
                    fontWeight: '500'
                  }}>
                    {project.benefits.benefit2}
                  </span>
                  <span style={{
                    padding: '6px 12px',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    fontSize: '14px',
                    color: '#D4AF37',
                    fontWeight: '500'
                  }}>
                    {project.benefits.benefit3}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
