import { useState } from 'react';
import '../Auth.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-sidebar">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '800' }}>TaskFlow</h1>
        <p style={{ fontSize: '1.125rem', opacity: 0.9, lineHeight: '1.6' }}>Manage your team's tasks efficiently and stay productive with our premium interface.</p>
      </div>
      <div className="auth-content">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>Welcome back</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Enter your details to access your workspace.</p>
          {error && <p className="error-message">{error}</p>}
          <input className="auth-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required />
          <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button className="auth-button" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-sidebar">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '800' }}>TaskFlow</h1>
        <p style={{ fontSize: '1.125rem', opacity: 0.9, lineHeight: '1.6' }}>Join our community and start managing your tasks with a premium experience.</p>
      </div>
      <div className="auth-content">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>Create account</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Get started with your free account today.</p>
          {error && <p className="error-message">{error}</p>}
          <input className="auth-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required />
          <input className="auth-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required />
          <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <input className="auth-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" required />
          <button className="auth-button" type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
          <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Login</Link></p>
        </form>
      </div>
    </div>
  );
};
