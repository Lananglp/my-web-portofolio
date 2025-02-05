'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Camera, CheckCheck, ChevronsDown, EllipsisVertical, Loader, LoaderCircle, Lock, Mic, Paperclip, Phone, Send, Smile, UserRound, Video } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { ModelType } from '../chat/Chat'
import { useChat } from 'ai/react'
import { initialModel } from '@/helper/helper'
import { useRouter } from 'next/navigation'
import { MarkdownWhatsapp } from './MarkdownWhatsapp'
import Link from 'next/link'
import './whatsapp.css'

function Whatsapp() {
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
    const [textareaHeight, setTextareaHeight] = useState<number>(0);
    const navigate = useRouter();

    const backHome = () => {
        navigate.push('/');
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
        // handleAddHistory("user", input);
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
        <div className='relative flex flex-col bg-emerald-950/20 h-screen'>
            <div className='absolute inset-0 -z-10 w-full h-full'>
                <Image src='/img/whatsapp-dark.png' width={540} height={981} alt='whatsapp-background' className='w-full h-full object-cover opacity-20' />
            </div>
            <header className='sticky z-30 inset-x-0 top-0 bg-zinc-900 border-b border-zinc-800'>
                <div className='bg-emerald-950/20 flex justify-between items-center px-3 py-2'>
                    <div className='flex items-center'>
                        <Link href='/'><ArrowLeft className='h-5 w-5 me-1' /></Link>
                        <div className='flex items-center gap-1.5'>
                            <div className="h-8 w-8 relative">
                                <div className="relative bg-gray-700 rounded-full aspect-square">
                                    <UserRound className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4" />
                                </div>
                            </div>
                            <h2 className='text-white text-md line-clamp-1'>Lanang Lanusa</h2>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Video className='h-6 w-6 me-1' />
                        <Phone className='h-5 w-5' />
                        <EllipsisVertical className='h-5 w-5' />
                    </div>
                </div>
            </header>
            <section ref={scrollRef} className='flex-grow h-full overflow-y-auto'>
                <div className='text-center py-2'>
                    <div className='inline-block bg-zinc-900 rounded-lg'>
                        <div className='bg-emerald-950/20 text-zinc-400 font-medium text-xs px-3 py-0.5'>Hari ini</div>
                    </div>
                </div>
                <div className='text-center py-2'>
                    <div className='inline-block max-w-[80%] bg-zinc-900 rounded-lg'>
                        {/* <div className='bg-emerald-950/20 text-amber-400 text-xs p-3'><Lock className='inline w-3 h-3 mb-0.5 me-1' />Pesan dan panggilan dienkripsi secara end-to-end. Tidak seorang pun di luar chat ini, termasuk Lanang sendiri, yang dapat membaca. Ketuk untuk info selengkapnya.</div> */}
                        <div className='bg-emerald-950/20 text-amber-400 text-xs p-3'><Lock className='inline w-3 h-3 mb-0.5 me-1' />Pesan anda tidak akan tersimpan dan tidak akan terlihat oleh developer, website ini merupakan kloningan desain aplikasi whatsapp, mohon tetap dengan bijak menggunakan sosial media.</div>
                    </div>
                </div>
                <div className='p-3'>
                    {!isAtBottom &&
                        <div onClick={scrollToBottom} style={{ bottom: `${textareaHeight + 38}px` }} className="absolute end-3 z-10 backdrop-blur-sm bg-zinc-100/75 hover:bg-zinc-100 dark:bg-zinc-700/75 dark:hover:bg-zinc-700 hover:text-black dark:hover:text-white rounded-full shadow-lg p-2 transition duration-200 hover:scale-105 hover:cursor-pointer">
                            <ChevronsDown className='h-4 w-4' />
                        </div>
                    }
                    {messages.length > 0 && (
                        messages.map((msg, index) => (
                            <React.Fragment key={index}>
                                {msg.role === 'user' && (
                                    <div className='mb-2.5 flex justify-end'>
                                        <div className='max-w-[85%] bg-zinc-900 rounded-xl'>
                                            <div className='h-full bg-emerald-900/75 text-white rounded-xl px-3 py-1.5'>
                                                <p className='text-sm'>{msg.content}<span className='inline-block ps-1 py-1.5 float-end text-zinc-400 text-xs'>23:00&nbsp;<CheckCheck className='inline text-sky-400 w-3.5 h-3.5' /></span></p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {msg.role === 'assistant' && (
                                    <div className='mb-2.5'>
                                        <div className='inline-block max-w-[85%] bg-zinc-800 rounded-xl'>
                                            <div className='inline-block bg-emerald-950/20 text-white rounded-xl px-3 py-1.5'>
                                                <div className='text-sm inline'><MarkdownWhatsapp>{msg.content}</MarkdownWhatsapp><span className='inline-block ps-1 pt-1.5 float-end text-zinc-400 text-xs'>23:00</span></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))
                    )}
                    {isLoading ? (
                        <div>
                            <div className='px-8'>
                                <div className='hidden dark:block w-3 h-3 dot-loader' />
                                <div className='block dark:hidden w-3 h-3 dot-loader-dark' />
                            </div>
                        </div>
                    ): (
                        error && (
                        <div className='mb-2.5'>
                            <div className='inline-block max-w-[85%] bg-zinc-800 rounded-xl'>
                                <div className='inline-block bg-emerald-950/20 text-white rounded-xl px-3 py-1.5'>
                                    <p className='text-sm'>Jadi begini kisah kehidupan di<span className='inline-block ps-1 pt-1.5 float-end text-zinc-400 text-xs'>23:00</span></p>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </section>
            <div>
                <div className='p-1'>
                    <form className='flex items-end gap-1' onSubmit={handleSendMessage}>
                        <div className='bg-zinc-800 rounded-3xl w-full'>
                            <div className='bg-emerald-950/20 w-full flex items-end gap-1 px-3 min-h-12 pb-1'>
                                <Smile className='mb-1 inline-block h-8 w-8 me-1' />
                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={handleInputChange}
                                    className="bg-transparent w-full h-full resize-none border-none outline-none ring-0 px-0 py-2"
                                    placeholder="ketik pesan"
                                    rows={1}
                                    disabled={isLoading}
                                    onKeyDown={(e) => {
                                        if (!isMobile && e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                <Paperclip className='mb-1.5 inline-block h-7 w-7 me-1' />
                                <Camera className='mb-1 inline-block h-8 w-8 me-1' />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-green-500 rounded-full w-12 h-12 disabled:opacity-75"
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
    )
}

export default Whatsapp