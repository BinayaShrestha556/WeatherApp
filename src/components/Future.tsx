import { useEffect,useState } from "react";
import Tomorrow from "./Tomorrow";
import axios from 'axios'
import json from './example weather json.json'



export default function Future({lon,lat}:{lon:number,lat:number}) {
    const [data,setData]=useState<any>(json)
  const RapidApiKey=import.meta.env.VITE_REACT_RAPID_API_KEY;

   
    const getDate=(data:string)=>{
        const date=new Date(data)
      const days=["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"]
      return days[date.getDay()]
    }
    useEffect(()=>{
  
   
        const fetch1=async()=>{
            
            const options = {
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
                params: {
                  q: `${lat},${lon}`,
                  days: '3'
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
                  
              }
        }
fetch1();
    },[lon,lat])
  return (
    <div className="flex gap-4 items-center justify-center">
    
      <Tomorrow max={data.forecast.forecastday[1].day.maxtemp_c} min={data.forecast.forecastday[1].day.mintemp_c} day="tomorrow" avg={data.forecast.forecastday[1].day.avgtemp_c} humidity={data.forecast.forecastday[1].day.avghumidity} icon={data.forecast.forecastday[1].day.condition.icon} rain={data.forecast.forecastday[1].day.daily_chance_of_rain} status={data.forecast.forecastday[1].day.condition.text} />

      <Tomorrow max={data.forecast.forecastday[2].day.maxtemp_c} min={data.forecast.forecastday[2].day.mintemp_c} day={getDate(data.forecast.forecastday[2].date)} avg={data.forecast.forecastday[2].day.avgtemp_c} humidity={data.forecast.forecastday[2].day.avghumidity} icon={data.forecast.forecastday[2].day.condition.icon} rain={data.forecast.forecastday[2].day.daily_chance_of_rain} status={data.forecast.forecastday[2].day.condition.text} />


    </div>
  )
}
