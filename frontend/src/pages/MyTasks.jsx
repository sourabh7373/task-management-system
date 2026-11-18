import { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../services/taskService';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import '../dashboard.css';

export const MyTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.data.tasks || []);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error fetching tasks' });
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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-text-main)' }}>My Tasks</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Manage and track your daily tasks.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={() => navigate('/create-task')}>
            <Plus size={20} /> Create Task
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '9px', border: '1px solid var(--color-border-strong)' }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '0.625rem 1rem', borderRadius: '9px', border: '1px solid var(--color-border-strong)', background: '#FFFFFF' }}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {message && <div className={`alert ${message.type}`} style={{ padding: '1rem', borderRadius: '9px', marginBottom: '1rem', background: message.type === 'success' ? 'var(--color-success)' : 'var(--color-danger-light)', color: message.type === 'success' ? 'white' : 'var(--color-danger)' }}>{message.text}</div>}
      
      {loading ? (
        <div className="card">Loading tasks...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>No tasks found matching your criteria.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <TaskList tasks={filteredTasks} onDelete={handleDelete} onUpdate={(task) => navigate(`/edit-task/${task._id}`)} onStatusChange={fetchData} />
        </div>
      )}
    </div>
  );
};
