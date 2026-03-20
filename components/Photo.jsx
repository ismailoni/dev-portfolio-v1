'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="relative mx-auto h-[320px] w-[320px] md:h-[380px] md:w-[380px] xl:h-[460px] xl:w-[460px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.5 } }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 via-transparent to-blue-500/20 blur-2xl"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.45 } }}
          className="absolute inset-[14%] z-10 overflow-hidden rounded-full border border-white/20 bg-white/5"
        >
          <Image src='/hero.png' priority quality={100} fill alt="Hero" className="object-cover"/>
        </motion.div>

        <motion.svg
          className='h-full w-full'
          fill='transparent'
          viewBox='0 0 506 506'
          xmlns='http://www.w3.org/2000/svg'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.35 } }}
        >
          <motion.circle
            cx='253'
            cy='253'
            r='240'
            stroke="#13cf71"
            strokeOpacity={0.85}
            strokeWidth={3}
            strokeLinecap='round'
            strokeLinejoin='round'
            initial={{ strokeDasharray: '20 30 10 50' }}
            animate={{
              strokeDasharray: ['20 30 10 50', '50 18 30 18', '30 28 20 36'],
              rotate: [0, 360],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          />
        </motion.svg>
    </div>
  )
}

export default Photo