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
      <section className="section-wrap">
        <div className="grid items-center gap-10 pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-16">
            <div className="order-2 text-center lg:order-none lg:text-left">
              <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-accent">
                Full-Stack Engineer • Product-Focused
              </span>
              <h1 className="h1 mb-6 mt-6">
                Designing Fast, Elegant <span className="text-accent">Web Experiences</span>
              </h1>
              <p className="mb-9 max-w-[560px] text-sm text-white/75 md:text-base lg:mx-0">
                I help startups and teams build fast, scalable web applications with clean design, smooth interactions, and real-world performance in mind.
              </p>

              <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start"> 
                <Button variant='default' size='lg' className='flex items-center gap-2' onClick={handleDownloadCV}>
                <span>Download Resume</span>
                <FiDownload className="text-xl"/>
              </Button>
                <Button asChild variant='primary' size='lg'>
                  <a href='/contact'>Let’s Work Together</a>
                </Button>
              <div className="mb-8 xl:mb-0">
                  <Socials containerStyles='flex gap-3' iconStyles='h-10 w-10 rounded-xl border border-white/15 bg-white/5 text-sm text-white/80 flex items-center justify-center transition-all duration-300 hover:border-accent hover:bg-accent hover:text-primary'/>
              </div>
            </div>

              <div className='glass-card mt-8 grid max-w-[620px] gap-4 p-5 text-left sm:grid-cols-2'>
                <div>
                  <p className='text-xs uppercase tracking-wider text-white/50'>Focus</p>
                  <p className='mt-1 text-sm font-semibold'>SaaS • Dashboards • Landing Pages</p>
                </div>
                <div>
                  <p className='text-xs uppercase tracking-wider text-white/50'>Location</p>
                  <p className='mt-1 text-sm font-semibold'>Lagos, Nigeria • Remote Worldwide</p>
                </div>
              </div>
          </div>
            <div className="order-1 mb-8 lg:order-none lg:mb-0">
            <Photo />
          </div>
      </div>
      <Stats />
    </section>
  );
}
