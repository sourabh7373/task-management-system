import React, { useState, useMemo } from 'react';
import { updateTaskStatus } from '../services/taskService';
import { Trash2, Edit2 } from 'lucide-react';

const TaskList = ({ tasks, onDelete, onUpdate, onStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => 
        (task.title.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
         task.description?.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())) &&
        (statusFilter === 'All' || task.status === statusFilter) &&
        (priorityFilter === 'All' || task.priority === priorityFilter)
      )
      .sort((a, b) => {
        if (sortBy === 'dueDateAsc') return new Date(a.dueDate) - new Date(b.dueDate);
        if (sortBy === 'dueDateDesc') return new Date(b.dueDate) - new Date(a.dueDate);
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'priority') {
          const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [tasks, searchTerm, statusFilter, priorityFilter, sortBy]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateTaskStatus(id, status);
      if (onStatusChange) onStatusChange();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getBadgeStyle = (type, value) => {
    const base = { padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease' };
    if (type === 'status') {
      if (value === 'Completed') return { ...base, background: '#DCFCE7', color: '#166534' };
      if (value === 'In Progress') return { ...base, background: '#FEF3C7', color: '#92400E' };
      return { ...base, background: '#F1F5F9', color: '#475569' };
    }
    if (type === 'priority') {
      if (value === 'High') return { ...base, background: '#FEE2E2', color: '#991B1B' };
      if (value === 'Medium') return { ...base, background: '#FFEDD5', color: '#9A3412' };
      return { ...base, background: '#DBEAFE', color: '#1E40AF' };
    }
    return base;
  };

  return (
    <div className="task-list-container">
      <div style={{ display: 'flex', gap: '0.75rem', padding: '1.5rem', borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
        <input type="text" placeholder="Search tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '0.625rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--border)', flex: 1 }} />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '0.625rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', background: '#FFFFFF' }}>
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} style={{ padding: '0.625rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', background: '#FFFFFF' }}>
          <option value="All">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '0.625rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', background: '#FFFFFF' }}>
          <option value="createdAt">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="dueDateAsc">Due Date (Asc)</option>
          <option value="dueDateDesc">Due Date (Desc)</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontSize: '0.875rem', textAlign: 'left', background: '#F0F1FA' }}>
            <th style={{ padding: '1rem 1.5rem' }}>Task</th>
            <th style={{ padding: '1rem 1.5rem' }}>Due Date</th>
            <th style={{ padding: '1rem 1.5rem' }}>Priority</th>
            <th style={{ padding: '1rem 1.5rem' }}>Status</th>
            <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task._id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <td style={{ padding: '1rem 1.5rem' }}>
                <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{task.title}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{task.description}</div>
              </td>
              <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
              <td style={{ padding: '1rem 1.5rem' }}><span style={getBadgeStyle('priority', task.priority)}>{task.priority}</span></td>
              <td style={{ padding: '1rem 1.5rem' }}>
                <select value={task.status} onChange={(e) => handleStatusChange(task._id, e.target.value)} style={{ ...getBadgeStyle('status', task.status), cursor: 'pointer', appearance: 'none' }}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                <button type="button" onClick={() => onUpdate(task)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', marginRight: '0.75rem', padding: '0.5rem', borderRadius: '0.5rem' }} onMouseEnter={(e) => e.currentTarget.style.background = '#EEF2FF'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <Edit2 size={18} />
                </button>
                <button type="button" onClick={() => onDelete(task._id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.5rem' }} onMouseEnter={(e) => e.currentTarget.style.background = '#FEF2F2'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <Trash2 size={18} />
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
