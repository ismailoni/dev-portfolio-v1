import React from 'react'
import Link from 'next/link'
import Nav from './Nav'
import MobileNav from './MobileNav'


const Header = () => {
  return (
    <header className='site-header pointer-events-auto absolute inset-x-0 top-0 z-40 py-5'>
      <div className='section-wrap flex items-center justify-between gap-4'>
        {/* Logo  */}
        <Link href='/' className='group shrink-0'>
          <h1 className='text-2xl font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] md:text-3xl'>
            Ismail<span className='text-accent'>.</span>
          </h1>
        </Link>

        {/* Desktop Nav  */}
        <div className="hidden items-center gap-5 xl:flex">
          <Nav />
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