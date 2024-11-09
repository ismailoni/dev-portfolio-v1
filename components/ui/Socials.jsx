import Link from "next/link"
import {FaGithub, FaLinkedinIn, FaYoutube, FaTwitter} from 'react-icons/fa'

const socials = [
    {icon: <FaGithub />, url: ''},
    {icon: <FaLinkedinIn />, url: ''},
    {icon: <FaYoutube />, url: ''},
    {icon: <FaTwitter />, url: ''},
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