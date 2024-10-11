export const Placeholders = {
    title: "Ignite",
    author: "ArubikU",
    authorUrl: "https://github.com/arubiku",
    projectRepo: "https://github.com/vectrix-space/ignite",
    contentPlural: "Ignios"
}
export enum Language {
    en = "en",
    es = "es",
    fr = "fr", // French
    ru = "ru", // Russian
}

type BaseLocale = {
    language: {
        en: string;
        es: string;
        fr: string; // French
        ru: string; // Russian
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
    };
    placeholders: {
        description: string;
        author: string;
        disclaimer: string;
        versions: string;
        tags: string;
        links: string;
        comments: string;
        commentsComingSoon: string;
        selectVersion: string;
    };
    faq: {
        title: string;
        items: Array<{
            question: string;
            answer: string;
        }>;
    };
};

type Locals = {
    [key in Language]: BaseLocale;
};

const localizations: Locals = {
    en: {
        language: {
            en: "English",
            es: "Spanish",
            fr: "French",
            ru: "Russian",
        },
        mainPage: {
            title: "Welcome to {title}",
            subtitle: "The powerful Mod loader for your gaming needs",
            disponibleContent: "Available {contentPlural}",
        },
        buttons: {
            showContent: "Show {contentPlural}",
            hideContent: "Hide {contentPlural}",
            viewRepository: "View Repository",
            viewProfile: "View Profile",
            downloadLatest: "Download Latest",
            download: "Download",
        },
        search: {
            placeholder: "Search for {contentPlural}...",
        },
        placeholders: {
            description: "Description:",
            author: "Author:",
            disclaimer: "© 2024 Ignite web. Created by",
            versions: "Versions",
            tags: "Tags",
            links: "Links",
            comments: "Comments",
            commentsComingSoon: "Comment section coming soon",
            selectVersion: "Select a version",
        },
        faq: {
            title: "Frequently Asked Questions",
            items: [
                {
                    question: "What is {title}?",
                    answer: "Ignite is a powerful Mod loader designed to enhance your gaming experience by allowing easy installation and management of game modifications."
                },
                {
                    question: "How do I install {title}?",
                    answer: "To install Ignite, simply download the latest version from our website and run the installer. Follow the on-screen instructions to complete the setup."
                },
                {
                    question: "Is Ignite compatible with all games?",
                    answer: "Ignite is designed to work with a wide range of games, but compatibility may vary. Check our compatibility list or the specific game's modding community for more information."
                },
                {
                    question: "How can I create mods for {title}?",
                    answer: "We provide comprehensive documentation and tools for mod developers. Visit our developer portal to get started with creating mods for Ignite."
                },
            ],
        },
    },
    es: {
        language: {
            en: "Inglés",
            es: "Español",
            fr: "Francés",
            ru: "Ruso",
        },
        mainPage: {
            title: "Bienvenido a {title}",
            subtitle: "El cargador de Mods más útil para ti.",
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
        },
        placeholders: {
            description: "Descripción:",
            author: "Autor:",
            disclaimer: "© 2024 Ignite web. Creado por",
            versions: "Versiones",
            tags: "Etiquetas",
            links: "Enlaces",
            comments: "Comentarios",
            commentsComingSoon: "Sección de comentarios próximamente",
            selectVersion: "Selecciona una versión",
        },
        faq: {
            title: "Preguntas Frecuentes",
            items: [
                {
                    question: "¿Qué es {title}?",
                    answer: "Ignite es un potente cargador de Mods diseñado para mejorar tu experiencia de juego permitiendo una fácil instalación y gestión de modificaciones de juegos."
                },
                {
                    question: "¿Cómo instalo {title}?",
                    answer: "Para instalar Ignite, simplemente descarga la última versión desde nuestro sitio web y ejecuta el instalador. Sigue las instrucciones en pantalla para completar la configuración."
                },
                {
                    question: "¿Es Ignite compatible con todos los juegos?",
                    answer: "Ignite está diseñado para funcionar con una amplia gama de juegos, pero la compatibilidad puede variar. Consulta nuestra lista de compatibilidad o la comunidad de modding del juego específico para obtener más información."
                },
                {
                    question: "¿Cómo puedo crear mods para {title}?",
                    answer: "Proporcionamos documentación completa y herramientas para desarrolladores de mods. Visita nuestro portal de desarrolladores para comenzar a crear mods para Ignite."
                },
            ],
        },
    },
    fr: {
        language: {
            en: "Anglais",
            es: "Espagnol",
            fr: "Français",
            ru: "Russe",
        },
        mainPage: {
            title: "Bienvenue à {title}",
            subtitle: "Le puissant chargeur de mods pour vos besoins de jeu",
            disponibleContent: "{contentPlural} disponibles",
        },
        buttons: {
            showContent: "Afficher {contentPlural}",
            hideContent: "Masquer {contentPlural}",
            viewRepository: "Voir le dépôt",
            viewProfile: "Voir le profil",
            downloadLatest: "Télécharger la dernière version",
            download: "Télécharger",
        },
        search: {
            placeholder: "Rechercher des {contentPlural}...",
        },
        placeholders: {
            description: "Description :",
            author: "Auteur :",
            disclaimer: "© 2024 Ignite web. Créé par",
            versions: "Versions",
            tags: "Étiquettes",
            links: "Liens",
            comments: "Commentaires",
            commentsComingSoon: "Section de commentaires à venir",
            selectVersion: "Sélectionnez une version",
        },
        faq: {
            title: "Questions Fréquemment Posées",
            items: [
                {
                    question: "Qu'est-ce qu'Ignite ?",
                    answer: "Ignite est un puissant chargeur de mods conçu pour améliorer votre expérience de jeu en permettant une installation et une gestion faciles des modifications de jeu."
                },
                {
                    question: "Comment installer Ignite ?",
                    answer: "Pour installer Ignite, téléchargez simplement la dernière version depuis notre site Web et exécutez l'installateur. Suivez les instructions à l'écran pour terminer l'installation."
                },
                {
                    question: "Ignite est-il compatible avec tous les jeux ?",
                    answer: "Ignite est conçu pour fonctionner avec une large gamme de jeux, mais la compatibilité peut varier. Consultez notre liste de compatibilité ou la communauté de modding du jeu spécifique pour plus d'informations."
                },
                {
                    question: "Comment puis-je créer des mods pour {title} ?",
                    answer: "Nous fournissons une documentation complète et des outils pour les développeurs de mods. Visitez notre portail développeur pour commencer à créer des mods pour Ignite."
                },
            ],
        },
    },
    ru: {
        language: {
            en: "Английский",
            es: "Испанский",
            fr: "Французский",
            ru: "Русский",
        },
        mainPage: {
            title: "Добро пожаловать в {title}",
            subtitle: "Мощный мод-лоадер для ваших игровых нужд",
            disponibleContent: "Доступные {contentPlural}",
        },
        buttons: {
            showContent: "Показать {contentPlural}",
            hideContent: "Скрыть {contentPlural}",
            viewRepository: "Просмотреть репозиторий",
            viewProfile: "Просмотреть профиль",
            downloadLatest: "Скачать последнюю версию",
            download: "Скачать",
        },
        search: {
            placeholder: "Поиск {contentPlural}...",
        },
        placeholders: {
            description: "Описание:",
            author: "Автор:",
            disclaimer: "© 2024 Ignite web. Создано",
            versions: "Версии",
            tags: "Теги",
            links: "Ссылки",
            comments: "Комментарии",
            commentsComingSoon: "Раздел комментариев скоро появится",
            selectVersion: "Выберите версию",
        },
        faq: {
            title: "Часто задаваемые вопросы",
            items: [
                {
                    question: "Что такое {title}?",
                    answer: "Ignite — мощный мод-лоадер, разработанный для улучшения вашего игрового опыта, позволяющий легко устанавливать и управлять модификациями игр."
                },
                {
                    question: "Как установить {title}?",
                    answer: "Чтобы установить Ignite, просто загрузите последнюю версию с нашего веб-сайта и запустите установщик. Следуйте инструкциям на экране, чтобы завершить настройку."
                },
                {
                    question: "Совместим ли Ignite со всеми играми?",
                    answer: "Ignite предназначен для работы с широким спектром игр, но совместимость может варьироваться. Проверьте наш список совместимости или сообщество моддинга конкретной игры для получения дополнительной информации."
                },
                {
                    question: "Как создать моды для {title}?",
                    answer: "Мы предоставляем полную документацию и инструменты для разработчиков модов. Посетите наш портал для разработчиков, чтобы начать создавать моды для Ignite."
                },
            ],
        },
    },
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

export const GetLang = (lang: Language, langPath: string) => {
    const getNestedValue = (obj: any, path: string): any => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    let localizedString = getNestedValue(localizations[lang], langPath) || getNestedValue(localizations[Language.en], langPath);

    return parsePlaceholders(localizedString);
};

export const GetLangArray = (lang: Language, langPath: string) => {
    const getNestedValue = (obj: any, path: string): any => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    let localizedArray = getNestedValue(localizations[lang], langPath) || getNestedValue(localizations[Language.en], langPath);

    let a = localizedArray.map((item: any) => {
        return {
            question: parsePlaceholders(item.question),
            answer: parsePlaceholders(item.answer)
        }
    });

    console.log(a)
    return a;
}
