import { BaseLocale } from "../LangSys";

export const RUSSIAN: BaseLocale =  {
    language: {
        en: "Английский",
        es: "Испанский",
        fr: "Французский",
        ru: "Русский",
    },
    mainPage: {
        title: "Добро пожаловать в {title}",
        subtitle: "Мощный контент, который нужен каждому",
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
        allLoaders: "Все загрузчики",
    },
    placeholders: {
        any: "Любой",
        description: "Описание:",
        author: "Автор:",
        disclaimer: "© 2024 {title} web. Создано",
        versions: "Версии",
        tags: "Теги",
        links: "Ссылки",
        comments: "Комментарии",
        commentsComingSoon: "Раздел комментариев скоро появится",
        selectVersion: "Выберите версию",
        selectLoader: "Выберите зарядное устройство"
    },
    faq: {
        title: "Часто задаваемые вопросы",
        items: [
            {
                question: "Что такое {title}?",
                answer: "{title} — мощный мод-лоадер, разработанный для улучшения вашего игрового опыта, позволяющий легко устанавливать и управлять модификациями игр."
            },
            {
                question: "Как установить {title}?",
                answer: "Чтобы установить {title}, просто загрузите последнюю версию с нашего веб-сайта и запустите установщик. Следуйте инструкциям на экране, чтобы завершить настройку."
            },
            {
                question: "Совместим ли {title} со всеми играми?",
                answer: "{title} предназначен для работы с широким спектром игр, но совместимость может варьироваться. Проверьте наш список совместимости или сообщество моддинга конкретной игры для получения дополнительной информации."
            },
            {
                question:  "Как создать моды для {title}?",
                answer: "Мы предоставляем полную документацию и инструменты для разработчиков модов. Посетите наш портал для разработчиков, чтобы начать создавать моды для {title}."
            },
        ],
    },
    uploadForm: {
        title: "Добавить Контент",
        description: "Загрузить проект",
        shortdescription: "Mini-Description (! M-T-001)",
        name: "Название",
        repository: "Репозиторий",
        versions: "Версии",
        versionPlaceholder: "Версия",
        fileUrlPlaceholder: "URL файла",
        addVersion: "Добавить Версию",
        author: "Автор",
        tags: "Теги (через запятую)",
        loader: "Загрузчик",
        selectLoader: "Выберите загрузчик",
        datapack: "Датапак",
        fabric: "Fabric",
        forge: "Forge",
        ignite: "{title}",
        resourcepack: "Ресурспак",
        submit: "Отправить",
        logo: "Логотип",
        banner: "Баннер",
    },
    userDialog: {
        title: "Профиль Пользователя",
        bio: "Биография",
        packsByAuthor: "Паки этого автора:",
    },
    membersSection: {
        title: "Участники",
    },
}