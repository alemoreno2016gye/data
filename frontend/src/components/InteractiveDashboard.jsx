import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants/colors';
import { Activity, TrendingUp, Target, Zap } from 'lucide-react';

const InteractiveDashboard = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 500);
  }, []);

  const metrics = [
    { label: 'Procesos Optimizados', value: 94, color: COLORS.gold, icon: Activity },
    { label: 'ROI Operativo', value: 87, color: COLORS.silver, icon: TrendingUp },
    { label: 'Precisión Predictiva', value: 96, color: COLORS.gold, icon: Target },
    { label: 'Tiempo Ahorrado', value: 78, color: COLORS.silver, icon: Zap }
  ];

  const dataPoints = [
    { month: 'E', value: 65 },
    { month: 'F', value: 72 },
    { month: 'M', value: 68 },
    { month: 'A', value: 78 },
    { month: 'M', value: 85 },
    { month: 'J', value: 82 },
    { month: 'J', value: 90 },
    { month: 'A', value: 88 },
    { month: 'S', value: 94 },
  ];

  return (
    <div 
      className="relative mx-auto"
      style={{
        maxWidth: '1100px',
        background: 'rgba(0, 0, 0, 0.4)',
        border: `1px solid ${COLORS.goldBorder}`,
        borderRadius: '16px',
        backdropFilter: 'blur(24px)',
        padding: '48px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated grid background */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(${COLORS.goldBorder} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.goldBorder} 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Gradient orbs */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, ${COLORS.gold} 0%, transparent 70%)`,
          opacity: 0.1,
          blur: '80px',
          filter: 'blur(80px)'
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              color: COLORS.white,
              letterSpacing: '-0.5px'
            }}>
              Dashboard de Inteligencia Operativa
            </h3>
            <div 
              style={{
                padding: '6px 14px',
                background: COLORS.goldBg,
                border: `1px solid ${COLORS.goldBorder}`,
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600',
                color: COLORS.gold
              }}
            >
              EN TIEMPO REAL
            </div>
          </div>
          <p style={{ fontSize: '14px', color: COLORS.whiteSubtle }}>
            Visualización de métricas clave de rendimiento operacional
          </p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid rgba(255, 255, 255, 0.08)`,
                  borderRadius: '12px',
                  padding: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = metric.color;
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    background: `${metric.color}20`,
                    border: `1px solid ${metric.color}`,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}
                >
                  <IconComponent size={20} style={{ color: metric.color }} />
                </div>
                
                <div style={{ 
                  fontSize: '32px', 
                  fontWeight: '700', 
                  color: metric.color,
                  marginBottom: '4px',
                  lineHeight: 1
                }}>
                  {metric.value}%
                </div>
                
                <div style={{ 
                  fontSize: '12px', 
                  color: COLORS.whiteSubtle,
                  lineHeight: '1.3'
                }}>
                  {metric.label}
                </div>

                {/* Progress bar */}
                <div 
                  style={{
                    marginTop: '12px',
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}
                >
                  <div 
                    style={{
                      height: '100%',
                      background: metric.color,
                      width: animated ? `${metric.value}%` : '0%',
                      transition: 'width 1.5s ease-out',
                      borderRadius: '2px'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Section */}
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '32px'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: COLORS.white,
                marginBottom: '4px'
              }}>
                Evolución de Rendimiento
              </h4>
              <p style={{ fontSize: '13px', color: COLORS.whiteSubtle }}>
                Tendencia mensual de optimización
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  background: COLORS.gold, 
                  borderRadius: '3px' 
                }} />
                <span style={{ fontSize: '13px', color: COLORS.whiteSubtle }}>Rendimiento</span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
            {dataPoints.map((point, index) => (
              <div 
                key={index}
                style={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div 
                  style={{
                    width: '100%',
                    height: animated ? `${(point.value / 100) * 200}px` : '0px',
                    background: index % 2 === 0 
                      ? `linear-gradient(to top, ${COLORS.gold}, ${COLORS.goldLight})`
                      : `linear-gradient(to top, ${COLORS.silver}, ${COLORS.silverLight})`,
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 1.2s ease-out',
                    transitionDelay: `${index * 0.1}s`,
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  {/* Value label on hover */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-24px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '11px',
                      fontWeight: '600',
                      color: COLORS.gold,
                      opacity: 0.8
                    }}
                  >
                    {point.value}%
                  </div>
                </div>
                
                <span style={{ 
                  fontSize: '12px', 
                  color: COLORS.whiteSubtle,
                  fontWeight: '500'
                }}>
                  {point.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Decisiones Optimizadas', value: '1,247' },
            { label: 'Análisis Ejecutados', value: '3,891' },
            { label: 'Alertas Preventivas', value: '156' }
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '10px',
                padding: '16px',
                textAlign: 'center'
              }}
            >
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: index === 1 ? COLORS.gold : COLORS.silver,
                marginBottom: '4px'
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: COLORS.whiteSubtle }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDashboard;
