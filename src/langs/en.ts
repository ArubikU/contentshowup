import { BaseLocale } from "../LangSys";

export const ENGLISH: BaseLocale = {
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
        allLoaders: "All Loaders",
    },
    placeholders: {
        description: "Description:",
        author: "Author:",
        disclaimer: "© 2024 {title} web. Created by",
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
                answer: "{title} is a powerful Mod loader designed to enhance your gaming experience by allowing easy installation and management of game modifications."
            },
            {
                question: "How do I install {title}?",
                answer: "To install {title}, simply download the latest version from our website and run the installer. Follow the on-screen instructions to complete the setup."
            },
            {
                question: "Is {title} compatible with all games?",
                answer: "{title} is designed to work with a wide range of games, but compatibility may vary. Check our compatibility list or the specific game's modding community for more information."
            },
            {
                question: "How can I create mods for {title}?",
                answer: "We provide comprehensive documentation and tools for mod developers. Visit our developer portal to get started with creating mods for {title}."
            },
        ],
    },
    uploadForm: {
        title: "Add Content",
        description: "Description",
        shortdescription: "Resume",
        name: "Name",
        repository: "Repository",
        versions: "Versions",
        versionPlaceholder: "Version",
        fileUrlPlaceholder: "File URL",
        addVersion: "Add Version",
        author: "Author",
        tags: "Tags (comma-separated)",
        loader: "Loader",
        selectLoader: "Select loader",
        datapack: "Datapack",
        fabric: "Fabric",
        forge: "Forge",
        ignite: "{title}",
        resourcepack: "Resourcepack",
        submit: "Submit",
        logo: "Logo",
        banner: "Banner",
    },
    userDialog: {
        title: "User Profile",
        bio: "Bio",
        packsByAuthor: "Packs by this author:",
    },
    membersSection: {
        title: "Members",
    },
};