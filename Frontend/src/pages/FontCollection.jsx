import FontCard from '../components/FontCard'
import React from 'react'

function FontCollection() {

    //here we will make a DB call to fetch all the bookmarked fonts for the logged-in user 

    const dummyFontList = [
        {name: 'Monsterrat', designer: 'MiftaHazraj', category: ['Logo', 'Script', 'Poster', 'Unique', 'Modern', 'Stylish', 'Print'], ratings: [4,2,3,1], specialTag: ""},
        {name: 'Bangarang', designer: 'MiftaHazraj', category: ['Logo', 'Script', 'Poster', 'Unique', 'Modern', 'Stylish', 'Print'], ratings: [4,2,3,1], specialTag: ""},
        {name: 'BadoomBam', designer: 'MiftaHazraj', category: ['Logo', 'Script', 'Poster', 'Unique', 'Modern', 'Stylish', 'Print'], ratings: [4,2,3,1], specialTag: ""},
        {name: 'SkewedReality', designer: 'MiftaHazraj', category: ['Logo', 'Script', 'Poster', 'Unique', 'Modern', 'Stylish', 'Print'], ratings: [4,2,3,1], specialTag: ""},
        {name: 'Kelly', designer: 'MiftaHazraj', category: ['Logo', 'Script', 'Poster', 'Unique', 'Modern', 'Stylish', 'Print'], ratings: [4,2,3,1], specialTag: ""},
        {name: 'Hello', designer: 'MiftaHazraj', category: ['Logo', 'Script', 'Poster', 'Unique', 'Modern', 'Stylish', 'Print'], ratings: [4,2,3,1], specialTag: ""},
        {name: 'JustinSpank', designer: 'MiftaHazraj', category: ['Logo', 'Script', 'Poster', 'Unique', 'Modern', 'Stylish', 'Print'], ratings: [4,2,3,1], specialTag: ""},
      ] 

  return (
    <div className='w-full max-w-2xl mx-auto mt-10'>
        <p className='bg-[#FC4F1A] text-white font-semibold text-md px-2 mb-5 text-center'>Your Collection</p>
        <div className='mt-7 mb-7 space-y-7'>
            {dummyFontList.map(item => (
                <FontCard item={item} key={item.name}/>
            ))}
        </div>
    </div>
  )
}

export default FontCollection