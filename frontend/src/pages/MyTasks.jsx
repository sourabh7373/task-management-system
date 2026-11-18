import { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../services/taskService';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

export const MyTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error('Error fetching tasks');
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
        fetchData();
      } catch (err) {
        alert('Error deleting task');
      }
    }
  };

  return (
    <div className="my-tasks-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--color-heading)', margin: '0 0 8px 0' }}>My Tasks</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>Manage and track your daily tasks.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/create-task')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '1rem' }}>
          <Plus size={20} /> Create Task
        </button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-card-bg)' }}>
          <h3 style={{ margin: '0 0 8px', color: 'var(--color-heading)' }}>No tasks found</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>Start by adding your first task.</p>
          <button onClick={() => navigate('/create-task')} className="btn btn-primary">
            Create Task
          </button>
        </div>
      ) : (
        <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-card-bg)', overflow: 'hidden' }}>
          <TaskList tasks={tasks} onDelete={handleDelete} onUpdate={(task) => navigate(`/edit-task/${task._id}`)} onStatusChange={fetchData} />
        </div>
      )}
    </div>
  );
};
