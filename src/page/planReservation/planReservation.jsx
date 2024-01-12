import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavbarPages} from "../../components/navbarPages";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import AddCar from "../../components/modals/addCar";
import Loading from "../../components/loading";


function replaceX(originalString, replacementString) {
    // استفاده از تابع replace برای جایگزینی 'X' با رشته مورد نظر
    return originalString.replace('X', replacementString);
}


export const PlanReservation = () => {
    const [loading, setLoading] = useState(false)
    const {id} = useParams();
    const [data, setData] = useState([])
    const uid = JSON.parse(localStorage.getItem("uid"));
    const navigate = useNavigate()
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("uid"))){
            navigate("/login")
        }
    }, []);

    useEffect(() => {
        getData()
    }, []);


    const getData = () => {
        setLoading(true)
        axios
            .get(`http://181.41.194.224:7070/traffic_plan/available_timetable/`)
            .then((res) => {
                setData(res.data.timetable)
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)

            });
    }



    const [dataAdd, setAddData] = useState(0)

    const setQueryPropertyData = (key, e) => {
        console.log(key)
        setAddData(parseInt(key))
    };


    const handlerSubmit = (currency) => {
        setLoading(true)
        axios
            .post(`http://181.41.194.224:7070/traffic_plan/buy/`,{

            uid: uid,
                currency:currency,
            price: 1,
            tid: dataAdd,
                cid:id

            })
            .then((res) => {
                setLoading(false)
                if (res.data.status) {
                    toast.success("پرداخت با موفقیت انجام شد", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    getData()
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
                    <NavbarPages title={"رزرو طرح"} url={-1}/>
                    <div className="flex flex-col">
                        <p>
                            هزینه هر روز 10 هزار تومان
                        </p>
                        {data.map((d) => {
                            return (
                                <>
                                    <div className="flex flex-col w-full bd-10 shadowBox p-2 m-2" onClick={() => {
                                        // navigator(`/PlanReservation/${d.cid}`)
                                        d.capacity_percent >= 100 ? toast.error("غیر قابل رزرو", {
                                            position: toast.POSITION.TOP_RIGHT,
                                        }) : console.log("")
                                    }}>
                                        <div className="flex w-full">
                                            {d.capacity_percent >= 100 ? null :
                                                <input type="radio" name="rezerv" className="m-2" value={d.tid}
                                                       onChange={(e) => {
                                                           setQueryPropertyData(d.tid, e)
                                                       }}/>
                                            }

                                            <div className="flex flex-col w-full">
                                                <p>

                                                    روز :
                                                    {d.day_name}
                                                </p>
                                                <p>

                                                    تاریخ :
                                                    {d.date_jalali}
                                                </p>
                                                <div>

                                                    تعداد رزرو شده:{d.orders_count}

                                                    <div className="flex w-full bd-10"
                                                         style={{height: "5px", border: "1px solid #c7c7c7"}}>
                                                        <div className="w-full green-clr-bg"
                                                             style={{width: `${d.capacity_percent}%`}}>

                                                        </div>
                                                    </div>

                                                </div>
                                                {
                                                    d.capacity_percent >= 100 ?
                                                        <p className="font-bold red-clr m-2"> غیر قابل رزرو </p> : null
                                                }
                                            </div>

                                        </div>


                                    </div>
                                </>
                            )
                        })}
                        <div className="flex w-full">
                            <button className="btn-ok w-50 m-2 p-2 font-bold" onClick={()=>{
                                handlerSubmit("money")
                            }}>
                                پرداخت از کیف پول
                            </button>
                            <button className="btn-ok w-50 m-2 p-2 font-bold" onClick={()=>{
                                handlerSubmit("token")
                            }}>
                                پرداخت از امتیازات
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
