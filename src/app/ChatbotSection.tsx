import React, { forwardRef, useEffect, useState } from 'react';
import TypingEffect from '@/components/TypingEffect';
import TypingNoEffect from '@/components/TypingNoEffect';
import { LoaderCircle, UserRound, X } from 'lucide-react';
import { ChatMessage } from './globalState/chatHistorySlice';

// Membungkus komponen dengan forwardRef
const ChatbotSection = forwardRef<HTMLDivElement, { 
  chatHistory: ChatMessage[], 
  loading: boolean, 
  logError: string 
}>((props, ref) => {
  const { chatHistory, loading, logError } = props;
  const [lastMessageIndex, setLastMessageIndex] = useState<number | null>(null);
  const [typingEffectCompleted, setTypingEffectCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (chatHistory.length > 0) {
      setLastMessageIndex(chatHistory.length - 1);
      if (chatHistory[chatHistory.length - 1].role === 'model') {
        setTypingEffectCompleted(false);
      }
    }
  }, [chatHistory]);

  const handleTypingEffectComplete = () => {
    setTypingEffectCompleted(true);
  };

  return (
    <div ref={ref} className='h-[calc(100vh-14.4rem)] md:h-[385px] overflow-y-auto px-3 md:px-6 py-2 md:py-4'>
      {chatHistory.length > 0 ? (
        chatHistory.map((item, index) => (
          <React.Fragment key={index}>
            {item.role === 'user' && (
              <div className='flex justify-end mb-3'>
                <p className='w-3/4 md:w-1/2 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2 my-2'>
                  {item.parts[0].text}
                </p>
              </div>
            )}
            {item.role === 'model' && (
              <div className='mb-3'>
                <div className='flex items-center gap-1.5'>
                  <div className="relative bg-white dark:bg-zinc-700 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-7 h-7">
                    <UserRound className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4" />
                  </div>
                  <h6 className='font-semibold dark:font-normal dark:text-white'>Lanang Lanusa</h6>
                </div>
                <div>
                  {index === lastMessageIndex && !typingEffectCompleted ? (
                    <TypingEffect text={item.parts[0].text} onComplete={handleTypingEffectComplete} />
                  ) : (
                    <TypingNoEffect text={item.parts[0].text} />
                  )}
                </div>
              </div>
            )}
          </React.Fragment>
        ))
      ) : (
        <div className='mb-3'>
          <div className='flex items-center gap-1.5'>
            <div className="relative bg-white dark:bg-zinc-700 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-7 h-7">
              <UserRound className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4" />
            </div>
            <h6 className='font-semibold dark:font-normal dark:text-white'>Lanang Lanusa</h6>
          </div>
          <div>
            <TypingEffect text={"hello, is there anything you want to ask me?"} />
          </div>
        </div>
      )}
      {loading ? (
        <div>
          <div className='flex items-center gap-1.5'>
            <div className="relative bg-white dark:bg-zinc-700 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-7 h-7">
              <UserRound className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4" />
            </div>
            <h6 className='font-semibold dark:font-normal dark:text-white'>Lanang Lanusa</h6>
          </div>
          <p className='px-3 mt-2 animate-pulse'>
            <LoaderCircle className='inline h-4 w-4 animate-spin mb-0.5 me-1' />
            Loading...
          </p>
        </div>
      ) : (
        logError && (
          <div>
            <div className='flex items-center gap-1.5'>
              <div className="relative bg-white dark:bg-zinc-700 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-7 h-7">
                <UserRound className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4" />
              </div>
              <h6 className='font-semibold dark:font-normal dark:text-white'>Lanang Lanusa</h6>
            </div>
            <p className='px-3 mt-2'>
              <X className='inline text-red-500 h-5 w-5 mb-0.5 me-1' />
              {logError}
            </p>
          </div>
        )
      )}
    </div>
  );
});

// Tambahkan displayName ke komponen ChatbotSection
ChatbotSection.displayName = "ChatbotSection";

// Export komponen yang dibungkus dengan forwardRef
export default ChatbotSection;
