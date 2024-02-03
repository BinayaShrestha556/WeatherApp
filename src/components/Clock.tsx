

export default function Clock({hour=180,minute=180,second=180}) {
  // const [second,setSeconds]=useState(180)
 

  

 
  return (
    <div className={ `aspect-square w-full`}>
      <div className={`rounded-full   h-full w-full aspect-square  flex items-center justify-center`}>
        <div style={{ transform: `translateY(50%)   rotate(${second*6+180}deg)`}}  className="h-[48%] relative    transform origin-top-right w-[1px] bg-gray-500"></div>
        <div style={{ transform: `translateY(49.5%)   rotate(${minute*6+180}deg)`}} className={`h-[35%] relative    transform origin-top-right w-[2px] bg-gray-800`}></div>
        <div style={{ transform: `translateY(49%)  rotate(${hour*30+180}deg)`}} className={`h-[25%] relative   transform origin-top-right w-[3px] bg-white`}></div>
        <div  className={`w-[8px]  absolute rounded-full aspect-square bg-white`}></div>

     

      </div>

    </div>
  )
}
