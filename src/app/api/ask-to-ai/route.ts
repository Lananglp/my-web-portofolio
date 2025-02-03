import { groq } from '@ai-sdk/groq';
import { deepinfra } from '@ai-sdk/deepinfra';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { togetherai } from '@ai-sdk/togetherai';
import { smoothStream, streamText } from 'ai';
import { wrapLanguageModel, extractReasoningMiddleware } from 'ai';
import { NextResponse } from 'next/server';
import { systemInstructionsText } from '@/helper/helper';

interface MessagesType {
    role: "user" | "data" | "system" | "assistant";
    content: string;
}

export async function POST(req: Request) {
    const {
        messages,
        model,
        provider,
        tokenUsage
    }: {
        messages: MessagesType[],
        model: string,
        provider: string,
        tokenUsage: number
    } = await req.json();

    const latestUserMessage = messages.slice().reverse().find(msg => msg.role === "user");

    if (latestUserMessage) {
        if (latestUserMessage.content.length > 900) {
            return NextResponse.json("The message you provided is too long.", { status: 400 });
        }
    }

    // if (tokenUsage > 4000) {
    //     return NextResponse.json("Thank you for asking me, but unfortunately Lanang limits long messages because Lanang uses the free features of the existing model.", { status: 400 });
    // }
    
    let selectedModel;
    if (provider === 'groq') {
        selectedModel = groq(model);
    } else if (provider === 'deepinfra') {
        selectedModel = deepinfra(model);
    } else if (provider === 'google') {
        selectedModel = google(model);
    } else if (provider === 'openai') {
        selectedModel = openai(model);
    } else if (provider === 'together') {
        selectedModel = togetherai(model);
    } else if (provider === 'together' && model === 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free') {
        selectedModel = wrapLanguageModel({
            model: togetherai('deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free'),
            middleware: extractReasoningMiddleware({ tagName: 'think' }),
        });
    } else {
        throw new Error('Provider not supported');
    }

    const result = streamText({
        model: selectedModel,
        messages,
        system: systemInstructionsText,
        maxTokens: 1472,
        temperature: 0.7,
        topP: 0.7,
        topK: 50,
        // experimental_transform: smoothStream({
        //     delayInMs: 30, // optional: defaults to 10ms
        //     chunking: 'word', // optional: defaults to 'word'
        // }),
    });

    return result.toDataStreamResponse();
}