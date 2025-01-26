'use client'
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CircleAlert, LoaderCircle, MoveDown, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import ChatSection from './ChatSection';
import { addChatHistory } from '../globalState/chatHistorySlice';
import { setIsThingking, setIsTyping } from '../globalState/stateForAiSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import { ToggleThemeButton } from '@/components/ToggleThemeButton';
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"
import { useRouter } from 'next/navigation';
import { useChat } from 'ai/react';
import { Spotlight } from '@/components/ui/Spotlight-new';

function Chat() {
    const { messages, input, handleSubmit, isLoading, setInput } = useChat({
        api: '/api/ask-to-ai'
    });
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [logError, setLogError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
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
        scrollToBottom();
        handleProcessResponse();
        dispatch(setIsThingking({ loading: true }));
        setLogError('');
        handleAddHistory("user", input);
        setLoading(true);

        try {
            const res = await handleSubmit(e);  // Menggunakan handleSubmit dari useChat
            console.log(res);
            
        } catch (error) {
            console.error('Error fetching AI response:', error);
            setLogError('An error occurred, please try again.');
        } finally {
            dispatch(setIsThingking({ loading: false }));
            if (textareaRef.current) {
                textareaRef.current.blur();
            }
            setLoading(false);
            scrollToBottom();
        }
    };

    // const handleSendMessage = async () => {
    //     if (!userMessage) return;
    //     scrollToBottom();
    //     handleProcessResponse();
    //     setLoading(true);
    //     dispatch(setIsThingking({ loading: true }));
    //     setLogError('');
    //     handleAddHistory("user", userMessage);

    //     try {
    //         const response = await fetch('/api/ask-to-ai', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ userMessage, chatHistory }),
    //         });

    //         const data = await response.json();
    //         if (data.message) {
    //             handleAddHistory("model", data.message);
    //         } else {
    //             setLogError('No response from AI.');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching AI response:', error);
    //         setLogError('An error occurred, please get the information manually by pressing the button above.');
    //     } finally {
    //         setLoading(false);
    //         dispatch(setIsThingking({ loading: false }));
    //         setUserMessage('');
    //         if (textareaRef.current) {
    //             textareaRef.current.blur();
    //         }
    //     }
    // };

    const handleAddHistory = (role: "user" | "data" | "system" | "assistant", content: string) => {
        dispatch(addChatHistory({ role: role, content: content }));
    };

    const handleProcessResponse = () => {
        dispatch(setIsTyping({ isTyping: true }));
    };

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            scrollToBottom();
        }
    }, [chatHistory]);

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
    }, [scrollRef]);

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
                    ref={scrollRef}
                    className='relative h-screen overflow-y-auto dark:bg-dot-white/[0.2] bg-dot-black/[0.2]'
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
                    <div className='hidden lg:block fixed z-0 inset-0 overflow-hidden'>
                        <Spotlight />
                    </div>
                    <div className="fixed z-0 pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"/>

                    <div className='sticky z-20 top-0 flex justify-between items-center backdrop-blur-sm border-b px-4 py-3'>
                        {/* <Link href={'/'} className="inline-block hover:text-zinc-900 dark:hover:text-white text-sm transition duration-200"><ArrowLeft className='inline h-4 w-4 mb-0.5 me-1' />Manual Information</Link> */}
                        <Button onClick={backHome} className='hover:bg-transparent' variant={'ghost'}><ArrowLeft className='inline h-4 w-4 mb-0.5 me-1' />Manual Information</Button>
                        <ToggleThemeButton />
                    </div>
                    {messages.length > 0 ? (
                        <div className='h-[calc(100%-3.8rem)] container mx-auto max-w-3xl'>
                            <div className='h-full flex flex-col'>
                                <div className="pb-12 md:pb-32 flex-grow relative">
                                    <ChatSection messages={messages} loading={isLoading} logError={logError} />
                                </div>

                                <div className="sticky z-30 inset-x-0 bottom-4 md:bottom-6 px-4 md:px-0">
                                    {!isAtBottom &&
                                        <div onClick={scrollToBottom} style={{ bottom: `${textareaHeight + 14}px` }} className="absolute start-1/2 -translate-x-1/2 z-10 backdrop-blur-sm bg-zinc-100/75 hover:bg-zinc-100 dark:bg-zinc-700/75 dark:hover:bg-zinc-700 hover:text-black dark:hover:text-white rounded-full shadow-lg p-4 transition duration-200 hover:scale-105 hover:cursor-pointer">
                                            <MoveDown className='h-4 w-4' />
                                        </div>
                                    }
                                    <form className='relative' onSubmit={handleSendMessage}>
                                        <Textarea
                                            ref={textareaRef}
                                            value={input}
                                            onChange={handleInputChange}
                                            className="ps-4 pt-6 pb-2 pe-16 rounded-3xl"
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
                                            className="absolute bottom-4 right-4 rounded-full w-10 h-10 disabled:opacity-50"
                                        >
                                            {isLoading ? (
                                                <LoaderCircle className="animate-spin" />
                                            ) : (
                                                <Send />
                                            )}
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='h-[calc(100%-3.8rem)] flex justify-center items-center text-center'>
                            <div className='px-4'>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.3,
                                        type: "spring",
                                        visualDuration: 0.4,
                                        bounce: 0.7
                                    }}
                                >
                                    <div className="flex justify-center items-center gap-1.5 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-150" />
                                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-300" />
                                    </div>

                                    <h1 className='mb-8 font-medium text-2xl md:text-3xl'>hello, is there anything you want to ask me?</h1>
                                </motion.div>
                                <motion.form
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 1,
                                        type: "spring",
                                        visualDuration: 0.4,
                                        bounce: 0.5
                                    }}
                                    className='relative'
                                    onSubmit={handleSendMessage}
                                >
                                    <Textarea
                                        ref={textareaRef}
                                        value={input}
                                        onChange={handleInputChange}
                                        className="ps-4 pt-6 pe-16 rounded-3xl"
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
                                        className="absolute bottom-4 right-4 rounded-full w-10 h-10 disabled:opacity-50"
                                    >
                                        {isLoading ? (
                                            <LoaderCircle className="animate-spin" />
                                        ) : (
                                            <Send />
                                        )}
                                    </Button>
                                </motion.form>
                                <motion.p
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.6,
                                        type: "spring",
                                        visualDuration: 0.4,
                                        bounce: 0.5
                                    }}
                                    className='mt-4 text-xs text-zinc-500'
                                >
                                    <CircleAlert className='inline h-4 w-4 mb-0.5 me-0.5 text-orange-400' /> The message will not be saved.
                                </motion.p>
                            </div>
                        </div>
                    )}
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default Chat