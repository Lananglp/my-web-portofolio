import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle, Send, UserRound } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Chatbot() {
  const [userMessage, setUserMessage] = useState<string>('');
  const [chatResponse, setChatResponse] = useState<string>('');
  const [chatPrevious, setChatPrevious] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = async () => {
    if (!userMessage) return;
    setLoading(true);
    setChatResponse(''); // Reset response

    try {
      const response = await fetch('http://localhost:3000/api/anjay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage }),
      });

      const data = await response.json();
      if (data.aiResponse) {
        setChatResponse(data.aiResponse);
      } else {
        setChatResponse('No response from AI.');
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setChatResponse('An error occurred.');
    } finally {
      setLoading(false);
      setChatPrevious(userMessage);
      setIsTyping(false);
      setUserMessage('');
      if (textareaRef.current) {
        textareaRef.current?.blur();
      } else {
        console.log("textareaRef.current is null");
      }
    }
  };

  return (
    <div className='h-full flex flex-col'>
      <div className="flex-grow bg-zinc-200 dark:bg-zinc-900 rounded-lg">
        <div className='bg-zinc-200 dark:bg-zinc-800/50 rounded-t-lg shadow-lg mb-4'>
          <h2 className="px-4 py-2 dark:text-white">Live chat</h2>
        </div>
        <div className='max-h-[calc(52vh-4rem)] overflow-y-auto px-6'>
          <div className='flex justify-end'>
            {!isTyping ?
              chatPrevious ? (
              <p className='w-1/2 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2 mt-2'>{chatPrevious}</p>
            ) : (
              userMessage && <p className='w-1/2 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2 mt-2'>{userMessage}</p>
            ) : (
              <p className='w-1/2 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2 mt-2 animate-pulse'>Typing...</p>
            )}
          </div>
          <div>
            <div className='flex items-center gap-1.5'>
              <div className="relative bg-zinc-200 dark:bg-zinc-700 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-7 h-7">
                <UserRound className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4" />
              </div>
              <h6 className='dark:text-white'>Lanang Lanusa</h6>
            </div>
            {!loading ?
              chatResponse ? (
                <p className='px-3 mt-2 whitespace-pre-wrap'>{chatResponse}</p>
              ) : (
                <p className='px-3 mt-2'>hello, is there anything you want to ask me?</p>
              )
            : (
              <p className='px-3 mt-2 animate-pulse'>Loading...</p>
            )}
          </div>
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
