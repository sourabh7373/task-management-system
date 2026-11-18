import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, deleteTask } from '../services/taskService';
import { getDashboardStats } from '../services/dashboardService';
import StatCard from '../components/StatCard';
import { ClipboardList, Plus, LayoutDashboard, CheckCircle, Clock } from 'lucide-react';
import TaskList from '../components/TaskList';

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
    <div className="dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ color: 'var(--color-heading)', fontSize: '1.875rem', fontWeight: '700', margin: '0 0 8px 0' }}>Dashboard</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>Welcome back, here is your task overview.</p>
        </div>
        <button onClick={() => navigate('/create-task')} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '1rem' }}>
          <Plus size={20} /> Create Task
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <StatCard title="Total Tasks" value={stats.totalTasks} icon={<ClipboardList size={20} />} color="blue" />
        <StatCard title="Pending" value={stats.pendingTasks} icon={<Clock size={20} />} color="orange" />
        <StatCard title="In Progress" value={stats.inProgressTasks} icon={<LayoutDashboard size={20} />} color="blue" />
        <StatCard title="Completed" value={stats.completedTasks} icon={<CheckCircle size={20} />} color="green" />
      </div>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : tasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-card-bg)' }}>
          <h3 style={{ margin: '0 0 8px', color: 'var(--color-heading)' }}>No tasks yet</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>Start by adding your first task.</p>
          <button onClick={() => navigate('/create-task')} className="btn btn-primary">
            Create Task
          </button>
        </div>
      ) : (
        <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-card-bg)', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
            <h3 style={{ color: 'var(--color-heading)', fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>Recent Tasks</h3>
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
