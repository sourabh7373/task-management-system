import React, { useState, useMemo } from 'react';
import { updateTaskStatus } from '../services/taskService';

const TaskList = ({ tasks, onDelete, onUpdate, onStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === 'All' || task.status === statusFilter) &&
        (priorityFilter === 'All' || task.priority === priorityFilter)
      )
      .sort((a, b) => {
        if (sortBy === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
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
    const base = { padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '500' };
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
      <div className="filters" style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <input type="text" placeholder="Search tasks..." onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border)', flex: 1 }} />
        <select onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}>
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select onChange={(e) => setPriorityFilter(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}>
          <option value="All">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}>
          <option value="createdAt">Sort by Created</option>
          <option value="dueDate">Sort by Due Date</option>
        </select>
      </div>
      <table className="task-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: '14px' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Title</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Due Date</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Priority</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task._id} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '16px' }}>
                <div style={{ fontWeight: '600' }}>{task.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{task.description}</div>
              </td>
              <td style={{ padding: '16px', fontSize: '14px' }}>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td style={{ padding: '16px' }}><span style={getBadgeStyle('priority', task.priority)}>{task.priority}</span></td>
              <td style={{ padding: '16px' }}>
                <select value={task.status} onChange={(e) => handleStatusChange(task._id, e.target.value)} style={getBadgeStyle('status', task.status)}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td style={{ padding: '16px', textAlign: 'right' }}>
                <button onClick={() => onUpdate(task)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginRight: '10px' }}>Edit</button>
                <button onClick={() => onDelete(task._id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
