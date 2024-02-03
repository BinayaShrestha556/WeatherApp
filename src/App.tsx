import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SunRiseAndSet from "./components/SunRiseAndSet";
import Weather_details from "./components/Weather_details";
import axios from "axios";
import Footer from "./components/Footer";
import { RapidApiKey } from "./components/apis";
import example1 from './components/json.json'
import Future from "./components/Future";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [data, setData] = useState<any>(example1);

  const getLocation = () => {
    return new Promise<void>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const getLocationByIp = async () => {
    const res = await axios.get("https://ipapi.co/json/");
    setLocation({ lat: res.data.latitude, lon: res.data.longitude });
  };

  const fetchDataWithLocation = async (lat: number, lon: number) => {
    setLoading(true);

    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: {
        q: `${lat},${lon}`
      },
      headers: {
        'X-RapidAPI-Key': RapidApiKey,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchDataWithLocationName = async (city:string) => {
    setLoading(true);

    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: {
        q: city
      },
      headers: {
        'X-RapidAPI-Key': 'fe17bbd52dmsh0ef40c9932ec78bp1f91ebjsn15c9199f0ba8',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        await getLocation();
      } catch (error:any) {
        console.error("Error obtaining location:", error.message);
        // Handle errors or fallback to IP-based location
        await getLocationByIp();
      }
    };

    initializeLocation();
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    const fetchWeatherData = async () => {
      // Add a delay before fetching data to ensure that the location is set properly
      setTimeout(async () => {
        await fetchDataWithLocation(location.lat, location.lon);
      }, 1000); // Adjust the delay as needed
    };

    if (location.lat !== 0 && location.lon !== 0) {
      fetchWeatherData();
    }
  }, [location]); // Run when 'location' changes
// Run when 'data' changes
  return (
    <div className=" w-full  bg-gradient-to-tr to-[#9F025E] from-[#F9C929]">
      <div className=" w-full m-auto flex flex-col 1000:flex-row 1000:h-screen h-fit font-inter ">
        <div className="w-full 1000:w-[60%] flex flex-col h-[80vh] 1000:h-screen">
          <div className="relative top-0 left-0 right-0">
            <Navbar name={data.location.name} call={fetchDataWithLocationName}/>
          </div>
          <div className="flex-col flex flex-grow p-3 justify-center ">
            <div className="h-full"> {loading?<div className="w-full h-full flex justify-center items-center"><div className="h-20 w-20 bg-white animate-ping duration-100 transition-all ease-in-out"></div></div>:
            <Weather_details data={data.current} />}
          </div>
          </div>
        </div>
        <div className="flex-col w-full flex  1000:w-[40%] backdrop-blur-sm bg-white/15">
          <SunRiseAndSet  lat={location.lat} lon={location.lon}/>
          <Future lat={data.location.lat} lon={data.location.lon}/>
        </div>
      </div>
      <div className="w-full m-auto overflow-hidden">
        <Footer />
      </div>
    </div>
  );
}
