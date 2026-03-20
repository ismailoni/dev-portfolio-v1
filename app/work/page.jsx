'use client'

import { motion } from "framer-motion"
import React, { useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';

import { BsArrowUpRight, BsGithub } from 'react-icons/bs'

import { Tooltip, TooltipContent, TooltipProvider,TooltipTrigger } from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";


const projects = [
  {
    num: '01',
    category: 'Frontend Project',
    title: 'Marketing Website',
    description: 'Conversion-focused product marketing site with custom motion, reusable sections, and SEO-first architecture.',
    stack: [{ name: 'HTML5' }, { name: 'CSS3' }, { name: 'JavaScript' }],
    image: '/work1.jpg',
    live: '/',
    github: '/'
  },
  {
    num: '02',
    category: 'Frontend Project',
    title: 'SaaS Dashboard',
    description: 'A responsive dashboard experience with accessible data presentation and role-based visual patterns.',
    stack: [{ name: 'Next.Js' }, { name: 'Tailwind.css' }],
    image: '/work2.png',
    live: '/',
    github: '/'
  },
  {
    num: '03',
    category: 'Fullstack Project',
    title: 'Haaflah App',
    description: 'A solution for modern event management platform that streamlines the entire event lifecycle — from registration to venue access control.',
    stack: [{ name: 'React' }, { name: 'Node.Js' }, { name: 'PostgreSQL' },],
    image: '/work3.png',
    live: 'https://haaflah.vercel.app/',
    github: 'https://github.com/ismailoni/haaflah-frontend'
  },
  {
    num: '04',
    category: 'Fullstack Project',
    title: "Ocean Academy's E-learning Platform",
    description: 'An e-learning platform designed to provide comprehensive educational resources and interactive learning experiences for students of all ages.',
    stack:[ { name: 'Next.Js' }, { name: 'Express.Js' }, { name: 'PostgreSQL' },],
    image: '/work4.png',
    live: 'https://ismail-lms.vercel.app/',
    github: 'https://github.com/ismailoni/lms'
  }
]

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;

    setProject(projects[currentIndex])
  }

  return (
    <motion.section 
      initial={{opacity: 0}} 
      animate={{opacity: 1, transition: {duration: 0.4, ease: 'easeIn'}}}
      className="section-wrap py-12 md:py-16"
    >
      <div>
        <div className='mb-10'>
          <h2 className='section-title'>Featured Work</h2>
          <p className='section-subtitle mt-3'>Selected frontend and fullstack projects with a focus on performance and polished UX.</p>
        </div>
        <div className="flex flex-col gap-7 xl:flex-row xl:gap-8">
          <div className="order-2 flex w-full flex-col xl:order-none xl:h-[460px] xl:w-[48%] xl:justify-between">
            <div className="flex flex-col gap-7">
              {/* Outline num  */}
              <div className="text-outline text-8xl font-extrabold text-transparent">{project.num}</div>
              {/* Category  */}
              <h3 className="text-3xl font-bold capitalize leading-tight md:text-5xl">{project.title}</h3>
              <p className='-mt-4 text-accent'>{project.category}</p>
              {/* Description  */}
              <p className="text-white/70">{project.description}</p>
              {/* stack  */}
              <ul className="flex flex-wrap gap-3">
                {project.stack.map((item, i) => (
                  <li key={i} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/85">
                    {item.name}
                  </li>
                ))}
              </ul>

              {/* border */}
              <div className="border border-white/15"></div>

              {/* buttons  */}
              <div className="flex items-center gap-4">
                {/* live project button  */}
                <Link href={project.live}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition-all hover:bg-accent">
                        <BsArrowUpRight className="text-2xl text-white group-hover:text-primary"/>
                      </TooltipTrigger>
                      <TooltipContent>Live project</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>

                {/* github button  */}
                <Link href={project.github}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition-all hover:bg-accent">
                        <BsGithub className="text-2xl text-white group-hover:text-primary"/>
                      </TooltipTrigger>
                      <TooltipContent>Github repository</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[52%]">
            <Swiper spaceBetween={20} slidesPerView={1} onSlideChange={handleSlideChange} className="mb-12 xl:h-[520px]">
              {projects.map((project, i) => {
                return (
                  <SwiperSlide key={i} className="w-full">
                    <div className="relative flex h-[460px] items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/5">
                      {/* overlay */}
                      <div className="absolute bottom-0 top-0 z-10 h-full w-full bg-black/30"></div>
                      {/* Image  */}
                      <div className="relative w-full h-full ">
                        <Image src={project.image} fill className="object-cover rounded-md" alt="project-preview"/>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}

            {/* slider buttons  */}
              <WorkSliderBtns 
                containerStyles='absolute bottom-[calc(50%_-_22px)] right-0 z-20 flex w-full justify-between gap-2 xl:bottom-5 xl:right-5 xl:w-max xl:justify-none'
                btnStyles='flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-[22px] text-primary transition-all hover:bg-accent-hover'
                
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Work