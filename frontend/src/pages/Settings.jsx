import { useAuth } from '../context/AuthContext';

export const Settings = () => {
  const { logout } = useAuth();

  return (
    <div className="dashboard-container">
      <h2 style={{ fontSize: '28px', marginBottom: '32px', color: 'var(--text-main)' }}>Settings</h2>
      <div className="card" style={{ padding: '32px', maxWidth: '600px' }}>
        <h3 style={{ marginBottom: '16px' }}>Profile</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Manage your account preferences and security settings.</p>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
          <button onClick={logout} className="btn-primary" style={{ background: 'var(--danger)', border: 'none' }}>Logout</button>
        </div>
      </div>
    </div>
  );
};
