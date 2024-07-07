import React, { useEffect, useRef, useState } from 'react';
import Texteditor from './Texteditor';
import MultiSelect from './MultiSelect';
import { fileTypeOptions, fontCategoryOptions, fontLicenseOptions } from '../constants/index.js';
import ttf from '../assets/ttf-file.png'
import otf from '../assets/otf.png'
import woff from '../assets/woff-file.png'
import opentype from 'opentype.js'
import { Toaster, toast } from 'sonner'

function UploadForm() {

  const [fontName, setFontName] = useState('');
  const [fontFile, setFontFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [fontCategory, setFontCategory] = useState('');
  const [designer, setDesigner] = useState('');
  const [license, setLicense] = useState('');
  const [description, setDescription] = useState('');
  const [specialTag, setSpecialTag] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [version, setVersion] = useState('');
  const canvasRef = useRef(null);

  const handleSelectCategory = (values) => {
    setFontCategory(values);
  };

  const handleSelectLicense = (values) => {
    setLicense(values);
  }

  const handleFileChange = (e) => {
    setFontFile(e.target.files[0]);
    console.log('FILE INFO::',e.target.files);
  }

//------------ image generation related code starts
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

        opentype.load(fontDataUrl, (err, font) => {
          if(err){
            console.log('Error Loading Font::',err);
          }
          //console.log('Font::', font);
          setDesigner(font.names.designer.en || 'Unkown');
          setVersion(font.names.version.en || '')
          //console.log('Version::', version || '');
        })

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '120px CustomFont';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(fontName, canvas.width / 2, canvas.height / 2 + 15);

        const image = canvas.toDataURL('image/png');
        setImageUrl(image);
    };
    reader.readAsDataURL(fontFile);
};

useEffect(() => {
    if (fontFile && fontName) {
        generateImage();
    }
}, [fontFile, fontName, setFontName, setDesigner, setVersion]);

//------------ image generation related code ends 
    

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit form data including selectedValues
    console.log('Selected Values:', typeof fontCategory);
    //console.log('Description:', description);
    //console.log('File:',fontFile ? fontFile : '');

    const formData = new FormData();
    formData.append('fontName', fontName);
    formData.append('fontFile', fontFile);
    formData.append('fileType', fileType);
    formData.append('fontCategory', fontCategory);
    formData.append('designer', designer);
    formData.append('specialTag',specialTag);
    formData.append('license', license);
    formData.append('description', description);
    formData.append('version', version);
    formData.append('imageUrl', imageUrl);
    
  
    try {
      const response = await fetch('http://localhost:5001/api/v1/fonts/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Form submitted successfully');
        return toast.success('Submitted Succecfully!')
      } else {
        console.error('Form submission failed');
        return toast.error('Submission Failed!')
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      return toast.error('Something Went Wrong!')
  };
}
  //console.log(fontFile?.name || '');
  return (
    <form
      onSubmit={handleSubmit} //"http://localhost:5001/upload"
      //method="post"
      //encType="multipart/form-data"
      className="max-w-xl mx-auto mt-10"
    >
      {/* FontName Starts */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          id="fontName"
          name="fontName"
          required
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#FC4F1A] focus:outline-none focus:ring-0 focus:border-[#FC4F1A] peer"
          placeholder=" "
          value={fontName || ''}
          onChange={(e) => setFontName(e.currentTarget.value)}
        />
        <label
          htmlFor="fontName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Font Name
        </label>
      </div>
      {/* FontName Ends */}

      {/* FontFile Starts */}
      <div className="relative z-0 w-full mb-5 group">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="fontFile"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload Font File</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                TTF, OTF, WOFF, WOFF2 (MAX. 5Mb)
              </p>
            </div>
            <input id="fontFile" type="file" className="hidden" onChange={handleFileChange}/>
          </label>
        </div>
        <div className='absolute z-10 w-20 h-40 top-0 -right-24'>
          {fontFile ? 
            <div>
              {fontFile?.name?.includes('ttf') ? 
              <div className='flex gap-2'>
                <img className='w-10 h-10 shadow-lg' src={ttf} alt="ttf file" />
                <p className='font-normal text-[10px] text-gray-600'>{fontFile?.name}</p>
              </div> : ''}
              
              {fontFile?.name?.includes('otf') ? 
              <div className='flex gap-2'>
              <img className='w-10 h-10 shadow-lg' src={otf} alt="otf file" />
              <p className='font-normal text-[10px] text-gray-600'>{fontFile?.name}</p>
              </div> : ''}
              
              {fontFile?.name?.includes('woff') ? 
              <div className='flex gap-2'>
              <img className='w-10 h-10 shadow-lg' src={woff} alt="ttf file" />
              <p className='font-normal text-[10px] text-gray-600'>{fontFile?.name}</p>
              </div> : ''}
              
            </div> 
            : 
            ''}
        </div>
      </div>
      {/* FontFile Ends */}

      {/* Font-Image Preview Starts */}
      <div className='relative z-0 w-full mb-5 mt-5'>
      <canvas ref={canvasRef} width={800} height={200} style={{ display: 'none' }}></canvas>
            {imageUrl && (
                <div>
                    <label
                    htmlFor="fileType"
                    className="mt-5 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-focus:text-black  peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                    Font Preview
                    </label>
                    <img 
                    className='w-[800px] h-[200px] object-contain mb-5'
                    src={imageUrl} alt="Generated Image" />
                </div>
            )}
      </div>
      {/* Font-Image Preview Ends */}      

      {/* FileType Starts */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="fileType"
          id="fileType"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  dark:focus:border-[#FC4F1A] focus:outline-none focus:ring-0  focus:border-[#FC4F1A] peer"
          placeholder=" "
          onChange={(e) => setFileType(e.currentTarget.value)}
          accept='ttf, otf, woff, woff-2'
          required
        />
        <label
          htmlFor="fileType"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-focus:text-black  peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          File Type
        </label>
      </div>
      {/* FileType Ends */}

      {/* FontCategory Starts */}
      <MultiSelect inputName={'fontCategory'} labelName={'Font Category'} options={fontCategoryOptions} onChange={handleSelectCategory}/>
      {/* FontCategory Ends */}

      {/* SpecialTag Starts */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="specialTag"
          id="specialTag"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  dark:focus:border-[#FC4F1A] focus:outline-none focus:ring-0  focus:border-[#FC4F1A] peer"
          placeholder=" "
          onChange={(e) => setSpecialTag(e.currentTarget.value)}
        />
        <label
          htmlFor="designer"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-focus:text-black  peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Special Tag
        </label>
      </div>
      {/* SpecialTag Ends */}

      {/* Designer Starts */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="designer"
          id="designer"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  dark:focus:border-[#FC4F1A] focus:outline-none focus:ring-0  focus:border-[#FC4F1A] peer"
          placeholder=" "
          value={designer || ''}
          onChange={(e) => setDesigner(e.currentTarget.value)}
          required
        />
        <label
          htmlFor="designer"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-focus:text-black  peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Designer/Author
        </label>
      </div>
      {/* Designer Ends */}

      {/* License Starts */}
      <MultiSelect inputName={'license'} labelName={'License'} options={fontLicenseOptions} onChange={handleSelectLicense}/>
      {/* License Ends */}

      <Texteditor onContentChange={(content) => setDescription(content ? content : '')}/> {/* Description Rich Text Editor */}

      <button
        type="submit"
        className="text-white bg-[#FC4F1A] hover:bg-[#df714f] focus:ring-4 focus:outline-none focus:ring-[#df714f] mb-10 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#FC4F1A] dark:hover:bg-[#df714f] dark:focus:ring-[#df714f]"
      >
        Submit
      </button>
      <Toaster richColors/>
    </form>
  );
}

export default UploadForm;
