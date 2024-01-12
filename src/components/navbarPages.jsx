import React from 'react'
import arrow from "../assets/image/icon/left.png"
import {useNavigate} from "react-router-dom";


export const NavbarPages = ({title,url}) => {
    let navigate = useNavigate();
    return (
        <div className="w-full flex justify-between items-center bd-10 green-low-clr-bg p-4 mb-3">
            <div className="font-bold">
                {title}
            </div>
            <div onClick={()=>{
                navigate(url)
            }}>
                <img src={arrow} width={"20px"} alt="icon"/>
            </div>
        </div>
    )
}
