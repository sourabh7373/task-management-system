import { useState, useEffect } from 'react';
import { createTask, updateTask, getTask } from '../services/taskService';
import '../task-form.css';
import { useNavigate, useParams } from 'react-router-dom';

export const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const { data } = await getTask(id);
          setTitle(data.title);
          setDescription(data.description);
          setStatus(data.status);
          setPriority(data.priority);
          setDueDate(data.dueDate ? data.dueDate.split('T')[0] : '');
        } catch (err) {
          setError('Failed to load task');
        } finally {
          setLoading(false);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, status, priority, dueDate };
    try {
      if (id) {
        await updateTask(id, taskData);
      } else {
        await createTask(taskData);
      }
      navigate('/tasks');
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving task. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="task-form-container">
      <h2 style={{ marginBottom: '24px', color: 'var(--text-main)' }}>{id ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task title" required />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter task description" rows={4} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Priority</label>
            <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Due Date</label>
          <input type="date" className="form-input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard')}>Cancel</button>
          <button type="submit" className="btn-save">{id ? 'Update Task' : 'Create Task'}</button>
        </div>
      </form>
    </div>
  );
};
