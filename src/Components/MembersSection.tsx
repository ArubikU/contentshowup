import { useState } from "react"
import { Pack } from "../Data"
import { Language, TranstaletedText } from "../LangSys"
import { UserDialog } from "./UserDialog"

type MembersSectionProps = {
  packs: Pack[]
  lang: Language
}

export function MembersSection({ packs,lang }: MembersSectionProps) {
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null)

  const authors = Array.from(new Set(packs.map(pack => pack.author)))

  const getLogoUrl = (author: string) => {
    if (author.includes('github')) {
      const authorName = author.split('/').pop()
      return "https://avatars.githubusercontent.com/" + authorName
    }
    if (author.includes('twitter')) {
      const authorName = author.split('/').pop()
      return "https://unavatar.vercel.app/twitter/" + authorName
    }
    if (author.includes('linkedin')) {
      const authorName = author.split('/').pop()
      return "https://unavatar.vercel.app/linkedin/" + authorName
    }
    if (author.includes('modrinth')) {
      const authorName = author.split('/').pop()
      let output = ""
      fetch(`https://api.modrinth.com/v2/user/${authorName}`)
      .then(res => res.json())
      .then(data => output = data.avatar_url)
      .catch(err => console.error("Error fetching user data:", err))
      return output
    }
  }

  const getLogoComponent = (author: string) => {
    let logoUrl = getLogoUrl(author)
    if (logoUrl) {
      return <img src={logoUrl} alt={author} className="w-10 h-10 rounded-full" />
    } else {
      return <div className="h-10 w-10 mr-2 bg-gray-200 dark:bg-gray-600 rounded-full" />
    }
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4"><TranstaletedText lang= {lang} langPath="placeholders.member" optional="Members"></TranstaletedText></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 dark:outline-transparent dark:border-transparent">
        {authors.map(author => {
          const authorName = author.split('/').pop()
          return (
            <div 
              key={author} 
              className="flex items-center space-x-2 cursor-pointer transform transition-all hover:scale-105 duration-300 animate-fadeIn"
              onClick={() => setSelectedAuthor(author)}
            >
              {getLogoComponent(author)}
              <span className="text-gray-900 dark:text-white">{authorName}</span>
            </div>
          )
        })}
      </div>
      <UserDialog 
        isOpen={!!selectedAuthor} 
        onClose={() => setSelectedAuthor(null)} 
        authorUrl={selectedAuthor || ''} 
        packs={packs} 
      />
    </section>
  )
}