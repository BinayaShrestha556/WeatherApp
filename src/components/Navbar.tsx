
import locationIcon from "../assets/icons8-location-50.png";
import search from "../assets/icons8-search-50 (1).png";
import {useState} from 'react'

export default function Navbar(props: any) {
  // const [searchOpen, setSearchOpen] = useState(false);
  const [city, setCity] = useState("");

  
 
 
  

  return (
    <div className="flex w-full gap-2 500:px-5 700:w-[90%] 1400:w-[90%] 1000:w-full m-auto items-center overflow-hidden py-3 text-white">
      <div className="flex absolute left-3 top-3 items-center ">
        <img src={locationIcon} alt="location Icon" className="w-7" />
        <h1 className="text-3xl 600:text-5xl">{props.name}</h1>
      </div>
      <div className="flex gap-2 absolute right-3  top-3  items-center ">
        <div className="w-64 flex justify-end">
        <input
        
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={`
           w-24 bg-white/30 focus:bg-white focus:w-64 relative 
         text-black transition-all right-0 ease-in-out duration-150 py-2.5 700:text-xl  px-2 rounded-full outline-0`}
        /></div>
        
      <div
          onClick={()=>{props.call(city),setCity("")}}
          className={`px-2 py2 relative right-0 700:w-12 h-10 700:h-12 rounded-xl  flex items-center justify-center   bg-gradient-to-tl from-gray-400/60 to-gray-200/60 `}
        >
          <img className="w-7" src={search} alt="" />
        </div></div>
    </div>
  );
}
