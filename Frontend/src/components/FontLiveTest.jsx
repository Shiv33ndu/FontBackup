import React, { useEffect, useRef, useState } from 'react';
import opentype from 'opentype.js'; // Make sure you have opentype.js installed

function FontLiveTest({
  font = {}
}) {
  const canvasRef = useRef(null);
  const fontFile = font?.fontFile;
  const firstFontName = font?.name;

  const [fontName, setFontName] = useState(font?.name);
  const [fontSize, setFontSize] = useState(60);
  const [imageUrl, setImageUrl] = useState('');
  //console.log(font ? font : '');

  // Convert ArrayBuffer to base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  //------------ image generation related code starts
  const loadFont = async (name, base64) => {
    const fontData = `data:font/ttf;base64,${base64}`;
    const font = new FontFace(name, `url(${fontData})`);
    await font.load();
    document.fonts.add(font);
  };

  const generateImage = async () => {
    if (!fontFile) {
      alert('Please select a font file.');
      return;
    }

    const base64FontData = arrayBufferToBase64(fontFile.data);
    await loadFont('CustomFont', base64FontData);

    opentype.load(`data:font/ttf;base64,${base64FontData}`, (err, font) => {
      if (err) {
        console.log('Error Loading Font::', err);
      }
    });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px CustomFont`;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(fontName, canvas.width / 2, canvas.height / 2 + 15);

    const image = canvas.toDataURL('image/png');
    setImageUrl(image);
  };

  useEffect(() => {
    if (fontFile && fontName) {
      generateImage();
    }
  }, [fontFile, fontName, fontSize]);

  if(fontName === '') setFontName(firstFontName);

  //---------- Image generation related code ends

  return (
    <div className='relative z-0 w-full mb-5 mt-5'>
      <input
        type="text"
        id="fontName"
        name="fontName"
        required
        className="block py-2.5 px-0 w-full text-lg font-monsterrat text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#FC4F1A] focus:outline-none focus:ring-0 focus:border-[#FC4F1A] peer placeholder:font-monsterrat"
        placeholder="Enter your Text to Test"
        value={fontName === firstFontName ? '' : fontName}
        onChange={(e) => setFontName(e.currentTarget.value)}
      />
      <div className='relative w-[130px] h-1 mt-5 mb-10'>
        <p className='font-monsterrat text-gray-600 text-md font-semibold'>{fontSize}px</p>
        <div id='absoluteBox' className='absolute w-full h-2 bg-[#fc4f1aa6] rounded-full'></div>
        <div className={`absolute flex-grow h-1 w-auto`}>
        {/* <div id='progress' className={`h-1 bg-[#fc4f1a] rounded-xl`}
        style={{width: `${Number((fontSize || 0))}px`}}
        ></div> */}
        </div>
        <input 
        id='inputBox' 
        type="range" 
        min={40}
        step={10}
        max={100}
        value={fontSize}
        onChange={(e) => setFontSize(e.currentTarget.value)}
        className='absolute w-full h-2 bg-transparent accent-[#fc4f1a] appearance-none cursor-default'
        />
      </div> 
      <canvas ref={canvasRef} width={800} height={200} style={{ display: 'none' }}></canvas>
      {imageUrl && (
        <div>
          <img 
            className='w-[800px] h-[200px] object-contain mb-5 ml-2'
            src={imageUrl} alt="FontImage" />
        </div>
      )}
    </div>
  );
}

export default FontLiveTest;
