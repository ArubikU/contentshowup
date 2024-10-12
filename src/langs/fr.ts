import { BaseLocale } from "../LangSys";

export const FRENCH: BaseLocale = {
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
        allLoaders: "Tous les chargeurs",
    },
    placeholders: {
        description: "Description :",
        author: "Auteur :",
        disclaimer: "© 2024 {title} web. Créé par",
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
                question: "Qu'est-ce qu'{title} ?",
                answer: "{title} est un puissant chargeur de mods conçu pour améliorer votre expérience de jeu en permettant une installation et une gestion faciles des modifications de jeu."
            },
            {
                question: "Comment installer {title} ?",
                answer: "Pour installer {title}, téléchargez simplement la dernière version depuis notre site Web et exécutez l'installateur. Suivez les instructions à l'écran pour terminer l'installation."
            },
            {
                question: "{title} est-il compatible avec tous les jeux ?",
                answer: "{title} est conçu pour fonctionner avec une large gamme de jeux, mais la compatibilité peut varier. Consultez notre liste de compatibilité ou la communauté de modding du jeu spécifique pour plus d'informations."
            },
            {
                question: "Comment puis-je créer des mods pour {title} ?",
                answer: "Nous fournissons une documentation complète et des outils pour les développeurs de mods. Visitez notre portail développeur pour commencer à créer des mods pour {title}."
            },
        ],
    },
    uploadForm: {
        title: "Ajouter du Contenu",
        description: "Description",
        shortdescription: "Mini-Description (! M-T-001)",
        name: "Nom",
        repository: "Dépôt",
        versions: "Versions",
        versionPlaceholder: "Version",
        fileUrlPlaceholder: "URL du fichier",
        addVersion: "Ajouter une Version",
        author: "Auteur",
        tags: "Étiquettes (séparées par des virgules)",
        loader: "Chargeur",
        selectLoader: "Sélectionner un chargeur",
        datapack: "Datapack",
        fabric: "Fabric",
        forge: "Forge",
        ignite: "{title}",
        resourcepack: "Pack de ressources",
        submit: "Soumettre",
        logo: "Logo",
        banner: "Bannière",
    },
    userDialog: {
        title: "Profil Utilisateur",
        bio: "Biographie",
        packsByAuthor: "Packs de cet auteur :",
    },
    membersSection: {
        title: "Membres",
    },
}