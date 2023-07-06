import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function FilterOption({ 
  todos, 
  setFilter, 
  clearCompleted,
  count, 
 }) {

  const { isDarkMode, } = useContext(ThemeContext);

  function clearComplete() {
    clearCompleted(todos.filter(item => !item.completed))
  }

  function setOption(e) {
    setFilter(e.target.textContent.trim());
  }

  return (
  <div className="filter-container">
    <div className="items-left" style={{
      backgroundColor: isDarkMode ? 'var(--very-light-gray)'
      : 'var(--very-dark-blue)',
      color: isDarkMode ? 'var(--dark-grayish-blue-light)'
      : 'var(--dark-grayish-blue)',
    }}>
      <span>{count} item(s) left</span>
      <button onClick={clearComplete}>
        Clear Completed
      </button>
    </div>
      
    <div className="filters"  style={{
      backgroundColor: isDarkMode ? 'var(--very-light-gray)'
      : 'var(--very-dark-blue)',
      color: isDarkMode ? 'var(--dark-grayish-blue-light)'
      : 'var(--dark-grayish-blue)',
    }}>
      <button onClick={setOption}>All</button>
      <button onClick={setOption}>Active</button>
      <button onClick={setOption}>Completed</button>
    </div>
  </div>
  )
}
