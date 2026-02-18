import React from 'react';

const TimeSeriesChart = ({ data }) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.value, d.target)));
  const chartHeight = 300;
  const chartPadding = 40;

  const getY = (value) => {
    return chartHeight - ((value / maxValue) * (chartHeight - chartPadding)) - 20;
  };

  const barWidth = 40;
  const spacing = 60;

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg 
        width={Math.max(800, data.length * spacing + 100)} 
        height={chartHeight}
        style={{ minWidth: '100%' }}
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percentage) => {
          const y = chartHeight - (percentage / 100) * (chartHeight - chartPadding) - 20;
          return (
            <g key={percentage}>
              <line
                x1={40}
                y1={y}
                x2={data.length * spacing + 60}
                y2={y}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
              <text
                x={20}
                y={y + 4}
                fill="#4D4D4D"
                fontSize="12"
                textAnchor="end"
              >
                {Math.round((maxValue * percentage) / 100)}
              </text>
            </g>
          );
        })}

        {/* Bars and line */}
        {data.map((point, index) => {
          const x = 60 + index * spacing;
          const barHeight = chartHeight - getY(point.value) - 20;
          const targetY = getY(point.target);

          return (
            <g key={index}>
              {/* Value bar */}
              <rect
                x={x}
                y={getY(point.value)}
                width={barWidth}
                height={barHeight}
                fill="rgba(0, 255, 209, 0.3)"
                stroke="#00FFD1"
                strokeWidth="2"
              />

              {/* Target line point */}
              <circle
                cx={x + barWidth / 2}
                cy={targetY}
                r="5"
                fill="#FFFFFF"
                stroke="#00FFD1"
                strokeWidth="2"
              />

              {/* Connect target points */}
              {index < data.length - 1 && (
                <line
                  x1={x + barWidth / 2}
                  y1={targetY}
                  x2={60 + (index + 1) * spacing + barWidth / 2}
                  y2={getY(data[index + 1].target)}
                  stroke="#00FFD1"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              )}

              {/* Month label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - 5}
                fill="#FFFFFF"
                fontSize="14"
                textAnchor="middle"
              >
                {point.month}
              </text>

              {/* Value label */}
              <text
                x={x + barWidth / 2}
                y={getY(point.value) - 8}
                fill="#00FFD1"
                fontSize="12"
                fontWeight="600"
                textAnchor="middle"
              >
                {point.value}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(60, ${chartHeight - 50})`}>
          <rect x={0} y={0} width={20} height={12} fill="rgba(0, 255, 209, 0.3)" stroke="#00FFD1" strokeWidth="2" />
          <text x={28} y={10} fill="#FFFFFF" fontSize="12">Valor Real</text>

          <circle cx={110} cy={6} r="5" fill="#FFFFFF" stroke="#00FFD1" strokeWidth="2" />
          <line x1={105} y1={6} x2={115} y2={6} stroke="#00FFD1" strokeWidth="2" strokeDasharray="5,5" />
          <text x={125} y={10} fill="#FFFFFF" fontSize="12">Objetivo</text>
        </g>
      </svg>
    </div>
  );
};

export default TimeSeriesChart;
