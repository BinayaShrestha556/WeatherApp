import { useEffect, useState } from "react";
import Clock from "./Clock";
import axios from "axios";


export default function SunRiseAndSet(props: any) {

  const [sunRiseSet, setSunRiseSet] = useState({ sunrise: "12:00", sunset: "8:00",golden:"5:00" });

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
  }, [props]);

  
  const separateTime=(time:string)=>{
      const parts = time.split(":")
      return parts
  }
  return (
    <div className="w-full p-5 text-white flex flex-col 800:flex-row 1000:flex-col items-center justify-around h-full">
      <div className="flex mt-9 items-end gap-2">
        <div>
          <p className="text-xl text-center my-3 font-light">SUNRISE</p>
          <div
            className="w-[6rem] h-44 bg-purple-200/40 border border-white rounded-full 
 flex-col flex items-center"
          >
            <Clock hour={parseInt(separateTime(sunRiseSet.sunrise)[0])} minute={parseInt(separateTime(sunRiseSet.sunrise)[1])} second={parseInt(separateTime(sunRiseSet.sunrise)[2])} />
            <p className=" mt-5 text-xl">{separateTime(sunRiseSet.sunrise)[0]}:{separateTime(sunRiseSet.sunrise)[1]} AM</p>
          </div>
        </div>
        <div className="mb-10 flex flex-col justify-center items-center">
        
          <p className="text-xl text-nowrap text-center  my-3 font-light">GOLDEN HOUR</p>
          <div className="rounded-full overflow-hidden">
            <div className="w-[8rem] h-52 bg-purple-200/40  border border-white  rounded-full flex-col flex items-center">
              <Clock hour={parseInt(separateTime(sunRiseSet.golden)[0])} minute={parseInt(separateTime(sunRiseSet.golden)[1])} second={parseInt(separateTime(sunRiseSet.golden)[2])} />
              <p className="mt-5 text-xl">{separateTime(sunRiseSet.sunset)[0]}:{separateTime(sunRiseSet.sunset)[1]} PM</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xl text-center  my-3 font-light">SUNSET</p>
          <div className="rounded-full overflow-hidden">
            <div className="w-[6rem] h-44 bg-purple-200/40  border border-white  rounded-full flex-col flex items-center">
              <Clock hour={parseInt(separateTime(sunRiseSet.sunset)[0])} minute={parseInt(separateTime(sunRiseSet.sunset)[1])} second={parseInt(separateTime(sunRiseSet.sunset)[2])} />
              <p className="mt-5 text-xl">{separateTime(sunRiseSet.sunset)[0]}:{separateTime(sunRiseSet.sunset)[1]} PM</p>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  );
}
