import { useState } from "react";
import "./App.css";
import AddButton from "./components/AddButton/AddButton";
import Todo from "./components/Todo/Todo";
import CreateNew from "./components/CreateNew/CreateNew";

function App() {
  const [isCreate, setIsCreate] = useState(false);
  const [todo, setTodo] = useState([]);
  function handleIsCreate() {
    setIsCreate((create) => !create);
  }
  return (
    <div>
      <AddButton handler={handleIsCreate} />
      {isCreate && <CreateNew setTodo={setTodo} handler={handleIsCreate} />}
      <Todo todo={todo} setTodo={setTodo} />
    </div>
  );
}

export default App;
