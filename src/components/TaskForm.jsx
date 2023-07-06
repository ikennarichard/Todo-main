import { useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function TaskForm({ todos, addTodoItem }) {
  const [task, setTask] = useState('');
  const { isDarkMode } = useContext(ThemeContext);

  function handleChange(e) {
    // handle todo input
    setTask(e.target.value);
  }

  function handleSubmit(e) {
    // handle todo submission
    e.preventDefault();
    if(task) {
      const todo = {
        id: crypto.randomUUID(),
        item: task.trim(),
        completed: false,      
      }
      addTodoItem([todo, ...todos])
      setTask('');

    }
  }

  const styles = {
    backgroundColor: isDarkMode ? 'var(--very-dark-blue)' : 
    'white',
    color: isDarkMode ? 'var(--light-grayish-blue)' : 
    'var(--very-dark-grayish-blue)',
  }
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} style={styles}>
      <input 
        type="text" 
        placeholder="Create a new todo"
        className={`input-item ${isDarkMode ? 
        'light-gray' : 
        'dark-blue'}`
      }
        autoFocus
        value={task}
        onChange={handleChange} 
        />
        <button 
        className="custom-btn hover"
        type="submit"
        ></button>
      </form>
    </div>
  )
}
