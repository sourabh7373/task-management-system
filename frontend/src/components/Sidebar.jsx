import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, CheckCircle, Settings, LogOut, CheckSquare as LogoIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../sidebar.css';

export const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <LogoIcon size={28} color="#5B5FEF" /> TaskFlow
        </div>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <CheckSquare size={20} /> My Tasks
        </NavLink>
        <NavLink to="/completed" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <CheckCircle size={20} /> Completed
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={20} /> Settings
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <button onClick={logout} className="nav-item logout-btn">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};
