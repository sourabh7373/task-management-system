import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: { bg: '#E0E7FF', text: '#5B5FEF' },
    yellow: { bg: '#FEF3C7', text: '#E9A23B' },
    orange: { bg: '#FFEDD5', text: '#E9A23B' },
    green: { bg: '#DCFCE7', text: '#16A37B' },
  };

  const style = colors[color] || colors.blue;

  return (
    <div className="stat-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{ background: style.bg, color: style.text, padding: '8px', borderRadius: '10px', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px' }}>{icon}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>{title}</div>
      </div>
      <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-main)' }}>{value}</div>
    </div>
  );
};

export default StatCard;
