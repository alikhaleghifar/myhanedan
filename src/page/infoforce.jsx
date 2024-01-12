import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavbarPages} from "../components/navbarPages";
import {toast} from "react-toastify";


export const Infoforce = () => {


    const handlerSubmit = (value) => {
        toast.success("با موفقیت انجام شد", {
            position: toast.POSITION.TOP_RIGHT,
        });
    }


    return (
        <>

            <main className="w-full flex justify-center">
                <div className="max-w-container w-full">
                    <NavbarPages title={" اطلاعات ضروری"} url={-1}/>
                    <div className="flex flex-col w-full">


                        <div className="flex flex-col w-full bd-10 shadowBox p-2 m-2">
                            <p>
                                مديركل آموزش و پرورش استان:32528115

                            </p>

                        </div>
                        <div className="flex flex-col w-full bd-10 shadowBox p-2 m-2">
                            <p>
                                رئيس انتقال خون همدان:34228008

                            </p>

                        </div>
                        <div className="flex flex-col w-full bd-10 shadowBox p-2 m-2">
                            <p>
                                مديرکل بيمه تامين اجتماعي استان:6-32515924

                            </p>

                        </div>
                        <div className="flex flex-col w-full bd-10 shadowBox p-2 m-2">
                            <p>
                                مديرعامل شرکت تاکسيراني همدان:32517711

                            </p>
                        </div>


                    </div>
                </div>
            </main>
        </>
    )
}
