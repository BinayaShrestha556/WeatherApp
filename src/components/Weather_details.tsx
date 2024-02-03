import direction from "../assets/location.png";
import humidity from "../assets/humidity.png";
import rain_ from "../assets/rainy.png";
import uv from "../assets/uv-protection.png";
import air from "../assets/wind-proof.png";

export default function Weather_details(props: any) {
  const date = new Date();
 

  const getDay = () => {
    const days=["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"]
    return days[date.getDay()]
    
  };
  return (
    <div className="w-full flex flex-col  text-white 700:w-[90%] m-auto flex-grow h-full justify-center">
      <div className="flex my-2 justify-around w-full">
        <div className="text-[90px] items-center 400:text-[90px] 600:text-[100px] 800:text-[130px] 1000:text-[120px] 1200:text-[140px] 1400:text-[164px]  font-[100] flex leading-none">
          <p className="flex items-start">
            {props.data.temp_c}
            <span className="900:text-xl 1200:text-2xl text-sm font-[400]">
              {" "}
              °C
            </span>
          </p>
        </div>
        
        <div className="ml-9 flex h-full justify-center items-center backdrop-blur-sm bg-white/10 p-3 rounded-xl">
         <p className="text-[35px]  items-center 400:text-[40px] max-w-[79%] leading-[90%] 600:text-[50px] 800:text-[60px] 1000:text-[70px] 1200:text-[75px] 1400:text-[80px]">{props.data.condition.text}</p>
         <div className=""><img className="" src={props.data.condition.icon} alt="" /></div>
        </div>
      </div>
      <div className="text-sm 500:text-lg 800:text-xl 1200:text-2xl flex gap-4 font-light">
        <div className="border-r pr-2  md:pr-4">
          <p>{`${date.getFullYear()}/${
            date.getMonth() + 1
          }/${date.getDate()}`}</p>
          <p>{`${getDay()} | ${date.getHours() + 1}:${
            date.getMinutes() + 1
          }`}</p>
        </div>
        <p className="text-xl">{props.data.condition.text}</p>
      </div>
      <div className="w-full backdrop-blur-sm bg-white/10 mt-10 p-4 [border-radius:-30px]">
      <div className="flex  mb-10 mt-3 text-lg 800:text-2xl 1200:text-3xl w-full justify-around sm:w-[80%] 1000:w-full m-auto  text-white ">
        <div className="">
          <div className="flex gap-2 items-center ">
            <img
              src={direction}
              style={{ transform: `rotate(${props.data.wind_degree - 42}deg)` }}
              alt=""
            />{" "}
            wind
          </div>
          <div className={`font-semibold  mt-2 `}>
            {props.data.wind_kph} kmph
          </div>
        </div>
        <div className=" w-[1px] bg-white"></div>
        <div className="">
          <div className="flex gap-2 items-center">
            <img src={humidity} className={""} alt="" /> humidity
          </div>
          <div className="font-semibold mt-2">{props.data.humidity}%</div>
        </div>
        <div className=" w-[1px] bg-white"></div>
        <div>
          <div className="flex gap-2 items-center">
            <img src={rain_} className={""} alt="" /> rain
          </div>
          <div className="font-semibold  mt-2">
            {props.data.precip_mm} mm
          </div>
        </div>
      </div>
      <div className="  text-white flex text-lg 800:text-2xl 1200:text-3xl  justify-center  ">
        <div className="sm:w-[60%] 1000:w-[90%] flex w-full justify-around">
          <div>
            <span className="flex gap-2 items-center">
              <img src={air} alt="" />
              Visibility
            </span>
            <p className="font-semibold mt-3">{props.data.vis_km}</p>
          </div>
          <div className=" w-[1px] bg-white"></div>
          <div>
            <span className="flex gap-2 items-center">
              <img src={uv} alt="" />
              UV index{" "}
            </span>
            <p className="font-semibold mt-3">{props.data.uv}</p>
          </div>
        </div>
      </div></div>
    </div>
  );
}
