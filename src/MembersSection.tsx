import { useState } from "react"
import { Pack } from "./Data"
import { UserDialog } from "./UserDialog"

type MembersSectionProps = {
  packs: Pack[]
}

export function MembersSection({ packs }: MembersSectionProps) {
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null)

  const authors = Array.from(new Set(packs.map(pack => pack.author)))

  const getLogoUrl = (author: string) => {
    //if github url
    if (author.includes('github')) {
      const authorName = author.split('/').pop()
      return "https://avatars.githubusercontent.com/" + authorName
    }
    //if twitter url
    if (author.includes('twitter')) {
      const authorName = author.split('/').pop()
      return "https://unavatar.vercel.app/twitter/" + authorName
    }
    //if linkedin url
    if (author.includes('linkedin')) {
      const authorName = author.split('/').pop()
      return "https://unavatar.vercel.app/linkedin/" + authorName
    }
    //if modrinth url
    //https://api.modrinth.com/v2/user/{id|username}
    if (author.includes('modrinth')) {
      const authorName = author.split('/').pop()
      //fetch(`https://api.modrinth.com/v2/user/${authorName}`) parse json and get avatar_url
      let output = ""
      let data = fetch(`https://api.modrinth.com/v2/user/${authorName}`)
      .then(res => res.json())
      .then(data => output = data.avatar_url)
      .catch(err => console.error("Error fetching user data:", err))
      return output

    }

  }

  const getLogoComponent = (author: string) => {
    let logoUrl = getLogoUrl(author)
    if (logoUrl) {
      //verify if is valid image parsing the url
      fetch(logoUrl)
      .then(res => res.blob())
      .then(blob => {
        let isValid = blob.type.startsWith('image')
        if (!isValid) {
          return <div className="h-10 w-10 mr-2 bg-gray-200 rounded-full" />
        }
      })
     
      return <img src={logoUrl} alt={author} className="w-10 h-10 rounded-full" />
    }else{
      return <div className="h-10 w-10 mr-2 bg-gray-200 rounded-full" />
    }
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-black mb-4">Members</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {authors.map(author => {
          const authorName = author.split('/').pop()
          return (
            <div 
              key={author} 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setSelectedAuthor(author)}
            >

            

              {getLogoComponent(author)}
              <span>{authorName}</span>
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