import React, { useState, useMemo } from 'react';
import { updateTaskStatus } from '../services/taskService';
import { Trash2, Edit2, Search } from 'lucide-react';

const TaskList = ({ tasks, onDelete, onUpdate, onStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => 
      (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       task.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'All' || task.status === statusFilter) &&
      (priorityFilter === 'All' || task.priority === priorityFilter)
    );
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateTaskStatus(id, status);
      if (onStatusChange) onStatusChange();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getBadgeStyle = (type, value) => {
    const base = { padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', border: 'none', cursor: 'pointer' };
    if (type === 'status') {
      if (value === 'Completed') return { ...base, background: 'var(--color-completed-bg)', color: 'var(--color-completed-text)' };
      if (value === 'In Progress') return { ...base, background: 'var(--color-progress-bg)', color: 'var(--color-progress-text)' };
      if (value === 'Pending') return { ...base, background: 'var(--color-pending-bg)', color: 'var(--color-pending-text)' };
      return { ...base, background: '#F1F5F9', color: '#475569' };
    }
    if (type === 'priority') {
      if (value === 'High') return { ...base, background: 'var(--color-overdue-bg)', color: 'var(--color-overdue-text)' };
      if (value === 'Medium') return { ...base, background: 'var(--color-pending-bg)', color: 'var(--color-pending-text)' };
      return { ...base, background: 'var(--color-progress-bg)', color: 'var(--color-progress-text)' };
    }
    return base;
  };

  return (
    <div className="task-list-container">
      <div style={{ display: 'flex', gap: '12px', padding: '16px', borderBottom: '1px solid var(--color-border)', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
          <input type="text" placeholder="Search tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '8px 12px 8px 36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', width: '100%', fontSize: '0.9rem' }} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-card-bg)', fontSize: '0.9rem' }}>
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-card-bg)', fontSize: '0.9rem' }}>
          <option value="All">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontSize: '0.75rem', textAlign: 'left', background: '#F9FAFB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <th style={{ padding: '16px 24px' }}>Task</th>
            <th style={{ padding: '16px 24px' }}>Due Date</th>
            <th style={{ padding: '16px 24px' }}>Priority</th>
            <th style={{ padding: '16px 24px' }}>Status</th>
            <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task._id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <td style={{ padding: '16px 24px' }}>
                <div style={{ fontWeight: '600', color: 'var(--color-heading)' }}>{task.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{task.description}</div>
              </td>
              <td style={{ padding: '16px 24px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
              <td style={{ padding: '16px 24px' }}><span style={getBadgeStyle('priority', task.priority)}>{task.priority}</span></td>
              <td style={{ padding: '16px 24px' }}>
                <select value={task.status} onChange={(e) => handleStatusChange(task._id, e.target.value)} style={{ ...getBadgeStyle('status', task.status), cursor: 'pointer', appearance: 'none' }}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                <button type="button" onClick={() => onUpdate(task)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', marginRight: '8px' }}>
                  <Edit2 size={16} />
                </button>
                <button type="button" onClick={() => onDelete(task._id)} style={{ background: 'none', border: 'none', color: 'var(--color-overdue-text)', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
