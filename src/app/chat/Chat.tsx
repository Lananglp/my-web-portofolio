'use client'
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CircleAlert, CircleX, LoaderCircle, MoveDown, RadioTower, RotateCw, Send, Wifi } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import ChatSection from './ChatSection';
import { addChatHistory } from '../globalState/chatHistorySlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import { ToggleThemeButton } from '@/components/ToggleThemeButton';
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"
import { useRouter } from 'next/navigation';
import { useChat } from 'ai/react';
import { Spotlight } from '@/components/ui/Spotlight-new';
import ChatHome from './ChatHome';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { initialModel, listModels } from '@/helper/helper';

interface MessagesType {
    role: "user" | "data" | "system" | "assistant";
    content: string;
}

export interface ModelType {
    id: number;
    name: string;
    title: string;
    description: string;
    parameter: string;
    provider: string;
    status: "active" | "inactive" | string;
    latency?: "low" | "medium" | "high" | string;
}

function Chat() {
    const [selectedModel, setSelectedModel] = useState<ModelType>(initialModel);
    const [yourTokenUsage, setYourTokenUsage] = useState<number>(0);
    const { messages, input, handleSubmit, isLoading, setInput, error, reload, stop } = useChat({
        api: '/api/ask-to-ai',
        body: {
            model: selectedModel ? selectedModel.name : initialModel.name,
            provider: selectedModel ? selectedModel.provider : initialModel.provider,
            tokenUsage: yourTokenUsage
        },
        onFinish: (message, { usage, finishReason }) => {
            console.log('Finished streaming message:', message);
            console.log('Token usage:', usage.totalTokens);
            console.log('Finish reason:', finishReason);
            setYourTokenUsage(usage.totalTokens);
        },
        onError: error => {
            // const isError: any = error?.message;
            // if (isError.error) {
            //     console.error('isError:', JSON.parse(isError.error) || isError);
            //     setErrorMessage(isError.error);
            // } else {
            //     console.error('An error occurred:', error?.message || error);
            // }
            console.error('An error occurred:', error?.message || error);
        },
        onResponse: response => {
            console.log('Received HTTP response from server:', response);
        },        
    });
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
    const [activePage, setActivePage] = useState<boolean>(true);
    const [textareaHeight, setTextareaHeight] = useState<number>(0);
    const dispatch = useDispatch();
    const chatHistory = useSelector((state: RootState) => state.chatHistory.chat);
    const navigate = useRouter();

    const backHome = () => {
        setActivePage(false);
        setTimeout(() => {
            navigate.push('/');
        }, 250);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height to recalculate
            const maxHeight = 10 * parseFloat(getComputedStyle(textareaRef.current).lineHeight);
            const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
            textareaRef.current.style.height = `${newHeight}px`;
            setTextareaHeight(newHeight);
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [input]);

    const handleSendMessage = async (e?: React.FormEvent<HTMLFormElement>) => {
        if (!input.trim()) return;
        handleAddHistory("user", input);
        try {
            await handleSubmit(e);
        } catch (error) {
            console.error('Error fetching AI response:', error);
        } finally {
            if (textareaRef.current) {
                textareaRef.current.blur();
            }
            scrollToBottom();
        }
    };

    const handleAddHistory = (role: "user" | "data" | "system" | "assistant", content: string) => {
        dispatch(addChatHistory({ role: role, content: content }));
    };

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    const isMessage = messages.length > 0;

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
                setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 5);
            }

        };

        if (scrollRef.current) {
            scrollRef.current.addEventListener("scroll", handleScroll);
            handleScroll();
        }

        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, [scrollRef, isMessage]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Cek apakah textareaRef ada dan tidak dalam keadaan fokus
            if (
                textareaRef.current &&
                document.activeElement !== textareaRef.current
            ) {
                // Pastikan tidak ada modifier key seperti Ctrl, Alt, atau Meta yang ditekan
                if (!event.ctrlKey && !event.altKey && !event.metaKey) {
                    // Cek apakah key yang ditekan adalah huruf atau angka saja
                    if (/^[a-zA-Z0-9]$/.test(event.key)) {
                        textareaRef.current.focus();
                    }
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Cek apakah user menggunakan perangkat mobile berdasarkan user agent
        const checkMobileDevice = () => {
            const userAgent = navigator.userAgent || navigator.vendor;
            if (/android|iphone|ipad|ipod/i.test(userAgent)) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        checkMobileDevice();
    }, []);

    return (
        <AnimatePresence mode='wait'>
            {activePage &&
                <motion.div
                    className='relative flex flex-col h-screen dark:bg-dot-white/[0.2] bg-dot-black/[0.2]'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.25,
                        type: "spring",
                        visualDuration: 0.6,
                        bounce: 0.1
                    }}
                >
                    {/* <LoaderNice isLoading={isLoading} /> */}

                    <div className='hidden lg:block fixed z-10 pointer-events-none inset-0 overflow-hidden'>
                        <Spotlight />
                    </div>
                    <div className="hidden fixed z-0 pointer-events-none inset-0 md:flex items-center justify-center dark:bg-black bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"/>

                    <div className='flex flex-none justify-between items-center backdrop-blur-sm border-b px-4 py-3'>
                        <Button onClick={backHome} className='hover:bg-transparent' variant={'ghost'}><ArrowLeft className='inline h-4 w-4 mb-0.5 me-1' />About me</Button>
                        <div className='flex items-center gap-3'>
                            <p className='text-sm'>v3.1.4</p>
                            <ToggleThemeButton />
                        </div>
                    </div>

                    <div ref={scrollRef} className="flex-grow z-10 h-full overflow-y-auto">
                        {messages.length > 0 ? (
                            <ChatSection
                                messages={messages}
                                selectedModel={selectedModel}
                                loading={isLoading}
                                error={error}
                                reload={reload}
                                stop={stop}
                            />
                        ) : (
                            <ChatHome
                                handleSendMessage={handleSendMessage}
                                textareaRef={textareaRef}
                                input={input}
                                handleInputChange={handleInputChange}
                                isLoading={isLoading}
                                isMobile={isMobile}
                            />
                        )}
                    </div>

                    {messages.length > 0 &&
                        <div className="relative flex-none w-full mx-auto max-w-3xl px-4 pb-4 pt-14">
                            {!isAtBottom &&
                                <div onClick={scrollToBottom} style={{ bottom: `${textareaHeight + 64}px` }} className="absolute start-1/2 -translate-x-1/2 z-10 backdrop-blur-sm bg-zinc-100/75 hover:bg-zinc-100 dark:bg-zinc-700/75 dark:hover:bg-zinc-700 hover:text-black dark:hover:text-white rounded-full shadow-lg p-4 transition duration-200 hover:scale-105 hover:cursor-pointer">
                                    <MoveDown className='h-4 w-4' />
                                </div>
                            }
                            <div className='absolute z-10 inset-x-0 px-4 flex justify-between items-center gap-2' style={{ bottom: `${textareaHeight + 24}px` }}>
                                <div className='flex items-center gap-2'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                Model : {selectedModel ? listModels.find((model) => model.name === selectedModel.name)?.title : initialModel.name}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {listModels.map((model, index) => (
                                                <DropdownMenuItem key={index} onClick={() => setSelectedModel(model)} className={`${model.name === selectedModel.name ? 'bg-zinc-200/50 dark:bg-zinc-800/50' : ''}`} disabled={model.status === 'inactive' ? true : false}>
                                                    {model.title}
                                                    {/* &nbsp; */}
                                                    {model.name === initialModel.name && <span className='text-xs text-zinc-600 dark:text-zinc-500'>(default)</span>}
                                                    {model.status === 'inactive' && <span className='text-xs text-zinc-600 dark:text-zinc-500'>(not available)</span>}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <p className='text-[11px] font-medium'>
                                        <Wifi className='inline h-3 w-3 mb-0.5 me-1' />
                                        {selectedModel?.latency ? 
                                            selectedModel.latency === 'low' ? (
                                                <span className='text-red-500'>Low</span>
                                            ) : selectedModel.latency === 'medium' ? (
                                                <span className='text-yellow-500'>Medium</span>
                                            ) : selectedModel.latency === 'high' && (
                                                <span className='text-green-500'>High</span>
                                            )
                                            : 'none'
                                        }
                                    </p>
                                </div>
                                {isLoading &&
                                    <Button onClick={() => stop()} title='Stop Generate' variant={'outline'} size={'sm'}>
                                        <CircleX />Stop
                                    </Button>
                                }
                                {error &&
                                    <Button onClick={() => reload()} title='Regenerate' variant={'outline'} size={'sm'}>
                                        <RotateCw />Reload
                                    </Button>
                                }
                            </div>
                            <form className='relative rounded-3xl overflow-hidden' onSubmit={handleSendMessage}>
                                <Textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={handleInputChange}
                                    className="ps-4 pt-6 pb-2 pe-16 rounded-2xl resize-none border-none"
                                    placeholder="Ask something about me..."
                                    rows={2}
                                    // disabled={isLoading}
                                    onKeyDown={(e) => {
                                        if (!isMobile && e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="absolute bottom-5 md:bottom-4 right-4 rounded-full w-10 h-10 disabled:opacity-50 hover:scale-105 transition duration-200 shadow-xl shadow-zinc-300/25 hover:shadow-zinc-300/50"
                                >
                                    {isLoading ? (
                                        <LoaderCircle className="animate-spin" />
                                    ) : (
                                        <Send />
                                    )}
                                </Button>
                            </form>
                        </div>
                    }
                </motion.div>
            }
        </AnimatePresence>
    )
}

const LoaderNice = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <div className='absolute inset-0 pointer-events-none flex justify-center items-center overflow-hidden'>
            <AnimatePresence mode='wait'>
                {isLoading &&
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.5, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                            duration: 0.5,
                            type: "spring",
                            visualDuration: 0.6,
                            bounce: 0.1
                        }}
                    >
                        {/* From Uiverse.io by Ashon-G */}
                        <svg viewBox="0 0 128 128" height={128} width={128} className="star">
                            <defs>
                                <filter id="star-glow">
                                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <linearGradient y2={1} x2={0} y1={0} x1={0} id="star-grad">
                                    <stop stopColor="#000" offset="0%" />
                                    <stop stopColor="#fff" offset="100%" />
                                </linearGradient>
                                <mask id="star-mask">
                                    <rect fill="url(#star-grad)" height={128} width={128} y={0} x={0} />
                                </mask>
                            </defs>
                            <g strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" fill="none">
                                <g stroke="hsla(223,90%,50%,0.2)">
                                    <polygon points="64 49 66.322 58.992 71.071 56.929 69.008 61.678 79 64 69.008 66.322 71.071 71.071 66.322 69.008 64 79 61.678 69.008 56.929 71.071 58.992 66.322 49 64 58.992 61.678 56.929 56.929 61.678 58.992 64 49" />
                                    <polygon points="64 34 68.644 53.983 78.142 49.858 74.017 59.356 94 64 74.017 68.644 78.142 78.142 68.644 74.017 64 94 59.356 74.017 49.858 78.142 53.983 68.644 34 64 53.983 59.356 49.858 49.858 59.356 53.983 64 34" />
                                    <polygon points="64 19 70.966 48.975 85.213 42.787 79.025 57.034 109 64 79.025 70.966 85.213 85.213 70.966 79.025 64 109 57.034 79.025 42.787 85.213 48.975 70.966 19 64 48.975 57.034 42.787 42.787 57.034 48.975 64 19" />
                                    <polygon points="64 4 73.287 43.966 92.284 35.716 84.034 54.713 124 64 84.034 73.287 92.284 92.284 73.287 84.034 64 124 54.713 84.034 35.716 92.284 43.966 73.287 4 64 43.966 54.713 35.716 35.716 54.713 43.966 64 4" />
                                </g>
                                <g filter="url(#star-glow)">
                                    <g stroke="hsl(223,90%,50%)">
                                        <polygon points="64 49 66.322 58.992 71.071 56.929 69.008 61.678 79 64 69.008 66.322 71.071 71.071 66.322 69.008 64 79 61.678 69.008 56.929 71.071 58.992 66.322 49 64 58.992 61.678 56.929 56.929 61.678 58.992 64 49" strokeDasharray="31 93" className="star__stroke" />
                                        <polygon points="64 34 68.644 53.983 78.142 49.858 74.017 59.356 94 64 74.017 68.644 78.142 78.142 68.644 74.017 64 94 59.356 74.017 49.858 78.142 53.983 68.644 34 64 53.983 59.356 49.858 49.858 59.356 53.983 64 34" strokeDasharray="62 186" className="star__stroke star__stroke--2" />
                                        <polygon points="64 19 70.966 48.975 85.213 42.787 79.025 57.034 109 64 79.025 70.966 85.213 85.213 70.966 79.025 64 109 57.034 79.025 42.787 85.213 48.975 70.966 19 64 48.975 57.034 42.787 42.787 57.034 48.975 64 19" strokeDasharray="93 279" className="star__stroke star__stroke--3" />
                                        <polygon points="64 4 73.287 43.966 92.284 35.716 84.034 54.713 124 64 84.034 73.287 92.284 92.284 73.287 84.034 64 124 54.713 84.034 35.716 92.284 43.966 73.287 4 64 43.966 54.713 35.716 35.716 54.713 43.966 64 4" strokeDasharray="124 372" className="star__stroke star__stroke--4" />
                                    </g>
                                    <g mask="url(#star-mask)" stroke="hsl(283,90%,50%)">
                                        <polygon points="64 49 66.322 58.992 71.071 56.929 69.008 61.678 79 64 69.008 66.322 71.071 71.071 66.322 69.008 64 79 61.678 69.008 56.929 71.071 58.992 66.322 49 64 58.992 61.678 56.929 56.929 61.678 58.992 64 49" strokeDasharray="31 93" className="star__stroke" />
                                        <polygon points="64 34 68.644 53.983 78.142 49.858 74.017 59.356 94 64 74.017 68.644 78.142 78.142 68.644 74.017 64 94 59.356 74.017 49.858 78.142 53.983 68.644 34 64 53.983 59.356 49.858 49.858 59.356 53.983 64 34" strokeDasharray="62 186" className="star__stroke star__stroke--2" />
                                        <polygon points="64 19 70.966 48.975 85.213 42.787 79.025 57.034 109 64 79.025 70.966 85.213 85.213 70.966 79.025 64 109 57.034 79.025 42.787 85.213 48.975 70.966 19 64 48.975 57.034 42.787 42.787 57.034 48.975 64 19" strokeDasharray="93 279" className="star__stroke star__stroke--3" />
                                        <polygon points="64 4 73.287 43.966 92.284 35.716 84.034 54.713 124 64 84.034 73.287 92.284 92.284 73.287 84.034 64 124 54.713 84.034 35.716 92.284 43.966 73.287 4 64 43.966 54.713 35.716 35.716 54.713 43.966 64 4" strokeDasharray="124 372" className="star__stroke star__stroke--4" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default Chat