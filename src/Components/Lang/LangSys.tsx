import { renderToString } from 'react-dom/server';
import { ENGLISH } from "../../langs/en";
import { SPANISH } from "../../langs/es";
import { FRENCH } from "../../langs/fr";
import { RUSSIAN } from "../../langs/ru";


export const Placeholders = {
    titlenav: "",
    title: "CML",
    author: "ArubikU",
    authorUrl: "https://github.com/arubiku",
    projectRepo: "https://arubiku.github.io/contentshowup/",
    contentPlural: "Packs",
    repositoryWeb: "https://arubiku.github.io/contentshowup/",
    logo: "https://github.com/ArubikU/contentshowup/blob/main/cml_logo.png?raw=true"
}

export enum Language {
    en = "en",
    es = "es",
    fr = "fr",
    ru = "ru",
}

//extends LocaleData
export type PackLocale = {
    language: {
        en: string;
        es: string;
        fr: string;
        ru: string;
    };
    mainPage: {
        title: string;
        subtitle: string;
        disponibleContent: string;
    };
    buttons: {
        showContent: string;
        hideContent: string;
        viewRepository: string;
        viewProfile: string;
        downloadLatest: string;
        download: string;
    };
    search: {
        placeholder: string;
        allLoaders: string;
    };
    placeholders: {
        any: string;
        description: string;
        author: string;
        disclaimer: string;
        versions: string;
        tags: string;
        links: string;
        comments: string;
        commentsComingSoon: string;
        selectVersion: string;
        selectLoader: string;
    };
    faq: {
        title: string;
        items: Array<{
            question: string;
            answer: string;
        }>;
    };
    uploadForm: {
        title: string;
        description: string;
        shortdescription: string;
        name: string;
        repository: string;
        versions: string;
        versionPlaceholder: string;
        fileUrlPlaceholder: string;
        addVersion: string;
        author: string;
        tags: string;
        loader: string;
        selectLoader: string;
        datapack: string;
        fabric: string;
        forge: string;
        ignite: string;
        resourcepack: string;
        submit: string;
        logo: string;
        banner: string;
    };
    userDialog: {
        title: string;
        bio: string;
        packsByAuthor: string;
    };
    membersSection: {
        title: string;
    };
};

export interface FAQItem {
    question: string;
    answer: string;
}

export interface LocaleData {
    [key: string]: string | { [key: string]: string } | { title: string; items: FAQItem[]; };
}


export type Locals = {
    'en'? : LocaleData;
    'es'? : LocaleData;
    'fr'? : LocaleData;
    'ru'? : LocaleData;
};

const localizations: Locals = {
    en: ENGLISH,
    es: SPANISH,
    fr: FRENCH,
    ru: RUSSIAN,
};

const parsePlaceholders = (text: string) => {
    if (text === undefined){
        return "";
    }
    return text.replace(/{(.*?)}/g, (_, key) => {
        const value = Placeholders[key as keyof typeof Placeholders];
        return value !== undefined ? value : `{${key}}`;
    });
};

export const GetLang = (lang: Language, langPath: string, l?: Locals) => {

    let locals = l || localizations;
    const getNestedValue = (obj: any, path: string): any => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    let localizedString = getNestedValue(locals[lang], langPath) || getNestedValue(locals[Language.en], langPath);

    return parsePlaceholders(localizedString);
};

export const GetLangArray = (lang: Language, langPath: string, l? : Locals) => {
    let locals = l || localizations;
    const getNestedValue = (obj: any, path: string): any => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    let localizedArray = getNestedValue(locals[lang], langPath) || getNestedValue(locals[Language.en], langPath);

    let a = localizedArray.map((item: any) => {
        return {
            question: parsePlaceholders(item.question),
            answer: parsePlaceholders(item.answer)
        }
    });

    return a;
}

interface TranstaletedTextProps {
    lang: Language;
    langPath: string;
    optional?: string
    locals?: Locals;
}
export const TranstaletedText = ({ lang, langPath, optional,locals }: TranstaletedTextProps) => {
    let text = GetLang(lang, langPath)
    if(locals){
       text = GetLang(lang, langPath,locals)
    }
    if(text===""){
        return <>{optional}</>
    } 

    return <>{text}</>;
}

interface TranslateChildsProps {
    lang: Language;
    locals?: Locals;
    children: React.ReactElement;
}

export const TranslateChilds = ({ lang, children, locals }: TranslateChildsProps) => {
    //replace any text in the format {key} with the value of GetLang(key,locals?)
    const childrensAsRaw = renderToString(children);
    const regex = /{([^}]+)}/g
    let newChildren = childrensAsRaw;
    const replaceMatch = (result: string, match: string, lang: Language, locals?: Locals) => {
        return result.replace(`{${match}}`, GetLang(lang, match, locals));
    };
    const replacePlaceholders = (text: string) => {
        let result = text;
        let m: RegExpExecArray;
            while ((m = regex.exec(text)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            m.forEach((match: string, groupIndex: number) => {
                if (groupIndex === 1) {
                    result = replaceMatch(result, match, lang, locals);
                }
            });
        }

        return result;
    };
    newChildren = replacePlaceholders(childrensAsRaw);
    return (
        <div key={lang} dangerouslySetInnerHTML={{__html: newChildren}}></div>
      )
}