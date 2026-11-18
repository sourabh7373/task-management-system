import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, deleteTask } from '../services/taskService';
import { getDashboardStats } from '../services/dashboardService';
import StatCard from '../components/StatCard';
import { ClipboardList, Plus, LayoutDashboard, CheckCircle, Clock } from 'lucide-react';
import TaskList from '../components/TaskList';
import '../dashboard.css';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tasksRes, statsRes] = await Promise.all([
        getTasks(),
        getDashboardStats(),
      ]);
      setTasks(tasksRes.data.tasks || []);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', marginBottom: '1rem', border: '1px solid var(--color-border)' }}>
        <div>
          <h2 style={{ color: 'var(--color-text-main)' }}>Welcome back!</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Here's what's happening with your tasks today.</p>
        </div>
        <button onClick={() => navigate('/create-task')} className="btn-primary">
          <Plus size={20} /> Create New Task
        </button>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Tasks" value={stats.totalTasks} icon={<ClipboardList size={24} />} color="blue" />
        <StatCard title="Pending" value={stats.pendingTasks} icon={<Clock size={24} />} color="orange" />
        <StatCard title="In Progress" value={stats.inProgressTasks} icon={<LayoutDashboard size={24} />} color="purple" />
        <StatCard title="Completed" value={stats.completedTasks} icon={<CheckCircle size={24} />} color="green" />
      </div>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : tasks.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: 'var(--color-primary-light)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1rem', color: 'var(--color-primary)' }}>
            <ClipboardList size={48} />
          </div>
          <h3 style={{ margin: '0 0 0.5rem', color: 'var(--color-text-main)' }}>Your workspace is ready!</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', maxWidth: '400px' }}>You haven't created any tasks yet. Start by adding your first task and keep everything organized in one place.</p>
          <button onClick={() => navigate('/create-task')} className="btn-primary">
            <Plus size={20} /> Create your first task
          </button>
        </div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <h3 style={{ color: 'var(--color-text-main)' }}>Recent Tasks</h3>
          </div>
          <TaskList
            tasks={tasks.slice(0, 5)}
            onStatusChange={fetchData}
            onUpdate={(task) => navigate(`/edit-task/${task._id}`)}
            onDelete={async (id) => {
              if (window.confirm('Are you sure you want to delete this task?')) {
                try {
                  await deleteTask(id);
                  fetchData();
                } catch (err) {
                  console.error(err);
                  alert('Failed to delete task');
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
