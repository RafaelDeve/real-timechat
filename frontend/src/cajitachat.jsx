import React from "react";
import { Fade, Bounce } from "react-awesome-reveal";

export default function Cajitachat(props){

const d = new Date();
let time = d.getTime();

const hours = d.getHours();
const minutes = d.getMinutes();

const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;
    return(
        <div className="cajitachat mx-[45rem] flex flex-col font-['Source Sans Pro']">
            <Bounce>
            <div className="texto-largo text-white bg-[#4629f2] py-2 px-5 rounded-md text-base font-normal leading-normal">
                {props.data.msg}
            </div>
            <div className=" text-gray-500 text-left font-sm mt-1">
            {formattedTime}
            </div>
            </Bounce>
        </div>
    )
}