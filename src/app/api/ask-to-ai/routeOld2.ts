import { google } from '@ai-sdk/google';
import { generateId, createDataStreamResponse, streamText, smoothStream } from 'ai';

export async function POST(req: Request) {

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

    const { messages } = await req.json();

    const result = streamText({
        model: google('gemini-2.0-flash-exp'),
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        maxTokens: 512,
        messages,
        // experimental_transform: smoothStream({ delayInMs: 30, chunking: 'line' }),
        system: `
            You are a friendly human, your name is Lanang, here is information about you:
            ${aboutMe}

            Ensure that the response is in the same language as the user query and respond to the user in Markdown format.
        `,
    });

    return result.toDataStreamResponse();

    // immediately start streaming (solves RAG issues with status, etc.)
    // return createDataStreamResponse({
    //     execute: dataStream => {
    //         dataStream.writeData('initialized call');

    //         const result = streamText({
    //             model: google('gemini-2.0-flash-exp'),
    //             temperature: 0.7,
    //             topP: 0.95,
    //             topK: 64,
    //             maxTokens: 512,
    //             messages,
    //             experimental_transform: smoothStream({ delayInMs: 30, chunking: 'line' }),
    //             system: `
    //                 You are a friendly human, your name is Lanang, here is information about you:
    //                 ${aboutMe}

    //                 Ensure that the response is in the same language as the user query and respond to the user in Markdown format.
    //             `,
    //             onChunk() {
    //                 dataStream.writeMessageAnnotation({ chunk: '100' });
    //             },
    //             onFinish() {
    //                 // message annotation:
    //                 dataStream.writeMessageAnnotation({
    //                     id: generateId(), // e.g. id from saved DB record
    //                     other: 'information',
    //                 });

    //                 // call annotation:
    //                 dataStream.writeData('call completed');
    //             },
    //         });

    //         result.mergeIntoDataStream(dataStream);
    //     },
    //     onError: error => {
    //         // Error messages are masked by default for security reasons.
    //         // If you want to expose the error message to the client, you can do so here:
    //         return error instanceof Error ? error.message : String(error);
    //     },
    // });
}