import { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../services/taskService';
import { getDashboardStats } from '../services/dashboardService';
import { TaskForm } from '../components/TaskForm';
import TaskList from '../components/TaskList';
import StatCard from '../components/StatCard';
import { ClipboardList, Plus } from 'lucide-react';
import '../dashboard.css';

import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
  });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

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
      setMessage({ type: 'error', text: 'Error fetching dashboard data' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setMessage({ type: 'success', text: 'Task deleted successfully' });
        fetchData();
      } catch (err) {
        setMessage({ type: 'error', text: 'Error deleting task' });
      }
    }
  };

  const handleEdit = (task) => {
    navigate(`/edit-task/${task._id}`);
  };

  const handleTaskSaved = () => {
    setMessage({ type: 'success', text: 'Task saved successfully' });
    setEditingTask(null);
    fetchData();
  };

  return (
    <div className="dashboard-container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '28px', margin: 0, color: 'var(--text-main)' }}>Good morning!</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0' }}>Here's an overview of your productivity.</p>
        </div>
        <a href="/create-task" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={20} /> Create Task
        </a>
      </header>

      {message && <div className={`alert ${message.type}`}>{message.text}</div>}
      
      <div className="stats-grid">
        <StatCard title="Total Tasks" value={stats.totalTasks} icon="📋" color="blue" />
        <StatCard title="Pending" value={stats.pendingTasks} icon="⏳" color="yellow" />
        <StatCard title="In Progress" value={stats.inProgressTasks} icon="⚙️" color="orange" />
        <StatCard title="Completed" value={stats.completedTasks} icon="✅" color="green" />
      </div>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : tasks.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: '#e0e7ff', padding: '20px', borderRadius: '50%', marginBottom: '16px', color: 'var(--primary)' }}>
            <ClipboardList size={48} />
          </div>
          <h3 style={{ margin: '0 0 8px', color: 'var(--text-main)' }}>Your workspace is ready!</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '400px' }}>You haven't created any tasks yet. Start by adding your first task and keep everything organized in one place.</p>
          <a href="/create-task" className="btn-primary" style={{ textDecoration: 'none' }}>Create your first task</a>
        </div>
      ) : (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Recent Tasks</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="Search tasks..." style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
              <select style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <option>Status</option>
              </select>
            </div>
          </div>
          <TaskList tasks={tasks} onDelete={handleDelete} onUpdate={handleEdit} onStatusChange={fetchData} />
        </div>
      )}
    </div>
  );
};
