import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Components"
import { Pack } from "./Data"

type UserDialogProps = {
  isOpen: boolean
  onClose: () => void
  authorUrl: string
  packs: Pack[]
}

export function UserDialog({ isOpen, onClose, authorUrl, packs }: UserDialogProps) {
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    if (isOpen && authorUrl) {
      // Extract username from GitHub URL
      const username = authorUrl.split('/').pop()
      fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then(data => setUserData(data))
        .catch(err => console.error("Error fetching user data:", err))
    }
  }, [isOpen, authorUrl])

  const authorPacks = packs.filter(pack => pack.author === authorUrl)

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
          return <div className="h-24 w-24 mr-2 bg-gray-200 rounded-full" />
        }
      })
     
      return <img src={logoUrl} alt={author} className="w-10 h-10 rounded-full" />
    }else{
      return <div className="h-24 w-24 mr-2 bg-gray-200 rounded-full" />
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{userData?.name || "User"}</DialogTitle>
        </DialogHeader>
        {userData && (
          <div className="flex flex-col space-y-4">
            {getLogoComponent(authorUrl)}
            <p>{userData.bio}</p>
            <h3 className="text-lg font-semibold">Packs by this author:</h3>
            <ul>
              {authorPacks.map(pack => (
                <li key={pack.name}>{pack.name}</li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}