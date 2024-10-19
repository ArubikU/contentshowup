import { LocaleData, Locals } from '../Lang/LangSys';
const SPANISH: LocaleData = {
 types: {
    string: 'Cadena',
    number: 'Número',
    boolean: 'Booleano',
    null: 'Nulo',
    array: 'Arreglo',
    object: 'Objeto',
    year: 'Año',
    month: 'Mes',
    day: 'Día',
    years: 'Años',
    months: 'Meses',
    days: 'Días',
    name: 'Nombre',
    email: 'Correo Electrónico',
    message: 'Mensaje',
    time: 'Tiempo',
    age: 'Edad',
 },
 headers: {
    title: 'Portafolio',
    about: 'Sobre mí',
    technologies: 'Tecnologías',
    certificates: 'Certificados\n/Experiencia',
    certificatesmobile: 'Certificados y Experiencias',
    projects: 'Proyectos',
    contact: 'Contacto',
 },
 nav: {
   about: 'Sobre mí',
   technologies: 'Tecnologías',
   certificates: 'Certificados',
   projects: 'Proyectos',
   contact: 'Contacto',
 },
 portfolio: {
   title: 'Desarrollador FullStack',
   bioMarkdown: `
<a href="https://wakatime.com/@dfc54163-85fd-4ee0-b1c8-b15bb48710db"><img src="https://wakatime.com/badge/user/dfc54163-85fd-4ee0-b1c8-b15bb48710db.svg" alt="Tiempo total codificado desde el 27 de septiembre de 2022" /></a>
<a href="https://github.com/ryo-ma/github-profile-trophy"><img src="https://komarev.com/ghpvc/?username=arubiku&label=Visitas%20al%20perfil&color=0e75b6&style=flat" alt="Usuarios que visitaron este perfil" /></a>

<h1 align="center">Hola 👋, soy ArubikU</h1>
<h3 align="center">Soy una persona bastante interesada en aprender más sobre programación y veo un futuro brillante no solo para el mundo y la tecnología sino para mí y mis seres queridos.</h3>

- 🌱 Actualmente estoy aprendiendo **IA y algunas técnicas de front-end**

- 📄 ¡Ese texto de markdown lo representa un formateador propio!

- ⚡ Dato curioso **Probablemente exista en múltiples dimensiones**

\`\`\`javascript
const arubik = {
   pronouns: "they" | "them",
   code: ["Javascript", "Typescript", "Python", "Java", "C#", "C"],
   tools: ["React", "Node", "Styled-Components", "Docker"],
   architecture: ["microservices", "event-driven", "design system pattern"],
};
\`\`\`
   `,
   technologies: 'Tecnologías',
   certificates: 'Certificados',
   projects: 'Proyectos',
   contact: 'Contacto',
 },
 common: {
   viewRepository: 'Ver Repositorio',
   viewProject: 'En linea',
   sendEmail: 'Enviar Correo',

 },
 notes: {
  "1": "Idea para un nuevo proyecto",
  "2": "Recordatorio: actualizar CV",
  "3": "Aprender GraphQL"
 }
};
 const ENGLISH: LocaleData = {
  types: {
    string: 'String',
    number: 'Number',
    boolean: 'Boolean',
    null: 'Null',
    array: 'Array',
    object: 'Object',
    year: 'Year',
    month: 'Month',
    day: 'Day',
    years: 'Years',
    months: 'Months',
    days: 'Days',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    time: 'Time',
    age: 'Age',
  },
  headers: {
    title: 'Portfolio',
    about: 'About',
    technologies: 'Tech',
    certificates: 'Certs and Experience',
    certificatesmobile: 'Certs and Experience',
    projects: 'Projects',
    contact: 'Contact',
  },
  nav: {
    about: 'About',
    technologies: 'Tech',
    certificates: 'Certs',
    projects: 'Projects',
    contact: 'Contact',
  },
  portfolio: {
    title: 'Dev FullStack',
    bioMarkdown: `
<a href="https://wakatime.com/@dfc54163-85fd-4ee0-b1c8-b15bb48710db"><img src="https://wakatime.com/badge/user/dfc54163-85fd-4ee0-b1c8-b15bb48710db.svg" alt="Total time coded since Sep 27 2022" /></a>
<a href="https://github.com/ryo-ma/github-profile-trophy"><img src="https://komarev.com/ghpvc/?username=arubiku&label=Profile%20views&color=0e75b6&style=flat" alt="Users visited this profile" /></a>

<h1 align="center">Hi 👋, I'm ArubikU</h1>
<h3 align="center">I'm a person quite interested in learning more about programming and I see a bright future not only for the world and technology but for me and my loved ones.</h3>

- 🌱 I'm currently learning **AI and some front-end techniques**

- 📄 That markdown text is represented by a custom formatter!

- ⚡ Fun fact **I probably exist in multiple dimensions**

\`\`\`javascript
const arubik = {
    pronouns: "they" | "them",
    code: ["Javascript", "Typescript", "Python", "Java", "C#", "C"],
    tools: ["React", "Node", "Styled-Components", "Docker"],
    architecture: ["microservices", "event-driven", "design system pattern"],
};
\`\`\`

## Maths

$f(x) = x^2

## Admonitions

> [!NOTE]
> This is a note admonition.

> [!TIP]
> Here's a helpful tip!
> MAGIC

## Table

| Column 1 | Column 2 |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

    `,
    technologies: 'Technologies',
    certificates: 'Certificates',
    projects: 'Projects',
    contact: 'Contact',
  },
  common: {
    viewRepository: 'View Repository',
    viewProject: 'Online',
    sendEmail: 'Send Email',
  },
  notes: {
    "1": "Idea for a new project",
    "2": "Reminder: update CV",
    "3": `Learn MySQL

\`\`\`sql
SELECT * FROM users;
\`\`\`
    `



  }
};


export const PortfolioLocals: Locals = {
    en: ENGLISH,
    es: SPANISH,
    };