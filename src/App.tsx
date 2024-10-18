import React, { useEffect, useMemo, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { Catalog } from "./Components/Catalog"
import { Header } from "./Components/Header"
import { Footer, HomePage } from "./Components/HomePage"
import { MembersSection } from "./Components/MembersSection"
import { PackDialog } from "./Components/PackDialog"
import UploadForm from "./Components/UploadForm"
import { UserDialog } from "./Components/UserDialog"
import { GetPackData, Pack } from "./Data"
import { handleDownload, isVersionTag, useClientLanguage, useTagSelection } from "./Utils"

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [lang, setLang] = useClientLanguage()
  const { selectedTags, handleTagClick } = useTagSelection()
  const [selectedIgnio, setSelectedIgnio] = useState<Pack | null>(null)
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null)
  const [selectedLoader, setSelectedLoader] = useState<string | null>(null)
  const [selectedVersions, setSelectedVersions] = useState<string[]>([])
  const [, forceUpdate] = React.useReducer(x => x + 1, 0)

  const [mockPack, setMockPack] = useState<Pack[]>([])

  useMemo(() => {
    GetPackData(0, 100, setMockPack, [], forceUpdate)
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    // Check if there's a redirected path stored in localStorage
    const redirectedPath = localStorage.getItem("redirectedPath");
    if (redirectedPath) {
      // Navigate to the stored path
      navigate(redirectedPath);
      // Clear the redirected path from localStorage
      localStorage.removeItem("redirectedPath");
    } else {
      // Default navigation if no redirected path is found
      navigate('/contentshowup/');
    }
  }, []);
  return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        <Header lang={lang} setLang={setLang} />

        <main className="container mx-auto px-6 py-8 flex-grow overflow-auto custom-scrollbar">
          <Routes>
            <Route path="/contentshowup/" element={<HomePage lang={lang} />} />
            <Route path="/contentshowup/catalog" element={
              <Catalog
                packs={mockPack}
                lang={lang}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedTags={selectedTags}
                handleTagClick={handleTagClick}
                selectedLoader={selectedLoader}
                setSelectedLoader={setSelectedLoader}
                selectedVersions={selectedVersions}
                setSelectedVersions={setSelectedVersions}
                setSelectedIgnio={setSelectedIgnio}
                setSelectedAuthor={setSelectedAuthor}
                handleDownload={handleDownload}
              />
            } />
            <Route path="/contentshowup/members" element={<MembersSection packs={mockPack}lang={lang} />} />
            <Route path="/contentshowup/upload" element={<UploadForm lang={lang} />} />
          </Routes>
        </main>
        <Footer lang={lang} />

        <PackDialog 
          pack={selectedIgnio} 
          onOpenChange={() => setSelectedIgnio(null)} 
          open={!!selectedIgnio} 
          lang={lang} 
          download={handleDownload} 
          isVersionTag={isVersionTag}
        />

        <UserDialog
          isOpen={!!selectedAuthor}
          onClose={() => setSelectedAuthor(null)}
          authorUrl={selectedAuthor || ''}
          packs={mockPack}
        />
      </div>
  )
}