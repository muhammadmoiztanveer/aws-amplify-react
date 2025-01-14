import React, { useState } from 'react';
import TaskForm from '../components/taskForm';
import TaskList from '../components/taskList';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <TaskForm addTask={addTask} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
};

export default DashboardPage;
