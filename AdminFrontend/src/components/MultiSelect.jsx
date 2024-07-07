import React, { useState, useRef, useEffect } from 'react';

const MultiSelect = ({ 
    options = [], 
    onChange,
    inputName = '',
    labelName = '', 
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const inputRef = useRef(null);

  const handleOptionClick = (value) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== value));
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = selectedItems.join(', ');
    }
    if (onChange) {
      onChange(selectedItems.join(', '));
    }
  }, [selectedItems, onChange]);

  return (
    <div className="w-full mt-10 mb-10">
      <div className="relative z-0 w-full mb-5 group">    
        <input
          type="text"
          name={inputName}
          id={inputName}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  dark:focus:border-[#FC4F1A] focus:outline-none focus:ring-0  focus:border-[#FC4F1A] peer"
          placeholder=" "
          ref={inputRef}
          readOnly
          required
        />
        <label
          htmlFor={inputName}
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-focus:text-black  peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {labelName}
        </label>  

        <div className="max-w-xl h-28 mt-4 overflow-y-scroll group transition-all duration-300 shadow-sm shadow-black/30">
          {options.map(option => (
            <div
              key={option}
              className=""
              onClick={() => handleOptionClick(option)}
            >
              
              <p className='px-2 py-1 font-sans cursor-pointer text-md hover:bg-orange-300/30 '>{option}</p>
              {/* <div className='w-full h-[1px] bg-gray-500/10 group-hover:hidden'></div> */}
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
