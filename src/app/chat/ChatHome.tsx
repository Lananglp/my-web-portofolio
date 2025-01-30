import React from 'react'
import * as motion from "motion/react-client"
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CircleAlert, LoaderCircle, Send } from 'lucide-react';

type ChatHomeProps = {
    handleSendMessage: () => void;
    textareaRef: React.Ref<HTMLTextAreaElement>;
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    isLoading: boolean;
    isMobile: boolean;
};

type CardType = {
    title: string;
    description: string;
    delay: number;
};

const Card = ({ title, description, delay }: CardType) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1,
                delay: delay,
                type: "spring",
                visualDuration: 0.4,
                bounce: 0.5
            }}
            className='bg-zinc-200/50 dark:bg-zinc-900/50 p-3 rounded-lg text-start'
        >
            <h3 className='mb-2 dark:text-white text-sm font-semibold'>{title}</h3>
            <p className='text-xs'>{description}</p>
        </motion.div>
    )
};

function ChatHome({ handleSendMessage, textareaRef, input, handleInputChange, isLoading, isMobile }: ChatHomeProps) {
    return (
        // <div className='h-[calc(100%-3.8rem)] flex justify-center items-center text-center'>
        <div className='h-full xl:flex justify-center items-center md:text-center'>
            <div className='p-4 max-w-4xl mx-auto'>
                {/* <div className='flex justify-center items-center mb-6 mt-12'>
                <LoaderSection />
            </div> */}
                <motion.div
                // initial={{ opacity: 0, y: 50 }}
                // animate={{ opacity: 1, y: 0 }}
                // transition={{
                //     duration: 1,
                //     delay: 0.3,
                //     type: "spring",
                //     visualDuration: 0.4,
                //     bounce: 0.7
                // }}
                >
                    <div className="flex md:justify-center items-center gap-1.5 mt-12 mb-4">
                        <div className="w-3 h-3 rounded-full bg-zinc-500 animate-pulse" />
                        <div className="w-3 h-3 rounded-full bg-zinc-600 animate-pulse delay-150" />
                        <div className="w-3 h-3 rounded-full bg-zinc-700 animate-pulse delay-300" />
                    </div>

                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{
                            duration: 2,
                            delay: 6
                        }}
                        className='fixed z-10 pointer-events-none inset-0 dark:bg-black'
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                delay: 0.5
                            }}
                            className='w-full absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl dark:text-white text-center'
                        >
                            <motion.span
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                transition={{
                                    duration: 1,
                                    delay: 2
                                }}
                                className='w-full'
                            >
                                Hello!
                            </motion.span>
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                delay: 3
                            }}
                            className='w-full absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl dark:text-white text-center'
                        >
                            <motion.span
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                transition={{
                                    duration: 1,
                                    delay: 5
                                }}
                                className='w-full'
                            >
                                I am Lanang AI
                            </motion.span>
                        </motion.span>
                    </motion.div>
                    <div className='mb-8 font-medium text-xl md:text-3xl md:text-white md:flex justify-center items-center'>
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                delay: 6,
                                type: 'spring',
                                visualDuration: 0.3,
                                bounce: 0.6
                            }}
                            className='text-6xl md:text-3xl font-medium md:text-white'
                        >
                            Hello,{" "}
                        </motion.p>
                        <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 6.2, type: 'spring', visualDuration: 0.3, bounce: 0.6 }}>is there anything you want to ask me?</motion.p>
                    </div>
                    {/* <h1 className='mb-8 font-medium text-xl md:text-3xl md:text-white'><span className='text-6xl md:text-3xl font-semibold md:font-medium bg-gradient-to-b bg-clip-text text-transparent md:text-white from-white to-transparent'>Hello</span>, is there anything you want to ask me?</h1> */}
                </motion.div>
                <motion.form
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        delay: 6.4,
                        type: "spring",
                        visualDuration: 0.4,
                        bounce: 0.5
                    }}
                    className='relative rounded-3xl overflow-hidden border dark:border-zinc-800'
                    onSubmit={handleSendMessage}
                >
                    <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={handleInputChange}
                        className="ps-4 pt-6 pe-16 rounded-2xl resize-none border-none"
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
                </motion.form>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        delay: 6.8,
                        type: "spring",
                        visualDuration: 0.4,
                        bounce: 0.5
                    }}
                    className='mt-4 text-xs text-zinc-500'
                >
                    <CircleAlert className='inline h-4 w-4 mb-0.5 me-0.5 text-orange-400' /> The message will not be saved.
                </motion.p>
                <div className='mt-8 md:mt-20'>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            delay: 7,
                            type: "spring",
                            visualDuration: 0.4,
                            bounce: 0.5
                        }}
                        className='mb-4'
                    >
                        What kind of response will you get?
                    </motion.h2>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                        <Card
                            title='Code'
                            description='Provide code in various programming languages ​​according to your needs.'
                            delay={7.2}
                        />
                        <Card
                            title='Table'
                            description='Provides data in a neat, easy-to-read tabular format, suitable for comparison or data analysis.'
                            delay={7.4}
                        />
                        <Card
                            title='Information'
                            description='Providing details about myself, as you can see on my profile.'
                            delay={7.6}
                        />
                        <Card
                            title='knowledge'
                            description='Provide information on various topics, from technology to other general matters.'
                            delay={7.8}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const LoaderSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                duration: 1,
                delay: 1.5,
                type: "spring",
                visualDuration: 0.4,
                bounce: 0.7
            }}
        >
            <div className='loader-awesome' />
        </motion.div>
    )
};

export default ChatHome