import { useState } from "react";
import github_b from "../assets/github_white.png";
// import github_w from "../assets/github_white.png";
import insta_b from "../assets/instagram_white.png";
// import insta_w from "../assets/instagram_white.png";
import in_b from "../assets/linkedin_white.png";
// import in_w from "../assets/linkedin_white.png";
import up_b from "../assets/upwork_white.png";
import axios from "axios";
// import up_w from "../assets/upwork_white.png";

export default function Footer() {
  const [email,setEmail]= useState("")
  const [comment,setComment]=useState('')
  const [success,setSuccess]=useState(false)
  const handelContact=async ()=>{
    const contactInfo={
      email,
      description:comment
    }
    try{
       const res= await axios.post("https://e-commerce-mern-stack-zeta.vercel.app/contact", contactInfo)
       if(res.data=="success") {
        setSuccess(true)
        setEmail("")
        setComment("")
        setTimeout(() => {
          setSuccess(false);
        }, 2000);

       }}
      catch(err){
        console.log(err)
      }
  }
  return (
    <footer className="relative w-screen  bg-white/40 pt-8 pb-6">
      <div className="container  mx-auto ">
        <div className="flex w-full items-center xl:flex-row justify-center flex-col xl:w-[80%] m-auto flex-wrap xl:justify-between text-left lg:text-left">
          <div className="xl:w-1/2 w-full px-4">
            <h4 className="text-3xl fonat-semibold text-slate-700">
              Let's keep in touch!
            </h4>
            {/* <h3 className="text-lg mt-0 mb-2 text-blueGray-600 font-semibold">
              {" "}
              This website is just made for a project and showcase my skills.
              This is not a real website
            </h3> */}
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find me on any of these platforms, i will respond asap.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button className="bg-gray-600 text-sky-100 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
                <img className="p-1 object-cover" src={in_b} alt="" />
              </button>
              <button
                className="bg-gray-600 text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <a href="https://www.instagram.com/binay._.shrestha/" target="blank">
                  {" "}
                  <img className="p-1 object-cover" src={insta_b} alt="" />
                </a>
              </button>
              <button
                className="bg-gray-600 text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              > <a href="https://github.com/BinayaShrestha556" target="blank">
                <img className="p-1 object-cover" src={github_b} alt="" /></a>
              </button>
              <button
                className="bg-gray-600 text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <a href="https://www.upwork.com/workwith/binayas5">
                <img className="p-1 object-cover" src={up_b} alt="" /></a>
              </button>
            </div>{" "}
          </div>
          <div className="flex gap-2  mt-5 -ml-1">

            <div className="flex flex-col gap-3">
              <input
                type="text"
                className="w-80 p-2 rounded-full"
                placeholder="email address"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <textarea
                name=""
                id=""
                className=" p-3 h-20 rounded-lg"
                placeholder="comment"
                onChange={(e)=>setComment(e.target.value)}
                value={comment}
              ></textarea>
              <button onClick={()=>handelContact()} className="py-2 px-4 text-white rounded h-fit bg-green-500">
                submit
              </button>{" "}
              {success? <p className="bg-green-500 self-center transition-all ease-in-out text-white w-52 p-2">success</p>:""}
            </div>
          </div>
       
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024 </span>
              
             
                Binaya Shrestha
              
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
