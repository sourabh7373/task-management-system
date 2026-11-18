import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTask, deleteTask } from '../services/taskService';
import { Loader2, ArrowLeft, FileText, Calendar, User, Clock, Tag } from 'lucide-react';
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
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      try {
        await deleteTask(id);
        navigate('/tasks');
      } catch (err) {
        alert('Failed to delete task. Please try again.');
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" size={48} /></div>;
  if (error) return <div className="flex justify-center items-center h-screen text-danger">{error}</div>;
  if (!task) return <div className="flex justify-center items-center h-screen">Task not found</div>;

  return (
    <div className="dashboard-container">
      <Link to="/tasks" className="btn-cancel" style={{ display: 'inline-flex', width: 'fit-content', marginBottom: '1rem' }}>
        <ArrowLeft size={18} /> Back to Tasks
      </Link>
      
      <header className="card" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{task.title}</h1>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span className="badge" style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', backgroundColor: '#EEF2FF', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: '500' }}>{task.status}</span>
            <span className="badge" style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', backgroundColor: '#FFF7ED', color: '#EA580C', fontSize: '0.875rem', fontWeight: '500' }}>{task.priority} Priority</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to={`/edit-task/${task._id}`} className="btn-primary">Edit Task</Link>
          <button onClick={handleDelete} className="btn-cancel" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>Delete</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem' }}>
        <section className="card">
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={20} /> Description</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{task.description || 'No description provided.'}</p>
        </section>

        <aside className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Task Properties</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Due Date', value: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A', icon: <Calendar size={18} /> },
              { label: 'Assigned To', value: task.assignedUser || 'Unassigned', icon: <User size={18} /> },
              { label: 'Created On', value: new Date(task.createdAt).toLocaleDateString(), icon: <Clock size={18} /> },
              { label: 'Status', value: task.status, icon: <Tag size={18} /> }
            ].map((prop, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: 'var(--text-secondary)' }}>{prop.icon}</div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{prop.label}</div>
                  <div style={{ fontWeight: '500' }}>{prop.value}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};
