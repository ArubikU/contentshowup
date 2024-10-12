import { Github, Globe, Home, LibraryBig, Upload, Users } from "lucide-react"
import { BrowserView } from "react-device-detect"
import { useNavigate } from "react-router-dom"
import { Language, Placeholders } from ".././LangSys"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Components"
import { ThemeToggle } from "./ThemeToggle"

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export function Header({ lang, setLang }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="https://avatars.githubusercontent.com/u/80665664?s=48&v=4?height=32&width=32" alt={Placeholders.title + " Logo"} className="h-8 w-8 mr-2" />
            <BrowserView>
            <span className="text-xl font-bold text-gray-800 dark:text-white">{Placeholders.title}</span>
            </BrowserView>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector lang={lang} setLang={setLang} />
            <NavButton icon={<LibraryBig className="h-6 w-6" />} onClick={() => navigate('/contentshowup/catalog/#')} />
            <NavButton icon={<Users className="h-6 w-6" />} onClick={() => navigate('/contentshowup/members/#')} />
            <NavButton icon={<Github className="h-6 w-6" />} href={Placeholders.projectRepo} external />
            <NavButton icon={<Upload className="h-6 w-6" />} onClick={() => navigate('/contentshowup/upload/#')} />
            <NavButton icon={<Home className="h-6 w-6" />} onClick={() => navigate('/contentshowup/#')} />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}

function LanguageSelector({ lang, setLang }: HeaderProps) {
  return (
    <Select value={lang} onValueChange={(value) => setLang(value as Language)} >
      <SelectTrigger className="outline-transparent w-[180px] bg-white dark:bg-gray-800 text-black dark:text-white dark:border-slate-800">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent className="outline-transparent bg-white dark:bg-gray-800 text-black dark:text-white dark:border-slate-800">
        {Object.keys(Language).map((languageKey) => (
          <SelectItem key={languageKey} value={languageKey}>
            <div className="flex items-center ">
              <Globe className="mr-2 h-4 w-4" />
              <span>{languageKey.toLocaleUpperCase()}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface NavButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}

function NavButton({ icon, onClick, href, external }: NavButtonProps) {
  if (href) {
    return (
      <a 
        href={href} 
        target={external ? "_blank" : undefined} 
        rel={external ? "noopener noreferrer" : undefined}
        className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
      >
        {icon}
      </a>
    )
  }
  return (
    <button 
      onClick={onClick} 
      className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
    >
      {icon}
    </button>
  )
}