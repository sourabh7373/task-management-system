import { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';

export const CompletedTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchData();
  }, []);

  const handleEdit = (task) => navigate(`/edit-task/${task._id}`);

  return (
    <div className="dashboard-container">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>Completed Tasks</h2>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>No completed tasks yet.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <TaskList tasks={tasks} onDelete={() => {}} onUpdate={handleEdit} />
        </div>
      )}
    </div>
  );
};
