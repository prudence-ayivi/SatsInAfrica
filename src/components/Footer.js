import React from 'react' 

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[85px] md:h-[70px] bg-zinc-100 font-sans">
    <p className="text-sm"> Copyright © 2024 - {new Date().getFullYear()} </p>
    <p className="text-sm mb-1 md:mt-1">Built with ❤️ by Prudence AYIVI</p>
    </div>
    
  )
}

export default Footer