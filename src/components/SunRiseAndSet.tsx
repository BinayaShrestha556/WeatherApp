import { useEffect, useState } from "react";
import Clock from "./Clock";
import axios from "axios";
import data from "./json.json";
import rain from "../assets/New folder/rain.png";
import snow from "../assets/New folder/snow.png";
import stars from "../assets/New folder/stars.png";
import thunder from "../assets/New folder/thunder.png";
import sun from "../assets/New folder/sun.png";
import cloud from "../assets/New folder/kisspng-portable-network-graphics-transparency-clip-art-im-8-bit-clouds-transparent-amp-png-clipart-free-do-5d036b54407214.248838691560505172264.png";
import {RapidApiKey} from './apis'
export default function SunRiseAndSet(props: any) {
  const [dailyData,setDailyData]=useState(data)
  const [sunRiseSet, setSunRiseSet] = useState({ sunrise: "", sunset: "",golden:"" });

  useEffect(() => {
    axios
      .get(
        `https://api.sunrisesunset.io/json?lat=${props.lat}&lng=${props.lon}`
      )
      .then((res) => res.data)
      .then((data) => {
        setSunRiseSet({
          sunrise: data.results.sunrise,
          sunset: data.results.sunset,
          golden:data.results.golden_hour
        });
      })
      .then(() => console.log(sunRiseSet));

    const options = {

      method: 'GET',
      url: 'https://ai-weather-by-meteosource.p.rapidapi.com/daily',
      params: {
        lat: '37.81021',
        lon: '-122.42282',
        timezone: 'auto',
        language: 'en',
        units: 'auto'
      },
      headers: {
        'X-RapidAPI-Key': RapidApiKey,//rapid api apikey here
        'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
      }
    };
    try {
      const request=async ()=>{
       const res= await axios.request(options)
       setDailyData(res.data.daily.data)
       console.log(dailyData)
      }
      request();

    } catch (error) {
      console.error(error);
    }
  }, [props]);
  function extractDate(inputDateString: string) {
    const dateObject = new Date(inputDateString);
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = dateObject.getDate().toString().padStart(2, "0");
    return `${month}/${day}`;
  }
  const getIcon = (icon: number) => {
    switch (icon) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return sun;
      case 6:
      case 7:
      case 8:
      case 9:
      case 29:
      case 30:
      case 31:
        return cloud;
      case 10:
      case 11:
      case 12:
      case 13:

      case 32:
      case 34:
        return rain;
      case 14:
      case 15:
      case 33:
        return thunder;
      case 16:
      case 17:
      case 18:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
      case 35:
      case 36:
        return snow;
      case 26:
      case 27:
      case 28:
        return stars;

      default:
        return sun;
    }
  };
  const separateTime=(time:string)=>{
      const parts = time.split(":")
      return parts
  }
  return (
    <div className="w-full p-5 text-white flex flex-col items-center justify-around h-full">
      <div className="flex items-end gap-8">
        <div>
          <p className="text-2xl text-center my-3 font-light">SUNRISE</p>
          <div
            className="w-24 h-44 bg-purple-200/40 border border-white rounded-full 
 flex-col flex items-center"
          >
            <Clock hour={parseInt(separateTime(sunRiseSet.sunrise)[0])} minute={parseInt(separateTime(sunRiseSet.sunrise)[1])} second={parseInt(separateTime(sunRiseSet.sunrise)[2])} />
            <p className=" mt-5 text-xl">{separateTime(sunRiseSet.sunrise)[0]}:{separateTime(sunRiseSet.sunrise)[1]} AM</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl text-center  my-3 font-light">GOLDEN HOUR</p>
          <div className=" overflow-hidden">
            <div className="w-32 bg-purple-200/40  border border-white  rounded-full flex-col flex items-center">
              <Clock hour={parseInt(separateTime(sunRiseSet.golden)[0])} minute={parseInt(separateTime(sunRiseSet.golden)[1])} second={parseInt(separateTime(sunRiseSet.golden)[2])} />
              <p className="py-9 text-2xl px-3">{separateTime(sunRiseSet.golden)[0]}:{separateTime(sunRiseSet.golden)[1]} PM</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-2xl text-center  my-3 font-light">SUNSET</p>
          <div className="rounded-full overflow-hidden">
            <div className="w-24 h-44 bg-purple-200/40  border border-white  rounded-full flex-col flex items-center">
              <Clock hour={parseInt(separateTime(sunRiseSet.sunset)[0])} minute={parseInt(separateTime(sunRiseSet.sunset)[1])} second={parseInt(separateTime(sunRiseSet.sunset)[2])} />
              <p className="mt-5 text-xl">{separateTime(sunRiseSet.sunset)[0]}:{separateTime(sunRiseSet.sunset)[1]} PM</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0.5 w-9/12 m-auto bg-white"></div>
      <div className="grid grid-cols-4 gap-4">
        {dailyData.slice(0, 8).map((e: any,i:number) => (
          <div key={i} className="bg-blue-400/10 h-40 border-white border  w-28 text-sm flex flex-col items-center rounded-lg justify-around">
            <p>
              {Math.floor((e.temperature_min-32)*(5/9))}°C | {Math.ceil((e.temperature_max-32)*(5/9))}°C
            </p>
            <div className=" w-16 ">
              {" "}
              <img src={getIcon(e.icon)} alt="" />
            </div>
            <p>{extractDate(e.day)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
