import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: '#000000', paddingTop: '80px' }}>
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, transparent 1px, transparent 7.6923%), repeating-linear-gradient(-90deg, #fff, #fff 1px, transparent 1px, transparent 7.6923%)',
          backgroundSize: '100% 100%'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-[7.6923%] py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm" style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <Sparkles size={18} style={{ color: '#D4AF37' }} />
              <span style={{ color: '#D4AF37', fontSize: '16px', fontWeight: '500' }}>Innovación + Tecnología</span>
            </div>

            <h1 style={{ 
              fontSize: '66px', 
              fontWeight: '600', 
              lineHeight: '1.1', 
              letterSpacing: '-0.62px', 
              color: '#FFFFFF',
              marginBottom: '24px'
            }}>
              Transformamos tu negocio con{' '}
              <span style={{ color: '#D4AF37' }}>tecnología de vanguardia</span>
            </h1>

            <p style={{ 
              fontSize: '20px', 
              fontWeight: '500', 
              lineHeight: '1.5', 
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '600px'
            }}>
              Somos tu aliado tecnológico para desarrollar soluciones personalizadas que automatizan procesos, optimizan operaciones y convierten datos en decisiones estratégicas.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={scrollToContact}
                className="btn-primary"
              >
                Solicita una consulta gratuita
                <ArrowRight size={20} />
              </button>

              <button 
                onClick={() => document.querySelector('#servicios').scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Conoce nuestras soluciones
              </button>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}>
              <div>
                <div style={{ fontSize: '32px', fontWeight: '600', color: '#D4AF37' }}>100%</div>
                <div style={{ fontSize: '16px', color: '#4D4D4D', marginTop: '4px' }}>Personalizado</div>
              </div>
              <div>
                <div style={{ fontSize: '32px', fontWeight: '600', color: '#D4AF37' }}>24/7</div>
                <div style={{ fontSize: '16px', color: '#4D4D4D', marginTop: '4px' }}>Soporte</div>
              </div>
              <div>
                <div style={{ fontSize: '32px', fontWeight: '600', color: '#D4AF37' }}>∞</div>
                <div style={{ fontSize: '16px', color: '#4D4D4D', marginTop: '4px' }}>Posibilidades</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden" style={{ borderRadius: '0px' }}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50fGVufDB8fHx8MTc3MTQwODkxOXww&ixlib=rb-4.1.0&q=85"
                alt="Equipo de desarrollo"
                className="w-full h-[600px] object-cover"
                style={{ transition: 'transform 0.4s ease-in-out' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
