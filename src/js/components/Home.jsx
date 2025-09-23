import React, { useState, useEffect } from "react";
import "../../styles/index.css";
//create your first component
const TodoList = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewtask] = useState("");
  const loadUser = async () => {
    const respons = await fetch(
      "https://playground.4geeks.com/todo/users/Sinuchi"
    );
    if (!respons.ok) {
      const respons = await fetch(
        "https://playground.4geeks.com/todo/users/Sinuchi",
        { method: "post" }
      );
      return;
    }
    const data = await respons.json();
    setTask(data.todos);
  };
  useEffect(() => {
    loadUser();
  }, []);
  const addTask = async (Event) => {
    if (Event.key === ("enter" && newTask.trim() !== "")) {
      const newTaskObject = { label: newTask, is_done: false };
      const resp = await fetch(
        "https://playground.4geeks.com/todo/todos/Sinuchi",
        {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringfy(newTaskObject),
        }
      );
      const data = await resp.json();
      setTask([...task, data]);
      setNewtask("");
    }
  };
  const deleteTask = async (taskId) => {
    try {
      await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
        method: "delete",
      });
      setTask(task.filter((task) => taskId !== task.id));
      console.log(`task with id ${taskId} deleted`);
    } catch (error) {
      console.error("error deleting task:", error);
    }
  };
  return (
    <div className="container">
      <h1 className="title">My To Do List</h1>
      <input
        type="text"
        placeholder="Things to do"
        value={newTask}
        onChange={(e) => setNewtask(e.target.value)}
        onKeyDown={addTask}
        className="task-input"
      />
      <ul className="task.list">
        {task.length === 0 ? (
          <li className="no-task">Add Task</li>
        ) : (
          task.map((task, index) => (
            <li key={index} className="task.item">
              {task.label}{" "}
              <button
                className="delete-button"
                onclick={() => deleteTask(task.id)}
              >
                X
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
export default TodoList;
