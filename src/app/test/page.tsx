'use client'
import { useChat } from 'ai/react';
import React, { useState } from 'react'
import { initialModel, ModelType } from '../chat/Chat';
import { Button } from '@/components/ui/button';

function TestPage() {
    const [selectedModel, setSelectedModel] = useState<ModelType>(initialModel);
    const { messages, input, handleSubmit, isLoading, setInput, error, reload, stop } = useChat({
        api: '/api/ask-to-ai',
        body: {
            model: selectedModel ? selectedModel.name : initialModel.name,
            provider: selectedModel ? selectedModel.provider : initialModel.provider
        },
        onFinish: (message, { usage, finishReason }) => {
            console.log('Finished streaming message:', message);
            console.log('Token usage:', usage);
            console.log('Finish reason:', finishReason);
        },
        onError: error => {
            console.error('An error occurred:', error);
        },
        onResponse: response => {
            console.log('Received HTTP response from server:', response);
        },
    });

    return (
        <div>
            <h1>Test Page</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    className='w-96 border'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type something..."
                    rows={8}
                />
                <Button type="submit" disabled={isLoading} className='block w-96'>
                    {isLoading ? 'Loading...' : 'Submit'}
                </Button>
            </form>
            <div className='w-96 border min-h-96'>
                <p>Messages:</p>
                {messages.map(message => (
                    <div key={message.id}>
                        {message.role === 'user' ? 'user: ' : 'assistant: '}
                        {message.content}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TestPage