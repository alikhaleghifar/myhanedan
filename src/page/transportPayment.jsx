import React, {useEffect} from 'react'
import QrReader from "react-qr-reader";
import { useState } from "react";
import axios from "axios";
import {NavbarPages} from "../components/navbarPages";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";



export const TransportPayment = () => {
    const [code, setCode] = useState(null);
    const [showDialog, setDiaglog] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [precScan, setPrecScan] = useState("");
    const [selected, setSelected] = useState("environment");
    const [errorMessage, setErrorMessage] = useState(null);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const uid = JSON.parse(localStorage.getItem("uid"));
    const navigate = useNavigate()
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("uid"))){
            navigate("/login")
        }
    }, []);

    const handleScan = async (scanData) => {

        if (scanData && scanData !== "" && !showDialog && !processing) {

            if (scanData){
                setProcessing(true)
                setDiaglog(true)
                setPrecScan(JSON.parse(scanData))
                console.log(`loaded >>>`, scanData);
            }


        }
    };
    const handleError = (err) => {
        console.error(err);
    };

    console.log(precScan)

    const handlerSubmit = (currency) => {
        axios
            .post(`http://181.41.194.224:7070/user/pay_driver/`,{

                uid: uid,
                currency:currency,
                price: currency === "token" ? precScan.price_token : precScan.price_money,
                driver_id: precScan.driver_id,


            })
            .then((res) => {

                if (res.data.status) {
                    toast.success("پرداخت با موفقیت انجام شد", {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    axios
                        .post(`http://181.41.194.224:7070/drivers/five_star_comment/`,{

                            stars:rating,
                            driver_id: precScan.driver_id,


                        })
                        .then((res) => {


                        })
                        .catch((error) => {
                            toast.error("پرداخت انجام نشد", {
                                position: toast.POSITION.TOP_RIGHT,
                            });
                        });
                }else {
                    toast.error("موجودی کافی نیست", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                // setLoading(false)
            })
            .catch((error) => {
                toast.error("پرداخت انجام نشد", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    }




    console.log(rating)

    return (
        <>
            <main className="w-full flex justify-center">
                <div className="max-w-container w-full">
                    <NavbarPages title={"پرداخت کرایه"} url={-1}/>
                    <div className="App">
                        {!showDialog && !processing && (
                            <>
                                <h4>لطفا دوربین را مقابل QR قرار دهید</h4>

                                <p className="mt-3">
                                    نوع دوربین:
                                </p>
                                <select className="mb-3" onChange={(e) => setSelected(e.target.value)}>
                                    <option value={"environment"}>دوربین عقب</option>
                                    <option value={"user"}> دوربین جلو</option>
                                </select>
                            </>

                        )}


                        {!showDialog && !processing && (
                            <QrReader
                                facingMode={selected}
                                delay={500}
                                onError={handleError}
                                onScan={handleScan}
                                chooseDeviceId={() => selected}
                                style={{width: "100%", heigth: "100px"}}
                            />
                        )}

                        {showDialog && processing && (
                            <>

                                <div className="flex flex-col w-full bd-10 shadowBox p-2 m-2">
                                    <p>
                                        نام و نام خانوادگی :
                                        {precScan.name_surname}
                                    </p>
                                    <p>
                                        قیمت:
                                        {precScan.price_money}
                                    </p>
                                    <p>
                                        قیمت با امتیاز:
                                        {precScan.price_token}
                                    </p>


                                </div>

<p>برای بهبود خدمات حمل و نقل لطفا امتیاز دهید</p>
                                <div className="star-rating">
                                    {[...Array(5)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                className={index <= (hover || rating) ? "on" : "off"}
                                                onClick={() => setRating(index)}
                                                onMouseEnter={() => setHover(index)}
                                                onMouseLeave={() => setHover(rating)}
                                            >
                                                <span className="star">&#9733;</span>
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="flex w-full">
                                    <button className="btn-ok w-50 m-2 p-2 font-bold" onClick={() => {
                                        handlerSubmit("money")
                                    }}>
                                        پرداخت از کیف پول
                                    </button>
                                    <button className="btn-ok w-50 m-2 p-2 font-bold" onClick={() => {
                                        handlerSubmit("token")
                                    }}>
                                        پرداخت از امتیازات
                                    </button>
                                </div>
                            </>

                        )}
                    </div>
                </div>
            </main>
        </>
    )
}
