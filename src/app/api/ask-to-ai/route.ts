import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages, smoothStream } from 'ai';
import { NextResponse } from 'next/server';
import { maxToken, systemInstructionsText, systemInstructionsTextLite } from '@/helper/helper';
import { createOpenAI } from '@ai-sdk/openai';
import { MyUIMessage } from '@/app/types';

export const runtime = "nodejs"; // jika testing pakai local ai LM Studio

export async function POST(req: Request) {
    const {
        messages,
        model,
        provider,
        totalTokenUsage
    }: {
        messages: MyUIMessage[],
        model: string,
        provider: string,
        totalTokenUsage: number
    } = await req.json();

    const latestUserMessage = [...messages].reverse().find(
        (msg) => msg.role === "user"
    );

    if (latestUserMessage) {
        const totalTextLength = latestUserMessage.parts
            .filter((part) => part.type === "text")
            .map((part) => part.text)
            .join("")
            .length;

        if (totalTextLength > 900) {
            return NextResponse.json(
                { error: "The message you provided is too long." },
                { status: 400 }
            );
        }
    }

    if (totalTokenUsage > maxToken) {
        return NextResponse.json(`You have reached the maximum token limit, your token amount is: ${totalTokenUsage}`, { status: 400 });
    }

    // return NextResponse.json("OK", { status: 200 });

    const customModel = createOpenAI({
        // baseURL: "http://localhost:1234/v1",
        // apiKey: "lm-studio", // bebas isi apa saja
        baseURL: "https://router.huggingface.co/v1",
        apiKey: process.env.HF_TOKEN,
    });
    
    let selectedModel;

    if (provider === 'google') {
        selectedModel = google(model);
    } else if (provider === 'hunggingface') {
        selectedModel = customModel.chat(model);
    } else {
        throw new Error('Provider not supported');
    }

    const result = streamText({
        model: selectedModel,
        // model: google('gemini-flash-lite-latest'),
        // model: customModel.chat('google/gemma-3-4b'),
        // model: customModel.chat('Qwen/Qwen2.5-7B-Instruct:together'),
        messages: await convertToModelMessages(messages),
        system: systemInstructionsTextLite,
        // maxTokens: 1472,
        // temperature: 0.7,
        // topP: 0.7,
        // topK: 50,
        experimental_transform: smoothStream({
            delayInMs: 50, // optional: defaults to 10ms
            chunking: 'word', // optional: defaults to 'word'
        }),
    });

    return result.toUIMessageStreamResponse({
        messageMetadata: ({ part }) => {
            // Send metadata when streaming starts
            if (part.type === 'start') {
                return {
                    createdAt: Date.now(),
                    model,
                };
            }

            // Send additional metadata when streaming completes
            if (part.type === 'finish') {
                return {
                    totalTokens: part.totalUsage.totalTokens,
                };
            }
        },
    });
}