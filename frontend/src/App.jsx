import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Login, Register } from './pages/AuthPages';
import { Dashboard } from './pages/Dashboard';
import { MyTasks } from './pages/MyTasks';
import { CompletedTasks } from './pages/CompletedTasks';
import { Settings } from './pages/Settings';
import { TaskForm } from './components/TaskForm';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import './dashboard.css';
import './layout.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-layout">
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            <Route path="/*" element={
              <ProtectedRoute>
                <div className="dashboard-layout">
                  <Sidebar />
                  <div className="main-content">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/tasks" element={<MyTasks />} />
                      <Route path="/completed" element={<CompletedTasks />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/create-task" element={<TaskForm />} />
                      <Route path="/edit-task/:id" element={<TaskForm />} />
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      <Route path="*" element={<div className="dashboard-container"><h2>404 - Page Not Found</h2></div>} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
