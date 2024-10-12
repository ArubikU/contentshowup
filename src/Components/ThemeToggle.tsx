import { Moon, Sun } from 'lucide-react'
import React from 'react'
import { useTheme } from '.././ThemeContext'
import { Button } from './Components'

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-black dark:text-white" />
      ) : (
        <Sun className="h-5 w-5 text-black dark:text-white" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}