import React from 'react';
import { createHighlighter } from 'shiki';
import { useTheme } from '../../ThemeContext';

let langs = ['javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'csharp', 'go', 'html', 'css', 'scss', 'json', 'yaml', 'xml', 'markdown', 'bash', 'shell', 'powershell', 'sql', 'php', 'ruby', 'perl', 'rust', 'swift', 'kotlin', 'dart', 'r', 'lua', 'groovy', 'scala', 'haskell', 'elm', 'erlang', 'ocaml', 'fsharp', 'clojure', 'plaintext', 'dockerfile']

let highlight = await createHighlighter({
    themes: ['everforest-dark', 'everforest-light'],
    langs: langs
});

export function UseHighlighter({content, lang}): React.ReactNode {
    const { theme, toggleTheme } = useTheme()
    
    if(langs.includes(lang)){
        return highlight.codeToHtml(content, {
            lang: lang,
            theme: theme === 'light' ? 'everforest-light' : 'everforest-dark'
        });
    }
    else{
        return <code>{content}</code>
    }
}
