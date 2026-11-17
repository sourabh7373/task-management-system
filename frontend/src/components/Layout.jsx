import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  return null; // Navbar is now integrated into the sidebar or header
};

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">TaskFlow</div>
        <nav>
          <ul>
            <li><Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link></li>
            <li><Link to="/tasks" className={location.pathname === '/tasks' ? 'active' : ''}>My Tasks</Link></li>
            <li><Link to="/completed" className={location.pathname === '/completed' ? 'active' : ''}>Completed</Link></li>
            <li><Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>Settings</Link></li>
          </ul>
        </nav>
      </div>
      {user && (
        <div className="sidebar-footer">
          <p>{user.name}</p>
          <button onClick={logout} className="btn-secondary">Logout</button>
        </div>
      )}
    </aside>
  );
};
