import React from 'react'

function Sanskrit() {
    const dummyNewFonts = [
        {name: 'Monsterrat', author: 'Ab Deviliars'},
        {name: 'Poppins', author: 'Ab Deviliars'},
        {name: 'Bahnscrift', author: 'Ab Deviliars'},
        {name: 'Bebas Neue', author: 'Ab Deviliars'},
        {name: 'Monsterrat', author: 'Ab Deviliars'},
        {name: 'Poppins', author: 'Ab Deviliars'},
        {name: 'Bahnscrift', author: 'Ab Deviliars'},
        {name: 'Bebas Neue', author: 'Ab Deviliars'},
    ]


  return (
    <div className='w-full'>
        {/* Newest FontList Start */}
        <div className='w-full flex justify-center mt-10 mb-10'>
            <div className='w-full max-w-4xl flex-col'>
                <p className='bg-[#FC4F1A] text-white font-semibold text-lg px-2 mb-5 text-center'>Explore Sanskrit Fonts</p>
                <div className='grid grid-cols-2 gap-5'>
                    {dummyNewFonts.map(item => (
                        <div key={item.name} className='h-32 shadow-sm shadow-black'>
                            <div className='h-4/5 flex justify-center items-center border-2 border-gray-500'>
                                <p className='text-4xl'>{item.name}</p>  
                            </div> 
                            <div className='w-full h-1/5 bg-black flex items-center'>
                                <p className='text-white px-5 font-thin text-sm'>By {item.author}</p>
                            </div>     
                        </div>
                    ))}
                </div> 
            </div>
        </div>
        {/* Newest FontList End */}
    </div>
  )
}

export default Sanskrit