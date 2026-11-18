import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: { bg: '#DCEEFF', text: '#2867A5' },
    orange: { bg: '#FFF0D9', text: '#A96816' },
    purple: { bg: '#F5F3FF', text: '#6558D9' },
    green: { bg: '#DDF3E7', text: '#20764B' },
  };

  const style = colors[color] || colors.blue;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      padding: '1.5rem',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
      background: 'var(--color-card-bg)',
      transition: 'transform 0.2s ease'
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ 
        background: style.bg, 
        color: style.text, 
        padding: '0.75rem', 
        borderRadius: 'var(--radius-md)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '52px', 
        height: '52px' 
      }}>
        {icon}
      </div>
      <div>
        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>{title}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-heading)', lineHeight: '1' }}>{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
