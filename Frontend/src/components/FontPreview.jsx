import React, { useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser';

function FontPreview({
  font = {}
}) {
  ///console.log(font);

  return (
    <div className='relative z-0 w-full mb-5'>
      <img 
      className='w-[400px] h-[200px] object-contain'
      src={font?.preview} alt="FontPreview" />
      <div className='flex-col w-full'>
        <div className='font-monsterrat'>{parse(font ? font.description : <>''</>)}</div>
      </div>
    </div>
  );
}

export default FontPreview;
