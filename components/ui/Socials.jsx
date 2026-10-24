import Link from "next/link"
import { FaGithub, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const socials = [
    {icon: <FaGithub />, url: 'https://www.github.com/ismailoni'},
    {icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/ismail-oni'},
  {icon: <FaYoutube />, url: 'https://www.youtube.com/'},
    {icon: <FaXTwitter />, url: 'https://www.x.com/IsmailOni3'},
]

const Socials = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, i) => (
        <Link
          key={i}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={iconStyles}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  )
}

export default Socials