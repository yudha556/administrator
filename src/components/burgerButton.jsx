// components/BurgerButton.js
import React from 'react';

const BurgerButton = ({ isOpen, onClick }) => {
  return (
    <button className="flex flex-col justify-between w-7 h-5" onClick={onClick}>
      <span
        className={`block h-1 bg-black rounded transition-all duration-300 ease-in-out ${
          isOpen ? 'rotate-45 translate-y-2 w-full' : 'w-full'
        }`}
      ></span>
      <span
        className={`block h-1 bg-black rounded transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-0' : 'w-4'
        } hover:w-full`}
      ></span>
      <span
        className={`block h-1 bg-black rounded transition-all duration-300 ease-in-out ${
          isOpen ? '-rotate-45 -translate-y-2 w-full' : 'w-full'
        }`}
      ></span>
    </button>
  );
};

export default BurgerButton;
