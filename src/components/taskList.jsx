import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.taskName}</h3>
            <p>{task.taskDescription}</p>
            <p>{task.dueDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
