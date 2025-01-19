'use client';
import dynamic from 'next/dynamic';
const TypingEffect = dynamic(() => import('@/components/TypingEffect'), { ssr: false });
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle, Send, UserRound } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// const TypingEffect = ({ text, typingSpeed=10 }: { text: string; typingSpeed?: number }) => {
//   const [typingText, setTypingText] = useState('');
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     if (!text) return; // Jika teks kosong, tidak ada yang dilakukan.

//     setTypingText(''); // Reset teks sebelum mulai mengetik.
//     setIsTyping(true);

//     let i = 0; // Indeks dimulai dari 0.

//     const interval = setInterval(() => {
//       setTypingText((prevText) => prevText + text.charAt(i)); // Tambahkan karakter berikutnya.
//       i++;
//       if (i >= text.length) {
//         clearInterval(interval); // Hentikan interval jika semua karakter sudah ditambahkan.
//         setIsTyping(false);
//       }
//     }, typingSpeed);

//     // Tambahkan karakter pertama sebelum interval mulai bekerja.
//     setTypingText(text.charAt(0));

//     return () => clearInterval(interval); // Bersihkan interval jika teks berubah.
//   }, [text, typingSpeed]);

//   return <span>{typingText}</span>;
// };

interface memoryProps {
  chat: {
    role: "user" | "sistem";
    content: string;
  }[];
}

export default function Chatbot() {
  const [userMessage, setUserMessage] = useState<string>('');
  const [chatResponse, setChatResponse] = useState<string>('');
  const [chatPrevious, setChatPrevious] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [memory, setMemory] = useState<memoryProps>({chat: []});

  // const handleSendMessage = async () => {
  //   if (!userMessage) return;
  //   setLoading(true);
  //   setChatResponse(''); // Reset response

  //   try {
  //     const response = await fetch('/api/ask-to-ai', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ userMessage }),
  //     });

  //     const data = await response.json();
  //     if (data.message) {
  //       setChatResponse(data.message);
  //     } else {
  //       setChatResponse('No response from AI.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching AI response:', error);
  //     setChatResponse('An error occurred, please get the information manually by pressing the button above.');
  //   } finally {
  //     setLoading(false);
  //     setChatPrevious(userMessage);
  //     setIsTyping(false);
  //     setUserMessage('');
  //     if (textareaRef.current) {
  //       textareaRef.current?.blur();
  //     } else {
  //       console.log("textareaRef.current is null");
  //     }
  //   }
  // };

  const handleSendMessage = async () => {
    if (!userMessage) return;
    setLoading(true);
    setChatResponse(''); // Reset response
    setMemory((prev) => ({
      ...prev,
      chat: [...prev.chat, { role: "user", content: userMessage }],
    }));

    try {
      const response = await fetch('/api/ask-to-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage }),
      });

      const data = await response.json();
      if (data.message) {
        setChatResponse(data.message);
        setMemory((prev) => ({
          ...prev,
          chat: [...prev.chat, { role: "sistem", content: data.message }],
        }));
      } else {
        setChatResponse('No response from AI.');
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setChatResponse('An error occurred, please get the information manually by pressing the button above.');
    } finally {
      setLoading(false);
      setChatPrevious(userMessage);
      setIsTyping(false);
      setUserMessage('');
      if (textareaRef.current) {
        textareaRef.current.blur();
      }
    }
  };

  return (
    <div className='h-full flex flex-col'>
      <div className="flex-grow bg-zinc-200 dark:bg-zinc-900 rounded-lg">
        <div className='bg-zinc-200 dark:bg-zinc-800/50 rounded-t-lg shadow-lg shadow-black/5'>
          <h2 className="px-4 py-2 dark:text-white"><div className='inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse mb-0.5 me-1' /> Live chat <span className='text-xs text-zinc-600 dark:text-zinc-400'>(Chat not be saved)</span></h2>
        </div>
        {/* <div className='min-h-[calc(100vh-16.25rem)] md:min-h-0 max-h-[calc(100vh-16.25rem)] md:max-h-[calc(50vh-4rem)] overflow-y-auto px-6'> */}
        <div className='h-[calc(100vh-15.25rem)] md:h-[385px] overflow-y-auto px-6 py-4'>
          {memory.chat.length > 0 ?
            memory.chat.map((item, index) => (
              <React.Fragment key={index}>
                {item.role === 'user' &&
                  <div className='flex justify-end'>
                    <p className='w-3/4 md:w-1/2 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2 my-2'>{item.content}</p>
                  </div>
                }
                {item.role === 'sistem' &&
                  <div className='mb-3'>
                    <div className='flex items-center gap-1.5'>
                      <div className="relative bg-white dark:bg-zinc-700 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-7 h-7">
                        <UserRound className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4" />
                      </div>
                      <h6 className='font-semibold dark:font-normal dark:text-white'>Lanang Lanusa</h6>
                    </div>
                    <div>
                      <TypingEffect text={item.content} />
                    </div>
                  </div>
                }
              </React.Fragment>
            )) : (
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
          {/* <div className='flex justify-end'>
            {!isTyping ?
              chatPrevious ? (
              <p className='w-3/4 md:w-1/2 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2 my-2'>{chatPrevious}</p>
            ) : (
              userMessage && <p className='w-3/4 md:w-1/2 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2 my-2'>{userMessage}</p>
            ) : (
              <p className='w-3/4 md:w-1/2 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2 my-2 animate-pulse'>Typing...</p>
            )}
          </div>
          <div>
            <div className='flex items-center gap-1.5'>
              <div className="relative bg-white dark:bg-zinc-700 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-7 h-7">
                <UserRound className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4" />
              </div>
              <h6 className='font-semibold dark:font-normal dark:text-white'>Lanang Lanusa</h6>
            </div>
            {!loading ?
              chatResponse ? (
                <p className='px-3 mt-2 whitespace-pre-wrap'>{typingText}</p>
              ) : (
                <p className='px-3 mt-2'>hello, is there anything you want to ask me?</p>
              )
            : (
              <p className='px-3 mt-2 animate-pulse'>Loading...</p>
            )}
          </div> */}
        </div>
      </div>

      <div className='flex-none pt-2'>
        <div className='relative'>
          <Textarea
            ref={textareaRef}
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className='ps-4 py-4 pe-16'
            placeholder="Ask something about me..."
            rows={2}
            disabled={loading}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={loading}
            className="absolute top-4 right-4 rounded-full w-10 h-10 disabled:opacity-50"
          >
            {loading ? <LoaderCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" /> : <Send className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />}
          </Button>
        </div>
      </div>
    </div>
  );
}
