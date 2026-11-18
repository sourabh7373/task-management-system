import { useAuth } from '../context/AuthContext';

export const Settings = () => {
  const { user, logout } = useAuth();

  return (
    <div className="settings-page">
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--color-heading)', margin: '0 0 8px 0' }}>Settings</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>Manage your account preferences.</p>
      </div>
      
      <div style={{ maxWidth: '600px', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-card-bg)' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-heading)' }}>Account Information</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-heading)', marginBottom: '8px' }}>Name</label>
          <input type="text" value={user?.name || ''} disabled style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: '#F9FAFB', color: 'var(--color-text-secondary)' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-heading)', marginBottom: '8px' }}>Email</label>
          <input type="email" value={user?.email || ''} disabled style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: '#F9FAFB', color: 'var(--color-text-secondary)' }} />
        </div>

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Sign out of your account</span>
          <button onClick={logout} style={{ color: 'var(--color-overdue-text)', background: 'var(--color-overdue-bg)', border: 'none', padding: '8px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}>Logout</button>
        </div>
      </div>
    </div>
  );
};
