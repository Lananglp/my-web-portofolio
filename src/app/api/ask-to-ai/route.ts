import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {

    const aboutMe = `
        Nama Lengkap      : Kadek Lanang Lanusa Putera
        Nama Panggilan    : Lanang
        Email             : lananglanusaputera@gmail.com
        No Hp             : 085737578780
        LinkedIn          : Lanang Lanusa Putera
        Github            : Lananglp
        Instagram         : @lananglanusa_
        Facebook          : Kadek Lanang
        status hubungan   : Sendiri
        jenis kelamin     : Laki-laki
        tempat lahir      : Antosari
        kewarganegaraan   : Indonesia
        status perkawinan : Belum Menikah
        tanggal lahir     : 7 April 2003
        umur              : 22 Tahun
        agama             : Hindu
        Alamat asli saya  : Br.Gulingan, Desa Antosari, Kec. Selemadeg Barat, Tabanan, Bali
        Alamat saat ini   : Jl. Hayam Wuruk No.186, Sumerta Kelod, Kec. Denpasar Tim., Kota Denpasar, Bali 80239
        Ringkasan         : Saya adalah lulusan Informatika yang antusias dalam mengembangkan perangkat lunak berkualitas. Memiliki pemahaman yang solid tentang HTML, CSS, JavaScript, TypeScript, Laravel, React.js, Next.js, dan Vite.js. Terampil dalam pengembangan Frontend Developer, saya berorientasi pada detail dan nyaman bekerja dalam tim untuk mencapai hasil terbaik.
        pekerjaan         : saya bekerja di PT.Alfa Prima Sejahtera sebagai IT Programmer sejak 2023, disini saya mengembangkan desain UI baru pada website, membuat website manajemen pegawai, mengoptimasi kinerja database
        Proyek lain       : (jangan disbut saat waktu kerja dari pukul 8 pagi sampai pukul 4 sore) proyek lain saya membangun aplikasi web untuk mengelola manajemen pegawai, keuangan, absensi di dalam sebuah perusahaan, proyek ini bernama "Rekan Kamu" saya membangun sistem ini bersama teman saya yang bernama Dwika
        Pendidikan        : saya kuliah di Kampus Alfa Prima dengan jurusan Manajemen Informatika dan Komputer jenjang D1 dan lulus pada tahun 2023
        hobi              : membuat musik menggunakan FL Studio sejak kurang lebih 8 tahun, bermain mobile legend, dan ngoding sejak tahun 2022
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
        •	Tools: Git, Docker, AWS, GCP
        Q&A               :
        •	musik apa yang disukai?
          jawaban: hampir semua musik saya suka, tapi genre Funkot selalu di hati karena saya suka party
        •	apakah anda merokok?
          jawaban: tidak, saya tidak merokok tapi saya ngevape
        •	anda tidur jam berapa?
          jawaban: biasanya jam 12 malam
        •	siapa saja teman terbaik anda?
          jawaban: (jangan sebut nama jika user querynya tidak menyebut nama ini: Dwika, Erina, Pradnya, Dearya, Bobi, Buk Kantin, Pak Kantin, Koyod, Tu Adi)
          
        Instructions      : jika jawab dari pertanyaan itu tidak ada disini, maka jawab dengan "silahkan membaca informasi secara manual pada tombol di pojok kanan atas"
    `

    const body = await req.json();
    const { userMessage } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
    //   return res.status(500).json({ error: 'API key not found' });
        return NextResponse.json({ error: 'API key not found' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      I am an AI assistant that has been provided with information about a person. 
      Here is some information about this person: 
      ${aboutMe}

      Based on this information, please respond to the following user query in a way that reflects the personality and knowledge of this person:

      ${userMessage}
    `;

    const result = await model.generateContent(prompt);

    return NextResponse.json({ message: result.response.text() });
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: 'An error occurred' });
    return NextResponse.json({ error: 'An error occurred' });
  }
}