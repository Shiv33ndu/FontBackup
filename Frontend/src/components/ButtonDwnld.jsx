import React from 'react'
import download from '../assets/direct-download.png'

function ButtonDwnld() {
    return (
        <button 
        onClick={(e) => e.stopPropagation()}
        className='bg-transparent hover:scale-105'>
            <img  
            className='w-10 h-10 object-contain'
            src={download} alt="downloadFont" />
        </button>
      )
}

export default ButtonDwnld