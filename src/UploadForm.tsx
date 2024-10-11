import newGithubIssueUrl from 'new-github-issue-url'
import { useState } from 'react'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, TextArea } from "./Components"
import { Pack } from './Data'
import { GetLang, Language } from "./LangSys"

type UploadFormProps = {
  lang: Language
}

export default function UploadForm({ lang }: UploadFormProps) {
  const [formData, setFormData] = useState<Partial<Pack>>({
    name: '',
    repository: '',
    description: '',
    versions: [{ version: '', file: { type: 'LINK', raw: '' } }],
    author: '',
    tags: [],
    loader: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleVersionChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newVersions = [...(prev.versions || [])]
      newVersions[index] = { ...newVersions[index], [field]: field === 'file' ? { type: 'LINK', raw: value } : value }
      return { ...prev, versions: newVersions }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const issueBody = `
Title: ${formData.name}
Repository: ${formData.repository}
Description: ${formData.description}
Versions: ${JSON.stringify(formData.versions)}
Author: ${formData.author}
Tags: ${formData.tags?.join(', ')}
Loader: ${formData.loader}

JSON Data:
\`\`\`json
${JSON.stringify(formData, null, 2)}
\`\`\`
    `

    const url = newGithubIssueUrl({
      user: 'arubiku',
      repo: 'contentshowup',
      template: 'addcontent',
      title: `New Content: ${formData.name}`,
      body: issueBody
    })

    window.open(url, '_blank')
    
    // Reset form after submission
    setFormData({
      name: '',
      repository: '',
      description: '',
      versions: [{ version: '', file: { type: 'LINK', raw: '' } }],
      author: '',
      tags: [],
      loader: ''
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{GetLang(lang, "uploadForm.title")}</CardTitle>
        <CardDescription>{GetLang(lang, "uploadForm.description")}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{GetLang(lang, "uploadForm.name")}</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repository">{GetLang(lang, "uploadForm.repository")}</Label>
            <Input
              id="repository"
              name="repository"
              value={formData.repository}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">{GetLang(lang, "uploadForm.description")}</Label>
            <TextArea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <p>{GetLang(lang, "uploadForm.versions")}</p>
            {formData.versions?.map((version, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  placeholder={GetLang(lang, "uploadForm.versionPlaceholder")}
                  value={version.version}
                  onChange={(e) => handleVersionChange(index, 'version', e.target.value)}
                />
                <Input
                  placeholder={GetLang(lang, "uploadForm.fileUrlPlaceholder")}
                  value={version.file.raw}
                  onChange={(e) => handleVersionChange(index, 'file', e.target.value)}
                />
              </div>
            ))}
            <Button type="button" onClick={() => setFormData(prev => ({ ...prev, versions: [...(prev.versions || []), { version: '', file: { type: 'LINK', raw: '' } }] }))}>
              {GetLang(lang, "uploadForm.addVersion")}
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">{GetLang(lang, "uploadForm.author")}</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">{GetLang(lang, "uploadForm.tags")}</Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags?.join(', ')}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()) }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loader">{GetLang(lang, "uploadForm.loader")}</Label>
            <Select name="loader" value={formData.loader} onValueChange={(value) => setFormData(prev => ({ ...prev, loader: value }))}>
              <SelectTrigger>
                <SelectValue placeholder={GetLang(lang, "uploadForm.selectLoader")} />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem className="bg-white hover:bg-gray-200" value="Datapack">{GetLang(lang, "uploadForm.datapack")}</SelectItem>
                <SelectItem className="bg-white hover:bg-gray-200" value="Fabric">{GetLang(lang, "uploadForm.fabric")}</SelectItem>
                <SelectItem className="bg-white hover:bg-gray-200" value="Forge">{GetLang(lang, "uploadForm.forge")}</SelectItem>
                <SelectItem className="bg-white hover:bg-gray-200" value="Ignite">{GetLang(lang, "uploadForm.ignite")}</SelectItem>
                <SelectItem className="bg-white hover:bg-gray-200" value="Resourcepack">{GetLang(lang, "uploadForm.resourcepack")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className=" hover:bg-white">{GetLang(lang, "uploadForm.submit")}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}