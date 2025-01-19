import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {

    const aboutMe = `
        Nama Lengkap: Kadek Lanang Lanusa Putera
        Nama Panggilan: Lanang
        Email: lananglanusaputera@gmail.com
        No Hp: 085737578780
        LinkedIn: Lanang Lanusa Putera
        Github: Lananglp
        Instagram: @lananglanusa_
        Facebook: Kadek Lanang
        status hubungan: Single
        tanggal lahir: 7 April 2003
        umur: [tahun sekarang - tahun lahir]
        Alamat saat ini: Jl. Hayam Wuruk No.186, Sumerta Kelod, Kec. Denpasar Tim., Kota Denpasar, Bali 80239
        Ringkasan: Saya adalah lulusan Informatika yang antusias dalam mengembangkan perangkat lunak berkualitas. Memiliki pemahaman yang solid tentang HTML, CSS, JavaScript, TypeScript, Laravel, React.js, Next.js, dan Vite.js. Terampil dalam pengembangan Frontend Developer, saya berorientasi pada detail dan nyaman bekerja dalam tim untuk mencapai hasil terbaik.
        Pengalaman:
        •	[IT Programmer] (Alfa Prima Sejahtera) | [Perusahaan] | [Denpasar] | [20 September 2023]
        o	mengembangkan desain UI baru pada website, membuat website manajemen pegawai, mengoptimasi kinerja database
        •	Proyek | Rekan Kamu | 1 Tahun
        o	membangun aplikasi web untuk mengelola manajemen pegawai, keuangan, absensi di dalam sebuah perusahaan
        Pendidikan:
        •	Manajemen Informatika dan Komputer di kampus Alfa Prima dan lulus pada tahun 2023
        Keterampilan Teknis:
        •	Bahasa Pemrograman: Html, CSS, JavaScript, Typescript
        •	Framework: Next Js, Laravel, Node.js
        •	Database: MySQL, PostgreSQL
        •	Tools: Git, Docker, AWS, GCP
        Portofolio: https://my-web-portofolio-pearl.vercel.app
        hobi: membuat musik menggunakan FL Studio sejak kurang lebih 8 tahun, bermain mobile legend, dan ngoding sejak tahun 2022
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