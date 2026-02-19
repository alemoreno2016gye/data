import React from 'react';
import { Brain, Zap, Shield, TrendingUp } from 'lucide-react';
import { valuePropositions } from '../mock/saasData';

const iconMap = {
  Brain,
  Zap,
  Shield,
  TrendingUp
};

const ValueProposition = () => {
  return (
    <section style={{ background: '#000000', padding: '120px 0', position: 'relative' }}>
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 209, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 209, 0.5) 1px, transparent 1px)',
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
            Decisiones inteligentes, resultados medibles
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Convertimos complejidad operativa en claridad estratégica
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuePropositions.map((prop) => {
            const IconComponent = iconMap[prop.icon];
            return (
              <div
                key={prop.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '32px',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 209, 0.3)';
                  e.currentTarget.style.background = 'rgba(0, 255, 209, 0.03)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 209, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Corner accent */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60px',
                    height: '60px',
                    background: 'radial-gradient(circle at top right, rgba(0, 255, 209, 0.1) 0%, transparent 70%)'
                  }}
                />

                <div 
                  style={{
                    width: '56px',
                    height: '56px',
                    background: 'rgba(0, 255, 209, 0.08)',
                    border: '1px solid rgba(0, 255, 209, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}
                >
                  <IconComponent size={28} style={{ color: '#00FFD1' }} />
                </div>

                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  letterSpacing: '-0.5px'
                }}>
                  {prop.title}
                </h3>

                <p style={{ 
                  fontSize: '15px', 
                  fontWeight: '400', 
                  lineHeight: '1.6', 
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  {prop.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
