import { LocaleData as BaseLocale } from "../Components/Lang/LangSys";

export const SPANISH: BaseLocale = {
    language: {
        en: "Inglés",
        es: "Español",
        fr: "Francés",
        ru: "Ruso",
    },
    mainPage: {
        title: "Bienvenido a {title}",
        subtitle: "La comunidad de creacion de contenido que todos necesitan.",
        disponibleContent: "{contentPlural} disponibles",
    },
    buttons: {
        showContent: "Mostrar {contentPlural}",
        hideContent: "Ocultar {contentPlural}",
        viewRepository: "Ver Repositorio",
        viewProfile: "Ver Perfil",
        downloadLatest: "Descargar Última Versión",
        download: "Descargar",
    },
    search: {
        placeholder: "Buscar {contentPlural}...",
        allLoaders: "Todos los Cargadores",
    },
    placeholders: {
        any: "Cualquiera",
        description: "Descripción:",
        author: "Autor:",
        disclaimer: "© 2024 {title} web. Creado por",
        versions: "Versiones",
        tags: "Etiquetas",
        links: "Enlaces",
        comments: "Comentarios",
        commentsComingSoon: "Sección de comentarios próximamente",
        selectVersion: "Selecciona una versión",
        selectLoader: "Selecciona un cargador"
    },
    faq: {
        title: "Preguntas Frecuentes",
        items: [
            {
                question: "¿Qué es {title}?",
                answer: "{title} es un potente cargador de Mods diseñado para mejorar tu experiencia de juego permitiendo una fácil instalación y gestión de modificaciones de juegos."
            },
            {
                question: "¿Cómo instalo {title}?",
                answer: "Para instalar {title}, simplemente descarga la última versión desde nuestro sitio web y ejecuta el instalador. Sigue las instrucciones en pantalla para completar la configuración."
            },
            {
                question: "¿Es {title} compatible con todos los juegos?",
                answer: "{title} está diseñado para funcionar con una amplia gama de juegos, pero la compatibilidad puede variar. Consulta nuestra lista de compatibilidad o la comunidad de modding del juego específico para obtener más información."
            },
            {
                question: "¿Cómo puedo crear mods para {title}?",
                answer: "Proporcionamos documentación completa y herramientas para desarrolladores de mods. Visita nuestro portal de desarrolladores para comenzar a crear mods para {title}."
            },
        ],
    },
    uploadForm: {
        title: "Agregar Contenido",
        description: "Descripción",
        shortdescription: "Resumen",
        name: "Nombre",
        repository: "Repositorio",
        versions: "Versiones",
        versionPlaceholder: "Versión",
        fileUrlPlaceholder: "URL del archivo",
        addVersion: "Agregar Versión",
        author: "Autor",
        tags: "Etiquetas (separadas por comas)",
        loader: "Cargador",
        selectLoader: "Seleccionar cargador",
        datapack: "Datapack",
        fabric: "Fabric",
        forge: "Forge",
        ignite: "{title}",
        resourcepack: "Paquete de recursos",
        submit: "Enviar",
        logo: "Logo",
        banner: "Banner",
    },
    userDialog: {
        title: "Perfil de Usuario",
        bio: "Biografía",
        packsByAuthor: "Packs de este autor:",
    },
    membersSection: {
        title: "Miembros",
    },
}