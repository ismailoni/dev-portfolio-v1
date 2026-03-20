'use client';

import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {CiMenuFries} from 'react-icons/ci'
import Link from "next/link";

const links = [
    {
        name: 'home',
        url: '/'
    },
    {
        name: 'services',
        url: '/services'
    },
    {
        name: 'resume',
        url: '/resume'
    },
    {
        name: 'work',
        url: '/work'
    },
    {
        name: 'contact',
        url: '/contact'
    },
]

const MobileNav = () => {
    const pathname = usePathname();

  return (
    <Sheet>
        <SheetTrigger className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <CiMenuFries className="text-[26px] text-accent"/>
        </SheetTrigger>
        <SheetContent className='flex flex-col bg-[#0e1221]'>
            <div className="mb-14 mt-14 text-2xl">
                <Link href='/'>
                    <h1 className='text-4xl font-semibold text-white'>
                        Ismail<span className='text-accent'>.</span>
                    </h1>
                </Link>
            </div>

            <nav className='flex flex-col gap-3'>
                {links.map((link, i) => {
                    return (
                        <Link
                          key={link.url}
                          href={link.url}
                          className={`rounded-xl px-4 py-3 text-lg capitalize transition-all ${
                            link.url === pathname
                              ? 'bg-accent text-primary'
                              : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {link.name}
                        </Link>
                    )
                })}
            </nav>

        </SheetContent>
    </Sheet>
  )
}

export default MobileNav