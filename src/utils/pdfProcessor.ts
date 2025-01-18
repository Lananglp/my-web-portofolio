import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

export const loadPDFText = async (): Promise<string> => {
  const pdfPath = path.resolve(process.cwd(), 'public', 'about-me.pdf'); // Lokasi file PDF
  const pdfBuffer = fs.readFileSync(pdfPath); // Membaca file PDF
  const pdfData = await pdfParse(pdfBuffer); // Mengekstrak teks
  return pdfData.text; // Mengembalikan teks
};
