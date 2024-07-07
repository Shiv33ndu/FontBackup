import Font from "../models/font.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import opentype from 'opentype.js';
import {stringify} from 'flatted';
import path from 'path';
import { toFile } from "../utils/bufferToFile.js";
import { generateFontPreview } from "../utils/previewImage.js";

const downloadFont = asyncHandler( async (req, res) => {
    try {
        // Find the font document by ID
        const font = await Font.findById(req.params.id);
    
        if (!font) {
          return res.status(404).json({ message: 'Font not found' });
        }
    
        // Extract necessary data from the font document
        const { fontFile, fileType, name } = font;

        //console.log(`Data:: ${fileType} ${name}`);
    
        // Decode the buffer from Base64
        const binaryData = Buffer.from(fontFile.buffer, 'base64');
    
        // Set the content type based on the file type
        let contentType;
        switch (fileType) {
          case 'ttf':
            contentType = 'font/ttf';
            break;
          case 'otf':
            contentType = 'font/otf';
            break;
          case 'woff':
            contentType = 'font/woff';
            break;
          default:
            // Handle unsupported file types
            console.error('Unsupported file type:', fileType);
            return res.status(500).json({ message: 'Unsupported file type' });
        }
    
        // Set the response headers for file download
        res.setHeader('Content-Type', contentType);
        res.setHeader('x-filename', `${name}.${fileType}`);
    
        // Send the binary data as the response
        res.send(binaryData);
      } catch (error) {
        console.error('Error downloading font:', error);
        res.status(500).json({ message: 'Error downloading font', error });
      }
} );

const getParsedFonts = asyncHandler( async (req, res) => {
  try {
      const fontList = await Font.find({});
      
     /* const parsedFonts = await Promise.all(fontList.map(async (font) => {
          try {
              //const fontBuffer = Buffer.from(font.fontFile.buffer, 'base64');
              //const arrayBuffer = fontBuffer.buffer.slice(fontBuffer.byteOffset, fontBuffer.byteOffset + fontBuffer.byteLength);
              //console.log('Buffer::',fontBuffer);
              //console.log('ArrayBuffer::', arrayBuffer);

                
            //   const parsedFont = opentype.parse(arrayBuffer);
              
            //   console.log(parsedFont);

               // Verify structure of parsedFont
              //  if (!parsedFont.glyphs || !Array.isArray(parsedFont.glyphs)) {
              //   throw new Error('Invalid font structure: glyphs not found or not an array');
            //}

              return {
                        font: font,
                //   fontName: parsedFont.names.fullName.en,
                //   author: parsedFont.names.designer ? parsedFont.names.designer.en : 'Unknown',
                //   glyphs: parsedFont.glyphNames.GlyphNames.names.map(glyph => ({
                //       //name: glyph.name,
                //       unicode: glyph.unicode,
                //       path: glyph.path ? glyph.path.toPathData() : null,
                //   })),
              };
          } catch (parseError) {
              console.error('Error parsing font:', parseError);
              return {
                  fontName: font.name,
                  author: font.author,
                  glyphs: [],
                  error: 'Error parsing font',
              };
          }
      }));*/

      res.status(200).json(fontList);
  } catch (error) {
      console.error('Error Fetching Fonts : ', error);
      res.status(500).json({ message: 'Error Fetching Fonts', error });
  }
} );    

const deleteFont = asyncHandler( async (req, res) => {
    try {
        const font = await Font.findById(req.params.id);
        if (!font) {
            return res.status(404).json({ message: 'Font not found' });
        }

        await Font.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Font deleted successfully' });
    } catch (error) {
        console.error('Error deleting font:', error);
        res.status(500).json({ message: 'Error deleting font', error });
    }
} );    

const getFonts = asyncHandler( async (req, res) => {
    try {
        const fontList = await Font.find({});
        res.status(200).json(fontList);
    } catch (error) {
        console.error('Error Fetching Fonts : ', error);
        res.status(500).json({ message: 'Error Fetching Fonts', error });
    }
} )

const getFont = asyncHandler(async (req, res) => {
    const fontId = req.params.id;
    try {
      const font = await Font.findById(fontId);
      console.log(font);
      res.status(200).json(font);
    } catch (error) {
      console.error('Error Fetching Font : ', error);
      res.status(500).json({ message: 'Error Fetching Font', error });
    }
} )

const uploadFont = asyncHandler( async (req, res) => {
    try {
         const { fontName, fileType, fontCategory, designer, license, description, specialTag, imageUrl, version } = req.body;

        //console.log('FontName : ', req.body.fontName);

        const fontFileBuffer = req.file.buffer;

        //writing back to file into Disk for font-family access 
        //const filePath = toFile(fontFileBuffer, fileType, fontName);
        
        //if we got the filePath we will create Text to image for Font preview of it
        // if(filePath){
        //   const fontPreview = await generateFontPreview(fontName, filePath);
        //   console.log('URI:: ',fontPreview);
        // }
        

        //console.log('Multer2::', req.file);

        console.log('Form Data:', {
            fontName,
            fileType,
            fontCategory: fontCategory.split(','),
            designer,
            license: license.split(','),
            description,
            fontFileBuffer,
            specialTag: specialTag.split(','),
            //imageUrl,
            version,
          });                
        
        const newFont = await Font.create({
            name: fontName,
            fontFile: fontFileBuffer,
            fileType: fileType,
            category: fontCategory,
            specialTag: specialTag,
            designer: designer,
            license: license,
            description: description,  
            preview: imageUrl,   
            version: version,       
        });

       
        res.status(201).json({ message: 'Font uploaded successfully', newFont});
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Upload failed', error });
    }
} );    

const getArrayBuffers = asyncHandler( async (req, res) => {
  try {
      const fontList = await Font.find({});
      
      const parsedFonts = await Promise.all(fontList.slice(0,2).map(async (font) => {
          try {
              const fontBuffer = Buffer.from(font.fontFile.buffer, 'base64');
              const arrayBuffer = fontBuffer.buffer.slice(fontBuffer.byteOffset, fontBuffer.byteOffset + fontBuffer.byteLength);
              //console.log('Buffer::',fontBuffer);
              //console.log('ArrayBuffer::', arrayBuffer);

                
              const parsedFont = opentype.parse(arrayBuffer);
              console.log(parsedFont);
              return{
                arrayBuffer: stringify(parsedFont)
              }
              
            //   const glyphs = parsedFont.glyphs.glyphs.map(glyph => ({
            //     name: glyph.name,
            //     unicode: glyph.unicode,
            //     path: glyph.path ? glyph.path.toPathData() : null,
            //   }));

            //   return {
            //     name: parsedFont.names.fullName.en,
            //     author: parsedFont.names.designer ? parsedFont.names.designer.en : 'Unknown',
            //     glyphs,
            // };
          } catch (parseError) {
              console.error('Error parsing font:', parseError);
              return {
                  fontName: font.name,
                  author: font.author,
                  glyphs: [],
                  error: 'Error parsing font',
              };
          }
      }));

      res.status(200).json(parsedFonts);
  } catch (error) {
      console.error('Error Fetching Fonts : ', error);
      res.status(500).json({ message: 'Error Fetching Fonts', error });
  }
} ); 

export {downloadFont, getParsedFonts, deleteFont, getFonts, uploadFont, getArrayBuffers, getFont};