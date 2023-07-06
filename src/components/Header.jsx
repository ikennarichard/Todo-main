import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
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
    if (innerWidth < 1000) {
    backgroundImagePath = 'assets/bg-mobile-dark.jpg';
    } else if (innerWidth > 1000) {
      backgroundImagePath = 'assets/bg-desktop-dark.jpg';
  }
} 
  if (!isDarkMode) {
    if (innerWidth < 1000) {
    backgroundImagePath = 'assets/bg-mobile-light.jpg';
  } else {
    backgroundImagePath = 'assets/bg-desktop-light.jpg';
  }
}
  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImagePath})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <header style={backgroundImageStyle}>
      <h1>TODO</h1>
      <div>
        <img src={isDarkMode ? 
          'assets/icon-sun.svg' : 
          'assets/icon-moon.svg'} 
          alt="theme icon" 
          onClick={toggleDarkMode}
          />
      </div>
    </header>
  )
}