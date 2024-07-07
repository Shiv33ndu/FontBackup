import React from 'react'
import { Link } from 'react-router-dom'
import { headerOptions } from '../constants/constants'
import Logo from './Logo'

function Header() {
  return (
    <div className='w-full'>
        <div id='blackDiv' className='w-full h-3 bg-black'></div>
        <div id='orangeDiv' className='w-full h-3 bg-[#FC4F1A]'></div>

        <div id='functionalHeader' className='mt-5 flex justify-between px-5'>
            <Link to={'/'}>
              <Logo/>
            </Link>
        </div>

        <div id='navigationHeader' className='mt-3 flex justify-center items-center space-x-5'>
            {headerOptions.map(item => (
              <Link key={item.name} to={item.path}>
                <button className='px-4 py-1 focus:bg-[#fc4f1a] focus:text-white text-black font-medium text-lg rounded-full hover:bg-[#f08b6d] transition-all duration-300'>{item.name}</button>
              </Link>
            ))}
         </div>
    </div>
  )
}

export default Header