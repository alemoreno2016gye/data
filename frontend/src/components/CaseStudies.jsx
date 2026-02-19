import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies } from '../mock/saasData';

const CaseStudies = () => {
  return (
    <section style={{ background: '#0a0a0a', padding: '120px 0' }}>
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
            <span style={{ color: '#00FFD1', fontSize: '14px', fontWeight: '600' }}>CASOS DE USO</span>
          </div>

          <h2 style={{ 
            fontSize: '52px', 
            fontWeight: '700', 
            lineHeight: '1.2', 
            color: '#FFFFFF',
            marginBottom: '20px',
            letterSpacing: '-1.5px'
          }}>
            Resultados que transforman organizaciones
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '750px',
            margin: '0 auto'
          }}>
            Ejemplos de cómo nuestra plataforma optimiza operaciones complejas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '40px',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 209, 0.3)';
                e.currentTarget.style.boxShadow = '0 24px 48px rgba(0, 255, 209, 0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Gradient overlay */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle at top right, rgba(0, 255, 209, 0.08) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}
              />

              <div className="relative z-10">
                {/* Industry badge */}
                <div 
                  className="inline-block px-3 py-1 mb-4"
                  style={{
                    background: 'rgba(0, 255, 209, 0.1)',
                    border: '1px solid rgba(0, 255, 209, 0.3)',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#00FFD1'
                  }}
                >
                  {study.industry}
                </div>

                <h3 style={{ 
                  fontSize: '26px', 
                  fontWeight: '700', 
                  color: '#FFFFFF',
                  marginBottom: '20px',
                  letterSpacing: '-0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  {study.title}
                  <ArrowUpRight size={24} style={{ color: '#00FFD1', opacity: 0.6 }} />
                </h3>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px' }}>
                    Desafío
                  </div>
                  <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    {study.challenge}
                  </p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px' }}>
                    Solución
                  </div>
                  <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    {study.solution}
                  </p>
                </div>

                {/* Key metric */}
                <div 
                  style={{
                    background: 'rgba(0, 255, 209, 0.05)',
                    border: '1px solid rgba(0, 255, 209, 0.2)',
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: '20px'
                  }}
                >
                  <div style={{ fontSize: '48px', fontWeight: '700', color: '#00FFD1', marginBottom: '4px' }}>
                    {study.metric}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)' }}>
                    {study.metricLabel}
                  </div>
                </div>

                {/* Results list */}
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '12px' }}>
                    Resultados clave
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {study.results.map((result, index) => (
                      <li 
                        key={index}
                        style={{
                          fontSize: '14px',
                          color: 'rgba(255, 255, 255, 0.8)',
                          marginBottom: '8px',
                          paddingLeft: '20px',
                          position: 'relative'
                        }}
                      >
                        <span 
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: '7px',
                            width: '6px',
                            height: '6px',
                            background: '#00FFD1',
                            borderRadius: '50%'
                          }}
                        />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
