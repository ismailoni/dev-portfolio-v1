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

  return (
        <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
        {links.map((link, i) => {
            return (
                                <Link
                                    href={link.url}
                                    key={i}
                                    className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-all duration-300 ${
                                        link.url === pathname
                                            ? 'bg-accent text-primary'
                                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {link.name}
                                </Link>
            )
        })}
    </nav>
  )
}

export default Nav