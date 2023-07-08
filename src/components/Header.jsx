import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header({ getTheme }) {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let backgroundImagePath;
  
  if (isDarkMode) {
    if (innerWidth < 500) {
    backgroundImagePath = 'assets/bg-mobile-dark.jpg';
    } else {
      backgroundImagePath = 'assets/bg-desktop-dark.jpg';
  }
} 
  if (!isDarkMode) {
    if (innerWidth < 500) {
    backgroundImagePath = 'assets/bg-mobile-light.jpg';
  } else {
    backgroundImagePath = 'assets/bg-desktop-light.jpg';
  }
}
  const styles = {
    backgroundImage: `url(${backgroundImagePath})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  function handleToggle() {
    getTheme()
    toggleDarkMode()
  }

  const theme_icon ={
      filter: isDarkMode ?  'brightness(100%)' :
      'invert(90%) sepia(47%) saturate(639%) hue-rotate(197deg) brightness(95%) contrast(87%)',
      cursor: 'pointer',
  }

  return (
    <header style={styles}>
      <div className="heading-text">
      <h1>TODO</h1>
        <img src={isDarkMode ? 
          'assets/icon-sun.svg' : 
          'assets/icon-moon.svg'} 
          alt="theme icon" 
          style={theme_icon}
          onClick={handleToggle}
          />
      </div>
    </header>
  )
}