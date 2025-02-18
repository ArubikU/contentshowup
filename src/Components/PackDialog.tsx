import { SimpleMarkdown } from "@arubiku/react-markdown";
import { DiscussionEmbed } from "disqus-react";
import { ExternalLink, Github } from "lucide-react";
import { Pack } from "../Data";
import { useTheme } from "../ThemeContext";
import { Badge, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Components";
import { GetLang, Language, Placeholders } from "./Lang/LangSys";

type PackDialogProps = {
  open: boolean;
  onOpenChange: () => void;
  pack: Pack;
  lang: Language;
  download;
  isVersionTag;
};

// Detectar URLs de YouTube
function isYouTubeUrl(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be");
}


export function PackDialog({ onOpenChange, pack, lang, download, isVersionTag }: PackDialogProps) {
  const getImage = () => {
    if (pack.banner !== "") {
      return <div className="relative w-full h-64 duration-200 animate-fadeIn"><img src={pack.banner} alt={`${pack.name} logo`} className="w-full h-full object-cover rounded-lg" /></div>;
    } else
      return <div></div>
  }
   var identifier  = Placeholders.repositoryWeb
  var tittle =""
  if(pack){
    identifier += pack.author+'/'+pack.name
    tittle =  pack.name.toLocaleUpperCase()
  }


  return (
    <Dialog open={!!pack} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto custom-scrollbar bg-white dark:bg-gray-800 text-black dark:text-white">
        <DialogHeader >
          <DialogTitle ><p className="text-black dark:text-white">{pack?.name}</p></DialogTitle>
        </DialogHeader>
        <DialogDescription >
          <div className="flex flex-col space-y-4">
            {pack?.banner ? (
              isYouTubeUrl(pack.banner) ? (
                <div className="relative w-full h-64">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${new URL(pack.banner).searchParams.get("v")}`}
                    title={pack.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg duration-200 animate-fadeIn"
                  />
                </div>
              ) : (
                getImage()
              )
            ) : (
              <div />
            )}
            <div
              className="prose text-black dark:text-white"
            ><SimpleMarkdown content={pack?.description || ""} theme={useTheme().theme}></SimpleMarkdown></div>
            <div>
              <h4 className="font-semibold mb-2 text-black dark:text-white">{GetLang(lang, "placeholders.tags")}</h4>
              <div className="flex flex-wrap gap-2">
                {pack?.tags.map(tag => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={`${isVersionTag(tag) ? 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100' : 'bg-orange-200 text-orange-800 dark:bg-orange-700 dark:text-orange-100'}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-black dark:text-white dark:border-transparent dark:outline-transparent">{GetLang(lang, "placeholders.versions")}</h4>
              <Select
                onValueChange={(value) => {
                  const version = pack?.versions.find((v) => v.version === value);
                  if (version) download(version);
                }}
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 text-black dark:text-white dark:border-transparent dark:outline-transparent">
                  <SelectValue placeholder={GetLang(lang, "placeholders.selectVersion")} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 dark:border-transparent dark:outline-transparent">
                  {pack?.versions.map((version, index) => (
                    <SelectItem className="bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-transparent dark:outline-transparent" key={index} value={version.version}>
                      {version.version}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-black dark:text-white">{GetLang(lang, "placeholders.links")}</h4>
              <div className="flex space-x-4">
                <a
                  href={pack?.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Github className="h-5 w-5 mr-2" />
                  {GetLang(lang, "buttons.viewRepository")}
                </a>
                <a
                  href={pack?.author}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  {GetLang(lang, "buttons.viewProfile")}
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-black dark:text-white">{GetLang(lang, "placeholders.comments")}</h4>
              <DiscussionEmbed
                  shortname='arubik'
                  config={{
                      url: identifier,
                      identifier: identifier,
                      title: tittle,
                      language: 'es_Es'
                  }}
              />
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}