import React from 'react';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { blogPosts } from '../mock/mockData';

const Blog = () => {
  return (
    <section id="blog" style={{ background: '#000000', padding: '100px 0' }}>
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
            Blog & Recursos
          </h2>
          <p style={{ 
            fontSize: '20px', 
            fontWeight: '500', 
            lineHeight: '1.5', 
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Mantente actualizado con las últimas tendencias en tecnología y transformación digital
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="blog-card"
              style={{
                background: '#121212',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '0px',
                overflow: 'hidden',
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
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '240px' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 0.4s ease-in-out' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div 
                  className="absolute top-4 left-4 px-3 py-1"
                  style={{ 
                    background: 'rgba(0, 255, 209, 0.9)',
                    borderRadius: '0px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#000000'
                  }}
                >
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '32px' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} style={{ color: '#4D4D4D' }} />
                    <span style={{ fontSize: '14px', color: '#4D4D4D' }}>
                      {new Date(post.date).toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} style={{ color: '#4D4D4D' }} />
                    <span style={{ fontSize: '14px', color: '#4D4D4D' }}>{post.readTime}</span>
                  </div>
                </div>

                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  lineHeight: '1.3'
                }}>
                  {post.title}
                </h3>

                <p style={{ 
                  fontSize: '16px', 
                  fontWeight: '400', 
                  lineHeight: '1.5', 
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginBottom: '24px'
                }}>
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}>
                  <div className="flex items-center gap-2">
                    <User size={16} style={{ color: '#4D4D4D' }} />
                    <span style={{ fontSize: '14px', color: '#4D4D4D' }}>{post.author}</span>
                  </div>

                  <button 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#00FFD1',
                      fontSize: '14px',
                      fontWeight: '500',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                  >
                    Leer más
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
