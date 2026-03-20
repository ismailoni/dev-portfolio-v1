'use client';
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation';


const PageTransition = ({children}) => {
    const pathname = usePathname();
  return (
    <AnimatePresence>
        <div key={pathname}>
            <motion.div
              initial={{ opacity: 0.18 }}
              animate={{ opacity: 0, transition: { duration: 0.24, ease: 'easeOut' } }}
              className='pointer-events-none fixed top-0 h-screen w-screen bg-primary'
            />
            {children}
        </div>
    </AnimatePresence>
  )
}

export default PageTransition