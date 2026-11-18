import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ListChecks, CheckCircle, Settings, LogOut, ClipboardCheck } from 'lucide-react';
import '../sidebar.css';

export const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/tasks', label: 'My Tasks', icon: ListChecks },
    { path: '/completed', label: 'Completed', icon: CheckCircle },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <ClipboardCheck size={20} color="white" />
          </div>
          <span className="logo-text">TaskFlow</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className={`nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={20} color={isActive ? 'var(--color-primary)' : '#FFFFFF'} />
              <span style={{ color: isActive ? 'var(--color-primary)' : '#FFFFFF' }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button onClick={logout} className="logout-btn">
          <LogOut size={20} color="#FFFFFF" />
          <span style={{ color: '#FFFFFF' }}>Logout</span>
        </button>
      </div>
    </aside>
  );
};
