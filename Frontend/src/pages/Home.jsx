import React, { useEffect, useState } from 'react';
import { manipulationIcons } from '../data/iconFile';
import search from '../assets/search.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import FontCard from '../components/FontCard';
import download from '../assets/direct-download.png';
import wshlstStroke from '../assets/wishlist-stroke.png';
import wshlst from '../assets/wishlist.png';

import ShareComp from '@/components/ShareComp';

function Home() {
  const [searchFont, setSearchFont] = useState('');
  const [fontList, setFontList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Start page count from 1
  const [pageInput, setPageInput] = useState(currentPage);

  const fontsPerPage = 6;

  const url = 'http://localhost:5001/api/v1/fonts/fonts-list';

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setFontList(res.data);
        setCopiedFontList(res.data);
      })
      .catch(error => {
        console.error('Error fetching fonts:', error);
      });
  }, []);

  // Array Shuffling method
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  // Copying the original FontList array to perform shuffling upon
  const [copiedFontList, setCopiedFontList] = useState(fontList);

  const handleToolEvent = (item) => {
    if (item === 'shuffleFonts') {
      setCopiedFontList((prevData) => {
        const newData = [...prevData];
        return shuffleArray(newData);
      });
    } else if (item === 'resetSize') {
      setFontSize(30);
    }
  };

  // Wishlisting logic
  const handleWishlistToggle = (fontId) => {
    setWishlist(prevWishlist => ({
      ...prevWishlist,
      [fontId]: !prevWishlist[fontId]
    }));
  };

  // Pagination logic
  const indexOfLastFont = currentPage * fontsPerPage;
  const indexOfFirstFont = indexOfLastFont - fontsPerPage;
  const currentFonts = copiedFontList.slice(indexOfFirstFont, indexOfLastFont);

  const handleNextPage = () => {
    if (indexOfLastFont < copiedFontList.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPageInput(value);
    }else{
      alert('Please enter valid numbers!')
    }
  };

  const handlePageInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const page = parseInt(pageInput);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      } else {
        setCurrentPage(currentPage);
        alert(`Please enter a valid page number between 1 and ${totalPages}`);
      }
    }
  };

  useEffect(() => {
    setPageInput(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(copiedFontList.length / fontsPerPage);


  if (!fontList.length) return <Loader />;
  else return (
    <div id="landingPageContainer" className="w-full flex-row items-center justify-center mb-36 hide-scrollbar">
      {/* Toolbar Starts*/}
      <div id='toolbar' className='w-full flex justify-between items-center px-56 mt-5'>
        <div className='w-64 rounded-full bg-[#b2b2b2] flex items-center px-6'>
          <img
            className='w-6 h-6'
            src={search} alt="search" />
          <input
            type="search" name="searchFont"
            value={searchFont}
            onChange={(e) => setSearchFont(e.currentTarget.value)}
            placeholder='Search your font here...'
            className='outline-none placeholder:text-white placeholder:text-sm placeholder:font-monsterrat bg-transparent px-1 py-1'
          />
        </div>

        <div id='manipulationTools' className='w-44 flex items-center justify-between'>
          {manipulationIcons.map(item => (
            <div key={item.name} className='w-8'>
              <button onClick={() => handleToolEvent(item.name)}>
                <img
                  className='w-7 h-7 object-contain'
                  src={item.icon} alt='whishlistFonts' />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Toolbar Ends */}

      <div className='w-full h-0 border-dashed border-b-2 border-[#B2B2B2] mt-8 mb-10'></div>

      {/* Font Listing Starts */}
      <div id='FontListingDiv' className='w-full flex-col justify-center items-center mt-5 transition-all duration-300'>
        <div className='max-w-4xl w-full mx-auto flex-col justify-center items-center space-y-10'>
          {currentFonts.length ? currentFonts.map(item => item.specialTag === "" ? (
            <div key={item?._id} className='relative'>
              <Link to={`/fonts/${item?.name}/${item?._id}`} state={{ Font: item }} className='block'>
                <FontCard item={item} />
              </Link>
              <button
                onClick={(e) => e.stopPropagation()}
                className='absolute top-4 right-3 bg-transparent hover:scale-105'>
                <img
                  className='w-8 h-8 object-contain'
                  src={download} alt="downloadFont" />
              </button>
              <div className='absolute top-[70px] right-[12px] bg-transparent hover:scale-105'>
                <button onClick={() => handleWishlistToggle(item?._id)}>
                  <img
                    className='w-8 h-8 object-contain'
                    src={wishlist[item?._id] ? wshlst : wshlstStroke} alt="FontWishlist" />
                </button>
              </div>

              <ShareComp link={`fonts/${item?.name}/${item?._id}`} />             

            </div>
          ) : '')
            :
            ''
          }
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="w-full max-w-6xl flex justify-end items-center mt-5">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-1 mx-2 rounded-lg ${currentPage === 1 ? 'bg-orange-700/60' : 'bg-[#fc4f1a]'} text-white rounded`}>
          Prev
        </button>
        <input 
        className='w-10 outline-none border-2 border-black/70 font-monsterrat font-semibold text-center text-gray-600 rounded-lg'
        type="text" value={pageInput} onChange={handlePageInputChange} onKeyDown={handlePageInputKeyDown} />
        <p className='font-monsterrat font-semibold text-center text-gray-600 ml-2'>of {totalPages}</p>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastFont >= copiedFontList.length}
          className={`px-4 py-1 mx-2 rounded-lg ${indexOfLastFont >= copiedFontList.length ? 'bg-gray-400' : 'bg-black'} text-white rounded`}>
          Next
        </button>
      </div>

      {/* Font listing Ends */}
    </div>
  );
}

export default Home;
