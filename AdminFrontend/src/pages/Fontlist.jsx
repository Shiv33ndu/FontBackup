import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bwotf from '../assets/bw-otf.png';
import bwttf from '../assets/bw-ttf.png';
import bwoff from '../assets/bw-woff.png';

function Fontlist() {

    const [fontList, setFontList] = useState([]);

    const url = 'http://localhost:5001/api/v1/fonts/list';

    useEffect(() => {
        axios.get(url)
        .then(res => {
            console.log('Res::',res.data);
            setFontList(res.data);
        })
        .catch(error => {
            console.error('Error fetching fonts:', error);    
        })
    },[])


    const handleDownload = async (fontFileId) => {
      try {
        const response = await axios.get(`http://localhost:5001/api/v1/fonts/${fontFileId}/download`, {
          responseType: 'blob',
        });
        
        // Check if the response contains the filename in the headers
        const fileName = response.headers['x-filename'] || 'Font';
        

        console.log(fileName);
        
        // Create a URL for the blob and initiate download
        const blob = new Blob([response.data], { type: response.data.type });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Clean up the URL
      } catch (error) {
        console.error('Error downloading font:', error);
      }
    };
  
    const handleDelete = async (fontId) => {
      try {
        await axios.delete(`http://localhost:5001/api/v1/fonts/${fontId}/delete`);
        // Remove the deleted font from the state
        setFontList(fontList.filter(font => font._id !== fontId));
      } catch (error) {
        console.error('Error deleting font:', error);
      }
    };

  return (
    <div>
      <div className="w-full">
        <div className='w-full max-w-4xl mx-auto mt-5'>
          <table className="w-full border border-gray-300/40">
            <thead className='bg-[#fc4f1a]'>
              <tr>
                <th className='font-semibold text-white'>Fontname</th>
                <th className='font-semibold text-white'>Uploaded at</th>
                <th className='font-semibold text-white'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fontList.map((font) => (
                <tr key={font._id} className="text-center">
                  <td className='flex items-center p-6'>
                    {font.fileType.toLowerCase() === 'ttf' ? 
                    <img className='w-16 h-16' src={bwttf} alt='ttf' />
                    :
                    ''
                    }
                    {font.fileType.toLowerCase() === 'otf' ? 
                    <img className='w-16 h-16' src={bwotf} alt='otf' />
                    :
                    ''
                    }
                    {font.fileType.toLowerCase() === 'woff' ? 
                    <img className='w-16 h-16' src={bwoff} alt='woff' />
                    :
                    ''
                    }
                    <p className='font-semibold font-sans'>{font.name}</p>
                  </td>
                  <td>
                    <p className='font-semibold font-sans'>
                      {new Date(font.uploadDate).toLocaleString()}
                    </p>
                  </td>
                  <td className='space-x-6'>
                    <button onClick={() => handleDownload(font._id)}>
                      Download
                    </button>
                    <button onClick={() => handleDelete(font._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Fontlist