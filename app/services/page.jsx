'use client'

import { BsArrowDownRight } from 'react-icons/bs'
import Link from 'next/link'
import { motion } from 'framer-motion'

const services = [
  {
    num: '01',
    title: 'Web App Development',
    description:
      'Production-grade web applications built with React and Next.js—optimized for performance, scalability, and real-world user growth.',
    highlights: [
      'MVP to full-scale platforms',
      'Clean, maintainable architecture',
      'API integration & state management'
    ],
    href: '/contact'
  },
  {
    num: '02',
    title: 'UI/UX Implementation',
    description:
      'From Figma to flawless interfaces—pixel-perfect, accessible, and responsive designs with smooth animations.',
    highlights: [
      'Exact Figma-to-code translation',
      'Accessibility-first (WCAG)',
      'Responsive across all devices'
    ],
    href: '/contact'
  },
  {
    num: '03',
    title: 'Performance Optimization',
    description:
      'Speed that converts. I optimize Core Web Vitals and eliminate bottlenecks to improve SEO and retention.',
    highlights: [
      'Faster load times (LCP, CLS, TBT)',
      'Bundle size reduction',
      'Advanced caching strategies'
    ],
    href: '/contact'
  },
  {
    num: '04',
    title: 'Full-Stack Integration',
    description:
      'Seamless connection between frontend and backend systems for reliable, scalable applications.',
    highlights: [
      'REST & API integration',
      'Authentication & security',
      'Database-driven features'
    ],
    href: '/contact'
  },
  {
    num: '05',
    title: 'Landing Page Development',
    description:
      'High-converting landing pages designed to capture attention, drive engagement, and increase conversions.',
    highlights: [
      'Conversion-focused layouts',
      'Animation & micro-interactions',
      'SEO-friendly structure'
    ],
    href: '/contact'
  },
]

const Services = () => {
  return (
    <section className='py-12 section-wrap md:py-16'>
      <div>
        <div className='max-w-2xl mb-10'>
          <h2 className='section-title'>Services</h2>
          <p className='mt-3 section-subtitle'>
            I design and build high-performance web experiences that don’t just look good—they load fast, scale well, and drive measurable business results.
          </p>
        </div>

        <motion.div
          className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45 } }}
        >
          {services.map((service, i) => {
            return (
              <div
                key={i}
                className='flex flex-col justify-between gap-6 p-6 glass-card group'
              >
                {/* Top */}
                <div className='flex items-center justify-between'>
                  <div className='text-4xl font-extrabold text-transparent transition-all duration-500 text-outline group-hover:text-outline-hover'>
                    {service.num}
                  </div>

                  <Link
                    href={service.href}
                    className='flex items-center justify-center w-12 h-12 transition-all duration-300 border rounded-xl border-white/15 bg-white/5 hover:-rotate-12 hover:bg-accent'
                  >
                    <BsArrowDownRight className='text-xl text-white transition-colors group-hover:text-primary' />
                  </Link>
                </div>

                {/* Content */}
                <div className='flex flex-col gap-4'>
                  <h3 className='text-2xl font-bold leading-tight transition-all duration-300 group-hover:text-accent'>
                    {service.title}
                  </h3>

                  <p className='text-sm text-white/70'>
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <ul className='space-y-2'>
                    {service.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className='flex items-start gap-2 text-sm text-white/60'
                      >
                        <span className='mt-[6px] h-1.5 w-1.5 rounded-full bg-accent' />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Services