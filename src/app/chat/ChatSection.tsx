'use client'
import React, { forwardRef, useState } from 'react';
import { CircleAlert, CircleAlertIcon, Cog, PartyPopperIcon, UserRound, X } from 'lucide-react';
import { Markdown } from '@/components/Markdown';
import { ModelType } from './Chat';
import { Button } from '@/components/ui/button';
import { MyUIMessage } from '../types';

interface MessagesType {
  role: "user" | "data" | "system" | "assistant";
  content: string;
}

interface ChatSectionProps {
  messages: MyUIMessage[];
  selectedModel: ModelType;
  loading: boolean;
  error: Error | undefined;
  isResponseLimit: boolean;
  // reload: () => void;
  // stop: () => void;
}

const ChatSection = forwardRef<HTMLDivElement, ChatSectionProps>((props, ref) => {
  const { messages, selectedModel, loading, error, isResponseLimit } = props;
  const [show, setShow] = useState<boolean>(true);

  return (
    <div ref={ref} className="h-full mx-auto max-w-3xl px-3 pt-2">
      {/* {selectedModel.id === 1 ? show ? (
          <div className='fixed z-10 bottom-36 mx-auto inset-x-0 max-w-3xl mt-6'>
            <div className='bg-zinc-100 dark:bg-zinc-950 rounded-xl text-sm mx-3'>
              <div className='bg-yellow-400/10 rounded-xl ps-6 py-6 pe-16'>
                <Button onClick={() => setShow(false)} className='absolute top-2 right-2 hover:bg-transparent' variant='ghost'><X /></Button>
                <p><CircleAlert className='inline h-4 w-4 mb-0.5 me-2' />This model is experimental, the responses that appear may be wrong or incomplete.</p>
              </div>
            </div>
          </div>
        ) : (
          <Button onClick={() => setShow(true)} className='fixed z-10 bottom-36 end-3 mt-6 px-2.5 dark:bg-zinc-800 text-orange-400 rounded-full'><CircleAlert /></Button>
        )
      : null} */}
      <div className='bg-zinc-500/10 rounded-xl p-6 my-3 text-sm'>
        <p><CircleAlert className='inline h-4 w-4 mb-0.5 me-2 text-orange-400' />The message will not be saved.</p>
      </div>
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <React.Fragment key={index}>
            {msg.role === 'user' && (
              <div className='flex justify-end mb-3'>
                {msg.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return (
                        <p key={`${msg.id}-${i}`} className={`overflow-x-auto whitespace-pre-wrap bg-zinc-600 dark:bg-zinc-600/15 text-white dark:text-zinc-300 backdrop-blur-sm min-w-64 md:min-w-80 max-w-[calc(100%-8rem)] rounded-2xl shadow-lg shadow-black/5 px-4 md:px-6 py-2 md:py-4 my-2`}>
                          {part.text}
                        </p>
                      )
                  }
                })}
              </div>
            )}
            {msg.role === 'assistant' &&
              msg.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return (
                      <div key={`${msg.id}-${i}`} className='mb-3'>
                        <div className='flex items-center gap-2'>
                          <div className="relative bg-zinc-700 text-zinc-300 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-7 h-7">
                            <UserRound className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4" />
                          </div>
                          <h6 className='font-semibold dark:font-normal dark:text-white'>Lanang Lanusa</h6>
                        </div>
                        <div className='mt-3 ms-3'>
                          <Markdown>{part.text}</Markdown>
                          <div className='text-xs text-muted-foreground flex flex-wrap items-center gap-2'>
                            <div>{msg.metadata?.createdAt && new Date(msg.metadata.createdAt).toLocaleTimeString()}</div>
                            <div>{msg.metadata?.model}</div>
                            {msg.metadata?.totalTokens && <div>{msg.metadata?.totalTokens} tokens</div>}
                          </div>
                        </div>
                      </div>
                    )
                }
              })
            }
          </React.Fragment>
        ))
      ) : (
        <div className='mb-3'>
          <div className='flex items-center gap-2'>
            <div className="relative bg-zinc-700 text-zinc-300 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-7 h-7">
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
              <div className="relative bg-zinc-700 text-zinc-300 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-7 h-7">
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
      {isResponseLimit && (
        <div className='bg-zinc-500/10 rounded-xl p-6 my-6 text-sm flex gap-4'>
          <PartyPopperIcon className='h-12 w-12 mb-0.5 me-2 text-orange-400' />
          <div className='space-y-1'>
            <h6 className='text-lg sm:text-xl dark:text-white font-semibold tracking-tight leading-tight'>Thank you for using Lanang AI</h6>
            <p className='text-muted-foreground'>You have reached the maximum response limit, please try again in 30 minutes.</p>
          </div>
        </div>
      )}
    </div>
  );
});

ChatSection.displayName = "ChatSection";

export default ChatSection;
