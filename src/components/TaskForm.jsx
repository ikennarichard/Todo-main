import { useState } from "react";

export default function TaskForm({ todos, addTodoItem }) {
  const [task, setTask] = useState('');

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
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button 
        className="custom-btn hover"
        type="submit"
        ></button>
      <input 
        type="text" 
        placeholder="Create a new todo"
        className="input-item"
        autoFocus
        value={task}
        onChange={handleChange} 
        />
      </form>
    </div>
  )
}
