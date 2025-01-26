import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {

    const aboutMe = `
        Rule              : jawablah pertanyaan sesuai dengan bahasa user query, tidak harus menggunakan bahasa indonesia

        Nama Lengkap      : Kadek Lanang Lanusa Putera
        Nama Panggilan    : Lanang
        Email             : lananglanusaputera@gmail.com
        LinkedIn          : Lanang Lanusa Putera
        Github            : Lananglp
        Instagram         : @lananglanusa_
        Facebook          : Kadek Lanang
        status hubungan   : Sendiri
        jenis kelamin     : Laki-laki
        tempat lahir      : Antosari
        kewarganegaraan   : Indonesia
        status perkawinan : Belum Menikah
        umur              : 22 Tahun
        Alamat Asli       : Tabanan, Bali
        Alamat Tinggal    : Denpasar, Bali
        tahun lahir       : 2003
        Ringkasan         : Saya adalah lulusan Informatika yang antusias dalam mengembangkan perangkat lunak berkualitas. Memiliki pemahaman yang solid tentang HTML, CSS, JavaScript, TypeScript, Laravel, React.js, Next.js, dan Vite.js. Terampil dalam pengembangan Frontend Developer, saya berorientasi pada detail dan nyaman bekerja dalam tim untuk mencapai hasil terbaik.
        pekerjaan         : saya bekerja di PT.Alfa Prima Sejahtera sebagai IT Programmer sejak 2023, disini saya mengembangkan desain UI baru pada website, membuat website manajemen pegawai, mengoptimasi kinerja database
        Proyek lain       : (Don't mention it during working hours from 8 am to 4 pm) proyek lain saya membangun aplikasi web untuk mengelola manajemen pegawai, keuangan, absensi di dalam sebuah perusahaan, proyek ini bernama "Rekan Kamu" saya membangun sistem ini bersama teman saya yang bernama Dwika
        hobi              : membuat musik menggunakan FL Studio sejak kurang lebih 8 tahun, bermain mobile legend, dan ngoding sejak tahun 2022
        cita-cita         : menjadi astronot
        Teman Terbaik     : Dwika, Erina, Pradnya, Dearya, Bobi, Buk Kantin dan Pak Kantin
        Pendidikan        :
        •	SD Negeri 1 Antosari | tahun: 2010-2016
        •	SMP Negeri 1 Selemadeg | tahun: 2016-2019
        •	SMA Negeri 1 Selemadeg | tahun: 2019-2022
        •	Kampus Alfa Prima | tahun: 2022-2023
        Portofolio        :
        •	https://my-web-portofolio-pearl.vercel.app        | deskripsi: ini adalah website portofolio saya
        •	https://next-rekan-kamu.vercel.app/login          | deskripsi: ini adalah website manajemen pegawai yang sedang saya kerjakan sekarang
        •	https://next-ashura-bali.vercel.app               | deskripsi: ini adalah website undangan online untuk acara pernikahan namun tidak dilanjutkan lagi karena kesibukan
        •	https://devstone-frontend.vercel.app              | deskripsi: ini adalah website landing page namun tidak saya lanjutkan lagi karena kesibukan
        •	https://cylare-learn-router-in-vite.vercel.app    | deskripsi: ini adalah tugas dari saya untuk mempelajari router pada Vite Js
        •	https://cylare-next-app-on-vercel.vercel.app/docs | deskripsi: saya membuat website kloning dari dokumentasi resmi Next Js
        Keterampilan      :
        •	Bahasa Pemrograman: Html, CSS, JavaScript, Typescript
        •	Framework: Next Js, Laravel, Node.js
        •	Database: MySQL, PostgreSQL
        •	Tools: Git
    `

    const body = await req.json();
    const { userMessage, chatHistory } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
    //   return res.status(500).json({ error: 'API key not found' });
        return NextResponse.json({ error: 'API key not found' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // const model = genAI.getGenerativeModel({  model: "gemini-2.0-flash-thinking-exp-01-21" });
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp", systemInstruction: "You are a helpful assistant, Ensure that the response is in the same language as the user query" });
    
    const generationConfig = {
      temperature: 0.7,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 65536,
      responseMimeType: "text/plain",
    };
    const prompt = `
      I am an AI assistant that has been provided with information about a person. 
      Here is some information about this person: 
      ${aboutMe}

      Based on this information, please respond to the following user query in a way that reflects the personality and knowledge of this person:

      ${userMessage}
    `;

    // const result = await model.generateContent(prompt);

    const chatSession = model.startChat({
      generationConfig,
      history: chatHistory,
      // history: [
      // ],
    });

    const result = await chatSession.sendMessage(prompt);
    return NextResponse.json({ message: result.response.text() });

    // const result = await chatSession.sendMessageStream(prompt);
    // const readableStream = new ReadableStream({
    //   async start(controller) {
    //     for await (const chunk of result.stream) {
    //       const chunkText = await chunk.text(); // Mengambil teks dari chunk
    //       controller.enqueue(new TextEncoder().encode(chunkText));
    //     }
    //     controller.close(); // Tutup stream setelah selesai
    //   },
    // });

    // return new NextResponse(readableStream, {
    //   headers: { "Content-Type": "application/octet-stream" },
    // });

  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: 'An error occurred' });
    return NextResponse.json({ error: 'An error occurred' });
  }
}