import FilterOption from './FilterOption';
import TaskForm from './TaskForm';
import TodoItem from './TodoItem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function TodoMain({ 
  todos, 
  setTodo, 
  filterOption, 
  setFilterOption }) {

  function setFilter() {
    if (filterOption === 'Active') {
      return todos.filter(item => !item.completed);

    } else if(filterOption === 'Completed') {
      return todos.filter(item => item.completed);
      
    } else {
      return todos
    }
  }

  const moveTodo = (dragIndex, hoverIndex) => {
    const updatedTodos = todos.filter((_, index) => index !== dragIndex);
    const [draggedTodo] = todos.filter((_, index) => index === dragIndex);
    updatedTodos.splice(hoverIndex, 0, draggedTodo);
    setTodo(updatedTodos);
  };

  return (
  <div className='todo-container'>
    <TaskForm 
      todos={todos} 
      addTodoItem={setTodo}
    />
    <DndProvider backend={HTML5Backend}>
    <ul 
    className="todo-list">
      {
        setFilter().map((todo, index) => (
          <TodoItem
          key={todo.id}
          id={todo.id}
          index={index}
          todo_item={todo}
          moveTodo={moveTodo}
          updateTodo={setTodo}
          todos={todos}
          />
        ))}
    </ul>
    </DndProvider>
  <FilterOption 
      todos={todos}
      setFilter={setFilterOption}
      clearCompleted = {setTodo}
      count={setFilter().length} 
      />
      <span className='drag-text'>Drag and drop to reorder the list</span>
  </div>
  )
}
