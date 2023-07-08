import { styled } from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const DraggableItem = styled.li`
display: flex;
gap: 5px;
align-items: center;
justify-content: space-around;
padding: 1em 1em;
border-bottom: ${({ theme }) => theme.isDarkMode ? '0.7px solid var(--very-dark-grayish-blue-2)' : '0.7px solid var(--light-grayish-blue-light)'};
background-color: ${({ theme }) => theme.isDarkMode ? 'var(--very-dark-desaturated-blue)' : 'white'};
transition: all 0.2s ease;
`;

export default function TodoItem({
    id, 
    index, 
    todo_item, 
    todos, 
    moveTodo, 
    updateTodo
}) {
    const theme = useContext(ThemeContext)
    const ref = useRef(null);
    const { isDarkMode } = useContext(ThemeContext);

    function removeItem(id) {
      updateTodo([...todos.filter(item => item.id !== id )])
    }
  
    // toggle item completed
    function toggleCompleted(id) {
      updateTodo((prevState) => prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed
          }
        }
        return item
      }))
    }

    const [{ isDragging }, drag] = useDrag({
      type: 'TODO',
      item: { id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const [, drop] = useDrop({
      accept: 'TODO',
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
  
        const dragIndex = item.index;
        const hoverIndex = index;
  
        if (dragIndex === hoverIndex) {
          return;
        }
  
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2.5;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
  
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
  
        moveTodo && moveTodo(dragIndex, hoverIndex);
  
        item.index = hoverIndex;
      },
    });
  
    drag(drop(ref));

    return (
    <DraggableItem
      theme={theme}
      ref={ref}
      style={{ 
        opacity: isDragging ? 0.8 : 1,
        border: isDragging ? '1px solid var(--bright-blue)': '', 
      }
    }
    >
        <button 
          className={todo_item.completed ? "custom-btn completed" : "custom-btn"}
          onClick={() => toggleCompleted(todo_item.id)}
        >
          {
          todo_item.completed ? <img src="assets/icon-check.svg" alt="check icon"/> : ""
          } 
        </button>
        <p className='todo-text' style={{
          color: isDarkMode ? 'var(--light-grayish-blue)' :
          'var(--very-dark-grayish-blue)'
        }}>
            {todo_item.item}
        </p>

        <button 
        className='cancel-btn'
        onClick={() => removeItem(todo_item.id)}
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
  </DraggableItem>
    )
  }