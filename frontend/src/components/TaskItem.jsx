import React from 'react';
import { updateTaskStatus } from '../services/taskService';

const TaskItem = ({ task, onDelete, onUpdate, onStatusChange }) => {
  const handleStatusChange = async (e) => {
    try {
      await updateTaskStatus(task._id, e.target.value);
      if (onStatusChange) onStatusChange();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-meta">
        <span>
          Status:
          <select value={task.status} onChange={handleStatusChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </span>
        <span>Priority: {task.priority}</span>
        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>
      <div className="task-actions">
        <button onClick={() => onUpdate(task)}>Edit</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
