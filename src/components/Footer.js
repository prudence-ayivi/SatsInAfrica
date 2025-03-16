import React from 'react' 

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around items-center w-full h-[85px] md:h-[70px] bg-zinc-100 font-sans">
    <p className="my-1 text-[10px] md:text-sm">The data used on this site have been sourced from <br/> Space in Africa, 
    SpaceHubs Africa and In The Sky</p>
    <div>
    <p className="text-sm"> Copyright © {new Date().getFullYear()} </p>
    <p className="text-sm mb-1 md:mt-1">Built with ❤️ by Prudence AYIVI</p>
    </div>
    </div>
    
  )
}

export default Footer