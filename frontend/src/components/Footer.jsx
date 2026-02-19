import React from 'react';
import { Mail, Phone, Linkedin, Twitter, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#000000', borderTop: '1px solid rgba(255, 255, 255, 0.25)', padding: '60px 0 32px' }}>
      <div className="max-w-[1400px] mx-auto px-[7.6923%]">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <img 
              src="https://customer-assets.emergentagent.com/job_data-wizards-3/artifacts/kwz4zwcj_ChatGPT%20Image%2018%20feb%202026%2C%2017_26_31.png" 
              alt="ALTAMA" 
              style={{ height: '40px', marginBottom: '16px' }}
            />
            <p style={{ 
              fontSize: '16px', 
              color: 'rgba(255, 255, 255, 0.85)', 
              lineHeight: '1.6',
              maxWidth: '400px',
              marginTop: '16px'
            }}>
              Plataforma de inteligencia operativa impulsada por IA. Transformamos datos en decisiones estratégicas mediante automatización y análisis avanzado.
            </p>

            <div className="flex gap-4 mt-6">
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(0, 255, 209, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#00FFD1';
                  e.currentTarget.style.background = 'rgba(0, 255, 209, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.background = 'rgba(0, 255, 209, 0.1)';
                }}
              >
                <Linkedin size={20} style={{ color: '#00FFD1' }} />
              </a>

              <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(0, 255, 209, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#00FFD1';
                  e.currentTarget.style.background = 'rgba(0, 255, 209, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.background = 'rgba(0, 255, 209, 0.1)';
                }}
              >
                <Twitter size={20} style={{ color: '#00FFD1' }} />
              </a>

              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(0, 255, 209, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#00FFD1';
                  e.currentTarget.style.background = 'rgba(0, 255, 209, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.background = 'rgba(0, 255, 209, 0.1)';
                }}
              >
                <Github size={20} style={{ color: '#00FFD1' }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#FFFFFF',
              marginBottom: '16px'
            }}>
              Enlaces Rápidos
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Inicio', 'Soluciones', 'Casos de Uso', 'Precios', 'Contacto'].map((item) => (
                <li key={item} style={{ marginBottom: '12px' }}>
                  <a
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    style={{
                      fontSize: '16px',
                      color: 'rgba(255, 255, 255, 0.85)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#00FFD1'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#FFFFFF',
              marginBottom: '16px'
            }}>
              Contacto
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'start', gap: '8px' }}>
                <Mail size={18} style={{ color: '#00FFD1', marginTop: '2px', flexShrink: 0 }} />
                <a
                  href="mailto:alemoreno2016gye@gmail.com"
                  style={{
                    fontSize: '16px',
                    color: 'rgba(255, 255, 255, 0.85)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    wordBreak: 'break-all'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#00FFD1'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}
                >
                  alemoreno2016gye@gmail.com
                </a>
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={18} style={{ color: '#00FFD1', flexShrink: 0 }} />
                <a
                  href="tel:+593984601052"
                  style={{
                    fontSize: '16px',
                    color: 'rgba(255, 255, 255, 0.85)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#00FFD1'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}
                >
                  +593 98 460 1052
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.25)', 
            paddingTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
          className="md:flex-row md:justify-between"
        >
          <p style={{ 
            fontSize: '14px', 
            color: '#4D4D4D',
            margin: 0
          }}>
            © {currentYear} ALTAMA. Todos los derechos reservados.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              style={{
                fontSize: '14px',
                color: '#4D4D4D',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#00FFD1'}
              onMouseOut={(e) => e.currentTarget.style.color = '#4D4D4D'}
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              style={{
                fontSize: '14px',
                color: '#4D4D4D',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#00FFD1'}
              onMouseOut={(e) => e.currentTarget.style.color = '#4D4D4D'}
            >
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
