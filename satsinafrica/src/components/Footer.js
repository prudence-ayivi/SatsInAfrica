import React from 'react' 

const Footer = () => {
  return (
    <div className="flex flex-row justify-center items-center w-full h-[70px] bg-zinc-100 ">
    <p> Copyright © {new Date().getFullYear()} </p>
    <p className="ml-2">Built with ❤️ by Sirius Space Association Team</p>
    </div>
    
  )
}

export default Footer