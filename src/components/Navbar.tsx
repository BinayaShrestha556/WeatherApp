import { useEffect, useState } from "react";
import locationIcon from "../assets/icons8-location-50.png";
import search from "../assets/icons8-search-50 (1).png";
import axios from "axios";
import {OpenWeatherMapApi} from './apis'
export default function Navbar(props: any) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [city, setCity] = useState("");
  const [name, setName] = useState("name");
  const [coords, setCoords] = useState({ lat: 0, lon: 0 });
  const APIkey =OpenWeatherMapApi//your openweathermap api here
  const  getName=async()=>{
    axios
    .get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${props.lat}&lon=${props.lon}&limit=1&appid=${APIkey}`
    )
    .then((res) => setName(res.data[0].name));
  }
  useEffect(() => {
    // console.log(props)
    getName()
   
  }, [props,coords]);
  const searchCity = async () => {
    if (city) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`
        );
        const res = response.data;
  
        if (res.length > 0) {
          const newCoords = { lat: res[0].lat, lon: res[0].lon };
          setCoords(newCoords);
  
          // Wait for the state changes to be applied before calling props.call
          await new Promise(resolve => setTimeout(resolve, 0));
  
          console.log(newCoords);
          await props.call(newCoords.lat, newCoords.lon);
          setCity("");
          await getName();
        } else {
          // Handle case when no results are found
          console.error("No results found for the provided city.");
        }
      } catch (error) {
        // Handle errors from the API request
        console.error("Error fetching data:", error);
      }
    }
  };


  return (
    <div className="flex w-full justify-between items-center px-4 py-3 text-white">
      <div className="flex items-center ">
        <img src={locationIcon} alt="location Icon" className="w-9" />
        <h1 className="text-5xl">{name}</h1>
      </div>
      <div className="flex gap-2 items-center ">
        <input
        onClick={() => setSearchOpen((current) => (current ? false : true))}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={`
           w-52 bg-white/30
         text-white transition-all  ease-in-out duration-150 py-2.5 px-2 rounded-full outline-0`}
        />
        <button
          onClick={()=>searchCity()}
          className={`p-2 ${
            searchOpen ? "rounded-full" : "rounded-xl"
          } transition-all  ease-in-out duration-150    bg-gradient-to-tl from-gray-400/60 to-gray-200/60 `}
        >
          <img className="w-7" src={search} alt="" />
        </button>
      </div>
    </div>
  );
}
