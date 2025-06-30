'use client'

import { Download, Eye } from "lucide-react"
import { useEffect, useState } from 'react'
import { Button, Card, CardContent, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Components/Components"

interface Config {
  id: string
  name: string
  author: string
  views: number
  downloads: number
  plugin: string
}

export default function LRCDB() {
  const [selectedPlugin, setSelectedPlugin] = useState("EcoEnchants")
  const [searchQuery, setSearchQuery] = useState("")
  const [configs, setConfigs] = useState<Config[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [previewConfig, setPreviewConfig] = useState<Config | null>(null)
  const [previewYaml, setPreviewYaml] = useState<string | null>(null)

  useEffect(() => {
    fetchConfigs()
  }, [selectedPlugin])

  const fetchConfigs = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://lrcdb.auxilor.io/api/v1/getConfigsWithoutContents?plugin=${selectedPlugin}&limit=10000&apiKey=auxilor`,{mode: 'no-cors'})
      if (!response.ok) {
        throw new Error('Failed to fetch configs')
      }
      const data = await response.json()
      setConfigs(data.configs)
    } catch (err) {
      setError('Failed to load configs. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const fetchConfigYaml = async (id: string) => {
    try {
      const response = await fetch(`https://lrcdb.auxilor.io/api/v1/getConfigByID?id=${id}&isDownload=true`)
      if (!response.ok) {
        throw new Error('Failed to fetch config YAML')
      }
      const data = await response.json()
      setPreviewYaml(data.config.contents)
    } catch (err) {
      setError('Failed to load config YAML. Please try again later.')
    }
  }

  const handlePreview = (config: Config) => {
    setPreviewConfig(config)
    fetchConfigYaml(config.id)
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">lrcdb</h1>
          <p className="text-gray-600">libreforge config database</p>
        </div>

        {/* Controls */}
        <div className="space-y-4 mb-8">
          <Select value={selectedPlugin} onValueChange={setSelectedPlugin}>
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Select plugin" />
            </SelectTrigger>
            <SelectContent>
              {["EcoEnchants", "EcoMobs", "Talismans", "EcoArmor"].map((plugin) => (
                <SelectItem key={plugin} value={plugin}>
                  {plugin}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="text"
            placeholder="Search for a config..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />

          <div className="flex items-center text-sm text-gray-600">
            <span>Showing {configs.length} configs</span>
            <p className="ml-4 text-red-500">
              Configurations here are not officially supported. Download them at your own risk.
            </p>
          </div>
        </div>

        {/* Config Grid */}
        {loading ? (
          <p>Loading configs...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {configs
              .filter(config => config.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((config) => (
                <Card key={config.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-red-500 rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-lg truncate">{config.name}</h3>
                        <p className="text-sm text-gray-500">
                          by {config.author}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {config.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {config.downloads}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() => handlePreview(config)}
                      >
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {/* Preview Dialog */}
        <Dialog open={previewConfig !== null} onOpenChange={() => setPreviewConfig(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{previewConfig?.name}.yml</DialogTitle>
            </DialogHeader>
            <div className="bg-gray-100 rounded-lg p-4 overflow-auto max-h-[60vh]">
              {previewYaml ? (
                <pre className="text-sm font-mono whitespace-pre-wrap">
                  <code className="language-yaml">
                    {previewYaml}
                  </code>
                </pre>
              ) : (
                <p>Loading YAML content...</p>
              )}
            </div>
            <DialogFooter className="sm:justify-center gap-4">
              <Button variant="outline" className="flex-1">
                Add to your server
              </Button>
              <Button variant="outline" className="flex-1">
                Download .yml file
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setPreviewConfig(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}