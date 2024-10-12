import { ChevronDown, Download, Search } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import { Pack } from ".././Data"
import { GetLang, Language } from ".././LangSys"
import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Collapsible, CollapsibleContent, CollapsibleTrigger, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Components"

interface CatalogProps {
  packs: Pack[]
  lang: Language
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedTags: string[]
  handleTagClick: (tag: string) => void
  selectedLoader: string | null
  setSelectedLoader: (loader: string | null) => void
  setSelectedIgnio: (pack: Pack | null) => void
  setSelectedAuthor: (author: string | null) => void
  handleDownload: (version: Pack['versions'][0]) => void
  isVersionTag: (tag: string) => boolean
}

export function Catalog({
  packs,
  lang,
  searchTerm,
  setSearchTerm,
  selectedTags,
  handleTagClick,
  selectedLoader,
  setSelectedLoader,
  setSelectedIgnio,
  setSelectedAuthor,
  handleDownload,
  isVersionTag
}: CatalogProps) {
  const filteredPacks = packs.filter(pack =>
    (pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pack.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedTags.length === 0 || selectedTags.every(tag => pack.tags.includes(tag))) &&
    (!selectedLoader || pack.loader === selectedLoader || selectedLoader === 'all')
  )

  const allTags = Array.from(new Set(packs.flatMap(pack => pack.tags)))
    .sort((a, b) => a.localeCompare(b))

  const loaders = Array.from(new Set(packs.map(pack => pack.loader)))

  return (
    <section className='dark:outline-transparent'>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{GetLang(lang, "mainPage.disponibleContent")}</h2>
      <SearchAndFilter
        lang={lang}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        allTags={allTags}
        selectedTags={selectedTags}
        handleTagClick={handleTagClick}
        selectedLoader={selectedLoader}
        setSelectedLoader={setSelectedLoader}
        loaders={loaders}
        isVersionTag={isVersionTag}
      />
      <PackGrid
        packs={filteredPacks}
        lang={lang}
        setSelectedIgnio={setSelectedIgnio}
        setSelectedAuthor={setSelectedAuthor}
        handleDownload={handleDownload}
        isVersionTag={isVersionTag}
      />
    </section>
  )
}

interface SearchAndFilterProps {
  lang: Language
  searchTerm: string
  setSearchTerm: (term: string) => void
  allTags: string[]
  selectedTags: string[]
  handleTagClick: (tag: string) => void
  selectedLoader: string | null
  setSelectedLoader: (loader: string | null) => void
  loaders: string[]
  isVersionTag: (tag: string) => boolean
}

function SearchAndFilter({
  lang,
  searchTerm,
  setSearchTerm,
  allTags,
  selectedTags,
  handleTagClick,
  selectedLoader,
  setSelectedLoader,
  loaders,
  isVersionTag
}: SearchAndFilterProps) {
  return (
    <div className="mb-6 dark:outline-transparent">
      <div className="flex items-center space-x-2 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
        <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        <Input
          type="text"
          placeholder={GetLang(lang, "search.placeholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow border-none focus:ring-0 bg-transparent text-black dark:text-white"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className={`cursor-pointer ${selectedTags.includes(tag)
              ? (isVersionTag(tag)
                ? 'bg-gray-400 text-green-800'
                : 'bg-gray-300 text-orange-800')
              : isVersionTag(tag)
                ? 'bg-green-200 text-green-800 hover:bg-gray-400'
                : 'bg-orange-200 text-orange-800 hover:bg-gray-300'
              }`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 dark:outline-transparent dark:border-transparent">
        <Select value={selectedLoader || ''} onValueChange={setSelectedLoader}>
          <SelectTrigger className="w-[180px] mt-4 bg-white dark:bg-gray-700 text-black dark:text-white dark:outline-transparent dark:border-transparent">
            <SelectValue placeholder={GetLang(lang,"uploadForm.selectLoader")}/>
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-700 dark:outline-transparent dark:border-transparent">
            <SelectItem className="text-right bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" value="all">{GetLang(lang,"search.allLoaders")}</SelectItem>
            {loaders.map(loader => (
              <SelectItem className="text-right bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" key={loader} value={loader}>{loader}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

interface PackGridProps {
  packs: Pack[]
  lang: Language
  setSelectedIgnio: (pack: Pack | null) => void
  setSelectedAuthor: (author: string | null) => void
  handleDownload: (version: Pack['versions'][0]) => void
  isVersionTag: (tag: string) => boolean
}

function PackGrid({ packs, lang, setSelectedIgnio, setSelectedAuthor, handleDownload, isVersionTag }: PackGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 dark:outline-transparent dark:border-transparent">
      {packs.map((pack, index) => (
        <PackCard
          key={index}
          pack={pack}
          lang={lang}
          setSelectedIgnio={setSelectedIgnio}
          setSelectedAuthor={setSelectedAuthor}
          handleDownload={handleDownload}
          isVersionTag={isVersionTag}
        />
      ))}
    </div>
  )
}

interface PackCardProps {
  pack: Pack
  lang: Language
  setSelectedIgnio: (pack: Pack | null) => void
  setSelectedAuthor: (author: string | null) => void
  handleDownload: (version: Pack['versions'][0]) => void
  isVersionTag: (tag: string) => boolean
}

function PackCard({ pack, lang, setSelectedIgnio, setSelectedAuthor, handleDownload, isVersionTag }: PackCardProps) {
  return (
    <Card className="transform transition-all hover:scale-105 duration-300 animate-fadeIn bg-white dark:bg-gray-800 text-black dark:text-white dark:outline-transparent dark:border-transparent">
      <CardHeader>
        <CardTitle onClick={() => setSelectedIgnio(pack)} className="flex items-center cursor-pointer text-black dark:text-white">
          {pack.logo ? (
            <img src={pack.logo} alt={`${pack.name} logo`} className="h-6 w-6 mr-2 rounded-lg" />
          ) : (
            <div className="h-6 w-6 mr-2 bg-gray-200 rounded-lg" />
          )}
          {pack.name}
        </CardTitle>
        <CardDescription>
          <a href={pack.repository} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
            {GetLang(lang, "buttons.viewRepository")}
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {pack.shortDesc && <p className="mb-4 line-clamp-3 cursor-pointer text-gray-600 dark:text-gray-300">{pack.shortDesc}</p>}
        <p>
          <strong>{GetLang(lang, "placeholders.author")+" "}</strong>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setSelectedAuthor(pack.author)
            }}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {GetLang(lang, "buttons.viewProfile")}
          </a>
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {pack.tags.map(tag => (
            <Badge key={tag} variant="secondary" className={`duration-300 animate-fadeIn ${isVersionTag(tag) ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'}`}>{tag}</Badge>
          ))}
        </div>
        <Collapsible className="mt-4">
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <span className="font-semibold">{GetLang(lang, "placeholders.versions")}</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <ul className="space-y-2">
              {pack.versions.map((version, vIndex) => (
                <li key={vIndex} className="flex items-center justify-between">
                  <span>{version.version}</span>
                  <Button 
                    className="hover:bg-gray-200 dark:hover:bg-gray-700" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDownload(version)} 
                    data-tooltip-id={`${version.file.raw}-${version.version}`} 
                    data-tooltip-content={version.file.extra || version.file.raw.split("/").pop().replaceAll("%20"," ")}
                  >
                    <Download className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{GetLang(lang, "buttons.download")}</span>
                  </Button>
                  <Tooltip place="top-end" id={`${version.file.raw}-${version.version}`} className="z-auto" />
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="dark:outline-transparent dark:border-transparent w-full bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 " onClick={() => handleDownload(pack.versions[0])}>
          {GetLang(lang, "buttons.downloadLatest")} ({pack.versions[0].version})
        </Button>
      </CardFooter>
    </Card>
  )
}