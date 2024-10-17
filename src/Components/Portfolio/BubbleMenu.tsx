import { AnimatePresence, motion } from 'framer-motion'
import { Globe, Moon, Settings, Sun } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../../ThemeContext'
import { Language } from '../Lang/LangSys'

export default function BubbleMenu({ clientLang }: { clientLang: [Language, (lang: Language) => void] }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
  
    const [currentLanguage, onLanguageChange] = clientLang
    const { theme, toggleTheme } = useTheme()
    const isDarkMode = theme === 'dark'
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    
  
    return (
      <>
        <div className="fixed bottom-20 right-4 z-50">
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => {
                    toggleTheme()
                    toggleMenu()
                  }}
                  className="absolute bottom-16 right-0 w-12 h-12 rounded-full dark:bg-neutral-900 bg-white text-gray-600 dark:text-gray-300 flex items-center justify-center shadow-lg"
                  aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </motion.button>
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => {
                    onLanguageChange((currentLanguage.toString() === 'en' ? 'es' : 'en') as Language)
                    toggleMenu()
                  }}
                  className="absolute bottom-9 right-14 w-12 h-12 rounded-full dark:bg-neutral-900 bg-white text-gray-600 dark:text-gray-300 flex items-center justify-center shadow-lg"
                  aria-label={currentLanguage === 'en' ? "Switch to Spanish" : "Switch to English"}
                >
                  <Globe className="w-6 h-6" />
                </motion.button>
              </>
            )}
          </AnimatePresence>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className={`w-14 h-14 rounded-full dark:bg-neutral-900 bg-white text-gray-600 dark:text-gray-300 flex items-center justify-center shadow-lg ${isMenuOpen ? 'rotate-45' : ''} transition-transform duration-300`}
            aria-label="Toggle settings menu"
            aria-expanded={isMenuOpen}
          >
            <Settings className="w-8 h-8" />
          </motion.button>
        </div>
      </>
    )
  }