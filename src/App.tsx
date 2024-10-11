
import { ChevronDown, Download, Eye, Github, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Collapsible, CollapsibleContent, CollapsibleTrigger, Input } from "./Components"

export type Iginio = {
  name: string
  repository: string
  description: string
  versions: {
    version: string
    file: {
      type: "BIN" | "LINK"
      raw: string
      extra?: string
    }
  }[]
  author: string
  logo?: string
  tags: string[]
}

export default function App() {
  const [ignios, setIgnios] = useState<Iginio[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showIgnios, setShowIgnios] = useState(false)

  const loadIgnios = () => {
    // This is a mock implementation. In a real scenario, you'd load the ignios from an API or local storage.
    const mockIgnios: Iginio[] = [
      {
        name: "ExampleMod",
        repository: "https://github.com/example/examplemod",
        description: "This is an example mod that showcases various features of Ignite.",
        versions: [
          {
            version: "1.20.4",
            file: {
              type: "LINK",
              raw: "https://example.com/examplemod-1.20.4.jar"
            }
          },
          {
            version: "1.20.2",
            file: {
              type: "LINK",
              raw: "https://example.com/examplemod-1.20.2.jar"
            }
          },
          {
            version: "1.19.4",
            file: {
              type: "LINK",
              raw: "https://example.com/examplemod-1.19.4.jar"
            }
          },
          {
            version: "1.19.2",
            file: {
              type: "BIN",
              raw: "1010010101001010100101010010101010010101001010101001010100101010",
              extra: "examplemod-1.19.2.zip"
            }
          }
        ],
        author: "https://github.com/exampleauthor",
        logo: "https://example.com/examplemod-logo.png",
        tags: ["vanilla", "1.20.1", "optimization"]
      },
      {
        name: "AnotherMod",
        repository: "https://github.com/example/anothermod",
        description: "This is another example mod with different features.",
        versions: [
          {
            version: "1.20.4",
            file: {
              type: "LINK",
              raw: "https://example.com/anothermod-1.20.4.jar"
            }
          }
        ],
        author: "https://github.com/anotherauthor",
        tags: ["1.20.4", "gameplay", "adventure"]
      }
    ]
    setIgnios(mockIgnios)
  }

  useEffect(() => {
    loadIgnios()
  }, [])

  const handleDownload = (version: Iginio['versions'][0]) => {
    if (version.file.type === "LINK") {
      window.open(version.file.raw, '_blank')
    } else if (version.file.type === "BIN") {
      // Convert binary string to ArrayBuffer
      const binaryString = atob(version.file.raw)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      // Create Blob and download
      const blob = new Blob([bytes], { type: 'application/zip' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = version.file.extra || 'download.zip'
      link.click()
    }
  }

  const filteredIgnios = ignios.filter(iginio => 
    (iginio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    iginio.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedTags.length === 0 || selectedTags.every(tag => iginio.tags.includes(tag)))
  )

  const allTags = Array.from(new Set(ignios.flatMap(iginio => iginio.tags)))

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/placeholder.svg?height=32&width=32" alt="Ignite Logo" className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">Ignite</span>
            </div>
            <div className="flex items-center">
              <a href="https://github.com/vectrix-space/ignite" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white ml-4">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Welcome to Ignite</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">The powerful Mod loader for your gaming needs</p>
          <Button onClick={() => setShowIgnios(!showIgnios)} size="lg">
            <Eye className="mr-2 h-5 w-5" />
            {showIgnios ? "Hide Ignios" : "View Ignios"}
          </Button>
        </section>

        {showIgnios && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Available Ignios</h2>
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Search className="h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search ignios by name or tag"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
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
              {filteredIgnios.map((iginio, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {iginio.logo ? (
                        <img src={iginio.logo} alt={`${iginio.name} logo`} className="h-6 w-6 mr-2" />
                      ) : (
                        <div className="h-6 w-6 mr-2 bg-gray-200 rounded-full" />
                      )}
                      {iginio.name}
                    </CardTitle>
                    <CardDescription>
                      <a href={iginio.repository} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        View Repository
                      </a>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4"><strong>Description:</strong> {iginio.description}</p>
                    <p><strong>Author:</strong> <a href={iginio.author} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Profile</a></p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {iginio.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <Collapsible className="mt-4">
                      <CollapsibleTrigger className="flex items-center justify-between w-full">
                        <span className="font-semibold">Versions</span>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <ul className="space-y-2">
                          {iginio.versions.map((version, vIndex) => (
                            <li key={vIndex} className="flex items-center justify-between">
                              <span>{version.version}</span>
                              <Button variant="ghost" size="sm" onClick={() => handleDownload(version)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => handleDownload(iginio.versions[0])}>
                      Download Latest ({iginio.versions[0].version})
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow mt-12">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © 2024 Ignite. Created by <a href="https://github.com/vectrix-space" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Vectrix</a>.
          </p>
        </div>
      </footer>
    </div>
  )
}