import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavbarPages} from "../components/navbarPages";
import {toast} from "react-toastify";


export const Events = () => {


    const handlerSubmit = (value) => {
        toast.success("با موفقیت انجام شد", {
            position: toast.POSITION.TOP_RIGHT,
        });
    }


    return (
        <>

            <main className="w-full flex justify-center">
                <div className="max-w-container w-full">
                    <NavbarPages title={"رویداد ها"} url={-1}/>
                    <div className="flex flex-col w-full">


                        <div className="flex flex-col w-full bd-10 shadowBox p-2 m-2">
                            <p>
                                نام رویداد:
                                پیاده روی
                            </p>
                            <p>
                                مکان:
                                بلوار ارم
                            </p>
                            <p>
                                تاریخ:
                                1403/12/12
                            </p>
                            <p>
                                ساعت :
                                08:00
                            </p>
                            <button className="btn-ok p-2 w-full m-2" onClick={() => {
                                handlerSubmit("پیاده روی")
                            }}>
                                ثبت نام
                            </button>

                        </div>
                        <div className="flex flex-col  bd-10 shadowBox p-2 m-2 w-full">
                            <p>
                                نام رویداد:
                                دوچرخه سواری
                            </p>
                            <p>
                                مکان:
                                بلوار ارم
                            </p>
                            <p>
                                تاریخ:
                                1403/12/12
                            </p>
                            <p>
                                ساعت :
                                08:00
                            </p>

                            <button className="btn-ok p-2 w-full m-2" onClick={() => {
                                handlerSubmit("دوچرخه سواری")
                            }}>
                                ثبت نام
                            </button>
                        </div>


                    </div>
                </div>
            </main>
        </>
    )
}
