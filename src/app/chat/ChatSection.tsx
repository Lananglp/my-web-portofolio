import React, { forwardRef } from 'react';
import { CircleAlert, Cog, UserRound, X } from 'lucide-react';
import { Markdown } from '@/components/Markdown';

interface MessagesType {
  role: "user" | "data" | "system" | "assistant";
  content: string;
}

interface ChatSectionProps {
  messages: MessagesType[];
  loading: boolean;
  error: Error | undefined;
  reload: () => void;
  stop: () => void;
}

const ChatSection = forwardRef<HTMLDivElement, ChatSectionProps>((props, ref) => {
  const { messages, loading, error, reload, stop } = props;

  return (
    <div ref={ref} className="h-full mx-auto max-w-3xl px-3 pt-2">
      <div className='bg-zinc-500/10 rounded-xl p-6 my-3 text-sm'>
        <p><CircleAlert className='inline h-4 w-4 mb-0.5 me-2 text-orange-400' />The message will not be saved.</p>
      </div>
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <React.Fragment key={index}>
            {msg.role === 'user' && (
              <div className='flex justify-end mb-3'>
                <p className={`whitespace-pre-wrap bg-zinc-600 dark:bg-zinc-600/15 text-white dark:text-zinc-300 backdrop-blur-sm min-w-64 md:min-w-80 max-w-[calc(100%-8rem)] rounded-2xl shadow-lg shadow-black/5 px-4 md:px-6 py-2 md:py-4 my-2`}>
                  {msg.content}
                </p>
              </div>
            )}
            {msg.role === 'assistant' && (
              <div className='mb-3'>
                {/* <div className='flex items-center gap-2'>
                  <div className="relative bg-zinc-600 text-zinc-300 dark:bg-zinc-700 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-7 h-7">
                    <UserRound className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4" />
                  </div>
                  <h6 className='font-semibold dark:font-normal dark:text-white'>Lanang Lanusa</h6>
                </div> */}
                <div className='flex items-center gap-2'>
                  <div className="relative bg-white dark:bg-zinc-700 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-7 h-7">
                    <UserRound className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4" />
                  </div>
                  <h6 className='font-semibold dark:font-normal dark:text-white'>Lanang Lanusa</h6>
                </div>
                <div className='mt-3 ms-3'>
                  <Markdown>{msg.content}</Markdown>
                </div>
              </div>
            )}
          </React.Fragment>
        ))
      ) : (
        <div className='mb-3'>
          <div className='flex items-center gap-2'>
            <div className="relative bg-white dark:bg-zinc-700 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-7 h-7">
              <UserRound className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4" />
            </div>
            <h6 className='font-semibold dark:font-normal dark:text-white'>Lanang Lanusa</h6>
          </div>
          <div className='mt-3 ms-3'>
            <Markdown>hello, is there anything you want to ask me?</Markdown>
          </div>
        </div>
      )}
      {loading ? (
        <div>
          <div className='px-8'>
            <div className='hidden dark:block w-3 h-3 dot-loader' />
            <div className='block dark:hidden w-3 h-3 dot-loader-dark' />
          </div>
        </div>
      ) : (
        error && (
          <div>
            <div className='flex items-center gap-2'>
              <div className="relative bg-white dark:bg-zinc-700 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-7 h-7">
                <Cog className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4" />
              </div>
              <h6 className='font-semibold dark:font-normal dark:text-white'>System</h6>
            </div>
            <div className='px-3 mt-2'>
              <p className='mb-3'>
                <X className='inline text-red-500 h-5 w-5 mb-0.5 me-1' />
                {error.message}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
});

ChatSection.displayName = "ChatSection";

export default ChatSection;
