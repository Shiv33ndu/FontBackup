import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import opentype from 'opentype.js'
import {parse} from 'flatted'
import { Path } from 'opentype.js';


function FontBox() {
    const [fontList, setFontList] = useState([]);
    const canvasRef = useRef(null);
    const [glyphLetters, setGlyphLetters] = useState([]);

    const url = 'http://localhost:5001/api/v1/fonts/buffer';

    useEffect(() => {

        if(localStorage.getItem('font') !== null){
            setFontList(JSON.parse(localStorage.getItem('font')));
        }else{
        axios.get(url)
        .then(res => {
            console.log('Res::',res.data);
            setFontList(res.data);
            localStorage.setItem('font', JSON.stringify(res.data));
        })
        .catch(error => {
            console.error('Error fetching fonts:', error);    
        })
        }
    },[]);

    const oneFont = fontList ? fontList[1] : {};
    const parsedFont = oneFont ? parse(oneFont.arrayBuffer) : ''
    console.log(parsedFont);

    useEffect(() => {
        if (parsedFont && parsedFont.glyphs && parsedFont.glyphs.glyphs) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const fontSize = 48;
            let x = 10;
            const y = 60;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const sampleText = 'Hello, World!';
            console.log('Drawing text:', sampleText);

            for (let char of sampleText) {
                //console.log('CharCode::',char.charCodeAt(0));
                const glyphIndex = parsedFont.encoding.cmap.glyphIndexMap[char.charCodeAt(0)];
                const glyph = parsedFont.glyphs.glyphs[glyphIndex];
                console.log('Ye Mila::',glyph);
                if (glyph) {
                    // const path = glyph.getPath(x, y, fontSize);
                    // path.draw(ctx);
                    x += glyph.advanceWidth * fontSize / parsedFont.unitsPerEm;
                    console.log('X::',x);
                } else {
                    console.warn(`Glyph not found for character: ${char}`);
                }
            }
        } else {
            console.error('Invalid parsed font data:', parsedFont);
        }
    }, [parsedFont]);        

    useEffect(() => {
        if (parsedFont && parsedFont.glyphs && parsedFont.glyphs.glyphs) {
            const letters = [];
            for (let i = 0; i < parsedFont.numGlyphs; i++) {
                const glyph = parsedFont.glyphs.glyphs[i];
                if (glyph.unicode !== undefined) {
                    const char = String.fromCodePoint(glyph.unicode);
                    letters.push(char);
                }
            }
            setGlyphLetters(letters);
        }
    }, []);

    console.log(glyphLetters);

  return (
    <div className='w-full'>
        <h2>Font Preview</h2>
      <canvas className='text-black border-2 ' ref={canvasRef} width="800" height="200"></canvas>
      <div className='flex w-full flex-wrap'>
      {glyphLetters && glyphLetters.map(letters => (
        <div key={letters} className='w-32 h-32 text-black text-5xl' style={{fontFamily:`revert-layer`}}>
            {letters}
        </div>
      ))}
      </div>
    </div>
  )
}

export default FontBox