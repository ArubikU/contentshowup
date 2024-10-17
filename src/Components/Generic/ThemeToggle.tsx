import { Globe, Moon, Sun } from 'lucide-react'
import React from 'react'
import { useTheme } from '../../ThemeContext'
import { Button } from '../Components'
import { Language } from '../Lang/LangSys'

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

export const LangSwitcher: React.FC<{ forceUpdate?: () => void, clientLang: [Language, (lang: Language) => void] }> = ({ forceUpdate, clientLang }) => {
  const { theme, toggleTheme } = useTheme()
  const [currentLanguage, onLanguageChange] = clientLang

  return (
    <Button variant="ghost" size="icon" onClick={

      ()=>{
        onLanguageChange((currentLanguage.toString() === 'en' ? 'es' : 'en') as Language)
        if(forceUpdate){
          forceUpdate()
        }
        console.log(currentLanguage)
      }
    }>
      {theme === 'light' ? (
        <Globe className="h-5 w-5 text-black dark:text-white" />
      ) : (
        <Globe className="h-5 w-5 text-black dark:text-white" />
      )}
      <span className="sr-only">{currentLanguage === 'en' ? "Switch to Spanish" : "Switch to English"}</span>
    </Button>
  )
}
