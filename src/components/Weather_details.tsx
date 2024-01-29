import direction from "../assets/location.png";
import humidity from "../assets/humidity.png";
import rain_ from "../assets/rainy.png";
import uv from "../assets/uv-protection.png";
import air from "../assets/wind-proof.png";
import rain from "../assets/New folder/rain.png";
import snow from "../assets/New folder/snow.png";
import stars from "../assets/New folder/stars.png";
import thunder from "../assets/New folder/thunder.png";
import sun from "../assets/New folder/sun.png";
import cloud from "../assets/New folder/kisspng-portable-network-graphics-transparency-clip-art-im-8-bit-clouds-transparent-amp-png-clipart-free-do-5d036b54407214.248838691560505172264.png";

export default function Weather_details(props: any) {
  const date = new Date();
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

  const getDay = () => {
    switch (date.getDay() + 1) {
      case 1:
        return "sunday";

      case 2:
        return "monday";
      case 3:
        return "tuesday";
      case 4:
        return "wednesday";
      case 5:
        return "thrusday";
      case 6:
        return "friday";
      case 7:
        return "saturday";
    }
  };
  return (
    <div className="w-full flex flex-col -mt-10 text-white">
      <div className="flex justify-between w-full">
        <p className="text-[164px] font-[100] flex items-start leading-none">
          {props.data.temperature}
          <span className="text-xl font-[400]"> °C</span>
        </p>
        <div className="flex-grow flex h-fit justify-center">
          <img className="w-[50%] " src={getIcon(props.data.icon_num)} alt="" />
        </div>
      </div>
      <div className="text-xl flex gap-4 font-light">
        <div className="border-r pr-4">
          <p>{`${date.getFullYear()}/${
            date.getMonth() + 1
          }/${date.getDate()}`}</p>
          <p>{`${getDay()} | ${date.getHours() + 1}:${
            date.getMinutes() + 1
          }`}</p>
        </div>
        <p>{props.data.summary}</p>
      </div>
      <div className="flex my-16 w-[65%] justify-between text-xl text-white ">
        <div className="border-r pr-16">
          <div className="flex gap-2 items-center ">
            <img
              src={direction}
              style={{ transform: `rotate(${props.data.wind.angle - 42}deg)` }}
              alt=""
            />{" "}
            wind
          </div>
          <div className={`font-semibold text-2xl mt-3 `}>
            {props.data.wind.speed} kmph
          </div>
        </div>
        <div className="border-r pr-16 ">
          <div className="flex gap-2 items-center">
            <img src={humidity} className={""} alt="" /> humidity
          </div>
          <div className="font-semibold text-2xl mt-3">
            {props.data.humidity}%
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <img src={rain_} className={""} alt="" /> rain
          </div>
          <div className="font-semibold text-2xl mt-3">
            {props.data.precipitation.total} mm
          </div>
        </div>
      </div>
      <div className=" text-3xl text-white flex w-[65%] justify-between ">
        <div className="">
          <span className="flex gap-2 items-center">
            <img src={air} alt="" />
            Air Quality
          </span>
          <p className="font-semibold mt-3">{props.data.ozone}</p>
        </div>
        <div className=" w-[1px] bg-white"></div>
        <div>
          <span className="flex gap-2 items-center">
            <img src={uv} alt="" />
            UV index{" "}
          </span>
          <p className="font-semibold mt-3">{props.data.uv_index}</p>
        </div>
      </div>
    </div>
  );
}
