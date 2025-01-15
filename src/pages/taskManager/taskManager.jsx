import React, { useState } from "react";
import { Button, Input, Space, Table, Modal, Select } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskManager = () => {
  // State for managing tasks
  const [tasks, setTasks] = useState([]);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");

  // Handle opening the modal for adding/editing tasks
  const handleOpenModal = (task) => {
    if (task) {
      setTaskTitle(task.title);
      setTaskDescription(task.description);
      setTaskStatus(task.status);
      setEditingTask(task);
    } else {
      setTaskTitle("");
      setTaskDescription("");
      setTaskStatus("Pending");
      setEditingTask(null);
    }
    setTaskModalOpen(true);
  };

  // Handle saving a task
  const handleSaveTask = () => {
    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, title: taskTitle, description: taskDescription, status: taskStatus }
          : task
      );
      setTasks(updatedTasks);
    } else {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        status: taskStatus,
      };
      setTasks([...tasks, newTask]);
    }
    setTaskModalOpen(false);
  };

  // Handle deleting a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Columns for the task table
  const taskColumns = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Task Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Task Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Select
          defaultValue={status}
          onChange={(value) => {
            const updatedTasks = tasks.map((task) =>
              task.status === status ? { ...task, status: value } : task
            );
            setTasks(updatedTasks);
          }}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="In Progress">In Progress</Select.Option>
          <Select.Option value="Completed">Completed</Select.Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-4">
          <FaEdit
            className="text-black cursor-pointer"
            onClick={() => handleOpenModal(record)}
          />
          <FaTrash
            className="text-red-800 cursor-pointer"
            onClick={() => handleDeleteTask(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-3 mt-10">
        <div className="flex justify-between">
          <span className="font-bold">Task Manager</span>
          <Button
            type="primary"
            onClick={() => handleOpenModal()}
            className="bg-blue-500 text-white"
          >
            Add Task
          </Button>
        </div>
        <div className="border rounded-lg ">
          <Table columns={taskColumns} dataSource={tasks} rowKey="id" />
        </div>
      </div>

      {/* Modal for creating/editing tasks */}
      <Modal
        title={editingTask ? "Edit Task" : "Add Task"}
        centered
        open={taskModalOpen}
        footer={[
          <Button
            key="cancel"
            onClick={() => setTaskModalOpen(false)}
          >
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={handleSaveTask}
          >
            Save
          </Button>,
        ]}
        onCancel={() => setTaskModalOpen(false)}
      >
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="task-title">Task Title</label>
            <Input
              id="task-title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="task-description">Task Description</label>
            <Input.TextArea
              id="task-description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="task-status">Task Status</label>
            <Select
              id="task-status"
              value={taskStatus}
              onChange={(value) => setTaskStatus(value)}
            >
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskManager;
