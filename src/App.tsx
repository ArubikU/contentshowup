import { ChevronDown, Download, ExternalLink, Eye, Github, Globe, Search, Upload } from "lucide-react"
import { useEffect, useState } from "react"
import { Tooltip } from 'react-tooltip'
import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Collapsible, CollapsibleContent, CollapsibleTrigger, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Components"
import { Pack, mockPack } from "./Data"
import { GetLang, GetLangArray, Language, Placeholders } from "./LangSys"
export default function App() {
  const [ignios, setIgnios] = useState<Pack[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showIgnios, setShowIgnios] = useState(false)
  const [lang, setLang] = useState<Language>(Language.en)
  const [selectedIgnio, setSelectedIgnio] = useState<Pack | null>(null)

  useEffect(() => {
    const clientLang = navigator.language.slice(0, 2)
    if (Object.values(Language).includes(clientLang as Language)) {
      setLang(clientLang as Language)
    }
  }, [])

  const loadIgnios = () => {
    setIgnios(mockPack)
  }

  useEffect(() => {
    loadIgnios()
  }, [])

  const handleDownload = (version: Pack['versions'][0]) => {
    if (version.file.type === "LINK") {
      // Open the link in a new tab
      window.open(version.file.raw, '_blank');
    } else if (version.file.type === "URI") {
      const uriData = version.file.raw; // Base64 or URI data
      const fileName = version.file.extra; // Suggested filename
  
      // Create a temporary link element
      const downloadLink = document.createElement('a');
      downloadLink.href = uriData;
      downloadLink.download = fileName;
  
      // Trigger the download by programmatically clicking the link
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      // Clean up: remove the link after downloading
      document.body.removeChild(downloadLink);
    }
  };
  
  const filteredIgnios = ignios.filter(Pack =>
    (Pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Pack.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedTags.length === 0 || selectedTags.every(tag => Pack.tags.includes(tag)))
  )

  const allTags = Array.from(new Set(ignios.flatMap(Pack => Pack.tags)))
    .sort((a, b) => a.localeCompare(b))

  const isVersionTag = (tag: string) => /^\d+(\.\d+)*$/.test(tag)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="https://avatars.githubusercontent.com/u/80665664?s=48&v=4?height=32&width=32" alt={Placeholders.title + " Logo"} className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold text-gray-800 dark:text-black">{Placeholders.title}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={lang} onValueChange={(value) => setLang(value as Language)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-white">

                  {Object.keys(Language).map((languageKey) => (
                    <SelectItem key={languageKey} value={languageKey}>
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        <span>{GetLang(lang, `language.${languageKey}`)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <a href={Placeholders.projectRepo} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
                <Github className="h-6 w-6 text-black" />
              </a>
              <a href="/upload" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
                <Upload className="h-6 w-6 text-black" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8 flex-grow overflow-auto custom-scrollbar">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-black mb-4">{GetLang(lang, "mainPage.title")}</h1>
          <p className="text-xl text-gray-600 dark:text-black-300 mb-8">{GetLang(lang, "mainPage.subtitle")}</p>
          <Button className="text-white bg-black" onClick={() => setShowIgnios(!showIgnios)} size="lg">
            <Eye className="mr-2 h-5 w-5 " />
            {showIgnios ? GetLang(lang, "buttons.hideContent") : GetLang(lang, "buttons.showContent")}
          </Button>
        </section>

        <div className={`transition-all duration-500 ease-in-out ${showIgnios ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-black mb-4">{GetLang(lang, "mainPage.disponibleContent")}</h2>
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4 bg-white rounded-lg shadow-md p-2">
                <Search className="h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={GetLang(lang, "search.placeholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow border-none focus:ring-0"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer ${isVersionTag(tag) ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'}`}
                    onClick={() => setSelectedTags(prev =>
                      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                    )}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIgnios.map((Pack, index) => (
                <Card key={index} className="transform transition-all duration-300 hover:scale-105 animate-fadeIn">
                  <CardHeader>
                    <CardTitle className="flex items-center cursor-pointer" onClick={() => setSelectedIgnio(Pack)}>
                      {Pack.logo ? (
                        <img src={Pack.logo} alt={`${Pack.name} logo`} className="h-6 w-6 mr-2" />
                      ) : (
                        <div className="h-6 w-6 mr-2 bg-gray-200 rounded-full" />
                      )}
                      {Pack.name}
                    </CardTitle>
                    <CardDescription>
                      <a href={Pack.repository} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                        {GetLang(lang, "buttons.viewRepository")}
                      </a>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 line-clamp-3 cursor-pointer" onClick={() => setSelectedIgnio(Pack)}>
                      <strong>{GetLang(lang, "placeholders.description")}</strong> {Pack.description}
                    </p>
                    <p><strong>{GetLang(lang, "placeholders.author")}</strong> <a href={Pack.author} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">{GetLang(lang, "buttons.viewProfile")}</a></p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Pack.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className={isVersionTag(tag) ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'}>{tag}</Badge>
                      ))}
                    </div>
                    <Collapsible className="mt-4">
                      <CollapsibleTrigger className="flex items-center justify-between w-full">
                        <span className="font-semibold">{GetLang(lang, "placeholders.versions")}</span>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <ul className="space-y-2">
                          {Pack.versions.map((version, vIndex) => (
                            <li key={vIndex} className="flex items-center justify-between">
                              <span>{version.version}</span>
                              <Button variant="ghost" size="sm" onClick={() => handleDownload(version)} data-tooltip-id={version.file.raw+version} data-tooltip-content={version.file.extra || version.file.raw.split("/").pop()} >
                                <Download className="h-4 w-4 mr-2" />
                                {GetLang(lang, "buttons.download")}
                              </Button>
                              <Tooltip place="top-end" id = {version.file.raw+version} className="z-auto"/>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => handleDownload(Pack.versions[0])}>
                      {GetLang(lang, "buttons.downloadLatest")} ({Pack.versions[0].version})
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

        </div>
      </main>


      <footer className="bg-red">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-2">
          <div className="">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-black mb-4 text-center">{GetLang(lang, "faq.title")}</h2>
            <h1 className="">
              {GetLangArray(lang, "faq.items").map((item, index) => (
                <Collapsible className="mt-4 container mx-auto">
                  <CollapsibleTrigger className="flex  justify-between w-full">
                    <span className="font-semibold">{item.question}</span>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 transition-all duration-300 animate-fadeIn">
                    <span> {item.answer}</span>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </h1>
          </div>
        </div>
      </footer>

      <footer className="bg-white shadow mt-12">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-black-600 dark:text-black-300">
            {GetLang(lang, "placeholders.disclaimer")} <a href={Placeholders.authorUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">{Placeholders.author}</a>.
          </p>
        </div>
      </footer>

      <Dialog open={!!selectedIgnio} onOpenChange={() => setSelectedIgnio(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle>{selectedIgnio?.name}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="flex flex-col space-y-4">
              <div className="relative w-full h-64">

                {
                  selectedIgnio?.logo ? (
                    <img src={selectedIgnio?.logo} alt={`${selectedIgnio?.name} logo`} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg" />
                  )
                }

              </div>
              <p className="text-lg">{selectedIgnio?.description}</p>
              <div>
                <h4 className="font-semibold mb-2">{GetLang(lang, "placeholders.tags")}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIgnio?.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className={isVersionTag(tag) ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'}>{tag}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{GetLang(lang, "placeholders.versions")}</h4>
                <Select onValueChange={(value) => {
                  const version = selectedIgnio?.versions.find(v => v.version === value);
                  if (version) handleDownload(version);
                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={GetLang(lang, "placeholders.selectVersion")} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedIgnio?.versions.map((version, index) => (
                      <SelectItem className="bg-white outline-transparent" key={index} value={version.version}>
                        {version.version}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{GetLang(lang, "placeholders.links")}</h4>
                <div className="flex  space-x-4">
                  <a href={selectedIgnio?.repository} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:text-blue-600">
                    <Github className="h-5 w-5 mr-2" />
                    {GetLang(lang, "buttons.viewRepository")}
                  </a>
                  <a href={selectedIgnio?.author} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:text-blue-600">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    {GetLang(lang, "buttons.viewProfile")}
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{GetLang(lang, "placeholders.comments")}</h4>
                <p className="text-sm text-gray-500">{GetLang(lang, "placeholders.commentsComingSoon")}</p>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}