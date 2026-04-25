'use client'

import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"

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
    role: 'Frontend Developer & Motion Designer',
    responsibilities: [
      'Built the responsive landing experience and reusable content sections.',
      'Created motion-rich UI interactions to guide users through the funnel.',
      'Optimized layout structure for SEO and fast load performance.',
    ],
    description: 'Conversion-focused product marketing site with custom motion, reusable sections, and SEO-first architecture.',
    stack: [{ name: 'HTML5' }, { name: 'CSS3' }, { name: 'JavaScript' }],
    image: '/work1.jpg',
    gallery: [
      { src: '/work1.jpg', alt: 'Marketing website hero preview', label: 'Hero section', focus: 'center' },
      { src: '/hero.png', alt: 'Marketing website brand preview', label: 'Brand spotlight', focus: 'top' },
      { src: '/work2.png', alt: 'Secondary layout preview', label: 'Landing layout', focus: 'center' },
      { src: '/work4.png', alt: 'Feature section preview', label: 'Feature grid', focus: 'center' },
    ],
    live: '/',
    github: '/'
  },
  {
    num: '02',
    category: 'Fullstack Project',
    title: 'Haaflah App',
    role: 'Fullstack Developer',
    responsibilities: [
      'Implemented the client-facing interface for the event management flow.',
      'Designed dashboard views for registrations, venue access, and event tracking.',
      'Integrated responsive UI patterns for a smooth mobile-first experience.',
      'Developed RESTful APIs to support the frontend functionality.',
      'Managed database schema design and optimization for efficient data queries.',
      'Built authentication and authorization systems for secure user access.',
    ],
    description: 'A solution for modern event management platform that streamlines the entire event lifecycle — from registration to venue access control.',
    stack: [{ name: 'React' }, { name: 'Node.Js' }, { name: 'PostgreSQL' },],
    image: '/work3.png',
    gallery: [
      { src: '/work3.png', alt: 'Haaflah event management dashboard', label: 'Dashboard overview', focus: 'top' },
      { src: '/work1.jpg', alt: 'Event listing preview', label: 'Event catalog', focus: 'center' },
      { src: '/work2.png', alt: 'Event registration preview', label: 'Registration flow', focus: 'center' },
      { src: '/hero.png', alt: 'Project showcase preview', label: 'Landing banner', focus: 'center' },
    ],
    live: 'https://haaflah.vercel.app/',
    github: 'https://github.com/ismailoni/haaflah-frontend'
  },
  {
    num: '03',
    category: 'Fullstack Project',
    title: "Ocean Academy's E-learning Platform",
    role: 'Frontend Developer & UI Collaborator',
    responsibilities: [
      'Developed learner dashboards, course browsing screens, and responsive layouts.',
      'Collaborated on interface structure to improve clarity and navigation.',
      'Shaped the UI to support scalable educational content and student workflows.',
    ],
    description: 'An e-learning platform designed to provide comprehensive educational resources and interactive learning experiences for students of all ages.',
    stack:[ { name: 'Next.Js' }, { name: 'Express.Js' }, { name: 'PostgreSQL' },],
    image: '/work4.png',
    gallery: [
      { src: '/work4.png', alt: 'Learning platform dashboard', label: 'Student dashboard', focus: 'top' },
      { src: '/work3.png', alt: 'Course catalog preview', label: 'Course catalog', focus: 'center' },
      { src: '/work2.png', alt: 'Student journey preview', label: 'Learning journey', focus: 'center' },
      { src: '/hero.png', alt: 'Responsive learning platform preview', label: 'Responsive view', focus: 'center' },
    ],
    live: 'https://ismail-lms.vercel.app/',
    github: 'https://github.com/ismailoni/lms'
  }
]

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  const project = projects[activeIndex];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxImage(null);
        return;
      }

      if (!lightboxImage) {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setLightboxImage((current) => {
          if (!current) {
            return current;
          }

          const nextIndex = (current.index + 1) % current.projectGallery.length;
          return {
            ...current.projectGallery[nextIndex],
            index: nextIndex,
            projectTitle: current.projectTitle,
            projectGallery: current.projectGallery,
          };
        });
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setLightboxImage((current) => {
          if (!current) {
            return current;
          }

          const nextIndex = (current.index - 1 + current.projectGallery.length) % current.projectGallery.length;
          return {
            ...current.projectGallery[nextIndex],
            index: nextIndex,
            projectTitle: current.projectTitle,
            projectGallery: current.projectGallery,
          };
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;

    setActiveIndex(currentIndex)
  }

  const openLightbox = (image, projectTitle, projectGallery, index) => {
    setLightboxImage({
      ...image,
      index,
      projectTitle,
      projectGallery,
    });
  };

  const moveLightboxImage = (direction) => {
    setLightboxImage((current) => {
      if (!current) {
        return current;
      }

      const nextIndex =
        direction === 'next'
          ? (current.index + 1) % current.projectGallery.length
          : (current.index - 1 + current.projectGallery.length) % current.projectGallery.length;

      return {
        ...current.projectGallery[nextIndex],
        index: nextIndex,
        projectTitle: current.projectTitle,
        projectGallery: current.projectGallery,
      };
    });
  };

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
              <div className="glass-card space-y-3 p-4">
                <div>
                  <p className='text-xs uppercase tracking-[0.22em] text-white/45'>My role</p>
                  <p className='mt-1 text-lg font-semibold text-white'>{project.role}</p>
                </div>
                <ul className='space-y-2 text-sm text-white/70'>
                  {project.responsibilities.map((item, index) => (
                    <li key={index} className='flex gap-3'>
                      <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
                <Link href={project.live} target="_blank">
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
                <Link href={project.github} target="_blank">
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
                    <div className="glass-card relative overflow-hidden p-4 md:p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className='text-xs uppercase tracking-[0.24em] text-white/45'>Project Gallery</p>
                          <p className='text-sm text-white/70'>{project.gallery.length} visual shots</p>
                        </div>
                        <span className='rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70'>Swipe projects</span>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => openLightbox(project.gallery[0], project.title, project.gallery, 0)}
                          className="relative h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-black/20 md:row-span-2 md:h-[416px]"
                        >
                          <Image
                            src={project.gallery[0].src}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            style={{ objectPosition: project.gallery[0].focus }}
                            alt={project.gallery[0].alt}
                          />
                          <span className="absolute inset-0 bg-black/0 transition-colors duration-300 hover:bg-black/15" />
                        </button>

                        <button
                          type="button"
                          onClick={() => openLightbox(project.gallery[1], project.title, project.gallery, 1)}
                          className="relative h-[196px] overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                        >
                          <Image
                            src={project.gallery[1].src}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            style={{ objectPosition: project.gallery[1].focus }}
                            alt={project.gallery[1].alt}
                          />
                          <span className="absolute inset-0 bg-black/0 transition-colors duration-300 hover:bg-black/15" />
                        </button>

                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => openLightbox(project.gallery[2], project.title, project.gallery, 2)}
                            className="relative h-[196px] overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                          >
                            <Image
                              src={project.gallery[2].src}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-105"
                              style={{ objectPosition: project.gallery[2].focus }}
                              alt={project.gallery[2].alt}
                            />
                            <span className="absolute inset-0 bg-black/0 transition-colors duration-300 hover:bg-black/15" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openLightbox(project.gallery[3], project.title, project.gallery, 3)}
                            className="relative h-[196px] overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                          >
                            <Image
                              src={project.gallery[3].src}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-105"
                              style={{ objectPosition: project.gallery[3].focus }}
                              alt={project.gallery[3].alt}
                            />
                            <span className="absolute inset-0 bg-black/0 transition-colors duration-300 hover:bg-black/15" />
                          </button>
                        </div>
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

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxImage.projectTitle} preview`}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0e1221] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 md:px-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Preview</p>
                <h3 className="text-lg font-semibold text-white">{lightboxImage.projectTitle}</h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition-all hover:border-accent hover:bg-accent hover:text-primary"
              >
                Close
              </button>
            </div>

            <div className="relative h-[70vh] w-full bg-black/30">
              <Image
                src={lightboxImage.src}
                fill
                className="object-contain"
                style={{ objectPosition: lightboxImage.focus }}
                alt={lightboxImage.alt}
                priority
              />
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">{lightboxImage.label}</p>
                <p className="text-sm text-white/70">{lightboxImage.alt}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => moveLightboxImage('prev')}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition-all hover:border-accent hover:bg-accent hover:text-primary"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => moveLightboxImage('next')}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition-all hover:border-accent hover:bg-accent hover:text-primary"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  )
}

export default Work