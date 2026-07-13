import "./Todo.css";
import { useEffect } from "react";

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

  async function updateTodo(id) {
    try {
      const response = await fetch("http://localhost:3000/updateTodo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, isCompleted: true }),
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
            onChange={() => updateTodo(item.id)}
            checked={item.isCompleted}
            type="checkbox"
            class="completed"
          />
          <div>{item.title}</div>
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  );
}

export default Todo;
