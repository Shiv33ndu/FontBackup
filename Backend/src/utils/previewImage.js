
import path from 'path'
import fs from 'fs'
import textToImage from 'text-to-image' 


export const generateFontPreview = async (fontName, filePath) => {
    
    const customFontPath = path.resolve(filePath);
    const outputPath = 'C:/Users/Shivendu/Desktop/FontFind Site/Backend/public/fontPreviews/preview.png';

    const cssFontFace = `@font-face {
        font-family: 'CustomFont';
        src: url('${customFontPath}');
    }`;

    const options = {

    }

    textToImage.generate(fontName, {
        maxWidth: 800,
        maxHeight: 400,
        fontSize: 80,
        fontFamily: 'CustomFont',
        lineHeight: 50,
        margin: 5,
        bgColor: 'white',
        textColor: 'black',
        textAlign: 'center',
        verticalAlign: 'middle',
        customCSS: cssFontFace
    })
    .then((dataUri)=> {
        fs.unlinkSync(customFontPath);
        console.log(dataUri);
    })
    .catch((err) => {
        console.log('Error::',err);
    })
    
    
}





/* TEXT-TO-IMAGE Code didnt work as intended due to Custom Font issue

const cssFontFace = `@font-face {
        font-family: 'CustomFont';
        src: url('${customFontPath}');
    }`;

    const options = {

    }

    textToImage.generate(fontName, {
        maxWidth: 800,
        maxHeight: 400,
        fontSize: 80,
        fontFamily: 'CustomFont',
        lineHeight: 50,
        margin: 5,
        bgColor: 'white',
        textColor: 'black',
        textAlign: 'center',
        verticalAlign: 'middle',
        customCSS: cssFontFace
    })
    .then((dataUri)=> {
        fs.unlinkSync(customFontPath);
        console.log(dataUri);
    })
    .catch((err) => {
        console.log('Error::',err);
    })
    
    */