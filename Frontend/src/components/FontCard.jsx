import React from 'react'
import wishlist from '../assets/wishlist.png'

import ButtonDwnld from './ButtonDwnld'
import ButtonWshlt from './ButtonWshlt'



function FontCard({
    item = {}
}) {
  return (
    <div key={item.name} className='rounded-xl relative h-56 shadow-md shadow-black mb-8 transition-all duration-300 ease-in-out'>
        <div className='h-4/5 flex justify-center items-center border-gray-500/30'>
        {/* <p className='text-4xl'>{item?.name}</p>   */}
        <img 
        className='w-[500px] h-[200px] object-contain'
        src={item?.preview || ''} alt="fontPreview" />
        </div> 
        <div className='w-full h-1/5 bg-black flex items-center rounded-b-xl'>
        <p className='text-white px-5 font-monsterrat text-sm'>By {item?.designer}</p>
        </div>  
        <div className='absolute z-20 top-0 right-0'>
          <div className='flex-col justify-between mt-5 mr-5'>
          
          {/* <ButtonWshlt/> */}
          </div>
        </div>   
    </div>
  )
}

export default FontCard