import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const FinalCTA = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{ background: '#0a0a0a', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Large gradient orbs */}
      <div 
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full opacity-15 blur-[150px]"
        style={{ 
          background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      <div className="max-w-[1200px] mx-auto px-[7.6923%] relative z-10">
        <div 
          className="text-center"
          style={{
            background: 'rgba(212, 175, 55, 0.03)',
            border: '2px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '32px',
            padding: '80px 60px',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Inner glow */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none'
            }}
          />

          <div className="relative z-10">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 mb-6"
              style={{
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '100px'
              }}
            >
              <Sparkles size={16} style={{ color: '#D4AF37' }} />
              <span style={{ color: '#D4AF37', fontSize: '14px', fontWeight: '600' }}>
                COMIENZA HOY
              </span>
            </div>

            <h2 style={{ 
              fontSize: '56px', 
              fontWeight: '700', 
              lineHeight: '1.2', 
              color: '#FFFFFF',
              marginBottom: '24px',
              letterSpacing: '-1.5px',
              maxWidth: '900px',
              margin: '0 auto 24px'
            }}>
              Convierte datos en{' '}
              <span 
                style={{ 
                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                decisiones estratégicas
              </span>
            </h2>

            <p style={{ 
              fontSize: '20px', 
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '700px',
              margin: '0 auto 40px',
              lineHeight: '1.6'
            }}>
              Únete a organizaciones que ya transformaron su operación con inteligencia artificial y análisis avanzado
            </p>

            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={scrollToContact}
                style={{
                  background: '#D4AF37',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '18px 36px',
                  fontSize: '17px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(212, 175, 55, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Solicitar demo ahora
                <ArrowRight size={20} />
              </button>

              <button 
                onClick={() => document.querySelector('#soluciones').scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '18px 36px',
                  fontSize: '17px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                Ver soluciones
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
