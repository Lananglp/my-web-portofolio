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

function ChatHome({ handleSendMessage, textareaRef, input, handleInputChange, isLoading, isMobile }: ChatHomeProps) {
  return (
    // <div className='h-[calc(100%-3.8rem)] flex justify-center items-center text-center'>
    <div className='h-full flex justify-center items-center text-center'>
        <div className='px-4 max-w-4xl'>
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
            <div className='mt-20'>
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        delay: 0.9,
                        type: "spring",
                        visualDuration: 0.4,
                        bounce: 0.5
                    }}
                    className='mb-4'
                >
                    What kind of response will you get?
                </motion.h2>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            delay: 1.2,
                            type: "spring",
                            visualDuration: 0.4,
                            bounce: 0.5
                        }}
                        className='bg-zinc-200/50 dark:bg-zinc-800/50 p-3 rounded-lg text-start'
                    >
                        <h3 className='mb-2 dark:text-white text-sm font-semibold'>Code</h3>
                        <p className='text-xs'>Provide code in various programming languages ​​according to your needs.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            delay: 1.3,
                            type: "spring",
                            visualDuration: 0.4,
                            bounce: 0.5
                        }}
                        className='bg-zinc-200/50 dark:bg-zinc-800/50 p-3 rounded-lg text-start'
                    >
                        <h3 className='mb-2 dark:text-white text-sm font-semibold'>Table</h3>
                        <p className='text-xs'>Provides data in a neat, easy-to-read tabular format, suitable for comparison or data analysis.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            delay: 1.4,
                            type: "spring",
                            visualDuration: 0.4,
                            bounce: 0.5
                        }}
                        className='bg-zinc-200/50 dark:bg-zinc-800/50 p-3 rounded-lg text-start'
                    >
                        <h3 className='mb-2 dark:text-white text-sm font-semibold'>Information</h3>
                        <p className='text-xs'>Providing details about myself, as you can see on my profile.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            delay: 1.5,
                            type: "spring",
                            visualDuration: 0.4,
                            bounce: 0.5
                        }}
                        className='bg-zinc-200/50 dark:bg-zinc-800/50 p-3 rounded-lg text-start'
                    >
                        <h3 className='mb-2 dark:text-white text-sm font-semibold'>knowledge</h3>
                        <p className='text-xs'>Provide information on various topics, from technology to other general matters.</p>
                    </motion.div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatHome