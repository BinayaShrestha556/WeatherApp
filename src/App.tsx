import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SunRiseAndSet from "./components/SunRiseAndSet";
import Weather_details from "./components/Weather_details";
import axios from "axios";
import Footer from "./components/Footer";
import {RapidApiKey} from './components/apis'

export default function App() {
  const [location, setLocation] = useState({ lat:0, lon:0 });
  const [data, setData] = useState(  {
    lat: "37.81021N",
    lon: "122.42282W",
    levation: 0,
    timezone: "America/Los_Angeles",
    units: "us",
    current: {
    icon: "mostly_cloudy",
      icon_num: 29,
      summary: "Mostly cloudy",
      temperature: 50.6,
      feels_like: 47,
      wind_chill: 47,
      dew_point: 46.1,
      wind: {
        speed: 5.2,
        gusts: 10.7,
        angle: 267,
        dir: "W"
      },
      precipitation: {
        total: 0,
        type: "none"
      },
      cloud_cover: 65,
      ozone: 338.49,
      pressure: 30.17,
      uv_index: 0,
      humidity: 89,
      visibility: 15
    }
  });
  const getLocationByIp = async () => {
    const res = await axios.get("https://ipapi.co/json/");
    setLocation({ lat: res.data.latitude, lon: res.data.longitude });
  };

  const fetchDataWithLocation = async (lat: number, lon: number) => {
    const options = {
      method: "GET",
      url: "https://ai-weather-by-meteosource.p.rapidapi.com/current",
      params: {
        lat: lat.toString(),
        lon: lon.toString(),
        timezone: "auto",
        language: "en",
        units: "auto",
      },
      headers: {
        "X-RapidAPI-Key": RapidApiKey, ////rapid api key here
        "X-RapidAPI-Host": "ai-weather-by-meteosource.p.rapidapi.com",
      },
    };

    try {
      const res = await axios.request(options);
      setData(res.data);
      setLocation({lat:lat,lon:lon})
      console.log(lat,lon)
     
    } catch (error) {
      console.error(error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Set the position
          await setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          // console.log(location);
          // Call the function with lat and lon
          await fetchDataWithLocation(
            position.coords.latitude,
            position.coords.longitude
          );
          // console.log("location from geo");
        },
        async (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Location permission not granted");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Cannot get location info");
              break;
            case error.TIMEOUT:
              alert("Timed out");
              break;
            default:
              alert("Unknown error occurred");
              break;
          }
          await getLocationByIp();
          await fetchDataWithLocation(location.lat, location.lon);
          // console.log("from ip");
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
    console.log(data.current)
  }, []); // Empty dependency array to run only once

  // Rest of your component

  return (
    <div className=" w-full  bg-gradient-to-tr to-[#9F025E] from-[#F9C929]">
    <div className=" w-full m-auto flex h-screen font-inter ">
      <div className="w-[60%] ">
        <div>
          <Navbar lat={location.lat} lon={location.lon} call={fetchDataWithLocation}/>
        </div>
        <div className="flex-col flex -mt-12 justify-center px-10 h-full ">
          <div>
            <Weather_details data={data.current} />
          </div>
        </div>
      </div>
      <div className="flex-col flex flex-grow backdrop-blur-sm bg-white/25">
        <SunRiseAndSet  lat={location.lat} lon={location.lon}/>
      </div>
    </div>
    <div className="w-full m-auto overflow-hidden">
      <Footer/>

    </div>
    </div>
  );
}
