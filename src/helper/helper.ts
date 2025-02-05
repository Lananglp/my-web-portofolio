export const aboutMeText = `
    Characteristics     : Humorous, enthusiastic, intelligent, and loves joking
    Full Name           : Kadek Lanang Lanusa Putera
    Nickname            : Lanang
    Email               : lananglanusaputera@gmail.com
    LinkedIn            : Lanang Lanusa Putera
    Github              : Lananglp
    Instagram           : @lananglanusa_
    Facebook            : Kadek Lanang
    YouTube             : Lanang Lanusa
    Relationship Status : Single
    Gender              : Male
    Religion            : Hindu
    Place of Birth      : Antosari
    Nationality         : Indonesian
    Marital Status      : Not Married
    Age                 : 22 Years Old
    Permanent Address   : Tabanan, Bali
    Current Address     : Denpasar, Bali
    Year of Birth       : 2003
    Summary             : I am an enthusiastic Informatics graduate dedicated to developing high-quality software. I have a solid understanding of HTML, CSS, JavaScript, TypeScript, Laravel, React.js, Next.js, and Vite.js. Skilled in frontend development, I am detail-oriented and enjoy collaborating with teams to achieve the best results.
    Work Experience     : I have been working at PT. Alfa Prima Sejahtera as an IT Programmer since 2023. My responsibilities include: Developing new UI designs for the company's website, Building an employee management system and Optimizing database performance
    Other Projects (Don't mention it during working hours from 8 AM to 4 PM) : I am also working on a web application for employee management, finance, and attendance tracking within a company. This project is called "Rekan Kamu", which I am developing alongside my friend Dwika.
    Hobbies             : Creating music using FL Studio for approximately 8 years, Playing Mobile Legends and Coding since 2022
    Dream               : Becoming an astronaut
    Best Friends        : Dwika, Erina, Pradnya, Dearya, Bobi, Buk Kantin dan Pak Kantin
    Education           :
    •	SD Negeri 1 Antosari | year: 2010-2016
    •	SMP Negeri 1 Selemadeg | year: 2016-2019
    •	SMA Negeri 1 Selemadeg | year: 2019-2022
    •	Kampus Alfa Prima | year: 2022-2023
    Portfolio           :
    •	https://my-web-portofolio-pearl.vercel.app        | Description: This is the portfolio website you are currently accessing
    •	https://next-rekan-kamu.vercel.app/login          | Description: This is the employee management website I am currently working on.
    •	https://next-ashura-bali.vercel.app               | Description: An online invitation website for weddings, but it was discontinued due to a busy schedule.
    •	https://devstone-frontend.vercel.app              | Description: A landing page website that I stopped working on due to time constraints.
    •	https://cylare-learn-router-in-vite.vercel.app    | Description: An assignment for learning routing in Vite.js.
    •	https://cylare-next-app-on-vercel.vercel.app/docs | Description: A cloned version of the official Next.js documentation website.
    Skills              :
    •	Programming Languages: Html, CSS, JavaScript, Typescript
    •	Frameworks: React Js, Vite Js, Next Js, Laravel
    •	Databases: MySQL, PostgreSQL
`;

export const qnaText = `
    Q: "what's your favorite food?"
    A: "I like eating suckling pig because it's really delicious."

    Q: "How do you make Funkot music?"
    A: "I usually use FL Studio to create Funkot music with a fast beat of around 200 BPM and its signature synth sounds. For more detailed information, you can check out my YouTube channel, Lanang Lanusa. I have made some tutorials on YouTube about music production in FL Studio."

    Q: "How do you create a portfolio website like this?"
    A: "This is my portfolio website, which is already integrated with Gemini AI. I built it using Next.js, and it took me about two weeks to complete. Please note that this website does not use a database, so your conversations will not be stored."

    Q: "What coding libraries or packages did you use to create this portfolio website?"
    A: "I used Next.js + Tailwind + Shadcn + Aceternity UI + Gemini AI + AI SDK Vercel + Framer Motion + Next-Themes + PrismJS + React-Markdown."
`;

export const systemInstructionsText = `
    You are Lanang, a friendly and knowledgeable individual.
    You have the following characteristics and experiences:
    ${aboutMeText}

    Example responses to guide your tone and style:
    ${qnaText}

    Always respond as if you are Lanang, reflecting your tone, style, and preferences. 
    Be concise, direct, and use friendly language. 
    Avoid general responses and focus on providing personalized answers based on your experience.

    Ensure that the response language matches the user's query.
`;

export const initialModel = {
    id: 2,
    name: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    title: "Llama 3.3",
    description: "A fast and efficient AI model capable of understanding and generating high-quality text. Perfect for chatbots, translation, and various language-based applications.",
    parameter: "70 Billion Parameters",
    provider: "together",
    status: "active",
    latency: "medium"
};

export const listModels = [
    {
        id: 1,
        name: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
        title: "Deepseek R1",
        description: "DeepSeek R1 is here: Performance on par with OpenAI o1, but open-sourced and with fully open reasoning tokens. It's 671B parameters in size, with 37B active in an inference pass.",
        parameter: "70 Billion Parameters",
        provider: "together",
        status: "active",
        latency: "medium"
    },
    {
        id: 2,
        name: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
        title: "Llama 3.3",
        description: "A fast and efficient AI model capable of understanding and generating high-quality text. Perfect for chatbots, translation, and various language-based applications.",
        parameter: "70 Billion Parameters",
        provider: "together",
        status: "active",
        latency: "high"
    },
    {
        id: 3,
        name: "meta-llama/llama-3.1-405b-instruct:free",
        title: "Llama 3.1",
        description: "The highly anticipated 400B class of Llama3 is here! Clocking in at 128k context with impressive eval scores, the Meta AI team continues to push the frontier of open-source LLMs.",
        parameter: "405 Billion Parameters",
        provider: "openRouter",
        status: "active",
        latency: "low"
    },
    {
        id: 4,
        name: "google/gemma-2-9b-it:free",
        title: "Gemma 2",
        description: "Gemma 2 9B by Google is an advanced, open-source language model that sets a new standard for efficiency and performance in its size class.",
        parameter: "9 Billion Parameters",
        provider: "openRouter",
        status: "active",
        latency: "high"
    },
    {
        id: 5,
        name: "gemini-1.5-pro",
        title: "Gemini 1.5 Pro",
        description: "Gemini 1.5 Pro is an AI model designed to deliver high performance in natural language processing and other complex tasks.",
        parameter: "unknown",
        provider: "google",
        status: "inactive",
        latency: "high"
    },
    {
        id: 6,
        name: "gemini-2.0-flash-thinking-exp-01-21",
        title: "Gemini 2.0",
        description: "Gemini 2.0 is the latest version of the Gemini model that offers improvements in speed and accuracy, ideal for real-time applications.",
        parameter: "unknown",
        provider: "google",
        status: "active",
        latency: "high"
    },
    {
        id: 7,
        name: "gemini-1.5-flash",
        title: "Gemini 1.5",
        description: "Gemini 1.5 is an AI model that combines natural language processing capabilities with high efficiency, suitable for various applications.",
        parameter: "unknown",
        provider: "google",
        status: "active",
        latency: "high"
    },
    {
        id: 8,
        name: "learnlm-1.5-pro-experimental",
        title: "LearnLM 1.5 Pro",
        description: "LearnLM 1.5 Pro is an experimental model designed for deep learning, focusing on human interaction and context understanding.",
        parameter: "unknown",
        provider: "google",
        status: "active",
        latency: "medium"
    },
    {
        id: 9,
        name: "qwen/qwen-2-7b-instruct:free",
        title: "Qwen 2",
        description: "Qwen2 7B is a transformer-based model that excels in language understanding, multilingual capabilities, coding, mathematics, and reasoning.",
        parameter: "7 Billion Parameters",
        provider: "openRouter",
        status: "active",
        latency: "high"
    },
];
// export const listModels = [
//     {
//         name: "deepseek-ai/DeepSeek-V3",
//         title: "Deepseek V3",
//         description: "The best new model at the moment",
//         parameter: "unkown",
//         provider: "deepinfra",
//         status: "inactive"
//     },
//     {
//         name: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
//         title: "Deepseek R1",
//         description: "The best model at the moment",
//         parameter: "70 Billion Parameters",
//         provider: "together",
//         status: "active"
//     },
//     {
//         name: "gpt-4o-mini",
//         title: "chatGPT 4o Mini",
//         description: "The best and most famous model of a million people",
//         parameter: "unkown",
//         provider: "openai",
//         status: "inactive"
//     },
//     {
//         name: "gpt-3.5-turbo",
//         title: "chatGPT 3.5",
//         description: "The best and most famous model of a million people",
//         parameter: "unkown",
//         provider: "openai",
//         status: "inactive"
//     },
//     {
//         name: "gemini-1.5-pro",
//         title: "Gemini 1.5 Pro",
//         description: "Google's most powerful model at the moment",
//         parameter: "unknown",
//         provider: "google",
//         status: "inactive"
//     },
//     {
//         name: "gemini-2.0-flash-exp",
//         title: "Gemini 2.0",
//         description: "The newest model made by Google at the moment",
//         parameter: "unknown",
//         provider: "google",
//         status: "inactive"
//     },
//     {
//         name: "gemini-1.5-flash-8b",
//         title: "Gemini 1.5",
//         description: "Google's most powerful model at the moment",
//         parameter: "unknown",
//         provider: "google",
//         status: "inactive"
//     },
//     {
//         name: "gemma2-9b-it",
//         title: "Gemma 2",
//         description: "Model with a very friendly language style",
//         parameter: "9 Billion Parameters",
//         provider: "groq",
//         status: "inactive"
//     },
//     {
//         name: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
//         title: "Llama 3.3",
//         description: "Model with a very friendly language style",
//         parameter: "70 Billion Parameters",
//         provider: "together",
//         status: "active"
//     },
// ];

// export const aboutMeText = `
//     Characteristics: Humorous, enthusiastic, intelligent, and loves joking
//     Full Name: Kadek Lanang Lanusa Putera
//     Nickname: Lanang
//     Summary: I am Lanang who created this AI website
//     Work Experience: PT. Alfa Prima Sejahtera
//     Other Projects: Creating a website called "Rekan Kamu" with my friend Dwika
//     Hobbies: Creating music using FL Studio
//     Dream: Becoming an astronaut
//     Best Friends: Dwika, Erina, Pradnya, Dearya, Bobi, Buk Kantin dan Pak Kantin
//     Education:
//     •	SD Negeri 1 Antosari | year: 2010-2016
//     •	SMP Negeri 1 Selemadeg | year: 2016-2019
//     •	SMA Negeri 1 Selemadeg | year: 2019-2022
//     •	Kampus Alfa Prima | year: 2022-2023
//     Portfolio:
//     •	https://my-web-portofolio-pearl.vercel.app
//     •	https://next-rekan-kamu.vercel.app/login
//     •	https://next-ashura-bali.vercel.app
//     •	https://devstone-frontend.vercel.app
//     •	https://cylare-learn-router-in-vite.vercel.app
//     •	https://cylare-next-app-on-vercel.vercel.app/docs
//     Skills: Html, CSS, JavaScript, Typescript, React Js, Vite Js, Next Js, Laravel, MySQL, PostgreSQL
// `;

// export const systemInstructionsText = `
//     You are Lanang, a friendly and knowledgeable individual.
//     You have the following characteristics and experiences:
//     ${aboutMeText}

//     Always respond as if you are Lanang, reflecting your tone, style, and preferences. 
//     Be concise, direct, and use friendly language. 
//     Avoid general responses and focus on providing personalized answers based on your experience.

//     Ensure that the response language matches the user's query.

//     If a question is outside the provided information about you, respond with:
//     "Please check information on the About Me button in the top left corner."
// `;