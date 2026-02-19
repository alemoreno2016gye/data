import React from 'react';
import { generateOperationalData, kpiMetrics } from '../mock/saasData';
import { TrendingUp, TrendingDown } from 'lucide-react';

const DataVisualization = () => {
  const operationalData = generateOperationalData();

  return (
    <section style={{ background: '#000000', padding: '120px 0', position: 'relative' }}>
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-[7.6923%] relative z-10">
        <div className="text-center mb-16">
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: '700', 
            lineHeight: '1.2', 
            color: '#FFFFFF',
            marginBottom: '16px',
            letterSpacing: '-1px'
          }}>
            Visualización en tiempo real
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Dashboards interactivos que convierten datos complejos en insights accionables
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpiMetrics.map((metric, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '24px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px' }}>
                {metric.label}
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#FFFFFF', marginBottom: '8px' }}>
                {metric.value}
              </div>
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: metric.positive ? '#D4AF37' : '#FF6B6B'
                }}
              >
                {metric.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {metric.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Main Chart */}
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '40px',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '4px' }}>
                Métricas Operacionales
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }}>
                Evolución anual de indicadores clave
              </p>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div style={{ width: '12px', height: '12px', background: '#D4AF37', borderRadius: '2px' }} />
                <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Eficiencia</span>
              </div>
              <div className="flex items-center gap-2">
                <div style={{ width: '12px', height: '12px', background: '#4A90E2', borderRadius: '2px' }} />
                <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Costos</span>
              </div>
              <div className="flex items-center gap-2">
                <div style={{ width: '12px', height: '12px', background: '#9B59B6', borderRadius: '2px' }} />
                <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Riesgo</span>
              </div>
            </div>
          </div>

          {/* Simple Line Chart */}
          <div style={{ width: '100%', height: '300px', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 75}
                  x2="1000"
                  y2={i * 75}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                />
              ))}

              {/* Efficiency line */}
              <polyline
                points={operationalData.map((d, i) => 
                  `${(i / (operationalData.length - 1)) * 1000},${300 - (d.efficiency / 100 * 300)}`
                ).join(' ')}
                fill="none"
                stroke="#D4AF37"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Cost line */}
              <polyline
                points={operationalData.map((d, i) => 
                  `${(i / (operationalData.length - 1)) * 1000},${300 - (d.cost / 100 * 300)}`
                ).join(' ')}
                fill="none"
                stroke="#4A90E2"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
              />

              {/* Risk line */}
              <polyline
                points={operationalData.map((d, i) => 
                  `${(i / (operationalData.length - 1)) * 1000},${300 - (d.risk / 100 * 300)}`
                ).join(' ')}
                fill="none"
                stroke="#9B59B6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
              />
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between mt-4">
              {['Ene', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map((month, i) => (
                <span key={i} style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)' }}>
                  {month}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;
