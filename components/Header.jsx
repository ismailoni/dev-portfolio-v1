import React from 'react'
import Link from 'next/link'
import Nav from './Nav'
import { Button } from './ui/button'
import MobileNav from './MobileNav'


const Header = () => {
  return (
    <header className='sticky top-0 z-40 border-b border-white/10 bg-[#0e1221]/70 py-5 backdrop-blur-xl'>
      <div className='section-wrap flex items-center justify-between'>
        {/* Logo  */}
        <Link href='/' className='group'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Ismail<span className='text-accent'>.</span>
          </h1>
        </Link>

        {/* Desktop Nav  */}
        <div className="hidden items-center gap-5 xl:flex">
          <Nav />
          <Link href='/contact'>
            <Button size='md'>Let&apos;s Talk</Button>
          </Link>
        </div>

        {/* Mobile nav  */}
        <div className='xl:hidden'>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header