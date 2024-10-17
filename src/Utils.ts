import { type ClassValue, clsx } from "clsx"
import { useEffect, useState } from 'react'
import { twMerge } from "tailwind-merge"
import { Language } from './Components/Lang/LangSys'
import { Pack } from './Data'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const useClientLanguage = () => {
  const [lang, setLang] = useState<Language>(Language.en)

  useEffect(() => {

    // Get the language from localStorage
    const storedLang = localStorage.getItem('lang')
    if (storedLang && Object.values(Language).includes(storedLang as Language)) {
      setLang(storedLang as Language)
    }else{

      const clientLang = navigator.language.slice(0, 2)
      if (Object.values(Language).includes(clientLang as Language)) {
        setLang(clientLang as Language)
      }
    }

  }, [])

  useEffect(() => {
    // Save the language to localStorage
    localStorage.setItem('lang', lang)
  }, [lang])

  return [lang, setLang] as const
}

export const useEffectLang = (lang: Language, callback: () => void) => {
  useEffect(() => {
    callback()
  }, [lang])
}

export const useDocument = (header?: string, favicon?: string) => {
  const [head, setHead] = useState<string | undefined>(header || document.title)
  const [icon, setIcon] = useState<string | undefined>(favicon || (document.querySelector("link[rel~='icon']") as HTMLLinkElement)?.href)

  useEffect(() => {
    if (head) {
      document.title = head
    }
  }, [head])
  useEffect(() => {
    if (icon) {
      const link = document.createElement('link')
      link.rel = 'icon'
      link.href = icon
      document.head.appendChild(link)
    }
  }
    , [icon])
  return [setHead, setIcon] as const
}


export const handleDownload = (version: Pack['versions'][0]) => {
  if (version.file.type === "LINK") {
    window.open(version.file.raw, '_blank')
  } else if (version.file.type === "URI") {
    const downloadLink = document.createElement('a')
    downloadLink.href = version.file.raw
    downloadLink.download = version.file.extra || 'download'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
}

export const isVersionTag = (tag: string) => /^\d+(\.\d+)*$/.test(tag)

export const useTagSelection = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag)
      } else {
        return [tag, ...prev]
      }
    })
  }

  return { selectedTags, handleTagClick }
}