import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // apiKey: process.env.OPENAI_API_KEY!, // Pastikan API key terpasang di .env.local
});

// Fungsi untuk membaca dan memparsing PDF
// const extractTextFromPDF = async (pdfPath: string): Promise<string> => {
//   const pdfBuffer = fs.readFileSync(pdfPath);
//   const pdfData = await pdfParse(pdfBuffer);
//   return pdfData.text;
// }

export async function POST(req: Request) {

  const myText = `
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

  try {
    const body = await req.json();
    const { userMessage } = body;

    if (!userMessage) {
      return NextResponse.json({ error: 'User message is required' }, { status: 400 });
    }

    // Lokasi file PDF
    const pdfPath = path.resolve('./public/about-me.pdf');
    // const pdfText = await extractTextFromPDF(pdfPath);

    // Kirim prompt ke OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      store: true,
      messages: [
        {
          role: 'system',
          content: `Cobalah menjadi saya berdasarkan teks ini: ${myText}`,
          // content: `beri jawaban berdasarkan refrensi dari text ini ${myText},`,
        },
        { role: 'user', content: userMessage },
      ],
    });

    const aiResponse = response.choices[0]?.message?.content || 'No response from AI.';
    return NextResponse.json({ aiResponse });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}