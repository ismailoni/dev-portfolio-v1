import Link from "next/link"
import {FaGithub, FaLinkedinIn, FaYoutube, FaTwitter} from 'react-icons/fa'

const socials = [
    {icon: <FaGithub />, url: 'https://www.github.com/ismailoni'},
    {icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/ismail-oni'},
    {icon: <FaYoutube />, url: ''},
    {icon: <FaTwitter />, url: 'https://www.x.com/IsmailOni3'},
]

const Socials = ({containerStyles, iconStyles}) => {
  return (
    <div className={containerStyles}>
        {socials.map((item, i) => {
            return (
                <Link key={i} href={item.url} className={iconStyles}>{item.icon}</Link>
            )
        })}
    </div>
  )
}

export default Socials