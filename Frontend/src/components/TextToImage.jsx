// TextToImage.js
import React, { useState, useRef, useEffect } from 'react';

const TextToImage = () => {
    const [text, setText] = useState('');
    const [fontFile, setFontFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const canvasRef = useRef(null);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleFontFileChange = (event) => {
        setFontFile(event.target.files[0]);
    };

    const loadFont = async (name, url) => {
        const font = new FontFace(name, `url(${url})`);
        await font.load();
        document.fonts.add(font);
    };

    const generateImage = async () => {
        if (!fontFile) {
            alert('Please select a font file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const fontDataUrl = e.target.result;
            await loadFont('CustomFont', fontDataUrl);

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = '100px CustomFont';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 15);

            const image = canvas.toDataURL('image/png');
            setImageUrl(image);
        };
        reader.readAsDataURL(fontFile);
    };

    useEffect(() => {
        if (fontFile && text) {
            generateImage();
        }
    }, [fontFile, text]);

    return (
        <div className='bg-gray-500 w-full max-w-3xl mx-auto'>
            <h2>Generate Image with Custom Font</h2>
            <div>
                <label htmlFor="fontFile">Select a font file:</label>
                <input type="file" id="fontFile" name="fontFile" accept=".ttf,.otf" onChange={handleFontFileChange} />
            </div>
            <div>
                <label htmlFor="text">Enter text:</label>
                <input type="text" id="text" name="text" value={text} onChange={handleTextChange} />
            </div>
            <canvas 
            className='bg-gray-700'
            ref={canvasRef} width={600} height={250} style={{ display: 'none' }}></canvas>
            {imageUrl && (
                <div>
                    <h3>Generated Image:</h3>
                    <img 
                    className='border-2 border-black w-[460px] h-[200px] object-scale-down'
                    src={imageUrl} alt="Generated Image" />
                </div>
            )}
        </div>
    );
};

export default TextToImage;
