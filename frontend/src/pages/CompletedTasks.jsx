import { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../services/taskService';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';

export const CompletedTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getTasks();
      setTasks((res.data.tasks || []).filter(t => t.status === 'Completed'));
    } catch (err) {
      console.error('Error fetching tasks', err);
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
    <div className="completed-tasks-page">
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--color-heading)', margin: '0 0 8px 0' }}>Completed Tasks</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>View all your finished work.</p>
      </div>
      
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-card-bg)' }}>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>No completed tasks yet.</p>
        </div>
      ) : (
        <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-card-bg)', overflow: 'hidden' }}>
          <TaskList tasks={tasks} onDelete={handleDelete} onUpdate={(task) => navigate(`/edit-task/${task._id}`)} onStatusChange={fetchData} />
        </div>
      )}
    </div>
  );
};
