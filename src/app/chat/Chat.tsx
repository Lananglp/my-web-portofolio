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

function Chat() {
    const { messages, input, handleSubmit, handleInputChange, isLoading } = useChat({
        api: '/api/ask-to-ai'
    });
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [logError, setLogError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
    const [activePage, setActivePage] = useState<boolean>(true);
    const dispatch = useDispatch();
    const chatHistory = useSelector((state: RootState) => state.chatHistory.chat);
    const navigate = useRouter();

    const backHome = () => {
        setActivePage(false);
        setTimeout(() => {
            navigate.push('/');
        }, 250);
    }

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
            // Pastikan textarea tidak dalam fokus sebelum memberi fokus
            if (
                textareaRef.current &&
                document.activeElement !== textareaRef.current &&
                event.key.length === 1 // Pastikan hanya huruf/angka yang ditekan, bukan tombol fungsi (Shift, Ctrl, dll)
            ) {
                textareaRef.current.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
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

                                <div className="sticky z-20 inset-x-0 bottom-4 md:bottom-6 px-4 md:px-0">
                                    {!isAtBottom &&
                                        <div onClick={scrollToBottom} className="absolute start-1/2 -translate-x-1/2 bottom-28 z-20 backdrop-blur-sm bg-zinc-100/75 hover:bg-zinc-100 dark:bg-zinc-700/75 dark:hover:bg-zinc-700 hover:text-black dark:hover:text-white rounded-full shadow-lg p-4 transition duration-200 hover:scale-105 hover:cursor-pointer">
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
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessage();
                                                }
                                            }}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="absolute top-4 right-4 rounded-full w-10 h-10 disabled:opacity-50"
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
                                <motion.h1
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.3,
                                        type: "spring",
                                        visualDuration: 0.4,
                                        bounce: 0.7
                                    }}
                                    className='mb-8 font-medium text-3xl'
                                >
                                    hello, is there anything you want to ask me?
                                </motion.h1>
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
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage();
                                            }
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="absolute top-4 right-4 rounded-full w-10 h-10 disabled:opacity-50"
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