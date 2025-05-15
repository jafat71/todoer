/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const PrimaryButton = ({ icon, text, link }) => {
  return (
    <div>
      <Link to={link} 
        className="bg-gradient-to-r from-f2green/80 to-voidBlack text-white
        flex flex-row items-center justify-center
        px-4 py-1.5 sm:px-6 sm:py-2
        hover:bg-f2green/80 
        transition-all duration-300
        text-xs sm:text-sm 
        rounded-full shadow-lg shadow-f2green/70
        whitespace-nowrap gap-x-2 z-30 cursor-pointer
        "  
      >{icon} {text}</Link>
    </div>
  )
}

export default PrimaryButton
