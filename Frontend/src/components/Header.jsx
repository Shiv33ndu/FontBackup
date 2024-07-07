import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { headerOptions } from '../constants/constants'

function Header() {
  return (
    <div className='w-full hide-scrollbar'>
        <div id='blackDiv' className='w-full h-3 bg-black'></div>
        <div id='orangeDiv' className='w-full h-3 bg-[#FC4F1A]'></div>

        <div id='functionalHeader' className='mt-5 flex justify-between px-5'>
            <Link to={'/'}>
              <Logo/>
            </Link>
            <Link to={'/login'}>
              <button className='rounded-full px-3 py-2 text-white focus:bg-[#fc774f] hover:bg-[#fc7249] bg-[#FC4F1A] font-monsterrat'>Login/Sign-up</button>
            </Link>
        </div>

        <div id='navigationHeader' className='mt-3 flex justify-center items-center space-x-5'>
            {headerOptions.map(item => (
              <Link key={item.title} to={item.path}>
                <button className='px-4 py-1 focus:bg-[#fc4f1a] focus:text-white text-black font-monsterrat font-semibold text-lg rounded-full hover:bg-[#f08b6d] transition-all duration-300'>{item.title}</button>
              </Link>
            ))}
         </div>
    </div>
  )
}

export default Header