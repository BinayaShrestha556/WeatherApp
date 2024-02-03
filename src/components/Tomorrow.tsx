
export default function Tomorrow( {max,min,day,icon,status,avg,humidity,rain=0}:{max:number,min:number,day:string|undefined,icon:string,status:string,avg:number,humidity:number,rain:number}) {
  return (
    <div className="w-[40%] my-10 h-80 p-3 flex flex-col justify-between text-white bg-white/10 rounded-xl">
      <p className="text-2xl font-light text-white">{day}</p>
      <div className="w-full  flex-col flex justify-center items-center">
        <img src={icon} alt="" />
        <p className="text-xl font-semibold">{status}</p>
      </div>
      <div className=" font-semibold flex flex-col gap-1.5">
      <div><span className="">Max. Temp: </span><span className="font-light">{max}</span></div>
      <div><span className="">Min. Temp: </span><span className="font-light">{min}</span></div>
      <div><span className="">Avg. Temp: </span><span className="font-light">{avg}</span></div>
      <div><span>Humidity:</span><span className="font-light">{humidity}</span></div>
      <div><span>rain prob :</span><span className="font-light">{rain}</span></div>
      </div>

    </div>
  )
}
