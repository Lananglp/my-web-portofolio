'use client'
import Header from "@/components/Header"
import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa6";

export default function Home() {

  const currentYear = new Date().getFullYear();
  const birthYear = 2003;
  const age = currentYear - birthYear;

  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    // Get theme from localStorage or fallback to light
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    document.documentElement.classList.toggle('dark', selectedTheme === 'dark');
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="flex items-center space-x-4 p-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="theme"
            value="light"
            checked={theme === 'light'}
            onChange={() => handleThemeChange('light')}
            className="form-radio text-blue-500"
          />
          <span className="text-gray-800 dark:text-gray-200">Light Mode</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={theme === 'dark'}
            onChange={() => handleThemeChange('dark')}
            className="form-radio text-blue-500"
          />
          <span className="text-gray-800 dark:text-gray-200">Dark Mode</span>
        </label>
      </div>
      <div className=" container mx-auto max-w-6xl px-4 py-24">
        <div className="flex flex-row gap-4">
          <div className="basis-[32rem]">
            <div className="sticky top-24 bg-zinc-100 dark:bg-zinc-800 rounded-xl dark:shadow-lg dark:shadow-black/25 p-6">
              <div className="flex items-center gap-1.5 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="mx-auto relative bg-zinc-200 dark:bg-zinc-700 rounded-full dark:shadow-lg dark:shadow-black/25 aspect-square w-32 h-32">
                <UserRound className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12" />
              </div>
              <h1 className="mt-4 dark:text-white text-lg text-center">Kadek Lanang Lanusa Putera</h1>
              <p className="mb-8 text-sm text-center text-zinc-500 dark:text-zinc-300">lananglanusaputera@gmail.com</p>
              <h6 className="pb-2 mb-4 border-b border-zinc-300 dark:border-zinc-700 dark:text-white font-semibold dark:font-normal">Social Media</h6>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href="/about" className="inline-block dark:hover:text-white hover:underline transition duration-300 text-sm">
                    <FaGithub className="inline text-2xl mb-0.5 me-2" />
                    Lananglp
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/in/lanang-lanusa-putera-70b6422a8/" target="_blank" className="inline-block dark:hover:text-white hover:underline transition duration-300 text-sm">
                    <FaLinkedin className="inline text-2xl mb-0.5 me-2" />
                    Lanang Lanusa Putera
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="inline-block dark:hover:text-white hover:underline transition duration-300 text-sm">
                    <FaInstagram className="inline text-2xl mb-0.5 me-2" />
                    lananglanusa_
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="inline-block dark:hover:text-white hover:underline transition duration-300 text-sm">
                    <FaTelegram className="inline text-2xl mb-0.5 me-2" />
                    Lanang Lanusa
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="basis-full bg-zinc-100 dark:bg-zinc-800 rounded-xl shadow-lg shadow-black/25 p-6">
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <p className="mb-6 text-zinc-500 dark:text-zinc-300">I am a dedicated Frontend Developer with a strong foundation in HTML, CSS, and JavaScript, complemented by hands-on experience in frameworks like Next.js and React.js.</p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h6 className="pb-2 mb-4 border-b border-zinc-300 dark:border-zinc-700 dark:text-white font-semibold dark:font-normal">About Me</h6>
                <table>
                  <tbody>
                    <tr>
                      <td className="text-zinc-500 dark:text-zinc-400">Name</td>
                      <td className="px-2">:</td>
                      <td className="">Kadek Lanang Lanusa Putera</td>
                    </tr>
                    <tr>
                      <td className="text-zinc-500 dark:text-zinc-400">Nickname</td>
                      <td className="px-2">:</td>
                      <td className="">Lanang</td>
                    </tr>
                    <tr>
                      <td className="text-zinc-500 dark:text-zinc-400">Date of Birth</td>
                      <td className="px-2">:</td>
                      <td className="">7 April 2003</td>
                    </tr>
                    <tr>
                      <td className="text-zinc-500 dark:text-zinc-400">Age</td>
                      <td className="px-2">:</td>
                      <td className="">{age} Years Old</td>
                    </tr>
                    <tr>
                      <td className="text-zinc-500 dark:text-zinc-400">Location</td>
                      <td className="px-2">:</td>
                      <td className="">Bali, Indonesia</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h6 className="pb-2 mb-4 border-b border-zinc-300 dark:border-zinc-700 dark:text-white font-semibold dark:font-normal">my combat weapon</h6>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1  bg-zinc-200/50 dark:bg-zinc-700 rounded-md dark:shadow-lg dark:shadow-black/25 p-1">
                    <Image draggable={false} src="https://laravel.com/img/logomark.min.svg" alt="laravel" width={48} height={48} className="p-1.5" />
                    <p>Laravel</p>
                  </div>
                  <div className="flex items-center gap-1  bg-zinc-200/50 dark:bg-zinc-700 rounded-md dark:shadow-lg dark:shadow-black/25 p-1">
                    <Image draggable={false} src="https://img.icons8.com/?size=100&id=108784&format=png&color=000000" alt="javascript" width={48} height={48} />
                    <p>Javascript</p>
                  </div>
                  <div className="flex items-center gap-1  bg-zinc-200/50 dark:bg-zinc-700 rounded-md dark:shadow-lg dark:shadow-black/25 p-1">
                    <Image draggable={false} src="https://img.icons8.com/?size=128&id=uJM6fQYqDaZK&format=png&color=000000" alt="typescript" width={48} height={48} />
                    <p>Typescript</p>
                  </div>
                  <div className="flex items-center gap-1  bg-zinc-200/50 dark:bg-zinc-700 rounded-md dark:shadow-lg dark:shadow-black/25 p-1">
                    <Image draggable={false} src="https://img.icons8.com/?size=100&id=asWSSTBrDlTW&format=png&color=000000" alt="react" width={48} height={48} className="p-1.5" />
                    <p>React Js</p>
                  </div>
                  <div className="flex items-center gap-1  bg-zinc-200/50 dark:bg-zinc-700 rounded-md dark:shadow-lg dark:shadow-black/25 p-1">
                    <svg className="p-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width={48}><mask height={180} id=":r8:mask0_408_134" maskUnits="userSpaceOnUse" width={180} x={0} y={0} style={{maskType: 'alpha'}}><circle cx={90} cy={90} fill="black" r={90} /></mask><g mask="url(#:r8:mask0_408_134)"><circle cx={90} cy={90} data-circle="true" fill="black" r={90} /><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#:r8:paint0_linear_408_134)" /><rect fill="url(#:r8:paint1_linear_408_134)" height={72} width={12} x={115} y={54} /></g><defs><linearGradient gradientUnits="userSpaceOnUse" id=":r8:paint0_linear_408_134" x1={109} x2="144.5" y1="116.5" y2="160.5"><stop stopColor="white" /><stop offset={1} stopColor="white" stopOpacity={0} /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id=":r8:paint1_linear_408_134" x1={121} x2="120.799" y1={54} y2="106.875"><stop stopColor="white" /><stop offset={1} stopColor="white" stopOpacity={0} /></linearGradient></defs></svg>
                    <p>Next Js</p>
                  </div>
                  <div className="flex items-center gap-1  bg-zinc-900 dark:bg-zinc-700 rounded-md dark:shadow-lg dark:shadow-black/25 p-1">
                    <svg className="p-1.5" width={144} height={48} viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.209637 19.0073C-0.0659575 18.5726 -0.070121 18.0189 0.198904 17.58L10.3282 1.05707C10.8916 0.138071 12.252 0.218426 12.7033 1.19735L21.9569 21.2706C22.3002 22.0154 21.905 22.8917 21.1194 23.1274L6.72474 27.4458C6.14558 27.6195 5.52155 27.3867 5.19781 26.876L0.209637 19.0073ZM11.4969 5.88824C11.5945 5.40217 12.2605 5.33208 12.4572 5.78717L18.8402 20.5571C18.9603 20.8352 18.8108 21.1559 18.5205 21.2425L8.57492 24.2114C8.20935 24.3205 7.85916 24.0011 7.93428 23.627L11.4969 5.88824ZM48.4948 21.1371H51.3226V10.772H48.4948V21.1371ZM48.3744 8.09277C48.3744 7.17221 48.8878 6.7116 49.9137 6.7116C50.9394 6.7116 51.4527 7.17221 51.4527 8.09277C51.4527 8.53176 51.3244 8.87321 51.068 9.11743C50.8114 9.36165 50.4267 9.48343 49.9137 9.48343C48.8878 9.48343 48.3744 9.01987 48.3744 8.09277ZM87.1709 16.335L86.0768 16.372C85.2548 16.3969 84.6429 16.5455 84.2412 16.8172C83.8392 17.0893 83.6386 17.5031 83.6386 18.0596C83.6386 18.8567 84.0959 19.2555 85.0106 19.2555C85.6656 19.2555 86.1897 19.0672 86.5819 18.6898C86.9744 18.313 87.1709 17.8124 87.1709 17.1878V16.335ZM88.0053 21.1375L87.4583 19.7282H87.384C86.908 20.3279 86.4182 20.7437 85.9144 20.9755C85.4109 21.2072 84.7542 21.3228 83.9446 21.3228C82.9491 21.3228 82.1661 21.0386 81.5941 20.47C81.0226 19.9017 80.7368 19.0918 80.7368 18.0409C80.7368 16.941 81.1214 16.1298 81.8907 15.6073C82.6607 15.0851 83.8209 14.7961 85.3723 14.7404L87.1709 14.6848V14.2304C87.1709 13.1799 86.633 12.6544 85.5576 12.6544C84.7293 12.6544 83.7558 12.9045 82.6371 13.4054L81.7009 11.4955C82.8938 10.8716 84.2167 10.559 85.6689 10.559C87.0596 10.559 88.1258 10.8621 88.8676 11.4677C89.6091 12.0734 89.98 12.9946 89.98 14.2304V21.1375H88.0053ZM72.4802 21.1375H69.6524V15.0834C69.6524 14.3357 69.527 13.775 69.2772 13.4008C69.0265 13.0269 68.6326 12.8397 68.0948 12.8397C67.3719 12.8397 66.8465 13.1058 66.5188 13.6371C66.1911 14.1688 66.0275 15.0435 66.0275 16.261V21.1375H63.1996V10.7723H65.3599L65.74 12.0982H65.8978C66.1757 11.6225 66.5778 11.25 67.1029 10.9812C67.6283 10.7121 68.231 10.5776 68.9109 10.5776C70.4623 10.5776 71.5128 11.0846 72.0631 12.0982H72.3132C72.5915 11.616 73.001 11.2421 73.5419 10.9763C74.0827 10.7105 74.6929 10.5776 75.3728 10.5776C76.5471 10.5776 77.4359 10.8791 78.0382 11.4817C78.6409 12.0844 78.9421 13.0502 78.9421 14.3786V21.1375H76.1051V15.0834C76.1051 14.3357 75.9798 13.775 75.73 13.4008C75.4792 13.0269 75.0854 12.8397 74.5475 12.8397C73.8555 12.8397 73.3379 13.0872 72.9945 13.5815C72.6517 14.0761 72.4802 14.8608 72.4802 15.9362V21.1375ZM60.17 20.4885C60.9088 19.9323 61.2781 19.1227 61.2781 18.0594C61.2781 17.5468 61.1887 17.1045 61.0093 16.7336C60.8299 16.3627 60.5517 16.0353 60.1749 15.7508C59.7981 15.4667 59.2046 15.1609 58.3946 14.8332C57.4862 14.4685 56.8976 14.1932 56.6285 14.0079C56.3601 13.8226 56.2252 13.6033 56.2252 13.3496C56.2252 12.8985 56.6426 12.6729 57.477 12.6729C57.9465 12.6729 58.4071 12.7443 58.8582 12.886C59.3093 13.0284 59.7948 13.2104 60.314 13.4331L61.1668 11.3936C59.9863 10.8498 58.7718 10.5778 57.5232 10.5778C56.2127 10.5778 55.2009 10.8295 54.4872 11.3333C53.7729 11.8371 53.416 12.5495 53.416 13.4701C53.416 14.0079 53.5012 14.461 53.6714 14.8286C53.841 15.1963 54.113 15.5223 54.4872 15.8065C54.8607 16.091 55.4467 16.4 56.2438 16.7336C56.8 16.9686 57.2453 17.1742 57.5788 17.3503C57.9128 17.5265 58.1475 17.6843 58.2837 17.8231C58.4195 17.9622 58.4876 18.1429 58.4876 18.3655C58.4876 18.9587 57.9743 19.2553 56.9483 19.2553C56.4478 19.2553 55.8684 19.1718 55.2103 19.0052C54.5517 18.8382 53.9601 18.6313 53.4347 18.3838V20.7203C53.8983 20.918 54.3959 21.0679 54.9275 21.1701C55.4591 21.2719 56.1014 21.3229 56.8557 21.3229C58.3266 21.3229 59.4314 21.0447 60.17 20.4885ZM46.9948 10.661C46.7414 10.6054 46.4232 10.5776 46.0398 10.5776C45.3969 10.5776 44.8021 10.7553 44.2554 11.1108C43.708 11.4664 43.2739 11.9345 42.9524 12.5152H42.8136L42.3962 10.7723H40.2546V21.1375H43.0824V15.8622C43.0824 15.0278 43.3341 14.3786 43.8376 13.9151C44.3418 13.4515 45.0446 13.2197 45.9472 13.2197C46.2749 13.2197 46.5528 13.2508 46.7817 13.3124L46.9948 10.661ZM31.9317 13.9614H32.8774C33.7613 13.9614 34.4223 13.7869 34.8613 13.4376C35.3003 13.0886 35.5196 12.5799 35.5196 11.9124C35.5196 11.239 35.3356 10.7414 34.968 10.4199C34.6 10.0984 34.0239 9.93766 33.2388 9.93766H31.9317V13.9614ZM38.4214 11.8106C38.4214 13.2694 37.9657 14.385 37.0537 15.1573C36.1423 15.9302 34.8459 16.3162 33.1649 16.3162H31.9317V21.1373H29.0577V7.58296H33.3872C35.0315 7.58296 36.2814 7.93684 37.1375 8.64461C37.9936 9.35238 38.4214 10.4079 38.4214 11.8106Z" fill="#FFFFFF" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1  bg-zinc-200/50 dark:bg-zinc-700 rounded-md dark:shadow-lg dark:shadow-black/25 p-1">
                    <Image draggable={false} src="https://www.postgresql.org/media/img/about/press/elephant.png" alt="PostgreSQL" width={48} height={48} className="p-1.5" />
                    <p>PostgreSQL</p>
                  </div>
                </div>
              </div>
              <div>
                <h6 className="pb-2 mb-4 border-b border-zinc-300 dark:border-zinc-700 dark:text-white font-semibold dark:font-normal">Other Skills</h6>
                <p className="bg-zinc-200/50 dark:bg-zinc-700/50 rounded-md dark:shadow-lg dark:shadow-black/25 text-sm p-4">I also possess skills in audio recording, mixing, and music production using <Link href="https://www.image-line.com/" target="_blank" className="text-orange-500 hover:underline">FL Studio</Link>, allowing me to create professional-quality soundtracks and compositions.</p>
              </div>
              <div>
                <h6 className="pb-2 mb-4 border-b border-zinc-300 dark:border-zinc-700 dark:text-white font-semibold dark:font-normal">portfolio project</h6>
                <ul className="flex flex-col gap-2 text-sm">
                  <li><Link href="https://next-rekan-kamu.vercel.app/login" target="_blank" className="inline-block bg-zinc-200/50 dark:bg-zinc-700/50 hover:text-blue-400 hover:underline rounded-md dark:shadow-lg dark:shadow-black/25 px-4 py-2">https://next-rekan-kamu.vercel.app/login</Link></li>
                  <li><Link href="https://next-ashura-bali.vercel.app" target="_blank" className="inline-block bg-zinc-200/50 dark:bg-zinc-700/50 hover:text-blue-400 hover:underline rounded-md dark:shadow-lg dark:shadow-black/25 px-4 py-2">https://next-ashura-bali.vercel.app</Link></li>
                  <li><Link href="https://devstone-frontend.vercel.app" target="_blank" className="inline-block bg-zinc-200/50 dark:bg-zinc-700/50 hover:text-blue-400 hover:underline rounded-md dark:shadow-lg dark:shadow-black/25 px-4 py-2">https://devstone-frontend.vercel.app</Link></li>
                  <li><Link href="https://cylare-learn-router-in-vite.vercel.app" target="_blank" className="inline-block bg-zinc-200/50 dark:bg-zinc-700/50 hover:text-blue-400 hover:underline rounded-md dark:shadow-lg dark:shadow-black/25 px-4 py-2">https://cylare-learn-router-in-vite.vercel.app</Link></li>
                  <li><Link href="https://cylare-next-app-on-vercel.vercel.app/docs" target="_blank" className="inline-block bg-zinc-200/50 dark:bg-zinc-700/50 hover:text-blue-400 hover:underline rounded-md dark:shadow-lg dark:shadow-black/25 px-4 py-2">https://cylare-next-app-on-vercel.vercel.app/docs</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
