import React from 'react';
import { UseHighlighter } from './highlighter';

interface SimpleMarkdownProps {
    content: string;
    className?: string;
    ctexTclass?: string;
}

const SimpleMarkdown: React.FC<SimpleMarkdownProps> = ({ content, className, ctexTclass="my-2" }) => {
    const parseMarkdown = (md: string): string => {
        const lines = md.split('\n');
        let inCodeBlock = false;
        let html = '';
        let currentParagraph = '';
        let inList = false;
        let listType = '';
        let currentCodeLanguage = '';

        const flushParagraph = () => {
            if (currentParagraph) {
                html += `<p class="${ctexTclass}">${currentParagraph.trim()}</p>`;
                currentParagraph = '';
            }
        };

        const flushList = () => {
            if (inList) {
                html += `</${listType}>`;
                inList = false;
                listType = '';
            }
        };

        const parseInline = (text: string): string => {
            // Bold
            text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Italic
            text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
            // Inline code
            text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">$1</code>');
            // Links with title (alias)
            text = text.replace(/\[([^\]]+)\]$$([^)]+)\s*"(.*?)"$$/g, '<a href="$2" title="$3" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">$1</a>');
            // Links without title
            text = text.replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">$1</a>');
            
            
            return text;
        };
        // Función para resaltar el código
        const highlightCode = (code: string, language: string) => {
            const codeComponent = UseHighlighter({ content: code, lang: language });
            //add a copy to clipboard button on the top right of the code block
            return `${codeComponent}`;
        };



        let codeLines = [];
        lines.forEach((line, index) => {


            if (line.trim().startsWith('```')) {
                flushParagraph();
                flushList();
                inCodeBlock = !inCodeBlock;
                if (inCodeBlock) {
                    currentCodeLanguage = line.trim().slice(3).toLowerCase() || 'default';
                    html += `<pre><code class="language-${currentCodeLanguage} bg-[#fdf6e3] dark:bg-[#2d353b] block p-2 rounded-md my-2 overflow-x-auto">`;
                    codeLines = [];
                    codeLines.push(line);
                } else {
                    html += '</code></pre>';
                    currentCodeLanguage = '';
                    codeLines.push(line);
                }
            } else if (inCodeBlock) {
                // Resalta el código dentro de los bloques de código and add line numbers ${codeLines.length}
                //html += highlightCode(line, currentCodeLanguage).replace(`<code`, `${codeLines.length} | <code`);
                //format better the line index
                html += highlightCode(line, currentCodeLanguage).replace(`<code`, `<span class="text-gray-400 dark:text-gray-500 text-sm">${codeLines.length} | </span><code`);
                //add a button to the right of the code block to copy the code if the codeLine is the last one
                //generate the html for the copy button
                codeLines.push(line);
            } else {
                // Headers
                if (line.startsWith('#')) {
                    flushParagraph();
                    flushList();
                    const level = line.match(/^#+/)[0].length;
                    const text = line.replace(/^#+\s*/, '');
                    html += `<h${level} class="text-${4 - level}xl font-bold mt-${8 - level} mb-${6 - level}">${parseInline(text)}</h${level}>`;
                }
                // Lists
                else if (/^\s*(\d+\.|-)\s+(.*)/.test(line)) {
                    flushParagraph();
                    const match = line.match(/^\s*(\d+\.|-)\s+(.*)/);
                    const isOrdered = match[1].endsWith('.');
                    if (!inList || (isOrdered && listType === 'ul') || (!isOrdered && listType === 'ol')) {
                        flushList();
                        listType = isOrdered ? 'ol' : 'ul';
                        html += `<${listType} class="list-${isOrdered ? 'decimal' : 'disc'} pl-5 my-2">`;
                        inList = true;
                    }
                    html += `<li>${parseInline(match[2])}</li>`;
                }
                // Images
                else if (/!\[([^\]]*)\]$$([^)]+)$$/.test(line)) {
                    flushParagraph();
                    line = line.replace(
                        /!\[([^\]]*)\]$$([^)]+)(?:\s+(\d+)x(\d+))?$$/g,
                        (match, alt, src, width, height) => {
                            const sizeAttr = width && height ? `width="${width}" height="${height}"` : '';
                            return `<img src="${src}" alt="${alt}" ${sizeAttr} class="my-2 rounded-md max-w-full">`;
                        }
                    );
                    html += line;
                }
                // Horizontal Rule
                else if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
                    flushParagraph();
                    flushList();
                    html += '<hr class="my-4 border-t border-gray-300 dark:border-gray-700">';
                }
                // Paragraphs
                else {
                    if (line.trim() === '') {
                        flushParagraph();
                    } else {
                        currentParagraph += parseInline(line) + ' ';
                    }
                }
            }
        });

        flushParagraph();
        flushList();
        return html;
    };

    return <div className={"prose dark:prose-invert "+ className||""} dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />;
};

export default SimpleMarkdown;