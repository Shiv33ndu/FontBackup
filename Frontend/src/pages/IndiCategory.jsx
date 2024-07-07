import React from 'react'
import { useLocation } from 'react-router-dom'

function IndiCategory() {
    const location = useLocation();
    const { pathname } = location;
    const categoryName = pathname.split('/')[2]; 
  return (
    <div>{categoryName}</div>
  )
}

export default IndiCategory