import { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../services/taskService';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';

export const MyTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

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

  const handleEdit = (task) => {
    navigate(`/edit-task/${task._id}`);
  };

  return (
    <div className="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', color: 'var(--text-main)' }}>My Tasks</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input type="text" placeholder="Search tasks..." style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)' }} />
          <select style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <option>Status</option>
          </select>
          <select style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <option>Priority</option>
          </select>
        </div>
      </div>
      {message && <div className={`alert ${message.type}`}>{message.text}</div>}
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No tasks found.</p>
        </div>
      ) : (
        <div className="card">
          <TaskList tasks={tasks} onDelete={handleDelete} onUpdate={handleEdit} onStatusChange={fetchData} />
        </div>
      )}
    </div>
  );
};
