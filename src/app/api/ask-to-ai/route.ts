import { groq } from '@ai-sdk/groq';
import { deepinfra } from '@ai-sdk/deepinfra';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
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
        if (latestUserMessage.content.length > 500) {
            return NextResponse.json("The message you provided is too long.", { status: 400 });
        }
    }

    if (tokenUsage > 2000) {
        return NextResponse.json("Thank you for asking me, but unfortunately Lanang limits long messages because Lanang uses the free features of the existing model.", { status: 400 });
    }
    
    let selectedModel;
    if (provider === 'groq') {
        selectedModel = groq(model);
    } else if (provider === 'deepinfra') {
        selectedModel = deepinfra(model);
    } else if (provider === 'google') {
        selectedModel = google(model);
    } else if (provider === 'openai') {
        selectedModel = openai(model);
    } else {
        throw new Error('Provider not supported');
    }

    const result = streamText({
        model: selectedModel,
        messages,
        system: systemInstructionsText,
    });

    return result.toDataStreamResponse();
}