import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavbarPages} from "../components/navbarPages";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Loading from "../components/loading";


export const UsePoints = () => {
    const [loading, setLoading] = useState(false)
    const uid = JSON.parse(localStorage.getItem("uid"));
    const navigate = useNavigate()
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("uid"))){
            navigate("/login")
        }
    }, []);

    const handlerSubmit = (value) => {
        setLoading(true)
        axios
            .post(`http://181.41.194.224:7070/user/pay_driver/`,{

                uid: uid,
                currency:"token",
                price: value,
                driver_id: 1,


            })
            .then((res) => {
                setLoading(false)
                if (res.data.status) {
                    toast.success("پرداخت با موفقیت انجام شد", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    // getData()
                }else {
                    toast.error("موجودی کافی نیست", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                // setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                toast.error("پرداخت انجام نشد", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    }


    return (
        <>
            {loading? <Loading/> : null}
            <main className="w-full flex justify-center">
                <div className="max-w-container w-full">
                    <NavbarPages title={"رویداد ها"} url={-1}/>
                    <div className="flex flex-col w-full">


                        <div className="flex flex-col w-full bd-10 shadowBox p-2 m-2">
                            <p>
                                نام :
                              بیلیط تله کابین
                            </p>

                            <p>
                                امتیاز مورد نیاز:
                               9
                            </p>

                            <button className="btn-ok p-2 w-full m-2" onClick={() => {
                                handlerSubmit(9)
                            }}>
                              پرداخت
                            </button>

                        </div>
                        <div className="flex flex-col w-full bd-10 shadowBox p-2 m-2">
                            <p>
                                نام :
                              بیلیط آرامگاه بو علی سینا
                            </p>

                            <p>
                                امتیاز مورد نیاز:
                               10
                            </p>

                            <button className="btn-ok p-2 w-full m-2" onClick={() => {
                                handlerSubmit(10)
                            }}>
                              پرداخت
                            </button>

                        </div>
                        <div className="flex flex-col w-full bd-10 shadowBox p-2 m-2">
                            <p>
                                نام :
                              بیلیط غار علیصدر
                            </p>

                            <p>
                                امتیاز مورد نیاز:
                               8
                            </p>

                            <button className="btn-ok p-2 w-full m-2" onClick={() => {
                                handlerSubmit(8)
                            }}>
                              پرداخت
                            </button>

                        </div>



                    </div>
                </div>
            </main>
        </>
    )
}
