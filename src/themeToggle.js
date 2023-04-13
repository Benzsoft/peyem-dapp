import { useContext } from 'react';
import { ThemeContext } from './themeContext';

function ThemeToggle() {
  const currentTheme = useContext(ThemeContext);

  function toggleTheme() {}

  return <button onClick={toggleTheme}>Toggle Theme</button>;
}

export default ThemeToggle;
