'use client';
// import dynamic from 'next/dynamic';
// const TypingEffect = dynamic(() => import('@/components/TypingEffect'), { ssr: false });
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle, Maximize, Minimize, MoveDown, Send, UserRound, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux';
import { addChatHistory } from './globalState/chatHistorySlice';
import ChatbotSection from './ChatbotSection';
import { setFullScreen, setIsThingking, setIsTyping } from './globalState/stateForAiSlice';
import Link from 'next/link';

type ChatbotProps = {
  scrollToBottomInFullScreen: () => void;
}

export default function Chatbot({ scrollToBottomInFullScreen }: ChatbotProps) {
  const [userMessage, setUserMessage] = useState<string>('');
  const [chatResponse, setChatResponse] = useState<string>('');
  const [chatPrevious, setChatPrevious] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  // const [isTyping, setIsTyping] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [logError, setLogError] = useState<string>('');
  const [isGenerate, setIsGenerate] = useState<boolean>(false);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const dispatch = useDispatch();
  const chatHistory = useSelector((state: RootState) => state.chatHistory.chat);
  const isLoading = useSelector((state: RootState) => state.isThingking.loading);
  const fullScreen = useSelector((state: RootState) => state.isThingking.fullScreen);

  const handleAddHistory = (role: "user" | "data" | "system" | "assistant", content: string) => {
    dispatch(addChatHistory({ role: role, content: content }));
  };

  // const handleAddHistory = (role: "user" | "model", parts: string) => {
  //   dispatch(addChatHistory({ role: role, parts: parts }));
  // };

  const handleProcessResponse = () => {
    dispatch(setIsTyping({ isTyping: true }));
  };

  const toggleFullScreen = () => {
    dispatch(setFullScreen({ fullScreen: !fullScreen }));
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const handleSendMessage = async () => {
    if (!userMessage) return;
    scrollToBottom();
    handleProcessResponse();
    setLoading(true);
    dispatch(setIsThingking({ loading: true }));
    setChatResponse(''); // Reset response
    setLogError('');
    setIsGenerate(true);
    handleAddHistory("user", userMessage);

    try {
      const response = await fetch('/api/ask-to-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage, chatHistory }),
      });

      const data = await response.json();
      if (data.message) {
        setChatResponse(data.message);
        handleAddHistory("assistant", data.message);
      } else {
        setChatResponse('No response from AI.');
        setLogError('No response from AI.');
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setChatResponse('An error occurred, please get the information manually by pressing the button above.');
      setLogError('An error occurred, please get the information manually by pressing the button above.');
    } finally {
      setLoading(false);
      dispatch(setIsThingking({ loading: false }));
      setChatPrevious(userMessage);
      // setIsTyping(false);
      setUserMessage('');
      if (textareaRef.current) {
        textareaRef.current.blur();
      }
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      scrollToBottom();
    }
  }, [chatHistory]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 5);
    }
  };

  useEffect(() => {
    const chatDiv = chatContainerRef.current;
    if (chatDiv) {
      chatDiv.addEventListener('scroll', handleScroll);
      // Pastikan cek posisi awal saat mount
      handleScroll();
    }
    return () => {
      if (chatDiv) {
        chatDiv.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const finishedRespon = () => {
    setIsGenerate(false);
    // scrollToBottom();
  }

  return (
    <div className='h-full flex flex-col'>
      <div className={`${fullScreen && 'pb-32'} flex-grow relative bg-zinc-200 dark:bg-zinc-950 rounded-lg`}>
        {!isAtBottom && (
          <div
            onClick={scrollToBottom}
            className={`${fullScreen ? 'hidden' : 'absolute end-3 md:end-10 bottom-3 md:bottom-6'} z-10 backdrop-blur-sm bg-zinc-100/75 hover:bg-zinc-100 dark:bg-zinc-700/75 dark:hover:bg-zinc-700 hover:text-black dark:hover:text-white rounded-full shadow-lg p-4 transition duration-200 hover:scale-105 hover:cursor-pointer`}
          >
            <MoveDown className='h-4 w-4' />
          </div>
        )}
        <div className={`${fullScreen ? 'sticky z-50 top-4 bg-zinc-100/30 rounded-lg border border-zinc-300 dark:border-none' : 'bg-zinc-200 rounded-t-lg'} flex justify-between items-center backdrop-blur-sm dark:bg-zinc-800 shadow-lg shadow-black/5`}>
          <h2 className="px-4 py-2 dark:text-white"><div className='inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse mb-0.5 me-1' /> Live chat <span className='text-xs text-zinc-600 dark:text-zinc-400'>(Chat not be saved)</span></h2>
          <Link href={'/chat'} title='Full Screen' className='hover:bg-transparent hover:text-zinc-900 dark:hover:text-white px-4 p-2'>
            <Maximize className='h-4 w-4' />
          </Link>
        </div>
        <ChatbotSection chatHistory={chatHistory} loading={loading} logError={logError} ref={chatContainerRef} />
      </div>

      <div className={`${fullScreen ? 'fixed start-1/2 -translate-x-1/2 bottom-6 w-full px-4 md:px-0 md:w-2/3' : 'flex-none pt-2'}`}>
        <div className='relative'>
          <Textarea
            ref={textareaRef}
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className={`${fullScreen ? 'bg-zinc-100/50 backdrop-blur-sm dark:bg-zinc-900/50 rounded-xl border-zinc-400/75 dark:border-zinc-700' : 'dark:bg-zinc-950'} ps-4 py-4 pe-16`}
            placeholder="Ask something about me..."
            rows={2}
            disabled={loading}
            // onFocus={() => setIsTyping(true)}
            // onBlur={() => setIsTyping(false)}
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
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Send />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}











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