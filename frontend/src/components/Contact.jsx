import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor ingresa un email válido');
      return;
    }

    // Mock submission
    console.log('Form submitted:', formData);
    toast.success('¡Mensaje enviado! Nos pondremos en contacto pronto.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section id="contacto" style={{ background: '#121212', padding: '100px 0' }}>
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
            Comencemos a construir tu solución
          </h2>
          <p style={{ 
            fontSize: '20px', 
            fontWeight: '500', 
            lineHeight: '1.5', 
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Agenda una consulta gratuita y cuéntanos sobre tu proyecto. Juntos encontraremos la mejor solución tecnológica para tu negocio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h3 style={{ 
              fontSize: '32px', 
              fontWeight: '600', 
              color: '#FFFFFF',
              marginBottom: '24px'
            }}>
              Información de Contacto
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(0, 255, 209, 0.1)',
                  border: '2px solid #00FFD1',
                  borderRadius: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Mail size={24} style={{ color: '#00FFD1' }} />
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', marginBottom: '4px' }}>
                    Email
                  </div>
                  <a 
                    href="mailto:alemoreno2016gye@gmail.com"
                    style={{ 
                      fontSize: '16px', 
                      color: 'rgba(255, 255, 255, 0.85)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#00FFD1'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}
                  >
                    alemoreno2016gye@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(0, 255, 209, 0.1)',
                  border: '2px solid #00FFD1',
                  borderRadius: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Phone size={24} style={{ color: '#00FFD1' }} />
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', marginBottom: '4px' }}>
                    Teléfono / WhatsApp
                  </div>
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
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(0, 255, 209, 0.1)',
                  border: '2px solid #00FFD1',
                  borderRadius: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin size={24} style={{ color: '#00FFD1' }} />
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', marginBottom: '4px' }}>
                    Ubicación
                  </div>
                  <span style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.85)' }}>
                    Guayaquil, Ecuador
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '48px' }}>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Horario de Atención
              </div>
              <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.8' }}>
                Lunes - Viernes: 9:00 AM - 6:00 PM<br />
                Sábado: 9:00 AM - 1:00 PM<br />
                Domingo: Cerrado
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '24px' }}>
                <label 
                  htmlFor="name"
                  style={{ 
                    display: 'block',
                    fontSize: '16px', 
                    fontWeight: '500', 
                    color: '#FFFFFF',
                    marginBottom: '8px'
                  }}
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: '#000000',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '0px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00FFD1';
                    e.target.style.boxShadow = '0 0 0 2px rgba(0, 255, 209, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label 
                  htmlFor="email"
                  style={{ 
                    display: 'block',
                    fontSize: '16px', 
                    fontWeight: '500', 
                    color: '#FFFFFF',
                    marginBottom: '8px'
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: '#000000',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '0px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00FFD1';
                    e.target.style.boxShadow = '0 0 0 2px rgba(0, 255, 209, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label 
                  htmlFor="message"
                  style={{ 
                    display: 'block',
                    fontSize: '16px', 
                    fontWeight: '500', 
                    color: '#FFFFFF',
                    marginBottom: '8px'
                  }}
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: '#000000',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '0px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00FFD1';
                    e.target.style.boxShadow = '0 0 0 2px rgba(0, 255, 209, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Enviar mensaje
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
