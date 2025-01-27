'use client'
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CircleAlert, CircleX, LoaderCircle, MoveDown, RotateCw, Send } from 'lucide-react';
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

function Chat() {
    const { messages, input, handleSubmit, isLoading, setInput, error, reload, stop } = useChat({
        api: '/api/ask-to-ai'
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

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         scrollToBottom();
    //     }
    // }, [chatHistory]);

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
                    <div className='hidden lg:block fixed z-0 inset-0 overflow-hidden'>
                        <Spotlight />
                    </div>
                    <div className="hidden fixed z-0 pointer-events-none inset-0 md:flex items-center justify-center dark:bg-black bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"/>

                    <div className='flex flex-none justify-between items-center backdrop-blur-sm border-b px-4 py-3'>
                        <Button onClick={backHome} className='hover:bg-transparent' variant={'ghost'}><ArrowLeft className='inline h-4 w-4 mb-0.5 me-1' />Manual Information</Button>
                        <ToggleThemeButton />
                    </div>

                    <div ref={scrollRef} className="flex-grow z-10 h-full overflow-y-auto">
                        {messages.length > 0 ? (
                            <ChatSection
                                messages={messages}
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
                                <div onClick={scrollToBottom} style={{ bottom: `${textareaHeight + 24}px` }} className="absolute start-1/2 -translate-x-1/2 z-10 backdrop-blur-sm bg-zinc-100/75 hover:bg-zinc-100 dark:bg-zinc-700/75 dark:hover:bg-zinc-700 hover:text-black dark:hover:text-white rounded-full shadow-lg p-4 transition duration-200 hover:scale-105 hover:cursor-pointer">
                                    <MoveDown className='h-4 w-4' />
                                </div>
                            }
                            <div className='absolute z-10 end-4 flex justify-end items-center gap-2' style={{ bottom: `${textareaHeight + 24}px` }}>
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
                    }
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default Chat