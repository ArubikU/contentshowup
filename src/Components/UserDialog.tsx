import { useEffect, useState } from "react"
import { Pack } from "../Data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Components"

type UserDialogProps = {
  isOpen: boolean
  onClose: () => void
  authorUrl: string
  packs: Pack[]
}
export const getLogoUrl = (author: string) => {
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


  const getLogoComponent = (author: string) => {
    let logoUrl = getLogoUrl(author)
    if (logoUrl) {
      return <img src={logoUrl} alt={author} className="w-24 h-24 rounded-full" />
    } else {
      return <div className="h-24 w-24 mr-2 bg-gray-200 dark:bg-gray-600 rounded-full" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <DialogHeader>
          <DialogTitle><p className="text-gray-900 dark:text-white">{userData?.name || "User"}</p></DialogTitle>
        </DialogHeader>
        {userData && (
          <div className="flex flex-col space-y-4">
            {getLogoComponent(authorUrl)}
            <p className="duration-300 animate-fadeIn text-gray-700 dark:text-gray-300">{userData.bio}</p>
            <h3 className="text-lg font-semibold duration-300 animate-fadeIn text-gray-900 dark:text-white">Packs by this author:</h3>
            <ul className="duration-300 animate-fadeIn text-gray-700 dark:text-gray-300">
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