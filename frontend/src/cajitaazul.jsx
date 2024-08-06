import React from "react";
import { Fade, Bounce } from "react-awesome-reveal";

const d = new Date();
let time = d.getTime();

const hours = d.getHours();
const minutes = d.getMinutes();

const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;

export default function Cajitaazul(props){

    return(
        <div className="cajitachatAzul mx-1 space-x-3 font-['Source Sans Pro']">
            <Bounce>
            <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center my-12">
                <h1>{props.data.name.toUpperCase()[0]}</h1>
            </div>
            <div className="flex flex-col">
            <h1 className="text-white text-base font-semibold my-1">{props.data.name}</h1>
            <div className="texto-largo text-white bg-[#1d1648] py-2 px-5 rounded-md text-base font-normal leading-normal">
                {props.data.msg}
            </div>
            <div className=" text-gray-500 text-left font-sm mt-1">
            {formattedTime}
            </div>
            </div>
            </Bounce>
        </div>
    )
}