import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTask, deleteTask } from '../services/taskService';
import { ArrowLeft, FileText, Calendar, User, Clock, Tag } from 'lucide-react';
import '../task-details.css';

export const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const res = await getTask(id);
        setTask(res.data);
      } catch (err) {
        setError('Failed to load task details');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        navigate('/tasks');
      } catch (err) {
        alert('Failed to delete task.');
      }
    }
  };

  if (loading) return <div className="page-container">Loading...</div>;
  if (error) return <div className="page-container">{error}</div>;
  if (!task) return <div className="page-container">Task not found</div>;

  return (
    <div className="task-details-container">
      <Link to="/tasks" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
        <ArrowLeft size={18} /> Back to Tasks
      </Link>
      
      <header className="details-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-heading)', margin: '0 0 8px 0' }}>{task.title}</h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ padding: '4px 10px', borderRadius: '6px', backgroundColor: task.status === 'Completed' ? 'var(--color-completed-bg)' : task.status === 'In Progress' ? 'var(--color-progress-bg)' : 'var(--color-pending-bg)', color: task.status === 'Completed' ? 'var(--color-completed-text)' : task.status === 'In Progress' ? 'var(--color-progress-text)' : 'var(--color-pending-text)', fontSize: '0.75rem', fontWeight: '600' }}>{task.status}</span>
            <span style={{ padding: '4px 10px', borderRadius: '6px', backgroundColor: task.priority === 'High' ? 'var(--color-overdue-bg)' : task.priority === 'Medium' ? 'var(--color-pending-bg)' : 'var(--color-progress-bg)', color: task.priority === 'High' ? 'var(--color-overdue-text)' : task.priority === 'Medium' ? 'var(--color-pending-text)' : 'var(--color-progress-text)', fontSize: '0.75rem', fontWeight: '600' }}>{task.priority} Priority</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to={`/edit-task/${task._id}`} className="btn" style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', padding: '8px 16px' }}>Edit</Link>
          <button onClick={handleDelete} className="btn" style={{ background: 'var(--color-overdue-bg)', color: 'var(--color-overdue-text)', padding: '8px 16px', border: 'none' }}>Delete</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        <section className="details-card">
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-heading)', fontSize: '1.1rem' }}><FileText size={18} /> Description</h3>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>{task.description || 'No description provided.'}</p>
        </section>

        <aside className="details-card">
          <h3 style={{ marginBottom: '16px', color: 'var(--color-heading)', fontSize: '1.1rem' }}>Properties</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { label: 'Due Date', value: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A', icon: <Calendar size={16} /> },
              { label: 'Assigned To', value: task.assignedUser || 'Unassigned', icon: <User size={16} /> },
              { label: 'Created On', value: new Date(task.createdAt).toLocaleDateString(), icon: <Clock size={16} /> },
              { label: 'Status', value: task.status, icon: <Tag size={16} /> }
            ].map((prop, idx) => (
              <div key={idx} className="property-item">
                <div className="property-icon">{prop.icon}</div>
                <div>
                  <div className="property-label">{prop.label}</div>
                  <div className="property-value">{prop.value}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};
