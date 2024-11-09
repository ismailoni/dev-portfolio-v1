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
        <SheetTrigger className="flex justify-center items-center">
            <CiMenuFries className="text-[32px] text-accent"/>
        </SheetTrigger>
        <SheetContent className='flex flex-col'>
            <div className="mt-32 mb-28 text-2xl">
                <Link href='/'>
                    <h1 className='text-4xl font-semibold text-white'>
                        Ismail<span className='text-accent'>.</span>
                    </h1>
                </Link>
            </div>

            <nav className='flex flex-col justify-center items-center gap-8'>
                {links.map((link, i) => {
                    return (
                        <Link key={link.url} href={link.url} className={`${link.url === pathname && 'text-accent border-b-2 border-accent'} text-xl capitalize hover:text-accent transition-all `}>{link.name}</Link>
                    )
                })}
            </nav>

        </SheetContent>
    </Sheet>
  )
}

export default MobileNav