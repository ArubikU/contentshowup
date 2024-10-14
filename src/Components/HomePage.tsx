import { ChevronDown } from 'lucide-react'
import { GetLang, GetLangArray, Language, Placeholders } from ".././LangSys"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./Components"

interface HomePageProps {
    lang: Language
}

export function HomePage({ lang }: HomePageProps) {
    return (
        <div className="dark:bg-gray-900">
            <HeroSection lang={lang} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FAQSection lang={lang} />
            </div>
        </div>
    )
}

function HeroSection({ lang }: HomePageProps) {
    return (
        <section className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{GetLang(lang, "mainPage.title")}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{GetLang(lang, "mainPage.subtitle")}</p>
        </section>
    )
}

function FAQSection({ lang }: HomePageProps) {
    return (
        <section className="container mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">{GetLang(lang, "faq.title")}</h2>
            <div className="space-y-4">
                {GetLangArray(lang, "faq.items").map((item, index) => (
                    <Collapsible key={index}>
                        <CollapsibleTrigger className="flex justify-between w-full p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                            <span className="font-semibold text-left text-black dark:text-white">{item.question}</span>
                            <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 p-4 bg-transparent rounded-lg transition-all duration-300 animate-fadeIn">
                            <span className="text-gray-700 dark:text-gray-300">{item.answer}</span>
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
        </section>
    )
}

export function Footer({ lang }: HomePageProps) {
    return (
        <footer className="shadow bg-white dark:bg-gray-800 text-black dark:text-white dark:border-slate-800">
            <div className="container mx-auto px-6 py-4">
                <p className="text-center">
                    {GetLang(lang, "placeholders.disclaimer")} <a href={Placeholders.authorUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">{Placeholders.author}</a>.
                </p>
            </div>
        </footer>
    )
}