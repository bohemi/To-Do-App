import { useState } from "react";

export default function TaskForm({ addItem, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Work");
  const [isTaskChecked, setIsTaskChecked] = useState(false);

  const sendSubmissionData = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addItem({
      id: Date.now(),
      title,
      description,
      type,
      isTaskChecked,
    });

    // reset to defaults
    setTitle("");
    setDescription("");
    setType("Work");
    setIsTaskChecked(false);
  };

  return (
    <form
      onSubmit={sendSubmissionData}
      className="bg-white p-4 rounded shadow-md max-w-xl"
    >
      <h1 className="text-xl font-bold mb-3">Add Task</h1>
      <div className="flex flex-col gap-2">
        <label>Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border"
        />

        <label>Description:</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border"
        />

        <label>Category:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border"
        >
          <option>Important</option>
          <option>Work</option>
          <option>Exercise</option>
          <option>Personal</option>
        </select>

        <div className="flex gap-2 mt-3">
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            ADD
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 rounded border"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}