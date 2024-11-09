'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

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
const Nav = () => {
    const pathname = usePathname()
    console.log(pathname)

  return (
    <nav className="flex gap-8">
        {links.map((link, i) => {
            return (
                <Link href={link.url} key={i} className={`${link.url === pathname && 'text-accent border-b-2 border-accent'} capitalize font-medium hover:text-accent transition-all links`}>{link.name}</Link>
            )
        })}
    </nav>
  )
}

export default Nav