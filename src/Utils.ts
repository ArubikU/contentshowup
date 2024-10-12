import { useEffect, useState } from 'react'
import { Pack } from './Data'
import { Language } from './LangSys'

export const useClientLanguage = () => {
  const [lang, setLang] = useState<Language>(Language.en)

  useEffect(() => {
    const clientLang = navigator.language.slice(0, 2)
    if (Object.values(Language).includes(clientLang as Language)) {
      setLang(clientLang as Language)
    }
  }, [])

  return [lang, setLang] as const
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