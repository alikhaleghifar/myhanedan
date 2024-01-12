import React from 'react'
import HeaderHome from "../components/headerHome";
import trackerTransportationImg from "../assets/image/icon/tracker.png"
import rezerv from "../assets/image/icon/booking.png"
import payment from "../assets/image/icon/credit-card.png"
import nerkh from "../assets/image/icon/bus-ticket.png"
import events from "../assets/image/icon/event.png"
import time from "../assets/image/icon/timeline.png"
import pedometer from "../assets/image/icon/pedometer.png"
import info from "../assets/image/icon/file.png"
import point from "../assets/image/icon/point.png"
import {useNavigate} from "react-router-dom";
import {UsePoints} from "./usePoints";


export const Home = () => {
    let navigate = useNavigate();

    return (
        <>

            <main className="w-full flex justify-center">
                <div className="max-w-container w-full">
                    <HeaderHome/>


                    <section className="flex flex-col mt-20">
                        <div className="w-full flex">
                            <div className="flex flex-col w-full  m-2 p-2 items-center green-low-clr-bg bd-10"
                                 onClick={() => {
                                     navigate("/PlanReservationCarsList")
                                 }}>
                                <img src={rezerv} width={"50px"} alt="icon"/>
                                <p className="m-2">
                                    رزرو طرح
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex">
                            <div className="flex flex-col w-full  m-2 p-2 items-center green-low-clr-bg bd-10"
                                 onClick={() => {
                                     navigate("/TransportPayment")
                                 }}>
                                <img src={payment} width={"50px"} alt="icon"/>
                                <p className="m-2">
                                    پرداخت کرایه
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex">
                            <div className="flex flex-col w-full  m-2 p-2 items-center green-low-clr-bg bd-10"
                                 onClick={() => {
                                     navigate("/StepCounter")
                                 }}>
                                <img src={pedometer} width={"50px"} alt="icon"/>
                                <p className="m-2">
                                    قدم شمار
                                </p>
                            </div>
                        </div>


                        <div className="w-full flex">
                            <div className="flex flex-col w-50  m-2 p-2  items-center green-low-clr-bg bd-10"
                                 onClick={() => {
                                     navigate("/TrackerTransportation")
                                 }}>
                                <img src={trackerTransportationImg} width={"50px"} alt="icon"/>
                                <p className="m-2">
                                    مشاهده آنلاین حمل ونقل
                                </p>
                            </div>
                            <div className="flex flex-col w-50  m-2 p-2 items-center green-low-clr-bg bd-10"
                                 onClick={() => {
                                     navigate("/LinesPrice")
                                 }}>
                                <img src={nerkh} width={"50px"} alt="icon"/>
                                <p className="m-2">
                                    مشاهده نرخ حمل و نقل
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex">
                            <div className="flex flex-col w-50  m-2 p-2 items-center green-low-clr-bg bd-10"
                                 onClick={() => {
                                     navigate("/Events")
                                 }}>
                                <img src={events} width={"50px"} alt="icon"/>
                                <p className="m-2">
                                    رویدادها
                                </p>
                            </div>
                            <div className="flex flex-col w-50  m-2 p-2 items-center green-low-clr-bg bd-10"
                                 onClick={() => {
                                     navigate("/TimeTableStops")
                                 }}>
                                <img src={time} width={"50px"} alt="icon"/>
                                <p className="m-2">
                                    زمان ایستگاه ها
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex">

                            <div className="flex flex-col w-50  m-2 p-2 items-center green-low-clr-bg bd-10"
                                 onClick={() => {
                                     navigate("/Infoforce")
                                 }}>
                                <img src={info} width={"50px"} alt="icon"/>
                                <p className="m-2">
                                    اطلاعات ضروری
                                </p>
                            </div>
                            <div className="flex flex-col w-50  m-2 p-2 items-center green-low-clr-bg bd-10"
                                 onClick={() => {
                                     navigate("/UsePoints")
                                 }}>
                                <img src={point} width={"50px"} alt="icon"/>
                                <p className="m-2">
                                    استفاده ار امتیازات
                                </p>
                            </div>
                        </div>

                    </section>

                </div>

            </main>
        </>
    )
}
