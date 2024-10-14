import { X } from 'lucide-react'
import newGithubIssueUrl from 'new-github-issue-url'
import { useState } from 'react'
import { Pack } from '../Data'
import { GetLang, Language } from "../LangSys"
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, TextArea } from "./Components"

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
    loader: '',
    logo: '',
    banner: '',
    shortDesc: ''
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

  const handleRemoveVersion = (index: number) => {
    setFormData(prev => {
      const newVersions = [...(prev.versions || [])]
      if (newVersions.length > 1) {
        newVersions.splice(index, 1)
      }
      return { ...prev, versions: newVersions }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const issueBody = `
Title: ${formData.name}
Author: ${formData.author}
Description: ${formData.description}
Tags: ${formData.tags?.join(', ')}

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
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 text-gray-700 dark:text-white dark:border-transparent dark:outline-transparent">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">{GetLang(lang, "uploadForm.title")}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 dark:border-transparent dark:outline-transparent">
          <div className="space-y-2 ">
            <Label htmlFor="name" >{GetLang(lang, "uploadForm.name")}</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent"
            />
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="repository" >{GetLang(lang, "uploadForm.repository")}</Label>
            <Input
              id="repository"
              name="repository"
              value={formData.repository}
              onChange={handleChange}
              required
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent"
            />
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="shortDesc" >{GetLang(lang, "uploadForm.shortdescription")}</Label>
            <TextArea
              id="shortDesc"
              name="shortDesc"
              value={formData.shortDesc}
              onChange={handleChange}
              required
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent"
            />
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="description" >{GetLang(lang, "uploadForm.description")}</Label>
            <TextArea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent"
            />
          </div>
          <div className="space-y-2 ">
            <p >{GetLang(lang, "uploadForm.versions")}</p>
            {formData.versions?.map((version, index) => (
              <div key={index} className="flex space-x-2 items-center">
                <Input
                  placeholder={GetLang(lang, "uploadForm.versionPlaceholder")}
                  value={version.version}
                  onChange={(e) => handleVersionChange(index, 'version', e.target.value)}
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent"
                />
                <Input
                  placeholder={GetLang(lang, "uploadForm.fileUrlPlaceholder")}
                  value={version.file.raw}
                  onChange={(e) => handleVersionChange(index, 'file', e.target.value)}
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent"
                />
                {formData.versions.length > 1 && (
                  <Button
                    type="button"
                    className=" hover:text-gray-900 dark:hover:text-white"
                    onClick={() => handleRemoveVersion(index)}
                  >
                    <X />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={() => setFormData(prev => ({ ...prev, versions: [...(prev.versions || []), { version: '', file: { type: 'LINK', raw: '' } }] }))} className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
              {GetLang(lang, "uploadForm.addVersion")}
            </Button>
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="author" >{GetLang(lang, "uploadForm.author")}</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent"
            />
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="logo" >{GetLang(lang, "uploadForm.logo")}</Label>
            <Input
              id="logo"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              required
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent"
            />
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="banner" >{GetLang(lang, "uploadForm.banner")}</Label>
            <Input
              id="banner"
              name="banner"
              value={formData.banner}
              onChange={handleChange}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent"
            />
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="tags" >{GetLang(lang, "uploadForm.tags")}</Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags?.join(', ')}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()) }))}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent"
            />
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="loader" >{GetLang(lang, "uploadForm.loader")}</Label>
            <Select name="loader" value={formData.loader} onValueChange={(value) => setFormData(prev => ({ ...prev, loader: value }))}>
              <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent">
                <SelectValue placeholder={GetLang(lang, "uploadForm.selectLoader")} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700">
                <SelectItem className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent hover:bg-gray-100 dark:hover:bg-gray-600" value="Datapack">{GetLang(lang, "uploadForm.datapack")}</SelectItem>
                <SelectItem className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent hover:bg-gray-100 dark:hover:bg-gray-600" value="Fabric">{GetLang(lang, "uploadForm.fabric")}</SelectItem>
                <SelectItem className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent hover:bg-gray-100 dark:hover:bg-gray-600" value="Forge">{GetLang(lang, "uploadForm.forge")}</SelectItem>
                <SelectItem className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent hover:bg-gray-100 dark:hover:bg-gray-600" value="Ignite">{GetLang(lang, "uploadForm.ignite")}</SelectItem>
                <SelectItem className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-transparent dark:outline-transparent hover:bg-gray-100 dark:hover:bg-gray-600" value="Resourcepack">{GetLang(lang, "uploadForm.resourcepack")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="bg-blue-500 text-white dark:bg-blue-600 hover:bg-gray-200 dark:hover:bg-gray-700">{GetLang(lang, "uploadForm.submit")}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}