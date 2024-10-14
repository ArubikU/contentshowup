import { Github, Globe, Home, LibraryBig, Menu, Upload, Users, X } from "lucide-react"
import { useState } from "react"
import { BrowserView, MobileView } from "react-device-detect"
import { useNavigate } from "react-router-dom"
import { Language, Placeholders, TranstaletedText } from ".././LangSys"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Components"
import { Sheet, SheetContent, SheetTrigger } from "./Sheet"
import { ThemeToggle } from "./ThemeToggle"

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

function BrowserNavbar({ lang, setLang }: HeaderProps) {

  const navigate = useNavigate()

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={Placeholders.logo} alt={Placeholders.titlenav + " Logo"} className="h-8 mr-2" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">{Placeholders.titlenav}</span>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector lang={lang} setLang={setLang} />
            <NavButton icon={<LibraryBig className="h-6 w-6" />} onClick={() => navigate('/contentshowup/catalog/#')} />
            <NavButton icon={<Users className="h-6 w-6" />} onClick={() => navigate('/contentshowup/members/#')} />
            <NavButton icon={<Globe className="h-6 w-6" />} onClick={() => navigate('/contentshowup/portfolio/#')} />
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


export function MobileNavbar({ lang, setLang }: HeaderProps) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={Placeholders.logo} alt={Placeholders.titlenav + " Logo"} className="h-8 mr-2" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">{Placeholders.titlenav}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button onClick={() => navigate('/contentshowup/#')} >
              <Home className="h-6 w-6" />
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-6 w-6 outline-transparent w-[180px] bg-white dark:bg-gray-800 text-black dark:text-white dark:border-slate-800" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] outline-transparent w-[180px] bg-white dark:bg-gray-800 text-black dark:text-white dark:border-slate-800">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Menu</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="space-y-2 flex-grow">
                    <Button className = "w-full justify-start"onClick={() => navigate('/contentshowup/catalog/#')} ><LibraryBig className=" mr-2 h-4 w-4" /> <TranstaletedText lang={lang} langPath={"placeholders.catalog"} optional="Catalog" /></Button>
                    <Button className = "w-full justify-start"onClick={() => navigate('/contentshowup/members/#')} ><Users className=" text-sm mr-2 h-4 w-4" /><TranstaletedText lang={lang} langPath={"placeholders.members"} optional="Members" /></Button>
                    <Button className = "w-full justify-start"onClick={() => navigate('/contentshowup/portfolio/#')} ><Globe className=" text-sm mr-2 h-4 w-4" /><TranstaletedText lang={lang} langPath={"placeholders.portfolio"} optional="Portfolio" /></Button>
                    <Button className = "w-full justify-start"onClick={() => window.location.href = Placeholders.projectRepo} ><Github className=" text-sm mr-2 h-4 w-4" /><TranstaletedText lang={lang} langPath={"placeholders.repository"} optional="Repository" /></Button>
                    <Button className = "w-full justify-start"onClick={() => navigate('/contentshowup/upload/#')} ><Upload className=" text-sm mr-2 h-4 w-4" /><TranstaletedText lang={lang} langPath={"placeholders.upload"} optional="Upload" /></Button>
                  </div>
                  <div className="space-y-4 mt-auto pt-4 border-t">
                    <LanguageSelector lang={lang} setLang={setLang} />
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}

export function Header({ lang, setLang }: HeaderProps) {

  return (
    <>
    <BrowserView>
    <BrowserNavbar lang={lang} setLang={setLang} />
    </BrowserView>
    <MobileView>
    <MobileNavbar lang={lang} setLang={setLang} />
    </MobileView>
    </>
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