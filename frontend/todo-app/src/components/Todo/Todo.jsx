import "./Todo.css";
import { useEffect, useState } from "react";

function Todo({ todo, setTodo }) {
  async function getTodo() {
    try {
      const response = await fetch("http://localhost:3000/todo");
      const data = await response.json();
      console.log(data);
      setTodo(data.data); // assuming your API returns an array of todos
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  }

  async function updateTodo(id, isCompleted) {
    setTodo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
      ),
    );
    try {
      const response = await fetch("http://localhost:3000/updateTodo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, isCompleted: !isCompleted }),
      });
      const data = await response.json();
      console.log(data);
      // setTodo(data.data); // assuming your API returns an array of todos
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      await getTodo();
    };
    fetchTodos();
  }, []);

  return (
    <div className="todo">
      {todo.map((item) => (
        <div className="todoItem">
          <input
            onChange={() => updateTodo(item.id, item.isCompleted)}
            checked={item.isCompleted}
            type="checkbox"
            className="completed"
          />
          <div>{item.title}</div>
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  );
}

export default Todo;
