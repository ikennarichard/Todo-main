import { ThemeContext } from "../context/ThemeContext";
import { useContext, useState , useEffect} from "react";

export default function FilterOption({ 
  todos, 
  setFilter, 
  clearCompleted,
  count, 
 }) {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isDarkMode, } = useContext(ThemeContext);

  function clearComplete() {
    clearCompleted(todos.filter(item => !item.completed))
  }

  function setOption(e) {
    setFilter(e.target.textContent.trim());
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filter_styles = {
    backgroundColor: windowWidth > 1000 ? 'transparent' : isDarkMode ?  
      'var( --very-dark-desaturated-blue)' : 'white', 
    color: isDarkMode ? 'var(--dark-grayish-blue)' : 'var(--dark-grayish-blue-light)'
  }

  return (
  <div className="filter-container">
    <div className="items-left" style={{
      backgroundColor: isDarkMode ? 'var(--very-dark-desaturated-blue)' :
      'white'
      ,
      color: isDarkMode ? 'var(--dark-grayish-blue-light)'
      : 'var(--dark-grayish-blue)',
      cursor: 'default',
    }}>
      <span>{count} item(s) left</span>

      <div className="filters"  style={filter_styles}>
      <button onClick={setOption}>All</button>
      <button onClick={setOption}>Active</button>
      <button onClick={setOption}>Completed</button>
    </div>
      <button className='complete' onClick={clearComplete}>
        Clear Completed
      </button>
    </div>
  </div>
  )
}
