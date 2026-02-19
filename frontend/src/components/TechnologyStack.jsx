import React from 'react';
import { Code2, Database, TrendingUp, Map, Workflow, Boxes } from 'lucide-react';
import { techStack } from '../mock/saasData';

const iconMap = {
  Code2,
  Database,
  TrendingUp,
  Map,
  Workflow,
  Boxes
};

const TechnologyStack = () => {
  const categoryIcons = [
    'TrendingUp', // Modelos de IA
    'Code2', // Análisis & Visualización
    'Boxes', // Arquitectura Cloud
    'Map', // Geoespacial
    'Database', // Data Pipelines
    'Workflow' // Automatización
  ];

  return (
    <section style={{ background: '#000000', padding: '120px 0', position: 'relative' }}>
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-[7.6923%] relative z-10">
        <div className="text-center mb-20">
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: '700', 
            lineHeight: '1.2', 
            color: '#FFFFFF',
            marginBottom: '16px',
            letterSpacing: '-1px'
          }}>
            Tecnología de vanguardia
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Stack tecnológico moderno que impulsa decisiones inteligentes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((tech, index) => {
            const IconComponent = iconMap[categoryIcons[index]];
            return (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  padding: '32px',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.02)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                }}
              >
                {/* Corner accent */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.06) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }}
                />

                <div className="relative z-10">
                  <div 
                    style={{
                      width: '56px',
                      height: '56px',
                      background: 'rgba(212, 175, 55, 0.08)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px'
                    }}
                  >
                    <IconComponent size={28} style={{ color: '#D4AF37' }} />
                  </div>

                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    color: '#FFFFFF',
                    marginBottom: '12px',
                    letterSpacing: '-0.5px'
                  }}>
                    {tech.category}
                  </h3>

                  <p style={{ 
                    fontSize: '14px', 
                    fontWeight: '400', 
                    lineHeight: '1.7', 
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: '20px'
                  }}>
                    {tech.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {tech.technologies.map((t, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '6px 12px',
                          background: 'rgba(212, 175, 55, 0.05)',
                          border: '1px solid rgba(212, 175, 55, 0.15)',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          color: 'rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
