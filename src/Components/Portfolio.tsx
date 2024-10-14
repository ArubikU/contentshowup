import { Java, Node, Python, Reactjs, TypeScript } from '@react-symbols/icons'
import { motion, useAnimation } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { BrowserView } from 'react-device-detect'
import { ThemeProvider } from '../ThemeContext'
import { ThemeToggle } from './ThemeToggle'

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
    link: string
}

interface Certificate {
    name: string
    issuer: string
    icon?: string
    link?: string
}

interface Note {
    content: string;
    position: { x: number; y: number };
}

interface PortfolioConfig {
    name: string
    title: string
    bioMarkdown: string
    profileImageUrl: string
    socialMedia: SocialMedia[]
    technologies: Technology[]
    certificates: Certificate[]
    projects: Project[]
    contactEmail: string
    notes: Note[]
}

const defaultConfig: PortfolioConfig = {
    name: "Tu Nombre",
    title: "Desarrollador Full Stack",
    bioMarkdown: `
# Sobre Mí

Soy un apasionado desarrollador Full Stack con experiencia en:

- React
- Node.js
- TypeScript
- Python

Me encanta crear soluciones innovadoras y eficientes. Siempre estoy buscando nuevos desafíos y oportunidades para aprender.

## Objetivos

- Contribuir a proyectos de código abierto
- Aprender nuevas tecnologías
- Compartir conocimientos con la comunidad

### Ejemplos de Markdown

1. **Negrita** y *cursiva*
2. [Enlace simple](https://ejemplo.com)
3. [Enlace con alias](https://ejemplo.com "Visita Ejemplo.com")
4. Imagen: ![GitHub Octocat](https://raw.githubusercontent.com/ArubikU/contentshowup/refs/heads/main/cml_logo.png?width=200)
5. Código inline: \`const ejemplo = "Hola Mundo";\`
6. Bloque de código:
   \`\`\`javascript
   function saludar(nombre) {
     console.log(\`Hola, \${nombre}!\`);
   }
   \`\`\`

<div className="text-[#4a5568] dark:text-[#fdfdfd]" style="text-align: center; font-style: italic;">
  "El código es poesía en movimiento"
</div>
  `,
    profileImageUrl: "/placeholder.svg?height=200&width=200",
    socialMedia: [
        { platform: 'github', url: 'https://github.com/yourusername' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/yourusername' },
        { platform: 'twitter', url: 'https://twitter.com/yourusername' },
        { platform: 'facebook', url: 'https://facebook.com/yourusername' },
        { platform: 'instagram', url: 'https://instagram.com/yourusername' },
        { platform: 'discord', url: 'https://discord.gg/yourinvite' },
        { platform: 'cv', url: '/path/to/your/cv.pdf' },
    ],
    technologies: [
        { name: "React", timeSpent: "1 año", icon: (<Reactjs className='h-16'></Reactjs>) },
        { name: "TypeScript", timeSpent: "1.5 años", icon: (<TypeScript className='h-16'></TypeScript>) },
        { name: "Node.js", timeSpent: "2 años", icon: (<Node className='h-16'></Node>) },
        { name: "Python", timeSpent: "3 años", icon: (<Python className='h-16'></Python>) },
        { name: "Java", timeSpent: "5 años", icon: (<Java className='h-16'></Java>) },

    ],
    certificates: [
        { name: "Certificado de Desarrollo Web", issuer: "FreeCodeCamp", icon: "https://www.freecodecamp.org/favicon-32x32.png", link: "https://www.freecodecamp.org/certification/fcc1234567/responsive-web-design" },
        { name: "Certificado de JavaScript Avanzado", issuer: "Udacity", icon: "https://www.udacity.com/favicon.ico", link: "https://confirm.udacity.com/ABCDEFGH" }
    ],
    projects: [
        {
            name: "Proyecto 1",
            description: "Una aplicación web increíble que resuelve problemas complejos de manera simple.",
            bannerUrl: "/placeholder.svg?height=300&width=600",
            link: "https://proyecto1.com"
        },
        {
            name: "Proyecto 2",
            description: "Una app móvil innovadora que mejora la productividad de los usuarios.",
            bannerUrl: "/placeholder.svg?height=300&width=600",
            link: "https://proyecto2.com"
        }
    ],
    contactEmail: "tu@email.com",
    notes: [
        { content: "Idea para un nuevo proyecto", position: { x: 10, y: 20 } },
        { content: "Recordatorio: actualizar CV", position: { x: 80, y: 400 } },
        { content: "Aprender GraphQL", position: { x: 1200, y: 80 } },
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
<svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="2"  fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z" stroke="currentColor" stroke-linejoin="round"/>
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

const SimpleMarkdown: React.FC<{ content: string }> = ({ content }) => {
    const parseMarkdown = (md: string): string => {
        const lines = md.split('\n');
        let inCodeBlock = false;
        let html = '';
        let currentParagraph = '';
        let inList = false;

        const flushParagraph = () => {
            if (currentParagraph) {
                html += `<p class="my-2">${currentParagraph.trim()}</p>`;
                currentParagraph = '';
            }
        };

        const flushList = () => {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
        };

        const parseNestedMarkdown = (text: string): string => {
            return parseMarkdown(text);
        };

        lines.forEach((line) => {
            if (line.trim().startsWith('```')) {
                flushParagraph();
                flushList();
                inCodeBlock = !inCodeBlock;
                html += inCodeBlock
                    ? '<pre><code class="bg-gray-100 dark:bg-white dark:text-black block p-2 rounded-md my-2 overflow-x-auto">'
                    : '</code></pre>';
            } else if (inCodeBlock) {
                html += line.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '\n';
            } else {
                // Headers
                line = line.replace(/^# (.*)$/gm, '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>');
                line = line.replace(/^## (.*)$/gm, '<h2 class="text-2xl font-bold mt-5 mb-3">$1</h2>');
                line = line.replace(/^### (.*)$/gm, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>');

                // Bold
                line = line.replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>');

                // Italic
                line = line.replace(/\*(.*?)\*/gm, '<em>$1</em>');

                // Lists
                if (/^\s*\d+\.\s+(.*)/.test(line)) {
                    flushParagraph();
                    if (!inList) {
                        html += '<ul class="list-decimal pl-5 my-2">';
                        inList = true;
                    }
                    line = line.replace(/^\s*\d+\.\s+(.*)/gm, (match, p1) => `<li>${parseNestedMarkdown(p1)}</li>`);
                    html += line + '\n';
                    return;
                } else if (/^\s*-\s+(.*)/.test(line)) {
                    flushParagraph();
                    if (!inList) {
                        html += '<ul class="list-disc pl-5 my-2">';
                        inList = true;
                    }
                    line = line.replace(/^\s*-\s+(.*)/gm, (match, p1) => `<li>${parseNestedMarkdown(p1)}</li>`);
                    html += line + '\n';
                    return;
                } else {
                    flushList();
                }

                // Images with optional size parameter
                line = line.replace(
                    /!\[([^\]]*)\]\(([^)]+\.(?:png|jpg|jpeg|gif)(\?.*)?)(?:\s+size=(\d+)(?:x(\d+))?)?\)/gi,
                    (match, alt, url, query, w, h) => {
                        //get the values ?width=100&height=100
                        const urlParams = new URLSearchParams(query);
                        const width = urlParams.get('width');
                        const height = urlParams.get('height');

                        const sizeAttributes = width
                            ? `class="my-2 rounded-md" width="${width}"`
                            : 'class="my-2 rounded-md"'; // Apply default max width

                        
                        return `<img src="${url}" alt="${alt}" ${sizeAttributes} >`;
                    }
                );


                // Links with title (alias)
                line = line.replace(/\[([^\]]+)\]\(([^)]+)\s*\"(.*?)\"\)/g, '<a href="$2" title="$3" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">$1</a>');

                // Links without title
                line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">$1</a>');


                // Inline code
                line = line.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-white-100 dark:text-black px-1 rounded">$1</code>');

                // Paragraphs
                if (line.trim() === '') {
                    flushParagraph();
                } else {
                    currentParagraph += line + ' ';
                }
            }
        });

        flushParagraph();
        flushList();
        return html;
    };

    return <div dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />;
};


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



const DraggableNote: React.FC<{ note: Note; notes: Note[] }> = ({ note, notes }) => {
    const [position, setPosition] = useState(note.position);
    const minDistance = 20; // Minimum distance to consider as a collision

    useEffect(() => {
        setPosition(note.position);
    }, [note.position]);

    const handleDragEnd = (e: any, info: { point: { x: number; y: number } }) => {
        // Get the new position
        let newPosition = {
            x: info.point.x,
            y: info.point.y,
        };

        const noteWidth = 200; // Adjust based on your note width
        const noteHeight = 100; // Adjust based on your note height

        // Apply boundaries
        newPosition.x = Math.max(0, Math.min(newPosition.x, window.innerWidth - noteWidth));
        newPosition.y = Math.max(0, Math.min(newPosition.y, window.innerHeight - noteHeight));

        // Check for collisions with other notes
        let hasCollision = false;

        for (const otherNote of notes) {
            if (otherNote !== note) {
                // Collision detection based on position and size
                const distanceX = Math.abs(newPosition.x - otherNote.position.x);
                const distanceY = Math.abs(newPosition.y - otherNote.position.y);

                if (distanceX < noteWidth && distanceY < noteHeight) { // Adjust for note's width and height
                    hasCollision = true;

                    // Determine how to push the note away
                    if (distanceX < minDistance && distanceY < minDistance) {
                        // Push the note away in the direction of the collision
                        if (newPosition.x > otherNote.position.x) {
                            newPosition.x += minDistance; // Push right
                        } else {
                            newPosition.x -= minDistance; // Push left
                        }

                        if (newPosition.y > otherNote.position.y) {
                            newPosition.y += minDistance; // Push down
                        } else {
                            newPosition.y -= minDistance; // Push up
                        }
                    }
                    break; // Exit loop if a collision is detected
                }
            }
        }

        setPosition(newPosition);
    };

    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={position}
            animate={position}
            onDragEnd={handleDragEnd}
            className="absolute bg-yellow-100 dark:bg-yellow-800 p-2 rounded shadow-md cursor-move"
            style={{ maxWidth: '200px', maxHeight: '100px' }} // Set a max height
        >
            <p className="text-sm">{note.content}</p>
        </motion.div>
    );
};


export default function Portfolio({ config = defaultConfig }: { config?: PortfolioConfig }) {
    const [activeSection, setActiveSection] = useState<string>('about')
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const subject = `Contacto desde Portafolio: ${formData.name}`
        const body = `Nombre: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMensaje: ${formData.message}`
        window.location.href = `mailto:${config.contactEmail}?subject=${encodeURIComponent(subject)}&body=${body}`
    }


    useEffect(() => {
        const handleScroll = () => {
            const sections = ['about', 'technologies', 'certificates', 'projects', 'contact']
            let currentSection = sections[0]

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element && window.scrollY >= element.offsetTop - 100) {
                    currentSection = section
                }
            }

            setActiveSection(currentSection)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Call once to set initial state
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200 p-8">
                <BrowserView>
                {config.notes.map((note, index) => (
                    <DraggableNote key={index} note={note} notes={config.notes} />
                ))}
                </BrowserView>
                <div className="max-w-4xl mx-auto relative z-10">
                    <nav className="mb-8 sticky top-0 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md z-20 p-4 rounded-lg shadow justify-between items-center">
                        <ul className="flex flex-wrap justify-center gap-4">
                            {[
                                { id: 'about', label: 'Sobre mí' },
                                { id: 'technologies', label: 'Tecnologías' },
                                { id: 'certificates', label: 'Certificados / Experiencia' },
                                { id: 'projects', label: 'Proyectos' },
                                { id: 'contact', label: 'Contacto' },
                            ].map(({ id, label }) => (
                                <li key={id}>
                                    <button
                                        onClick={() => scrollToSection(id)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-full ${activeSection === id
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                                            } transition-colors`}
                                    >
                                        <span>{label}</span>
                                    </button>
                                </li>
                            ))}
                            <ThemeToggle />
                        </ul>
                    </nav>

                    <main className="space-y-16">
                        <section id="about" className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 transition-all duration-300 ease-in-out">
                            <div className="space-y-6">
                                <TextReveal>
                                    <img src={config.profileImageUrl} alt={config.name} className="w-48 h-48 rounded-full mx-auto" />
                                    <h1 className="text-4xl font-bold text-center">{config.name}</h1>
                                    <h2 className="text-2xl text-center text-blue-300 dark:text-blue-400">{config.title}</h2>
                                    <div className="space-y-4 mt-auto pt-4" />
                                    <div className="flex justify-center space-x-4">
                                        {config.socialMedia.map((social, index) => (
                                            <SocialIcon key={index} {...social} />
                                        ))}
                                    </div>
                                    <div className="space-y-4 mt-auto pt-4" />
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 shadow-inner">
                                        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600 flex items-center space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">README.md</span>
                                        </div>
                                        <div className="p-6 font-mono text-sm overflow-auto bg-white dark:bg-gray-800">
                                            <SimpleMarkdown content={config.bioMarkdown} />
                                        </div>
                                    </div>
                                </TextReveal>
                            </div>
                        </section>
                        <section id="technologies" className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 transition-all duration-300 ease-in-out">

                            <TextReveal>
                                <h2 className="text-3xl font-bold mb-6 text-center">Tecnologías</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {config.technologies.map((tech, index) => (
                                        <div key={index} className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-lg p-4 text-center flex flex-col items-center">
                                            {tech.icon && (typeof tech.icon === "string") ? (
                                                <img src={tech.icon as string} alt={tech.name} className="w-12 h-12 mb-2" />
                                            ) : (
                                                tech.icon
                                            )}
                                            <h3 className="font-semibold">{tech.name}</h3>
                                            <p className="text-sm">Tiempo: {tech.timeSpent}</p>
                                        </div>
                                    ))}
                                </div>
                            </TextReveal>
                        </section>

                        <section id="certificates" className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 transition-all duration-300 ease-in-out">

                            <TextReveal>
                                <h2 className="text-3xl font-bold mb-6 text-center">Certificados / Experiencia</h2>
                                <div className="space-y-4">
                                    {config.certificates.map((cert, index) => (
                                        <div key={index} className="bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100 rounded-lg p-4 flex items-center">
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

                        <section id="projects" className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 transition-all duration-300 ease-in-out">

                            <TextReveal>
                                <h2 className="text-3xl font-bold mb-6 text-center">Proyectos</h2>
                                <div className="space-y-8">
                                    {config.projects.map((project, index) => (
                                        <div key={index} className="bg-blue-100 dark:bg-blue-800 rounded-lg overflow-hidden">
                                            <img src={project.bannerUrl} alt={project.name} className="w-full h-48 object-cover" />
                                            <div className="p-4">
                                                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">{project.name}</h3>
                                                <p className="text-sm text-blue-600 dark:text-blue-300 mb-2">{project.description}</p>
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 transition-colors">
                                                    Ver proyecto
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TextReveal>
                        </section>

                        <section id="contact" className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 transition-all duration-300 ease-in-out">

                            <TextReveal>
                                <h2 className="text-3xl font-bold mb-6 text-center">Contacto</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mensaje</label>
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
                                    >
                                        Enviar
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