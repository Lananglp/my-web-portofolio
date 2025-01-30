'use client'
import { useChat } from 'ai/react';
import React from 'react'

function TestPage() {

    const { messages, input, handleSubmit, isLoading, setInput, error, reload, stop } = useChat({
        api: '/api/ask-to-ai',
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
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type something..."
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            <div>
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