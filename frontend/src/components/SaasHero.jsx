import React from 'react';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

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
      style={{ background: '#000000', paddingTop: '80px' }}
    >
      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 209, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 209, 0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          animation: 'gridMove 20s linear infinite'
        }}
      />

      {/* Gradient Orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #00FFD1 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #00FFD1 0%, transparent 70%)' }}
      />

      <div className="max-w-[1400px] mx-auto px-[7.6923%] py-20 relative z-10">
        <div className="text-center max-w-[900px] mx-auto">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 backdrop-blur-md"
            style={{ 
              background: 'rgba(0, 255, 209, 0.05)',
              border: '1px solid rgba(0, 255, 209, 0.2)',
              borderRadius: '100px'
            }}
          >
            <Sparkles size={16} style={{ color: '#00FFD1' }} />
            <span style={{ color: '#00FFD1', fontSize: '14px', fontWeight: '500' }}>
              Inteligencia Operativa Impulsada por IA
            </span>
          </div>

          {/* Main Headline */}
          <h1 style={{ 
            fontSize: '72px', 
            fontWeight: '700', 
            lineHeight: '1.1', 
            letterSpacing: '-2px', 
            color: '#FFFFFF',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            Transformamos decisiones en{' '}
            <span 
              style={{ 
                background: 'linear-gradient(135deg, #00FFD1 0%, #00A896 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              inteligencia operativa
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{ 
            fontSize: '22px', 
            fontWeight: '400', 
            lineHeight: '1.6', 
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '750px',
            margin: '0 auto 48px'
          }}>
            Plataforma de IA que automatiza procesos, optimiza operaciones y reduce riesgos mediante análisis econométrico avanzado y machine learning
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <button 
              onClick={scrollToContact}
              style={{
                background: '#00FFD1',
                color: '#000000',
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
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 255, 209, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Solicitar demo
              <ArrowRight size={18} />
            </button>

            <button 
              onClick={() => document.querySelector('#soluciones').scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#FFFFFF',
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
                e.currentTarget.style.borderColor = 'rgba(0, 255, 209, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Explorar soluciones
            </button>
          </div>

          {/* Dashboard Preview Placeholder */}
          <div 
            className="relative mx-auto"
            style={{
              maxWidth: '1000px',
              height: '500px',
              background: 'rgba(0, 255, 209, 0.03)',
              border: '1px solid rgba(0, 255, 209, 0.2)',
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
                backgroundImage: 'linear-gradient(rgba(0, 255, 209, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 209, 0.4) 1px, transparent 1px)',
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
                    background: 'rgba(0, 255, 209, 0.1)',
                    border: '2px solid rgba(0, 255, 209, 0.3)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <Play size={32} style={{ color: '#00FFD1' }} />
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                  Dashboard en tiempo real
                </p>
              </div>
            </div>

            {/* Floating elements */}
            <div 
              className="absolute top-8 left-8 px-4 py-2"
              style={{
                background: 'rgba(0, 255, 209, 0.1)',
                border: '1px solid rgba(0, 255, 209, 0.3)',
                borderRadius: '6px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>Eficiencia</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#00FFD1' }}>94.2%</div>
            </div>

            <div 
              className="absolute top-8 right-8 px-4 py-2"
              style={{
                background: 'rgba(0, 255, 209, 0.1)',
                border: '1px solid rgba(0, 255, 209, 0.3)',
                borderRadius: '6px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>Risk Score</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#00FFD1' }}>23</div>
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
