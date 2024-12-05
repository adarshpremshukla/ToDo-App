import React from 'react';

function Todo({ task, onEdit, onDelete }) {
  return (
    <li>
      <span >{task.text}</span>
      <button className='editclass' onClick={() => onEdit(task.id)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default Todo;
