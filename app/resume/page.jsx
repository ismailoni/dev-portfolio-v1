'use client'

import { Badge, GraduationCap } from 'lucide-react';
import { FaHtml5, FaCss3, FaJs, FaReact } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs } from 'react-icons/si';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';



//about data
const about = {
  title: 'About me',
  description: 'I specialize in crafting visually engaging and user-friendly web applications, bringing ideas to life with clean, efficient code.',
  info: [
    {
      fieldName: 'Name',
      fieldValue: 'Ismail Oni'
    },
    {
      fieldName: 'Phone',
      fieldValue: '(+234) 810 656 4010'
    },
    {
      fieldName: 'Experience',
      fieldValue: '3+ Years'
    },
    {
      fieldName: 'Email',
      fieldValue: 'ismailoni80@gmail.com'
    },
    {
      fieldName: 'Freelance',
      fieldValue: 'Available'
    },
    {
      fieldName: 'Languages',
      fieldValue: 'English, Yoruba, Arabic (beginner)'
    },
  ]
}

//experience data
const experience = {
  title: 'My experiences',
  icon: <Badge />,
  description: 'work experiences',
  items: [
    {
      company: 'Upwork',
      position: 'Freelance Frontend Developer',
      duration: 'July 2024 - Present'
    },
    {
      company: 'Dataverse Media',
      position: 'Frontend Developer ',
      duration: '2023 - September 2024'
    },
    {
      company: 'Dataverse Media',
      position: 'Frontend Developer ',
      duration: '2023 - September 2024'
    },
    {
      company: 'Dataverse Media',
      position: 'Frontend Developer ',
      duration: '2023 - September 2024'
    },
    {
      company: 'Dataverse Media',
      position: 'Frontend Developer ',
      duration: '2023 - September 2024'
    },
    {
      company: 'Dataverse Media',
      position: 'Frontend Developer ',
      duration: '2023 - September 2024'
    },

  ]
}
const education = {
  title: 'My education',
  icon: <GraduationCap />,
  description: 'Education History',
  items: [
    {
      institution: 'Udemy',
      degree: 'Frontend Development Frameworks',
      duration: 'Jan 2024 - Present'
    },
    {
      institution: 'Codeacademy',
      degree: 'Advanced Frontend Development',
      duration: '2023'
    },
    {
      institution: 'Freecodecamp',
      degree: 'Beginner Frontend Development ',
      duration: '2021 - 2022'
    },

  ]
}

//skills data 
const skills = {
  title: 'My skills',
  description: 'Skills acquired',
  skillList: [
    {
      icon: <FaHtml5 />,
      name: 'html 5',
    },
    {
      icon: <FaCss3 />,
      name: 'css 3',
    },
    {
      icon: <FaJs />,
      name: 'javascript',
    },
    {
      icon: <FaReact />,
      name: 'react.js',
    },
    {
      icon: <SiNextdotjs />,
      name: 'next.js',
    },
    {
      icon: <SiTailwindcss />,
      name: 'tailwind.css',
    },

  ]
}
const Resume = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ 
        opacity: 1, 
        transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' } 
      }}
      className='min-h-[80vh] flex items-center justify-center py-12 xl:py-0'
      >
      <div className="container mx-auto">
        <Tabs defaultValue='experience' className='flex flex-col xl:flex-row gap-[60px] '>
          <TabsList className='flex flex-col w-full max-w-[380px] gap-6 mx-auto xl:mx-0'>
            <TabsTrigger value='experience'>Experience</TabsTrigger>
            <TabsTrigger value='education'>Education</TabsTrigger>
            <TabsTrigger value='skills'>Skills</TabsTrigger>
            <TabsTrigger value='about'>About me</TabsTrigger>
          </TabsList>

          {/* content  */}
          <div className='min-h-[70vh] w-full'>
            {/* experience */}
            <TabsContent value='experience' className='w-full '>
              <div className='flex flex-col gap-[30px] text-center xl:text-left'>
                <h3 className='text-4xl font-bold'>{experience.title}</h3>
                <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>{experience.description}</p>
                <ScrollArea className='h-[400px]'>
                  <ul className='grid grid-cols-1 lg:grid-cols-2 gap-[38px]'>
                    {experience.items.map((item, i) => {
                      return(
                        <li key={i} className='bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1'>
                          <span className='text-accent'>{item.duration}</span>
                          <h3 className='text-xl max-w-[260px] min-h-[60px] text-center lg:text-left'>{item.position}</h3>
                          <div className='flex items-center gap-3'>
                            {/* dot */}
                            <span className='w-[6px] h-[6px] rounded-full bg-accent'></span>
                            <p className='text-white/60'>{item.company}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* education */}
            <TabsContent value='education' className='w-full '>
            <div className='flex flex-col gap-[30px] text-center xl:text-left'>
                <h3 className='text-4xl font-bold'>{education.title}</h3>
                <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>{education.description}</p>
                <ScrollArea className='h-[400px]'>
                  <ul className='grid grid-cols-1 lg:grid-cols-2 gap-[38px]'>
                    {education.items.map((item, i) => {
                      return(
                        <li key={i} className='bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1'>
                          <span className='text-accent'>{item.duration}</span>
                          <h3 className='text-xl max-w-[260px] min-h-[60px] text-center lg:text-left'>{item.degree}</h3>
                          <div className='flex items-center gap-3'>
                            {/* dot */}
                            <span className='w-[6px] h-[6px] rounded-full bg-accent'></span>
                            <p className='text-white/60'>{item.institution}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* skills */}
            <TabsContent value='skills' className='w-full h-full'>
            <div className='flex flex-col gap-[30px]'>
              <div className='flex flex-col gap-[30px] text-center xl:text-left'>
                <h3 className='text-4xl font-bold'>{skills.title}</h3>
                <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>{skills.description}</p>
              </div>
              <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px] gap-4'>
                {skills.skillList.map((list, i) => {
                    return(
                      <li key={i}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className='bg-[#232329] w-full h-[150px] rounded-xl flex justify-center items-center group'>
                              <div className='text-6xl group-hover:text-accent transition-all duration-300'>{list.icon}</div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className='capitalize'>{list.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    )
                  })}
              </ul>
              </div>
            </TabsContent>
            {/* about */}
            <TabsContent value='about' className='w-full text-center xl:text-left'>
              <div className='flex flex-col gap-[30px]'>
                <h3 className='text-4xl font-bold'>{about.title}</h3>
                <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>{about.description}</p>
                <ul className='grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0'>
                  {about.info.map((item, i) => {
                    return(
                      <li key={i} className='flex items-center justify-center xl:justify-start gap-4'>
                        <span className='text-white/60'>{item.fieldName}</span>
                        <span className='text-xl'>{item.fieldValue}</span>
                      </li>
                    )
                  })}
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