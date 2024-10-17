import { Check, Circle, Download, Eye, Search, Square, Triangle } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Pack } from ".././Data"
import { Badge, Input } from "./Components"
import { GetLang, Language, TranstaletedText } from "./Lang/LangSys"
import { getLogoUrl } from './UserDialog'

import { BrowserView, isBrowser } from 'react-device-detect'
import { cn } from ".././Utils"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem
} from "./Command"
import { Button } from "./Components"
import { Image } from './Generic/Img'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./Generic/Popover"
interface CatalogProps {
  packs: Pack[]
  lang: Language
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedTags: string[]
  handleTagClick: (tag: string) => void
  selectedLoader: string | null
  setSelectedLoader: (loader: string | null) => void
  selectedVersions: string[]
  setSelectedVersions: (versions: string[]) => void
  setSelectedIgnio: (pack: Pack | null) => void
  setSelectedAuthor: (author: string | null) => void
  handleDownload: (version: Pack['versions'][0]) => void
}

function getName(author: string) {
  if (author.includes('github')) {
    return author.split('/').pop()
  }
  if (author.includes('twitter')) {
    return author.split('/').pop()
  }
  if (author.includes('linkedin')) {
    return author.split('/').pop()
  }
  if (author.includes('modrinth')) {
    return author.split('/').pop()
  }
  return author
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
  selectedVersions,
  setSelectedVersions,
  setSelectedIgnio,
  setSelectedAuthor,
  handleDownload,
}: CatalogProps) {

  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const defaultVersion = GetLang(lang, "placeholders.any");

  const filteredPacks = useMemo(() => packs.filter(pack => {
    const versionMatches = selectedVersions.length === 0 ||
      selectedVersions.includes(defaultVersion) ||
      pack.versions.some(v => selectedVersions.includes(v.version));
    
    const loaderMatches = selectedLoader === pack.loader || selectedLoader === defaultVersion ||  selectedLoader === null||
      (selectedLoader === "Mods" && ["Ignite", "Forge", "Fabric"].includes(pack.loader));

    const tagMatches = selectedTags.length === 0 ||
      pack.tags.some(tag => selectedTags.includes(tag));
    
    const nameMatches = pack.name.toLowerCase().includes(lowerCaseSearchTerm);

    return versionMatches && loaderMatches && tagMatches && nameMatches;
  }), [packs, selectedVersions, selectedLoader, selectedTags, lowerCaseSearchTerm]);

  const allTags = useMemo(() => {
    return Array.from(new Set(packs.flatMap(pack => pack.tags.filter(tag => !isVersionTag(tag)))))
      .sort((a, b) => a.localeCompare(b));
  }, [packs]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  return (
    <section className='dark:outline-transparent'>
      <SearchAndFilter
        lang={lang}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        allTags={allTags}
        selectedTags={selectedTags}
        handleTagClick={handleTagClick}
        selectedLoader={selectedLoader}
        setSelectedLoader={setSelectedLoader}
        loaders={['Resourcepack', 'Datapack', 'Mod', defaultVersion]}
        modLoaders={['Ignite', 'Fabric', 'Forge']}
        selectedVersions={selectedVersions}
        setSelectedVersions={setSelectedVersions}
        allVersions={["1.21.1", "1.21.0", "1.20.6", "1.20.5", "1.20.4", "1.20.2", "1.20.1", "1.19.4", defaultVersion]}
      />
      <PackGrid
        packs={filteredPacks}
        lang={lang}
        setSelectedIgnio={setSelectedIgnio}
        setSelectedAuthor={setSelectedAuthor}
        handleDownload={handleDownload}
      />
    </section>
  );
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
  modLoaders: string[]
  selectedVersions: string[]
  setSelectedVersions: (versions: string[]) => void
  allVersions: string[]
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
  modLoaders,
  selectedVersions,
  setSelectedVersions,
  allVersions
}: SearchAndFilterProps) {
  const [openVersion, setOpenVersion] = useState(false)
  const [openLoader, setOpenLoader] = useState(false)
  const [valueVersions, setValueVersions] = useState<string[]>(selectedVersions)
  const [valueLoader, setValueLoader] = useState<string | null>(selectedLoader)
  const [searchVersion, setSearchVersion] = useState<string>("")
  const [searchLoader, setSearchLoader] = useState<string>("")
  const [suggestedTags, setSuggestedTags] = useState<string[]>([])

  const handleVersionChange = (currentValue: string) => {
    const newValue = valueVersions.includes(currentValue)
      ? valueVersions.filter(v => v !== currentValue)
      : [...valueVersions, currentValue]
    setValueVersions(newValue)
    setSelectedVersions(newValue)
  }

  const handleLoaderChange = (currentValue: string) => {
    if(valueLoader === currentValue){
      setValueLoader(null)
      setSelectedLoader(null)
      return;
    }
    setValueLoader(currentValue)
    setSelectedLoader(currentValue)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    if (value === "") {
      setSuggestedTags([])
      return
    }

    const lastWord = value.split(' ').pop() || ''
    const matchingTags = allTags.filter(tag =>
      tag.toLowerCase().startsWith(lastWord.toLowerCase()) &&
      !selectedTags.includes(tag)
    )
    if (matchingTags.length > 10) {
      matchingTags.splice(10, matchingTags.length)
    }
    setSuggestedTags(matchingTags)
  }

  const handleTagSelection = (tag: string) => {
    handleTagClick(tag)
    const words = searchTerm.split(' ')
    words.pop()
    setSearchTerm(words.join(' ') + (words.length > 0 ? ' ' : '') + tag + ' ')
    setSuggestedTags([])
  }

  return (
    <div className="mb-6 dark:outline-transparent">
      <div className="flex flex-col items-start space-y-2 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
        <div className="flex items-center w-full">
          <Search className="focus:outline-none h-5 w-5 text-gray-400 dark:text-gray-500" />
          <Input
            type="text"
            placeholder={GetLang(lang, "search.placeholder")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="focus:outline-none flex-grow border-none focus:ring-0 bg-transparent text-black dark:text-white"
          />
        </div>
        {suggestedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestedTags.map(tag => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer bg-orange-200 text-orange-800 hover:bg-gray-300"
                onClick={() => handleTagSelection(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedTags.map(tag => (
          <Badge
            key={tag}
            variant="default"
            className="cursor-pointer bg-gray-300 text-orange-800"
            onClick={() => handleTagClick(tag)}
          >
            {tag} ✕
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        {/* Popover para seleccionar versiones */}
        <Popover open={openVersion} onOpenChange={setOpenVersion}>
          <PopoverTrigger asChild className="w-full bg-white dark:bg-gray-700 text-black dark:text-white dark:outline-transparent dark:border-transparent">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openVersion}
              className="w-full justify-between"
            >
              {valueVersions.length > 0
                ? valueVersions.join(", ")
                : GetLang(lang, "placeholders.selectVersion")}
              <Triangle className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full bg-white dark:bg-gray-700 text-black dark:text-white dark:outline-transparent dark:border-transparent">
            <Command>
              <CommandInput
                placeholder={GetLang(lang, "uploadForm.searchVersions")}
                onChange={(event) => setSearchVersion(event.currentTarget.value)}
                
              />
              <CommandGroup>
                {allVersions.filter((ver) => ver.includes(searchVersion)).map((version) => (
                  <CommandItem
                    key={version}
                    onSelect={() => handleVersionChange(version)}
                    
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        valueVersions.includes(version) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {version}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        {/* Popover para seleccionar loaders */}
        <Popover open={openLoader} onOpenChange={setOpenLoader}>
          <PopoverTrigger asChild className="w-full bg-white dark:bg-gray-700 text-black dark:text-white dark:outline-transparent dark:border-transparent">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openLoader}
              className="w-full justify-between"
            >
              {valueLoader || GetLang(lang, "placeholders.selectLoader")}
              <Square className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full bg-white dark:bg-gray-700 text-black dark:text-white dark:outline-transparent dark:border-transparent">
            <Command>
              <CommandInput
                placeholder={GetLang(lang, "uploadForm.searchLoaders")}
                onChange={(event) => setSearchLoader(event.currentTarget.value)}
              />
              <CommandGroup>
                {loaders.filter((loader) => loader.toLowerCase().includes(searchLoader.toLowerCase())).map((loader) => (
                  <CommandItem
                    key={loader}
                    onSelect={() => handleLoaderChange(loader)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        valueLoader === loader ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {loader}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

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
}

function PackGrid({ packs, lang, setSelectedIgnio, setSelectedAuthor, handleDownload }: PackGridProps) {
  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 dark:outline-transparent dark:border-transparent">
      {packs.map((pack, index) => (
        <PackCard
          key={index}
          pack={pack}
          lang={lang}
          setSelectedIgnio={setSelectedIgnio}
          setSelectedAuthor={setSelectedAuthor}
          handleDownload={handleDownload}
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
}

function getTagNoVersion(tags: string[], slot = 0) {
  let skips = 0;
  for(let i = 0; i < tags.length; i++) {
    //verify if a tag is a "version" tag x.x.x or x.x
    if(!tags[i].match(/(\d+\.\d+\.\d+|\d+\.\d+)/g)) {
      if(slot === 0){
        let ret = tags[i];
        //first letter to uppercase
        return ret.charAt(0).toLocaleUpperCase() + ret.slice(1);

      }else{
        if(skips === slot){
          let rete =  tags[i];
          return rete.charAt(0).toLocaleUpperCase() + rete.slice(1);
        }
        skips++;

      }
    }
  }

  return

}



const getLogoComponent = (author: string) => {
  let logoUrl = getLogoUrl(author)
  if (logoUrl) {
    return <img src={logoUrl} alt={author} className="w-8 h-8 rounded-full" />
  } else {
    return <div className="h-8 w-8 mr-2 bg-gray-200 dark:bg-gray-600 rounded-full" />
  }
}

function PackCard({ pack, lang, setSelectedIgnio, setSelectedAuthor, handleDownload }: PackCardProps) {
  const getImage = () => {
    //verify if image is invalid
    if(pack.banner === undefined || pack.banner === null){
      pack.banner = ""
    }

    return <div className="relative  duration-200 animate-fadeIn  flex-wrap">
      <Image src={pack.banner} 
      width={400}
      height={200}
      alt={pack.name}
      fallback= { <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg" className=' w-full h-[200px] object-cover'>
        <rect width="400" height="200" fill="#cccccc"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#666666" text-anchor="middle" dy=".3em">Placeholder</text>
      </svg>}
      className="h-[200px] object-cover  w-[400px]" /></div>;
  }

  return (
    <div className={`transform transition-all ${isBrowser ? "hover:scale 105" : ""} duration-300 animate-fadeIn bg-white dark:bg-gray-800 text-black dark:text-white dark:outline-transparent dark:border-transparent rounded-lg overflow-hidden shadow-lg max-w-md mx-auto`}>
      <div className="relative cursor-pointer overflow-hidden w-full h-[200px]" onClick={() => setSelectedIgnio(pack)} >
        {getImage()}
        <div className="absolute inset-0 bg-gradient-to-t dark:from-black from-white opacity-50" />
      </div>
      <div className="flex items-center p-4">
      {pack.logo ? (
            <img onClick={() => setSelectedIgnio(pack)}  src={pack.logo} alt={`${pack.name} logo`} height={64} width={64} className="cursor-pointer h-16 w-16 mr-2 rounded-lg" />
          ) : (
            <div onClick={() => setSelectedIgnio(pack)}  className="cursor-pointer h-16 w-16 mr-2 bg-gray-200 rounded-lg" />
          )}
          <div className="flex-grow">
            <h2 className="text-lg font-semibold line-clamp-2">{pack.name}</h2>
          <div className="flex flex-wrap object-cover space-x-2 text-sm text-gray-400">
            <Triangle className='fill-gray-400' scale="0.8"/><span>{pack.loader.charAt(0).toLocaleUpperCase() + pack.loader.slice(1)}</span>
            {getTagNoVersion(pack.tags)?<Square className='fill-gray-400 'scale="0.8"></Square>:(<span></span>)}<p>{getTagNoVersion(pack.tags)}</p>
            <BrowserView>
            {getTagNoVersion(pack.tags,1)?(<Circle className='fill-gray-400 'scale="0.8"/>):(<span></span>)}<p>{getTagNoVersion(pack.tags,1)}</p>
            </BrowserView>
          </div>
        </div>
      </div>
      <div className="p-4">
        <button onClick={() => handleDownload(pack.versions[0])} 
        
        className="w-full py-2 dark:bg-[#3b3f5c] bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold rounded-md">
        <TranstaletedText lang={lang} langPath={'buttons.downloadLatest'}/> ({pack.versions[0].version})
        </button>
      </div>
      <div className="flex items-center justify-between p-4 text-gray-400">
        <div className="flex items-center cursor-pointer" 
            onClick={(e) => {
              e.preventDefault()
              setSelectedAuthor(pack.author)
            }}>
          {getLogoComponent(pack.author)}
          <span className="ml-2">{getName(pack.author)}</span>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <Eye className="w-5 h-5" />
            <span className="ml-1">1</span>
          </div>
          <div className="flex items-center">
            <Download className="w-5 h-5" />
            <span className="ml-1">1</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function isVersionTag(tag: string) {
  return /^\d+(\.\d+)*$/.test(tag);
}