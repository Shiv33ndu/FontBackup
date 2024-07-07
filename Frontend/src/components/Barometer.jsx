// import React from 'react'
// import bar from '../assets/Barometer.png'
// import barArrow from '../assets/Barometer_arrow.png'

// function Barometer() {
//   return (
//     <div className='overflow-hidden'>
//         <div className="absolute right-0">
//             <img 
//             className="w-5"
//             src={bar} alt="barometer" />
//             </div>
//             <div className="absolute right-3">
//             <div className="fixed top-1/2 right-2">
//             <img 
//             className="w-7"
//             src={barArrow} alt="barArrow" />
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Barometer

import React, { useEffect, useState } from 'react'
import bar from '../assets/Barometer.png'
import barArrow from '../assets/Barometer_arrow.png'

function Barometer() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const pageHeight = window.innerHeight - 250;

  return (
    <div className='overflow-hidden hide-scrollbar'>
        <div className="absolute right-0 top-60">
            <img 
            className="w-5"
            src={bar} 
            alt="barometer"
            style={{ transform: `translateY(-${Math.min(scrollPosition, pageHeight)}px)` }} />
            </div>
            <div className="absolute right-3">
            <div className="fixed top-1/2 right-2">
            <img 
            className="w-7"
            src={barArrow} 
            alt="barArrow" />
            </div>
        </div>
    </div>
  )
}

export default Barometer