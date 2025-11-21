export default function TaskItem({ task, removeButton, taskDoneCheckBox }) {
  return (
    <div
      className="p-2 rounded bg-blue-300"
      key={task.id}
    >
      <div className={`p-1 ${task.isTaskChecked ? "bg-green-100 line-through" : "underline"}`}>
        <h2 className="font-bold">{task.type}</h2>
        <h3 className="">{task.title}</h3>
        <h3 className="">{task.description}</h3>
      </div>
      <div className="pt-1 flex justify-between">
        <input
        // React checkbox needs a true or false, not undefined.
        checked = {!!task.isTaskChecked}
          onChange={() => taskDoneCheckBox(task.id)}
          type="checkbox"
        />
      <button
        className="p-1 bg-red-500 text-white rounded"
        onClick={() => removeButton(task.id)}
      >
        Remove
      </button>

      </div>
    </div>
  );
}
