import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='w-full bg-black text-white flex justify-between items-center py-6 px-11'>
        <div className='bg-[#FC4F1A] rounded-full space-x-6'>
            <Link to={'/about-us'}>
              <button className='rounded-full px-3 py-1 focus:text-black focus:bg-white font-monsterrat'>About Us</button>
            </Link> 
            <Link to={'/contact-us'}> 
              <button className='rounded-full px-3 py-1 focus:text-black focus:bg-white font-monsterrat'>Contact Us</button>
            </Link> 
            <Link to={'/report-problem'}> 
              <button className='rounded-full px-3 py-1 focus:text-black focus:bg-white font-monsterrat'>Report Problem</button>
            </Link>
        </div>
        <div className='flex flex-row space-x-6 font-monsterrat'>
            <button>Help</button>
            <button>Privacy</button>
            <button>Blog</button>
        </div>
    </div>
  )
}

export default Footer