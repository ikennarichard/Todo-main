import FilterOption from './FilterOption';
import TaskForm from './TaskForm';
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function TodoMain({ 
  todos, 
  setTodo, 
  filterOption, 
  setFilterOption }) {

  const { isDarkMode } = useContext(ThemeContext);

  const styles = {
    display: 'flex',
    gap: '5px',
    alignItens: 'center',
    justifyContent: 'space-around',
    padding: '1em 1em',
    borderBottom: isDarkMode ? '0.7px solid var(--very-dark-grayish-blue-2)' : '0.7px solid var(--light-grayish-blue-light)',
    backgroundColor: isDarkMode ? 'var(--very-dark-desaturated-blue)' : 
    'white',
    transition: 'all 0.2s ease',
  }

  function removeItem(id) {
    setTodo([...todos.filter(todo => todo.id !== id )])
  }

  // toggle item completed
  function toggleCompleted(id) {
    setTodo((prevState) => prevState.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    }))
  }

  function setFilter() {
    if (filterOption === 'Active') {
      return todos.filter(item => !item.completed);

    } else if(filterOption === 'Completed') {
      return todos.filter(item => item.completed);
      
    } else {
      return todos
    }
  }

  return (
  <div className='todo-container'>
    <>
    <TaskForm 
      todos={todos} 
      addTodoItem={setTodo}
    />
    <ul className="todo-list">
      {
        setFilter().map(todo => (
          <li key={todo.id} 
          style={styles}>
              <button 
                className={todo.completed ? "custom-btn completed" : "custom-btn"}
                onClick={() => toggleCompleted(todo.id)}
              >
                {
                todo.completed ? <img src="assets/icon-check.svg" alt="check icon"/> : ""
                } 
              </button>
              <p className='todo-text' style={{
                color: isDarkMode ? 'var(--light-grayish-blue)' :
                'var(--very-dark-grayish-blue)'
              }}>
                  {todo.item}
              </p>

              <button 
              className='cancel-btn'
              onClick={() => removeItem(todo.id)}
              style={{ 
                cursor: 'pointer',
                filter: isDarkMode ? 'brightness(300%)' : '' 
              }}
              >
                <img 
                src='assets/icon-cross.svg' 
                alt='toggle completed icon'
                /> 
              </button>
        </li>
        ))
      }
    </ul>
  </>
  <FilterOption 
      todos={todos}
      setFilter={setFilterOption}
      clearCompleted = {setTodo}
      count={setFilter().length} 
      />

  </div>
  )
}
