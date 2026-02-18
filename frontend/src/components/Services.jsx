import React from 'react';
import { Code, Smartphone, Settings, BarChart3, Shield, TrendingUp } from 'lucide-react';
import { services } from '../mock/mockData';

const iconMap = {
  Code,
  Smartphone,
  Settings,
  BarChart3,
  Shield,
  TrendingUp
};

const Services = () => {
  return (
    <section id="servicios" style={{ background: '#000000', padding: '100px 0' }}>
      <div className="max-w-[1400px] mx-auto px-[7.6923%]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: '600', 
            lineHeight: '1.1', 
            color: '#FFFFFF',
            marginBottom: '16px'
          }}>
            Nuestros Servicios
          </h2>
          <p style={{ 
            fontSize: '20px', 
            fontWeight: '500', 
            lineHeight: '1.5', 
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Soluciones tecnológicas integrales para llevar tu empresa al siguiente nivel
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="service-card"
                style={{
                  background: '#121212',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '40px',
                  borderRadius: '0px',
                  transition: 'all 0.4s ease-in-out',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = '#00FFD1';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 255, 209, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div 
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'rgba(0, 255, 209, 0.1)',
                    border: '2px solid #00FFD1',
                    borderRadius: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                  }}
                >
                  <IconComponent size={32} style={{ color: '#00FFD1' }} />
                </div>

                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#FFFFFF',
                  marginBottom: '12px'
                }}>
                  {service.title}
                </h3>

                <p style={{ 
                  fontSize: '16px', 
                  fontWeight: '400', 
                  lineHeight: '1.5', 
                  color: 'rgba(255, 255, 255, 0.85)'
                }}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
