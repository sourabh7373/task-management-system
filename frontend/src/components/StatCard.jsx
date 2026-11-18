import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: { bg: 'var(--color-soft-blue)', text: '#3568C8' },
    orange: { bg: 'var(--color-soft-orange)', text: '#B7791F' },
    purple: { bg: 'var(--color-soft-purple)', text: '#6558D9' },
    green: { bg: 'var(--color-soft-green)', text: '#208653' },
  };

  const style = colors[color] || colors.blue;

  return (
    <div className="card" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      padding: '1.5rem',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{ 
        background: style.bg, 
        color: style.text, 
        padding: '0.75rem', 
        borderRadius: '1rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '56px', 
        height: '56px' 
      }}>
        {icon}
      </div>
      <div>
        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>{title}</div>
        <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-text-main)', lineHeight: '1' }}>{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
