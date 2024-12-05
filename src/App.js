import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      console.log("Parsed tasks loaded from localStorage:", parsedTasks);
      setTasks(parsedTasks);
    } else {
      console.log("No tasks found in localStorage.");
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      console.log("Saving tasks to localStorage:", tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      console.log("Tasks array is empty, nothing to save to localStorage.");
    }
  }, [tasks]);

  const handleInputChange = (e) => setTask(e.target.value);

  const handleAddTask = () => {
    if (!task) {
      console.log("No task entered.");
      return; // Prevent adding empty tasks
    }
    if (editId) {
      const updatedTasks = tasks.map((t) =>
        t.id === editId ? { id: t.id, text: task } : t
      );
      setTasks(updatedTasks);
      setEditId(null);
      console.log("Task updated:", updatedTasks);
    } else {
      const newTask = { id: Date.now(), text: task };
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      console.log("New task added:", newTasks);
    }
    setTask("");
  };

  const handleEditTask = (id) => {
    const currentTask = tasks.find((t) => t.id === id);
    setTask(currentTask.text);
    setEditId(id);
    console.log("Editing task:", currentTask);
  };

  const handleDeleteTask = (id) => {
    const remainingTasks = tasks.filter((t) => t.id !== id);
    setTasks(remainingTasks);
    console.log("Task deleted. Remaining tasks:", remainingTasks);
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      <input
        type="text"
        value={task}
        onChange={handleInputChange}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>
        {editId ? "Update Task" : "Add Task"}
      </button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <span>{t.text}</span>
            <div className="button-container">
              <button
                className="editclass"
                onClick={() => handleEditTask(t.id)}
              >
                Edit
              </button>
              <button
                className="deleteclass"
                onClick={() => handleDeleteTask(t.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
