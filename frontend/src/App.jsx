import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Sidebar, TopNav } from './components/Sidebar';
import { Login, Register } from './pages/AuthPages';
import { Dashboard } from './pages/Dashboard';
import { MyTasks } from './pages/MyTasks';
import { CompletedTasks } from './pages/CompletedTasks';
import { Settings } from './pages/Settings';
import { TaskForm } from './components/TaskForm';
import { TaskDetails } from './pages/TaskDetails';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import './index.css';
import './dashboard.css';
import './layout.css';
import './sidebar.css';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/tasks': return 'My Tasks';
      case '/completed': return 'Completed Tasks';
      case '/settings': return 'Settings';
      case '/create-task': return 'Create Task';
      default: return 'TaskFlow';
    }
  };

  return (
    <div className={!isAuthPage ? "dashboard-layout" : ""}>
      {!isAuthPage && <Sidebar />}
      {!isAuthPage && (
        <div className="main-content">
          <TopNav title={getTitle()} />
          <div className="page-container">
            <Routes>
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/tasks" element={<ProtectedRoute><MyTasks /></ProtectedRoute>} />
              <Route path="/completed" element={<ProtectedRoute><CompletedTasks /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/create-task" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
              <Route path="/edit-task/:id" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
              <Route path="/task/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      )}
      {isAuthPage && (
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Routes>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
