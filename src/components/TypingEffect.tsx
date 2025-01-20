import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

type TypingEffectProps = {
    text: string;
    speed?: number;
};

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 10 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, speed);

            return () => clearTimeout(timer);
        }
    }, [index, text, speed]);

    const parseText = (input: string) => {
        const blocks: (string | { type: 'code' | 'kbd' | 'bold'; content: string; language?: string })[] = [];
        const regex = /```(\w+)?[\s\S]*?```|`([\s\S]*?)`|\*\*(.*?)\*\*/g;
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
            }
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < input.length) {
            blocks.push(input.slice(lastIndex));
        }
        return blocks;
    };

    const blocks = parseText(displayedText);

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
                    <div className='max-w-[50vh] max-h-96 relative pt-[1.27rem]'>
                        <div className='absolute inset-x-0 top-0 bg-zinc-800 text-zinc-300 rounded-t-xl px-4 py-1'>
                            <p className='text-sm'>{block.language || 'plaintext'}</p>
                        </div>
                        <pre key={index} className="bg-transparent p-3 rounded-b-xl text-sm">
                            <code className={`language-${block.language}`}>{block.content}</code>
                        </pre>
                    </div>
                ) : (
                    <strong className="font-semibold text-lg dark:text-white" key={index}>
                        {block.content}
                    </strong>
                )
            )}
        </div>
    );
};

export default TypingEffect;



















// import React, { useState, useEffect } from 'react';

// type TypingEffectProps = {
//   text: string;
//   speed?: number;
//   onComplete?: () => void;
// };

// const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 10, onComplete }) => {
//   const [displayedText, setDisplayedText] = useState('');
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (index < text.length) {
//       const timer = setTimeout(() => {
//         setDisplayedText((prev) => prev + text[index]);
//         setIndex((prev) => prev + 1);
//       }, speed);

//       return () => clearTimeout(timer);
//     } else if (onComplete) {
//       onComplete();
//     }
//   }, [index, text, speed, onComplete]);

//   return <div className='whitespace-pre-wrap'>{displayedText}</div>;
// };

// export default TypingEffect;






// =============================================================================================







// 'use client';

// import { useEffect, useRef, useState } from "react";
// import 'prismjs/themes/prism-tomorrow.css';
// import Prism from 'prismjs';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-markup';
// import 'prismjs/components/prism-python';
// import 'prismjs/components/prism-css';

// function TypingEffect ({
//     text,
//     typingSpeed = 25,
//     onFinish,
// }: {
//     text: string;
//     typingSpeed?: number;
//     onFinish?: () => void;
// }) {
//     const [typingText, setTypingText] = useState('');
//     const [isTyping, setIsTyping] = useState(false);
//     const containerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (typeof window === 'undefined' || !text) return;

//         setTypingText('');
//         setIsTyping(true);

//         let i = 0;

//         const interval = setInterval(() => {
//             setTypingText((prevText) => prevText + text.charAt(i));

//             if (containerRef.current) {
//                 containerRef.current.scrollTop = containerRef.current.scrollHeight;
//             }

//             i++;
//             if (i >= text.length) {
//                 clearInterval(interval);
//                 setIsTyping(false);
//                 if (onFinish) onFinish();
//             }
//         }, typingSpeed);

//         setTypingText(text.charAt(0));

//         return () => {
//             clearInterval(interval);
//         };
//     }, [text, typingSpeed]);

   
//     const parseText = (input: string) => {
//         const blocks: (string | { type: 'code' | 'kbd' | 'bold'; content: string })[] = [];
//         const regex = /```([\s\S]*?)```|`([\s\S]*?)`|\*\*(.*?)\*\*/g;
//         let lastIndex = 0;

//         let match;
//         while ((match = regex.exec(input)) !== null) {
//             if (match.index > lastIndex) {
//                 blocks.push(input.slice(lastIndex, match.index));
//             }
//             if (match[1]) {
//                 blocks.push({ type: 'code', content: match[1] });
//             }else if (match[2]) {
//                 blocks.push({ type: 'kbd', content: match[2] });
//             } else if (match[3]) {
//                 blocks.push({ type: 'bold', content: match[2] });
//             }
//             lastIndex = regex.lastIndex;
//         }
//         if (lastIndex < input.length) {
//             blocks.push(input.slice(lastIndex));
//         }
//         return blocks;
//     };

//     const blocks = parseText(typingText);

   
//     useEffect(() => {
//         Prism.highlightAll();
//     }, [blocks]);

//     return (
//         <div 
//             ref={containerRef} 
//             className="px-3 mt-2 whitespace-pre-wrap"
//         >
//             {blocks.map((block, index) =>
//                 typeof block === 'string' ? (
//                     <span key={index}>{block}</span>
//                 ) : block.type === 'kbd' ? (
//                     <kbd key={index} className="inline-block text-sm bg-zinc-100 dark:bg-zinc-800 px-2 rounded-xl align-text-top">{block.content}</kbd>
//                 ) : block.type === 'code' ? (
//                     <pre
//                         key={index}
//                         className="bg-transparent p-3 rounded-xl text-sm max-w-[50vh] max-h-96"
//                     >
//                         <code className="language-html">{block.content}</code>
//                     </pre>
//                 ) : (
//                     <strong className="font-semibold text-lg dark:text-white" key={index}>{block.content}</strong>
//                 )
//             )}
//         </div>
//     );
// };

// export default TypingEffect;