import React from 'react';
import { ArrowRight, Target } from 'lucide-react';
import { COLORS } from '../constants/colors';

const SaasHero = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden" 
      style={{ background: COLORS.black, paddingTop: '76px' }}
    >
      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(${COLORS.goldBorder} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.goldBorder} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          animation: 'gridMove 20s linear infinite'
        }}
      />

      {/* Gradient Orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
        style={{ background: `radial-gradient(circle, ${COLORS.gold} 0%, transparent 70%)` }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-12 blur-[100px]"
        style={{ background: `radial-gradient(circle, ${COLORS.silver} 0%, transparent 70%)` }}
      />

      <div className="max-w-[1400px] mx-auto px-[7.6923%] py-20 relative z-10">
        <div className="text-center max-w-[900px] mx-auto">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 backdrop-blur-md"
            style={{ 
              background: COLORS.goldBg,
              border: `1px solid ${COLORS.goldBorder}`,
              borderRadius: '100px'
            }}
          >
            <Target size={16} style={{ color: COLORS.gold }} />
            <span style={{ color: COLORS.gold, fontSize: '14px', fontWeight: '500' }}>
              Inteligencia Operativa para Latinoamérica
            </span>
          </div>

          {/* Main Headline - Based on Mission */}
          <h1 style={{ 
            fontSize: '72px', 
            fontWeight: '700', 
            lineHeight: '1.1', 
            letterSpacing: '-2px', 
            color: COLORS.white,
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            Optimiza procesos, reduce riesgos,{' '}
            <span 
              style={{ 
                background: COLORS.goldGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              maximiza rentabilidad
            </span>
          </h1>

          {/* Subheadline - Based on Mission */}
          <p style={{ 
            fontSize: '22px', 
            fontWeight: '400', 
            lineHeight: '1.6', 
            color: COLORS.whiteFaded,
            maxWidth: '750px',
            margin: '0 auto 48px'
          }}>
            Soluciones tecnológicas basadas en inteligencia artificial, análisis de datos y automatización para transformar decisiones en resultados medibles
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <button 
              onClick={scrollToContact}
              style={{
                background: COLORS.goldGradient,
                color: COLORS.black,
                border: 'none',
                borderRadius: '8px',
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 24px rgba(212, 175, 55, 0.4)`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Comienza ahora
              <ArrowRight size={18} />
            </button>

            <button 
              onClick={() => document.querySelector('#soluciones').scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: COLORS.white,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = COLORS.goldBorder;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Ver soluciones
            </button>
          </div>

          {/* Dashboard Preview Placeholder */}
          <div 
            className="relative mx-auto"
            style={{
              maxWidth: '1000px',
              height: '500px',
              background: COLORS.goldBg,
              border: `1px solid ${COLORS.goldBorder}`,
              borderRadius: '12px',
              backdropFilter: 'blur(20px)',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Inner grid */}
            <div 
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage: `linear-gradient(${COLORS.goldBorder} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.goldBorder} 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />

            {/* Mockup content */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center">
                <div 
                  style={{
                    width: '80px',
                    height: '80px',
                    background: COLORS.goldBg,
                    border: `2px solid ${COLORS.goldBorder}`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <Target size={32} style={{ color: COLORS.gold }} />
                </div>
                <p style={{ color: COLORS.whiteFaded, fontSize: '14px' }}>
                  Decisiones basadas en datos
                </p>
              </div>
            </div>

            {/* Floating elements */}
            <div 
              className="absolute top-8 left-8 px-4 py-2"
              style={{
                background: COLORS.goldBg,
                border: `1px solid ${COLORS.goldBorder}`,
                borderRadius: '6px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ fontSize: '12px', color: COLORS.whiteSubtle }}>Eficiencia</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: COLORS.gold }}>+42%</div>
            </div>

            <div 
              className="absolute top-8 right-8 px-4 py-2"
              style={{
                background: COLORS.silverBg,
                border: `1px solid ${COLORS.silverBorder}`,
                borderRadius: '6px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ fontSize: '12px', color: COLORS.whiteSubtle }}>Riesgo</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: COLORS.silver }}>-35%</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 80px); }
        }
      `}</style>
    </section>
  );
};

export default SaasHero;
