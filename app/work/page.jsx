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
    category: 'frontend project',
    title: 'project 1',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque asperiores facilis',
    stack: [{ name: 'Html 5' }, { name: 'Css 3' }, { name: 'Javascript' },],
    image: '/work1.jpg',
    live: '/',
    github: '/'
  },
  {
    num: '02',
    category: 'frontend project',
    title: 'project 2',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque asperiores facilis',
    stack: [{ name: 'Next.Js' }, { name: 'Tailwind.css' }],
    image: '/work2.png',
    live: '/',
    github: '/'
  },
  {
    num: '03',
    category: 'fullstack project',
    title: 'Haaflah App',
    description: 'A solution for modern event management platform that streamlines the entire event lifecycle — from registration to venue access control.',
    stack: [{ name: 'React' }, { name: 'Node.Js' }, { name: 'PostgreSQL' },],
    image: '/work3.png',
    live: 'https://haaflah.vercel.app/',
    github: 'https://github.com/ismailoni/haaflah-frontend'
  },
  {
    num: '04',
    category: 'fullstack project',
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
      animate={{opacity: 1, transition: {delay: 2.4, duration: 0.4, ease: 'easeIn'}}}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className=" flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-7">
              {/* Outline num  */}
              <div className="font-extrabold text-transparent text-8xl text-outline">{project.num}</div>
              {/* Category  */}
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">{project.category}</h2>
              {/* Description  */}
              <p className="text-white/60">{project.description}</p>
              {/* stack  */}
              <ul className="flex gap-4">
                {project.stack.map((item, i) => (
                  <li key={i} className="text-xl text-accent">
                    {item.name}
                    {/* comma */}
                    {i !== project.stack.length - 1 && ','}
                  </li>
                ))}
              </ul>

              {/* border */}
              <div className="border border-white/20"></div>

              {/* buttons  */}
              <div className="flex items-center gap-4">
                {/* live project button  */}
                <Link href={project.live}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-3xl text-white group-hover:text-accent"/>
                      </TooltipTrigger>
                      <TooltipContent>Live project</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>

                {/* github button  */}
                <Link href={project.github}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-3xl text-white group-hover:text-accent"/>
                      </TooltipTrigger>
                      <TooltipContent>Github repository</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper spaceBetween={30} slidesPerView={1} onSlideChange={handleSlideChange} className=" xl:h-[520px] mb-12 ">
              {projects.map((project, i) => {
                return (
                  <SwiperSlide key={i} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      {/* overlay */}
                      <div className="absolute top-0 bottom-0 z-10 w-full h-full bg-black/20"></div>
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
                containerStyles='flex absolute gap-2 right-0 bottom-[calc(50%_-_22px)]  xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none'
                btnStyles='bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all'
                
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Work