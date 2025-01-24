import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-tsx.min.js';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux';
import { usePathname } from 'next/navigation';

type TypingEffectProps = {
    text: string;
};

const parseText = (input: string) => {
    const blocks: (
        | string
        | { type: 'code' | 'kbd' | 'bold' | 'table'; content: string; language?: string }
    )[] = [];

    const regex = /```(\w+)?[\s\S]*?```|`([\s\S]*?)`|\*\*(.*?)\*\*|^(\s*\|[\s\S]*\|\s*)\n(\s*\|[-:| ]+\|\s*)\n(\s*\|[\s\S]*\|\s*)+/gm;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(input)) !== null) {
        if (match.index > lastIndex) {
            blocks.push(input.slice(lastIndex, match.index));
        }

        if (match[0].startsWith('```')) {
            const parts = match[0].split('\n');
            const firstLine = parts[0].replace(/```/g, '').trim();
            const language = firstLine || 'plaintext';
            const content = parts.slice(1, -1).join('\n');
            blocks.push({ type: 'code', content, language });
        } else if (match[2]) {
            blocks.push({ type: 'kbd', content: match[2] });
        } else if (match[3]) {
            blocks.push({ type: 'bold', content: match[3] });
        } else if (match[0]) {
            blocks.push({ type: 'table', content: match[0] });
        }

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < input.length) {
        blocks.push(input.slice(lastIndex));
    }

    return blocks;
};

type RenderTableProps = {
    content: string;
};

const RenderTable: React.FC<RenderTableProps> = ({ content }) => {
    const parseTable = (content: string) => {
        const rows = content.trim().split('\n');
        if (rows.length < 3) return { headers: [], bodyRows: [] };

        const headers = rows[0].split('|').filter(Boolean).map(header => header.trim());
        const bodyRows = rows.slice(2).map(row =>
            row.split('|').filter(Boolean).map(cell => cell.trim())
        );

        return { headers, bodyRows };
    };

    const { headers, bodyRows } = parseTable(content);

    // if (headers.length === 0 || bodyRows.length === 0) {
    //     return <p className="text-red-500">Invalid table format</p>;
    // }
    if (headers.length === 0 || bodyRows.length === 0) {
        return null;
    }

    return (
        <div className='w-full overflow-x-auto'>
            <table className="border-collapse border border-zinc-400 dark:border-zinc-700 w-full text-sm my-3">
                <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800 dark:text-white">
                        {headers.map((header, i) => (
                            <th key={i} className="border border-zinc-400 dark:border-zinc-700 px-4 py-2 text-left font-semibold">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {bodyRows.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={j} className="border border-zinc-400 dark:border-zinc-700 px-4 py-2">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const TypingEffect: React.FC<TypingEffectProps> = ({ text }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const blocks = parseText(text);

    useEffect(() => {
        Prism.highlightAll();
    }, [blocks]);

    return (
        <div ref={containerRef} className="px-3 mt-2 whitespace-pre-wrap">
            {blocks.map((block, index) =>
                typeof block === 'string' ? (
                    <span key={index}>{block}</span>
                ) : block.type === 'kbd' ? (
                    <kbd key={index} className="inline-block text-sm bg-zinc-100 dark:bg-zinc-800 px-2 rounded-xl align-text-top">
                        {block.content}
                    </kbd>
                ) : block.type === 'code' ? (
                    <div key={index} className={`${pathname === '/chat' ? 'md:max-w-[100vh]' : 'md:max-w-[65vh]'} relative pt-[1.2rem]`}>
                        <div className="absolute inset-x-0 top-0 bg-zinc-800 text-zinc-300 rounded-t-xl px-4 py-1">
                            <p className="text-sm">{block.language || 'plaintext'}</p>
                        </div>
                        <pre className="bg-transparent p-3 rounded-b-xl text-sm">
                            <code className={`language-${block.language}`}>{block.content}</code>
                        </pre>
                    </div>
                ) : block.type === 'table' ? (
                    <RenderTable key={index} content={block.content} />
                ) : (
                    <strong className="font-semibold dark:text-white" key={index}>
                        {block.content}
                    </strong>
                )
            )}
        </div>
    );
};

export default TypingEffect;



















// import React, { useState, useEffect, useRef } from 'react';
// import Prism from 'prismjs';
// import 'prismjs/themes/prism-tomorrow.css';

// type TypingEffectProps = {
//     text: string;
// };

// const TypingNoEffect: React.FC<TypingEffectProps> = ({ text }) => {
//     const containerRef = useRef<HTMLDivElement>(null);

//     const parseText = (input: string) => {
//         const blocks: (string | { type: 'code' | 'kbd' | 'bold'; content: string; language?: string })[] = [];
//         const regex = /```(\w+)?[\s\S]*?```|`([\s\S]*?)`|\*\*(.*?)\*\*/g;
//         let lastIndex = 0;
//         let match;

//         while ((match = regex.exec(input)) !== null) {
//             if (match.index > lastIndex) {
//                 blocks.push(input.slice(lastIndex, match.index));
//             }
//             if (match[0].startsWith('```')) {
//                 const parts = match[0].split('\n');
//                 const firstLine = parts[0].replace(/```/g, '').trim();
//                 const language = firstLine || 'plaintext';
//                 const content = parts.slice(1, -1).join('\n');
//                 blocks.push({ type: 'code', content, language });
//             } else if (match[2]) {
//                 blocks.push({ type: 'kbd', content: match[2] });
//             } else if (match[3]) {
//                 blocks.push({ type: 'bold', content: match[3] });
//             }
//             lastIndex = regex.lastIndex;
//         }
//         if (lastIndex < input.length) {
//             blocks.push(input.slice(lastIndex));
//         }
//         return blocks;
//     };

//     const blocks = parseText(text);

//     useEffect(() => {
//         Prism.highlightAll();
//     }, [blocks]);

//     return (
//         <div ref={containerRef} className="px-3 mt-2 whitespace-pre-wrap">
//             {blocks.map((block, index) =>
//                 typeof block === 'string' ? (
//                     <span key={index}>{block}</span>
//                 ) : block.type === 'kbd' ? (
//                     <kbd key={index} className="inline-block text-sm bg-zinc-100 dark:bg-zinc-800 px-2 rounded-xl align-text-top">
//                         {block.content}
//                     </kbd>
//                 ) : block.type === 'code' ? (
//                     <div key={index} className='md:max-w-[65vh] relative pt-[1.26rem]'>
//                         <div className='absolute inset-x-0 top-0 bg-zinc-800 text-zinc-300 rounded-t-xl px-4 py-1'>
//                             <p className='text-sm'>{block.language || 'plaintext'}</p>
//                         </div>
//                         <pre className="bg-transparent p-3 rounded-b-xl text-sm">
//                             <code className={`language-${block.language}`}>{block.content}</code>
//                         </pre>
//                     </div>
//                 ) : (
//                     <strong className="font-semibold text-lg dark:text-white" key={index}>
//                         {block.content}
//                     </strong>
//                 )
//             )}
//         </div>
//     );
// };

// export default TypingNoEffect;