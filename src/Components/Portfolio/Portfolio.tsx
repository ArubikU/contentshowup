import { CLang, Csharp, Cuda, Gradle, Java, MCAddon, Node, Python, Reactjs, TypeScript, Vercel } from '@react-symbols/icons'
import { motion, useAnimation } from 'framer-motion'
import { Award, Code, Folder, Mail, User } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { BrowserView, isMobile, MobileView } from 'react-device-detect'
import { ThemeProvider } from '../../ThemeContext'
import { useClientLanguage, useDocument, useEffectLang } from '../../Utils'
import DraggableNote, { Note } from '../Generic/DraggableNote'
import { Image } from '../Generic/Img'
import { LangSwitcher, ThemeToggle } from '../Generic/ThemeToggle'
import { GetLang, TranslateChilds, TranstaletedText } from '../Lang/LangSys'
import SimpleMarkdown from '../SimpleMarkdown/SimpleMarkdown'
import BubbleMenu from './BubbleMenu'
import { PortfolioLocals } from './PortfolioLang'

interface SocialMedia {
    platform: 'github' | 'linkedin' | 'facebook' | 'instagram' | 'twitter' | 'discord' | 'cv'
    url: string
}

interface Technology {
    name: string
    timeSpent: string
    icon?: string | React.ReactNode
}

interface Project {
    name: string
    description: string
    bannerUrl: string
    link?: string
    repository: string
    technologies?: React.ReactNode[]
}

interface Certificate {
    name: string
    issuer: string
    icon?: string
    link?: string
}

export interface PortfolioConfig {
    name: string
    profileImageUrl: string
    socialMedia: SocialMedia[]
    technologies: Technology[]
    certificates: Certificate[]
    projects: Project[]
    contactEmail: string
    notes: Note[]
}
const navItems = [
    { id: 'about', icon: <User className="w-6 h-6" /> },
    { id: 'technologies', icon: <Code className="w-6 h-6" /> },
    { id: 'certificates', icon: <Award className="w-6 h-6" /> },
    { id: 'projects', icon: <Folder className="w-6 h-6" /> },
    { id: 'contact', icon: <Mail className="w-6 h-6" /> },
]
const defaultConfig: PortfolioConfig = {
    name: "Arubik",
    profileImageUrl: "https://avatars.githubusercontent.com/u/102335860?v=4/height=200&width=200",
    socialMedia: [
        { platform: 'github', url: 'https://github.com/arubiku' },
        { platform: 'instagram', url: 'https://instagram.com/arubik.4u' },
        { platform: 'discord', url: 'https://discord.com/users/903705870750326804' },
    ],
    technologies: [
        { name: "React", timeSpent: "1 {types.year}", icon: (<Reactjs className='h-16'></Reactjs>) },
        { name: "TypeScript", timeSpent: "1.5 {types.years}", icon: (<TypeScript className='h-16'></TypeScript>) },
        { name: "Minecraft Developing and Design", timeSpent: "7 {types.years}", icon: (<MCAddon className='h-16'></MCAddon>) },
        { name: "C#", timeSpent: "1.5 {types.years}", icon: (<Csharp className='h-16'></Csharp>) },
        { name: "C", timeSpent: "1.5 {types.years}", icon: (<CLang className='h-16'></CLang>) },

        { name: "Node.js", timeSpent: "2 {types.years}", icon: (<Node className='h-16'></Node>) },
        { name: "Glsl", timeSpent: "2 {types.years}", icon: (<Cuda className='h-16'></Cuda>) },
        { name: "Python", timeSpent: "3 {types.years}", icon: (<Python className='h-16'></Python>) },
        { name: "Java", timeSpent: "5 {types.years}", icon: (<Java className='h-16'></Java>) },

    ],
    certificates: [
        {
            name: "Ingles Nivel C1", issuer: "ULima University", icon: "https://www.lingoskop.de/wp-content/uploads/2020/07/C1_English.png",
            link: "https://www.ulima.edu.pe/"
        }
    ],
    projects: [
        {
            name: "Portfolio Web",
            description: "El diseño y codigo detras de este mismo portafolio",
            bannerUrl: "",
            repository: "https://github.com/ArubikU/contentshowup/blob/main/src/Components/Portfolio.tsx",
            link: "https://arubiku.github.io/contentshowup/portfolio/",
            technologies: [
                <Reactjs className='h-8'></Reactjs>
            ]
        },
        {
            name: "CML Page",
            description: "Web usada como base para el discord de CML",
            bannerUrl: "",
            repository: "https://github.com/ArubikU/contentshowup",
            link: "https://arubiku.github.io/contentshowup/",
            technologies: [
                <Reactjs className='h-8'></Reactjs>
            ]
        },
        {
            name: "Kron",
            description: "Prueba de mis primeras habilidades con React",
            bannerUrl: "https://i.imgur.com/sbHyQW5.png?height=300&width=600",
            repository: "https://github.com/ArubikU/kron-dev",
            link: "https://kron-dev-arubiku-arubikus-projects.vercel.app/",
            technologies: [
                <Reactjs className='h-8'></Reactjs>,
                <Vercel className='h-8'></Vercel>
            ]

        },
        {
            name: "MagicShaders",
            description: "Shader para minecraft vanilla que otorgan posibilidade de customizacion nunca vistas",
            bannerUrl: '',
            repository: 'https://github.com/ArubikU/MagicShaders',
            link: 'https://modrinth.com/resourcepack/magicshader',
            technologies: [
                <Cuda className='h-8'></Cuda>,
            ]
        },
        {
            name: "IACroper",
            description: "Plugin viejo que permitia tener cultivos customs en minecraft.",
            bannerUrl: '',
            repository: 'https://github.com/ArubikU/ItemsAdderCropSystem',
            link: 'https://polymart.org/resource/iacroper-30-off-10dolars.2366',
            technologies: [
                <Java className='h-8'></Java>
            ]
        },
        {
            name: "SkinOverlays",
            description: "Plugin para minecraft spigot que permite aplicar capas de textura a tu skin",
            repository: "https://github.com/ArubikU/SkinOverlay",
            bannerUrl: "",
            technologies: [
                <Java className='h-8 p-0 m-0 space-x-0'></Java>,
                <Gradle className='h-8 p-0 m-0 space-x-0'></Gradle>,
            ]
        },
        {
            name: "Discordia",
            description: "Bot para discord escrito en TypeScript",
            repository: "https://github.com/ArubikU/Discordia",
            bannerUrl: "",
            technologies: [
                <TypeScript className='h-8'></TypeScript>,
            ]
        }
    ],
    contactEmail: "arubik4u@gmail.com",
    notes: [
        { content: "notes.1", id: 1, position: { x: 5, y: 20 } },
        { content: "notes.2", id: 2, position: { x: 5, y: 40 } },
        { content: "notes.3", id: 3, position: { x: 80, y: 15 } },
    ]
}

const SocialIcon: React.FC<SocialMedia> = ({ platform, url }) => {
    const getIcon = (platform: string) => {
        switch (platform) {
            case 'github':
                return (
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                )
            case 'linkedin':
                return (
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                )
            case 'twitter':
                return (
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                )
            case 'facebook':
                return (
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                )
            case 'instagram':
                return (
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                )
            case 'discord':
                return (
                    <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z" stroke="currentColor" stroke-linejoin="round" />
                    </svg>
                )
            case 'cv':
                return (
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                )
            default:
                return null
        }
    }

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
            {getIcon(platform)}
        </a>
    )
}




const TextReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const controls = useAnimation()
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start({ opacity: 1, y: 0 })
                }
            },
            { threshold: 0.1 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [controls])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    )
}




export default function Portfolio({ config = defaultConfig }: { config?: PortfolioConfig }) {
    const [activeSection, setActiveSection] = useState<string>('about')
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [conf, setConf] = useState(config)
    const [, forceUpdate] = React.useReducer(x => x + 1, 0)

    const [lang, setLang] = useClientLanguage()

    const [setHead, setIcon] = useDocument(GetLang(lang, "headers.title", PortfolioLocals), "./icons/portfolio.ico")
    useEffectLang(lang, () => {
        setHead(GetLang(lang, "headers.title", PortfolioLocals))
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const subject = `Contacto desde Portafolio: ${formData.name}`
        const body = `Nombre: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMensaje: ${formData.message}`
        //open a new window with the email client

        //https://mail.google.com/mail/?view=cm&fs=1&to=someone@example.com&su=SUBJECT&body=BODY&bcc=someone.else@example.com
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${config.contactEmail}&su=${subject}&body=${body}`, '_blank', "location=yes,height=570,width=520,scrollbars=yes,status=yes")

    }
    const contentRef = useRef<HTMLDivElement>(null);

    const handleNotePositionUpdate = (id: number, newPosition: { x: number; y: number }) => {
        setConf((prev) => {
            const updatedNotes = prev.notes.map((note) => {
                if (note.id === id) {
                    return { ...note, position: newPosition, id: id }
                }
                return note
            })
            return { ...prev, notes: updatedNotes }
        })
    }

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['about', 'technologies', 'certificates', 'projects', 'contact'];
            let currentSection = sections[0];
            const scrollPosition = window.scrollY + window.innerHeight;
            const bottomThreshold = document.documentElement.scrollHeight - 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const sectionTop = element.offsetTop;
                    const sectionHeight = element.offsetHeight;

                    // Verificar si la sección está en vista
                    if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight) {
                        currentSection = section;
                    }
                }
            }

            // Si la parte inferior de la ventana está cerca del final del documento
            if (scrollPosition >= bottomThreshold) {
                currentSection = sections[sections.length - 1];
            }

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Llamar una vez para establecer el estado inicial
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 dark:from-neutral-950 dark:to-neutral-950 dark:via-neutral-950 text-gray-800 dark:text-gray-200 p-8">
                <BrowserView>
                    {conf.notes.map((note) => (
                        <DraggableNote
                            key={note.id}
                            note={note}
                            notes={conf.notes}
                            contentRef={contentRef}
                            onPositionUpdate={handleNotePositionUpdate}
                            clientLang={[lang, setLang]}
                        />
                    ))}
                </BrowserView>
                <div ref={contentRef} className="max-w-4xl mx-auto relative z-10">
                    <BrowserView><nav className="mb-8 sticky top-0 bg-white dark:bg-neutral-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md z-20 p-4 rounded-lg shadow justify-between items-center">
    <div className="flex justify-between items-center">
        {/* Contenedor para los elementos anclados */}
        <div className="flex-none sticky left-0 top-0 gap-4 mr-4">
            <ThemeToggle />
            <LangSwitcher forceUpdate={forceUpdate} clientLang={[lang, setLang]} />
        </div>

        {/* Contenedor para los elementos del menú */}
        <ul className="flex flex-wrap justify-center gap-4 flex-1">
            {navItems.map(({ id }) => (
                <li key={id}>
                    <button
                        onClick={() => scrollToSection(id)}
                        key={lang}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full ${activeSection === id
                            ? 'bg-blue-500 text-white'
                            : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                            } transition-colors`}
                    >
                        <span>
                            <TranstaletedText lang={lang} langPath={`nav.${id}`} locals={PortfolioLocals}></TranstaletedText>
                        </span>
                    </button>
                </li>
            ))}
        </ul>
    </div>
</nav>

                    </BrowserView>
                    <MobileView>

                        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 shadow-lg z-20 shadow">
                            <ul className={`flex justify-around items-center h-16 ${lang === "es"
                                                ? 'line-clamp-1 text-sm'
                                                : ''
                                                }`}>
                                {navItems.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => scrollToSection(item.id)}
                                            className={`flex flex-col items-center justify-center w-full h-full ${activeSection === item.id
                                                ? 'text-blue-500 dark:text-blue-400'
                                                : 'text-gray-500 dark:text-gray-400'
                                                } `}
                                        >
                                            {item.icon}
                                            <span className="text-xs mt-1"><TranstaletedText lang={lang} langPath={`nav.${item.id}`} locals={PortfolioLocals}></TranstaletedText></span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <BubbleMenu clientLang={[lang,setLang]} />
                    </MobileView>

                    <main className="space-y-16 ">
                        <section id="about" className="bg-white dark:bg-neutral-900 shadow-xl rounded-lg p-8 transition-all duration-300 ease-in-out">
                            <div className="space-y-6">
                                <TextReveal>
                                    <img src={config.profileImageUrl} alt={config.name} className="w-48 h-48 rounded-full mx-auto" />
                                    <h1 className="text-4xl font-bold text-center">{config.name}</h1>
                                    <h2 className="text-2xl text-center text-blue-300 dark:text-blue-400"><TranstaletedText lang={lang} langPath={"portfolio.title"} locals={PortfolioLocals} /></h2>
                                    <div className="space-y-4 mt-auto pt-4" />
                                    <div className="flex justify-center space-x-4">
                                        {config.socialMedia.map((social, index) => (
                                            <SocialIcon key={index} {...social} />
                                        ))}
                                    </div>
                                    <div className="space-y-4 mt-auto pt-4" />
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 shadow-inner">
                                        <div className="bg-gray-100 dark:bg-neutral-800 px-4 py-2 border-b border-gray-200 dark:border-neutral-600 flex items-center space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">README.md</span>
                                        </div>
                                        <div className="p-6 font-mono text-sm overflow-auto bg-white dark:bg-neutral-900">
                                            <SimpleMarkdown content={GetLang(lang, "portfolio.bioMarkdown", PortfolioLocals)} />
                                        </div>
                                    </div>
                                </TextReveal>
                            </div>
                        </section>
                        <section id="technologies" className="bg-white dark:bg-neutral-900 shadow-xl rounded-lg p-8 transition-all duration-300 ease-in-out">

                            <TextReveal>
                                <h2 className="text-3xl font-bold mb-6 text-center"><TranstaletedText lang={lang}  locals={PortfolioLocals} langPath={"headers.technologies"}/></h2>
                                <TranslateChilds locals={PortfolioLocals} lang={lang} children={(<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {config.technologies.map((tech, index) => (
                                        <div key={index} className="bg-green-100 dark:dark:bg-neutral-950/50 text-green-800 dark:text-green-100 rounded-lg p-4 text-center flex flex-col items-center">
                                            {tech.icon && (typeof tech.icon === "string") ? (
                                                <img src={tech.icon as string} alt={tech.name} className="w-12 h-12 mb-2" />
                                            ) : (
                                                tech.icon
                                            )}
                                            <h3 className="font-semibold">{tech.name}</h3>
                                            <p className="text-sm">Tiempo: {tech.timeSpent}</p>
                                        </div>
                                    ))}
                                </div>)}></TranslateChilds>

                            </TextReveal>
                        </section>

                        <section id="certificates" className="bg-white dark:bg-neutral-900 shadow-xl rounded-lg p-8 transition-all duration-300 ease-in-out">

                            <TextReveal>
                                <h2 className="text-3xl font-bold mb-6 text-center"><TranstaletedText lang={lang} locals={PortfolioLocals} langPath={`headers.certificates${
                                    isMobile?'-mobile': ''}`}/></h2>
                                <div className="space-y-4">
                                    {config.certificates.map((cert, index) => (
                                        <div key={index} className="bg-orange-100 dark:bg-neutral-950/50 text-orange-800 dark:text-orange-100 rounded-lg p-4 flex items-center">
                                            {cert.icon && <img src={cert.icon} alt={cert.issuer} className="w-8 h-8 mr-4" />}
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    {cert.link ? (
                                                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                            {cert.name}
                                                        </a>
                                                    ) : (
                                                        cert.name
                                                    )}
                                                </h3>
                                                <p className="text-sm">{cert.issuer}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TextReveal>
                        </section>

                        <section id="projects" className="bg-white dark:bg-neutral-900 shadow-xl rounded-lg p-8 transition-all duration-300 ease-in-out">

                            <TextReveal>
                                <h2 className="text-3xl font-bold mb-6 text-center"><TranstaletedText lang={lang}  locals={PortfolioLocals} langPath={"headers.projects"}/></h2>
                                <div className="space-y-8">
                                    {config.projects.map((project, index) => (
                                        <div key={index} className="bg-blue-100 dark:dark:bg-neutral-950/50 rounded-lg overflow-hidden">
                                            <Image src={project.bannerUrl} alt={project.name} className="w-full h-48 object-cover"

                                                fallback={<p></p>} />
                                            <div className="p-4">
                                                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">{project.name}</h3>
                                                <p className="text-sm text-blue-600 dark:text-blue-300 mb-2">{project.description}</p>
                                                <a href={project.repository} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 transition-colors">
                                                    <TranstaletedText lang={lang} locals={PortfolioLocals} langPath={"common.viewRepository"}/>
                                                </a>
                                                <span> </span>

                                                {project.link && (
                                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-green-500 dark:text-green-300 hover:text-green-700 dark:hover:text-green-100 transition-colors">
                                                        <TranstaletedText lang={lang} locals={PortfolioLocals} langPath={"common.viewProject"}/>
                                                    </a>

                                                )}
                                                <div className="flex space-x-2 items-center">
                                                    {project.technologies && project.technologies.map((component, index) => (
                                                        <div key={index} className="flex justify-center items-center">
                                                            {component}
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TextReveal>
                        </section>

                        <section id="contact" className="bg-white dark:bg-neutral-900 shadow-xl rounded-lg p-8 transition-all duration-300 ease-in-out">

                            <TextReveal>
                                <h2 className="text-3xl font-bold mb-6 text-center"><TranstaletedText lang={lang}  locals={PortfolioLocals} langPath={"headers.contact"}/></h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            <TranstaletedText lang={lang} locals={PortfolioLocals} langPath={"types.name"}/>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            <TranstaletedText lang={lang} locals={PortfolioLocals} langPath={"types.email"}/>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            <TranstaletedText lang={lang} locals={PortfolioLocals} langPath={"types.message"}/>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={4}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        onClick={handleSubmit}
                                    >
                                        <TranstaletedText lang={lang} locals={PortfolioLocals} langPath={"common.sendEmail"}/>
                                    </button>
                                </form>
                            </TextReveal>
                        </section>
                    </main>
                </div>
            </div>
        </ThemeProvider>
    )
}