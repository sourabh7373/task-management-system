import { useAuth } from '../context/AuthContext';

export const Settings = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-main)' }}>Settings</h2>
      </div>
      <div className="card" style={{ maxWidth: '600px', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-text-main)' }}>Account Information</h3>
        
        <div className="form-group">
          <label className="form-label">Name</label>
          <input type="text" value={user?.name || ''} disabled className="form-input" style={{ background: '#FFFFFF' }} />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" value={user?.email || ''} disabled className="form-input" style={{ background: '#FFFFFF' }} />
        </div>

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Sign out of your account</span>
          <button onClick={logout} className="btn btn-danger">Logout</button>
        </div>
      </div>
    </div>
  );
};
