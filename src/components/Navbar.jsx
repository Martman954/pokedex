import React from 'react'
import { Link } from "react-router"
const Navbar = () => {
  return (
    <nav className="fixed top-0 z-10 w-full border-b border-b-gray-700 bg-black/70 
                    px-16 flex items-center h-16 text-white backdrop-blur-md">
        <div className='flex flex-row gap-20 justify-center w-full'>
          <Link to="/?Page=1" className="mx-auto block sm:mx-0 sm:shrink-0 opacity-80 transition-all
                      duration-300 hover:opacity-100">Home</Link>
          <Link to="/About" className="mx-auto block sm:mx-0 sm:shrink-0 opacity-80 transition-all
                      duration-300 hover:opacity-100">About</Link>
        </div>
    </nav>
  )
}

export default Navbar