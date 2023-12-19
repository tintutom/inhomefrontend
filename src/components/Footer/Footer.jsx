import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { RiLinkedinFill } from 'react-icons/ri';
import { AiFillGithub } from 'react-icons/ai';
// import './footercss.css'
const socialLinks = [
  {
    path: "https://github.com/tintutom",
    icon: <AiFillGithub className='group-hover:text-white w-4 h-5' />
  },
  {
    path: "https://www.linkedin.com/in/tintutom",
    icon: <RiLinkedinFill className='group-hover:text-white w-4 h-5' />
  },
];

const quickLinks = [
  {
    title: 'Quick Links',
    links: [
      { path: '/home', display: 'Home' },
      { path: '/', display: 'About Us' },
      { path: '/services', display: 'Services' },
      { path: '/blog', display: 'Blog' },
    ]
  },
  {
    title: 'I want to',
    links: [
      { path: '/find-a-doctor', display: 'Find a Doctor' },
      { path: '/', display: 'Request an Appointment' },
      { path: '/', display: 'Find a Location' },
      { path: '/', display: 'Find an Opinion' },
    ]
  },
  {
    title: 'Support',
    links: [
      { path: '/contact', display: 'Contact Us' },
    ]
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='bg-blue-200 py-20'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row justify-center md:justify-between gap-[30px]'>
          <div className="text-center mb-8 md:mb-0">
            <img src={logo} alt='' />
            <p className='text-[16px] leading-7 font-[400] text-textColor mt-4'>
              Copyright @ {year} developed by Tintu Tom all right reserved.
            </p>
            <div className='flex items-center gap-3 mt-4'>
              {socialLinks.map((link, index) => (
                <a
                  href={link.path}
                  key={index}
                  className='w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center 
                  justify-center group hover:bg-primaryColor hover:border-none'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {quickLinks.map((section, index) => (
            <div key={index} className="text-center">
              <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
                {section.title}
              </h2>
              <ul>
                {section.links.map((item, index) => (
                  <li key={index} className='mb-4'>
                    <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'>
                      {item.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer;
