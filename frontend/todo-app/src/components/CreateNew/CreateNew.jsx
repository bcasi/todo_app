import { FaTimesCircle } from "react-icons/fa";
import "./CreateNew.css";
import { useState } from "react";

function CreateNew({ handler, setTodo }) {
  const [formData, setFormData] = useState({ title: "", description: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("formdata", formData);
    const response = await fetch("http://localhost:3000/createTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }), // sending data
    });

    const data = await response.json();
    setTodo(data);
    console.log("Server response:", data);
  }

  return (
    <div className="popup">
      <div className="close">
        <FaTimesCircle onClick={handler} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="title-container">
          <h2>Title:</h2>
          <input
            name="title"
            value={formData.name}
            onChange={handleChange}
            className="title"
            type="text"
          />
        </div>
        <div className="title-container">
          <h2>Description:</h2>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="description"
            type="text"
          />
        </div>
        <button type="submit" className="save">
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateNew;
