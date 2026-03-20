'use client'

import { FaHtml5, FaCss3, FaJs, FaReact } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs } from 'react-icons/si';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

// about data
const about = {
  title: 'About me',
  description:
    'I’m a frontend-focused full-stack developer who builds fast, scalable, and visually polished web applications. I specialize in turning ideas and designs into production-ready products that deliver real business value—not just clean code, but meaningful user experiences.',
  info: [
    { fieldName: 'Name', fieldValue: 'Ismail Oni' },
    { fieldName: 'Phone', fieldValue: '(+234) 810 656 4010' },
    { fieldName: 'Experience', fieldValue: '3+ Years' },
    { fieldName: 'Email', fieldValue: 'ismailoni80@gmail.com' },
    { fieldName: 'Freelance', fieldValue: 'Available for work' },
    { fieldName: 'Languages', fieldValue: 'English, Yoruba, Arabic (basic)' },
  ]
}

// experience data
const experience = {
  title: 'My experience',
  description:
    'Real-world projects, freelance work, and production applications delivering measurable impact.',
  items: [
    {
      company: 'Upwork',
      position: 'Freelance Frontend Developer',
      duration: 'July 2024 - Present'
    },
    {
      company: 'Dataverse Media',
      position: 'Frontend Developer',
      duration: '2023 - September 2024'
    },
  ]
}

// education data
const education = {
  title: 'My education',
  description:
    'Continuous learning and hands-on practice in modern frontend engineering.',
  items: [
    {
      institution: 'Udemy',
      degree: 'Frontend Development (React, Next.js, Advanced Patterns)',
      duration: '2024 - Present'
    },
    {
      institution: 'Codecademy',
      degree: 'Advanced Frontend Development',
      duration: '2023'
    },
    {
      institution: 'FreeCodeCamp',
      degree: 'Frontend Development Fundamentals',
      duration: '2021 - 2022'
    },
  ]
}

// skills data
const skills = {
  title: 'My skills',
  description:
    'Tools and technologies I use to build modern, performant, and scalable web applications.',
  skillList: [
    { icon: <FaHtml5 />, name: 'HTML5' },
    { icon: <FaCss3 />, name: 'CSS3' },
    { icon: <FaJs />, name: 'JavaScript (ES6+)' },
    { icon: <FaReact />, name: 'React.js' },
    { icon: <SiNextdotjs />, name: 'Next.js' },
    { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
  ]
}

const Resume = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1, transition: { duration: 0.4, ease: 'easeIn' } }}
      className='py-12 section-wrap md:py-16'
    >
      <div>
        <div className='mb-10'>
          <h2 className='section-title'>Resume</h2>
          <p className='mt-3 section-subtitle'>
            A quick overview of my experience, technical skills, and the value I bring to every project.
          </p>
        </div>

        <Tabs defaultValue='experience' className='flex flex-col gap-7 xl:flex-row xl:gap-10'>
          <TabsList className='mx-auto flex w-full max-w-[380px] flex-col gap-2 xl:mx-0'>
            <TabsTrigger value='experience'>Experience</TabsTrigger>
            <TabsTrigger value='education'>Education</TabsTrigger>
            <TabsTrigger value='skills'>Skills</TabsTrigger>
            <TabsTrigger value='about'>About me</TabsTrigger>
          </TabsList>

          <div className='w-full'>
            
            {/* experience */}
            <TabsContent value='experience'>
              <div className='flex flex-col gap-[30px] text-center xl:text-left'>
                <h3 className='text-3xl font-bold'>{experience.title}</h3>
                <p className='max-w-[600px] text-white/70 mx-auto xl:mx-0'>
                  {experience.description}
                </p>

                <ScrollArea className='h-[400px]'>
                  <ul className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
                    {experience.items.map((item, i) => (
                      <li key={i} className='glass-card min-h-[184px] rounded-2xl px-7 py-6 flex flex-col justify-center items-center lg:items-start gap-2'>
                        <span className='text-accent'>{item.duration}</span>
                        <h3 className='text-xl max-w-[260px] text-center lg:text-left'>
                          {item.position}
                        </h3>
                        <div className='flex items-center gap-3'>
                          <span className='w-[6px] h-[6px] rounded-full bg-accent'></span>
                          <p className='text-white/65'>{item.company}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* education */}
            <TabsContent value='education'>
              <div className='flex flex-col gap-[30px] text-center xl:text-left'>
                <h3 className='text-3xl font-bold'>{education.title}</h3>
                <p className='max-w-[600px] text-white/70 mx-auto xl:mx-0'>
                  {education.description}
                </p>

                <ScrollArea className='h-[400px]'>
                  <ul className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
                    {education.items.map((item, i) => (
                      <li key={i} className='glass-card min-h-[184px] rounded-2xl px-7 py-6 flex flex-col justify-center items-center lg:items-start gap-2'>
                        <span className='text-accent'>{item.duration}</span>
                        <h3 className='text-xl max-w-[260px] text-center lg:text-left'>
                          {item.degree}
                        </h3>
                        <div className='flex items-center gap-3'>
                          <span className='w-[6px] h-[6px] rounded-full bg-accent'></span>
                          <p className='text-white/65'>{item.institution}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* skills */}
            <TabsContent value='skills'>
              <div className='flex flex-col gap-[30px]'>
                <div className='text-center xl:text-left'>
                  <h3 className='text-3xl font-bold'>{skills.title}</h3>
                  <p className='max-w-[600px] text-white/70 mx-auto xl:mx-0'>
                    {skills.description}
                  </p>
                </div>

                <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]'>
                  {skills.skillList.map((list, i) => (
                    <li key={i}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className='glass-card w-full h-[140px] rounded-2xl flex justify-center items-center group'>
                            <div className='text-6xl transition-all duration-300 group-hover:text-accent'>
                              {list.icon}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{list.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            {/* about */}
            <TabsContent value='about'>
              <div className='flex flex-col gap-[30px] text-center xl:text-left'>
                <h3 className='text-3xl font-bold'>{about.title}</h3>
                <p className='max-w-[600px] text-white/70 mx-auto xl:mx-0'>
                  {about.description}
                </p>

                <ul className='grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0'>
                  {about.info.map((item, i) => (
                    <li key={i} className='flex items-center justify-center gap-4 xl:justify-start'>
                      <span className='text-white/60'>{item.fieldName}</span>
                      <span className='text-xl'>{item.fieldValue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

          </div>
        </Tabs>
      </div>
    </motion.div>
  )
}

export default Resume