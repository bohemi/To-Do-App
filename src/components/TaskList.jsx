import TaskItem from "./TaskItem";

export default function TaskList({ tasks, removeButton, taskDoneCheckBox }) {
  // tasks are filtered items from app.jsx
  if (!tasks || tasks.length === 0) {
    return <p>No tasks to show</p>;
  }

  return (
    <div className="m-auto w-1/2">
      {tasks.map((task) => (
        <div className="p-2 hover:p-4"
          key={task.id}
        >
          <TaskItem
            task={task}
            removeButton={removeButton}
            taskDoneCheckBox={taskDoneCheckBox}
          />
        </div>
      ))}
    </div>
  );
}
