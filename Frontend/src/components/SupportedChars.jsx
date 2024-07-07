import React, { useEffect, useState } from 'react';
import opentype from 'opentype.js';

function SupportedChars({
  font = {},
}) {
  const fontFile = font?.fontFile;
  const [glyphs, setGlyphs] = useState([]);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    if (fontFile) {
      const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      };

      const base64FontData = arrayBufferToBase64(fontFile.data);
      const fontDataUrl = `data:font/ttf;base64,${base64FontData}`;

      opentype.load(fontDataUrl, (err, loadedFont) => {
        if (err) {
          console.error('Error loading font:', err);
          return;
        }
        const glyphArray = Object.values(loadedFont.glyphs.glyphs).filter(glyph => glyph.unicode);
        setGlyphs(glyphArray);
        const fontFace = new FontFace('CustomFont', `url(${fontDataUrl})`);
        fontFace.load().then(() => {
          document.fonts.add(fontFace);
          setFontLoaded(true);
        });
      });
    }
  }, [fontFile]);

  return (
    <div className="supported-chars w-full">
      {fontLoaded ? (
        <div className="flex flex-wrap gap-2 w-full">
          {glyphs.map((glyph, index) => (
            <span
              key={index}
              className="text-5xl p-4"
              style={{ fontFamily: 'CustomFont' }}
            >
              {String.fromCharCode(glyph.unicode)}
            </span>
          ))}
        </div>
      ) : (
        <p>Loading supported characters...</p>
      )}
    </div>
  );
}

export default SupportedChars;
