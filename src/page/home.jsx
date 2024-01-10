import React from 'react'
import HeaderHome from "../components/headerHome";
import trackerTransportationImg from "../assets/image/icon/tracker.png"


export const Home = () => {
    return (
        <>
            <main className="w-full flex justify-center">
                <div className="max-w-container w-full">
                    <HeaderHome/>


                    <section className="flex flex-col">
                        <div className="w-full flex">
                            <div className="flex flex-col w-50  m-2 p-2">
                                <img src={trackerTransportationImg} alt="icon"/>
                                <p>
                                    مشاهده آنلاین حمل ونقل
                                </p>
                            </div>
                            <div className="flex flex-col w-50  m-2 p-2">
                                <img src={trackerTransportationImg} alt="icon"/>
                                <p>
                                    lorem
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex">
                            <div className="flex flex-col w-50  m-2 p-2">
                                <img src={trackerTransportationImg} alt="icon"/>
                                <p>
                                    lorem
                                </p>
                            </div>
                            <div className="flex flex-col w-50  m-2 p-2">
                                <img src={trackerTransportationImg} alt="icon"/>
                                <p>
                                    lorem
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex">
                            <div className="flex flex-col w-50  m-2 p-2">
                                <img src={trackerTransportationImg} alt="icon"/>
                                <p>
                                    lorem
                                </p>
                            </div>
                            <div className="flex flex-col w-50  m-2 p-2">
                                <img src={trackerTransportationImg} alt="icon"/>
                                <p>
                                    lorem
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex">
                            <div className="flex flex-col w-50  m-2 p-2">
                                <img src={trackerTransportationImg} alt="icon"/>
                                <p>
                                    lorem
                                </p>
                            </div>
                            <div className="flex flex-col w-50  m-2 p-2">
                                <img src={trackerTransportationImg} alt="icon"/>
                                <p>
                                    lorem
                                </p>
                            </div>
                        </div>
                    </section>

                </div>

            </main>
        </>
    )
}
