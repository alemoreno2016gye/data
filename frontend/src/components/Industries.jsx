import React from 'react';
import { Landmark, Truck, ShoppingCart, DollarSign, Factory, Building } from 'lucide-react';
import { industries } from '../mock/saasData';

const iconMap = {
  Landmark,
  Truck,
  ShoppingCart,
  DollarSign,
  Factory,
  Building
};

const Industries = () => {
  return (
    <section style={{ background: '#0a0a0a', padding: '120px 0' }}>
      <div className="max-w-[1400px] mx-auto px-[7.6923%]">
        <div className="text-center mb-16">
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: '700', 
            lineHeight: '1.2', 
            color: '#FFFFFF',
            marginBottom: '16px',
            letterSpacing: '-1px'
          }}>
            Industrias que transformamos
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Experiencia cross-sectorial en optimización operativa
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((industry) => {
            const IconComponent = iconMap[industry.icon];
            return (
              <div
                key={industry.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.03)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                }}
              >
                <div 
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(212, 175, 55, 0.08)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <IconComponent size={24} style={{ color: '#D4AF37' }} />
                </div>

                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#FFFFFF',
                  lineHeight: '1.4'
                }}>
                  {industry.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;
