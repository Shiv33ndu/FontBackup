import React from 'react'

export default function Container({
    children,
}) {
  return (
    <div className='w-full hide-scrollbar'>
        {children}
    </div>
  )
}
