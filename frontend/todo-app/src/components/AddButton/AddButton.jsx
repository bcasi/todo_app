import "./AddButton.css";
import { FaPlus } from "react-icons/fa";

function AddButton({ handler }) {
  return (
    <button onClick={handler} className="add">
      <FaPlus /> Create New Todo
    </button>
  );
}

export default AddButton;
