/* eslint-disable-next-line react/no-unescaped-entities */
'use client'
import { Button } from "@/components/ui/button";
import {FiDownload} from "react-icons/fi";
import Socials from "@/components/ui/Socials";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

 const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/IsmailOniResume.pdf';
    link.download = 'IsmailOniResume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  export default function Home() {
 

  return (
    <section className="h-full">
      <div className="container h-full mx-auto">
        <div className="flex flex-col items-center justify-between xl:flex-row xl:pt-8 xl:pb-10">
          <div className="order-2 text-center xl:text-left xl:order-none">
            <span className="text-xl">Front-end Developer</span>
            <h1 className="mb-6 h1">
              Hello I&#39;m <br /> <span className="text-accent">Ismail Oni</span>
            </h1>
            <p className="max-w-[450px] mb-9 text-white/80">I specialize in crafting visually engaging and user-friendly web applications, bringing ideas to life with clean, efficient code.</p>

            {/* Button & Socials  */}
            <div className="flex flex-col items-center gap-8 xl:flex-row"> 
              <Button variant='outline' size='lg' className='flex items-center gap-2' onClick={handleDownloadCV}>
                <span>Download CV</span>
                <FiDownload className="text-xl"/>
              </Button>
              <div className="mb-8 xl:mb-0">
                <Socials containerStyles='flex gap-6' iconStyles='w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500'/>
              </div>
            </div>
          </div>
          <div className="order-1 mb-8 xl:order-none xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
}
