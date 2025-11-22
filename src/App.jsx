import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import CategoryFilter from "./components/CategoryFilter";

function App() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("All");

  // Load from localStorage once on mount
  useEffect(() => {
    const rawData = localStorage.getItem("items");
    if (rawData) {
      try {
        const parsed = JSON.parse(rawData);
        console.log(parsed);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch (err) {
        console.error("Failed to parse saved items:", err);
      }
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() =>{
    if (items.length > 0) {
      localStorage.setItem("items", JSON.stringify(items));
      
    } else {
      localStorage.removeItem("items");
    }
  }, [items]);

  const addItem = (task) => {
    // a safety block for local storage if we get wrong data in any case
    const newTask = {
      id: Date.now(),
      title: task.title || "",
      description: task.description || "",
      type: task.type || "Work",
      isTaskComplete: !!task.isTaskComplete,
    };
    setItems((prev) => [...prev, newTask]);
    setShowForm(false);
  };

  const removeTask = (taskId) => {
    setItems(items.filter((a) => a.id !== taskId));
  };

  const toggleTaskDone = (taskId) => {
    setItems((prev) =>
      // map every item and change items complete property to taskId. now here, mapping will run
      // on all items despite being item found. Re-render will not happen since we are giving back
      // the same values untill we find the taskId and change its value then we give the new value to re-render.
      prev.map((item) =>
        item.id === taskId
          ? { ...item, isTaskChecked: !item.isTaskChecked }
          : item
      )
    );
  };

  // normalizing so capital and small word will not cause error
  // not modifying the state iteself but modifying the value of state in other variable
  const normalizedCategory = category.toLowerCase();

  // filtering items based on the current category so, during the return only the
  // filtered category items will be shown
  const filteredItems =
    normalizedCategory === "all"
      ? items
      : items.filter(
          (it) => (it.type || "").toLowerCase() === normalizedCategory
        );

  return (
    <div className="bg-blue-400 min-h-screen p-4">
      <div className="mb-4">
        {showForm ? (
          <TaskForm addItem={addItem} onCancel={() => setShowForm(false)} />
        ) : (
          <button
            className="p-2 bg-blue-600 text-white rounded"
            onClick={() => setShowForm(true)}
          >
            ADD
          </button>
        )}
      </div>
      <CategoryFilter setCategory={setCategory} category={category} />
      <div className="mt-4 bg-blue-500 rounded p-2 w-1/2 m-auto">
        <TaskList
          tasks={filteredItems}
          removeButton={removeTask}
          taskDoneCheckBox={toggleTaskDone}
        />
      </div>
    </div>
  );
}

export default App;
