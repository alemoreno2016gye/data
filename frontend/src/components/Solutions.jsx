import React from 'react';
import { BarChart3, Workflow, AlertTriangle, Package, MapPin, Building2, ArrowRight } from 'lucide-react';
import { solutions } from '../mock/saasData';

const iconMap = {
  BarChart3,
  Workflow,
  AlertTriangle,
  Package,
  MapPin,
  Building2
};

const Solutions = () => {
  return (
    <section id="soluciones" style={{ background: '#0a0a0a', padding: '120px 0', position: 'relative' }}>
      <div className="max-w-[1400px] mx-auto px-[7.6923%]">
        <div className="text-center mb-20">
          <div 
            className="inline-block px-4 py-2 mb-6"
            style={{
              background: 'rgba(0, 255, 209, 0.05)',
              border: '1px solid rgba(0, 255, 209, 0.2)',
              borderRadius: '100px'
            }}
          >
            <span style={{ color: '#00FFD1', fontSize: '14px', fontWeight: '600' }}>SOLUCIONES</span>
          </div>

          <h2 style={{ 
            fontSize: '52px', 
            fontWeight: '700', 
            lineHeight: '1.2', 
            color: '#FFFFFF',
            marginBottom: '20px',
            letterSpacing: '-1.5px'
          }}>
            Plataforma modular adaptada a tu operación
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '750px',
            margin: '0 auto'
          }}>
            Tecnología empresarial de última generación para cada etapa de tu transformación digital
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution) => {
            const IconComponent = iconMap[solution.icon];
            return (
              <div
                key={solution.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  padding: '40px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 209, 0.4)';
                  e.currentTarget.style.background = 'rgba(0, 255, 209, 0.02)';
                  e.currentTarget.style.boxShadow = '0 24px 48px rgba(0, 255, 209, 0.12)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Gradient overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '120px',
                    background: 'radial-gradient(ellipse at top, rgba(0, 255, 209, 0.08) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }}
                />

                <div className="relative z-10">
                  <div 
                    style={{
                      width: '64px',
                      height: '64px',
                      background: 'rgba(0, 255, 209, 0.1)',
                      border: '1px solid rgba(0, 255, 209, 0.3)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '24px'
                    }}
                  >
                    <IconComponent size={32} style={{ color: '#00FFD1' }} />
                  </div>

                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: '600', 
                    color: '#FFFFFF',
                    marginBottom: '12px',
                    letterSpacing: '-0.5px'
                  }}>
                    {solution.title}
                  </h3>

                  <p style={{ 
                    fontSize: '15px', 
                    fontWeight: '400', 
                    lineHeight: '1.7', 
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: '24px'
                  }}>
                    {solution.description}
                  </p>

                  <button 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#00FFD1',
                      fontSize: '14px',
                      fontWeight: '600',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0',
                      transition: 'gap 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.gap = '12px'}
                    onMouseOut={(e) => e.currentTarget.style.gap = '8px'}
                  >
                    Conocer más
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
