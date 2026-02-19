import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { pricingTiers } from '../mock/saasData';

const Pricing = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" style={{ background: '#000000', padding: '120px 0', position: 'relative' }}>
      {/* Gradient orb */}
      <div 
        className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
        style={{ 
          background: 'radial-gradient(circle, #00FFD1 0%, transparent 70%)',
          transform: 'translateX(-50%)'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-[7.6923%] relative z-10">
        <div className="text-center mb-20">
          <div 
            className="inline-block px-4 py-2 mb-6"
            style={{
              background: 'rgba(0, 255, 209, 0.05)',
              border: '1px solid rgba(0, 255, 209, 0.2)',
              borderRadius: '100px'
            }}
          >
            <span style={{ color: '#00FFD1', fontSize: '14px', fontWeight: '600' }}>PAQUETES</span>
          </div>

          <h2 style={{ 
            fontSize: '52px', 
            fontWeight: '700', 
            lineHeight: '1.2', 
            color: '#FFFFFF',
            marginBottom: '20px',
            letterSpacing: '-1.5px'
          }}>
            Soluciones escalables para cada etapa
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '750px',
            margin: '0 auto'
          }}>
            Desde startups hasta enterprise. Crece con tecnología que se adapta a tu ritmo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              style={{
                background: tier.featured ? 'rgba(0, 255, 209, 0.03)' : 'rgba(255, 255, 255, 0.02)',
                border: tier.featured ? '2px solid rgba(0, 255, 209, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '40px',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
                transform: tier.featured ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseOver={(e) => {
                if (!tier.featured) {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 209, 0.2)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 209, 0.1)';
                }
              }}
              onMouseOut={(e) => {
                if (!tier.featured) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {tier.featured && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: '#00FFD1',
                    color: '#000000',
                    fontSize: '12px',
                    fontWeight: '700',
                    padding: '6px 12px',
                    borderRadius: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Sparkles size={14} />
                  POPULAR
                </div>
              )}

              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  fontSize: '28px', 
                  fontWeight: '700', 
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  letterSpacing: '-0.5px'
                }}>
                  {tier.name}
                </h3>
                <p style={{ 
                  fontSize: '15px', 
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: '1.6'
                }}>
                  {tier.subtitle}
                </p>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                {tier.features.map((feature, index) => (
                  <li 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      marginBottom: '16px'
                    }}
                  >
                    <div 
                      style={{
                        width: '20px',
                        height: '20px',
                        background: 'rgba(0, 255, 209, 0.1)',
                        border: '1px solid rgba(0, 255, 209, 0.3)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      <Check size={12} style={{ color: '#00FFD1' }} />
                    </div>
                    <span style={{ 
                      fontSize: '15px', 
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: '1.5'
                    }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={scrollToContact}
                style={{
                  width: '100%',
                  background: tier.featured ? '#00FFD1' : 'rgba(255, 255, 255, 0.05)',
                  color: tier.featured ? '#000000' : '#FFFFFF',
                  border: tier.featured ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  if (tier.featured) {
                    e.currentTarget.style.background = '#00E6C3';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 255, 209, 0.4)';
                  } else {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 209, 0.3)';
                  }
                }}
                onMouseOut={(e) => {
                  if (tier.featured) {
                    e.currentTarget.style.background = '#00FFD1';
                    e.currentTarget.style.boxShadow = 'none';
                  } else {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <div 
          className="text-center mt-12"
          style={{
            padding: '32px',
            background: 'rgba(0, 255, 209, 0.03)',
            border: '1px solid rgba(0, 255, 209, 0.2)',
            borderRadius: '16px'
          }}
        >
          <p style={{ 
            fontSize: '16px', 
            color: 'rgba(255, 255, 255, 0.8)',
            margin: 0
          }}>
            ¿Necesitas una solución personalizada? Hablemos sobre tus requisitos específicos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
