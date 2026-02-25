"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { notFound } from "next/navigation";

export default function ChatPage() {
    if (process.env.NODE_ENV === "production") {
        notFound();
    }
    const [input, setInput] = useState("");

    const {
        messages,
        sendMessage,
        status,
        stop,
        regenerate,
        error,
    } = useChat({
        // api: "/api/chat",
        // streamProtocol: 'text',
        transport: new DefaultChatTransport({
            api: '/api/ask-to-ai',
            credentials: 'same-origin',
        })
    });

    // console.log(input);
    console.log("loading: ", status);
    // console.log(messages);
    
    

    console.log(error);
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        sendMessage({
            role: "user",
            parts: [{ type: "text", text: input }],
        });

        setInput("");
    };

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">AI Chat v6</h1>

            <div className="space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`p-3 rounded ${msg.role === "user"
                                ? "bg-blue-500 text-white ml-auto w-fit"
                                : "bg-gray-200 text-black w-fit"
                            }`}
                    >
                        {msg.parts.map((part, idx) =>
                            part.type === "text" ? (
                                <span key={idx}>{part.text}</span>
                            ) : null
                        )}
                    </div>
                ))}
            </div>

            {error && (
                <div className="text-red-500 text-sm">
                    Error: {error.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border rounded px-3 py-2"
                    placeholder="Tulis pesan..."
                />

                {status === "streaming" ? (
                    <button
                        type="button"
                        onClick={stop}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Stop
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded"
                    >
                        Kirim
                    </button>
                )}
            </form>

            {/* {status === "ready" && messages.length > 0 && (
                <button
                    onClick={regenerate}
                    className="text-sm underline"
                >
                    Regenerate
                </button>
            )} */}
        </div>
    );
}