export default function CategoryFilter({setCategory, category}) {
  return (
    <label className="flex items-center gap-2 mb-4">
      <span>Select Category:</span>
      <select
        name="selectCategories"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-1 rounded"
      >
        <option value="All">All</option>
        <option value="Important">Important</option>
        <option value="Work">Work</option>
        <option value="Exercise">Exercise</option>
        <option value="Personal">Personal</option>
      </select>
    </label>
  );
}
