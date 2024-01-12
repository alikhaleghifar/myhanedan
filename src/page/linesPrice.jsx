import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavbarPages} from "../components/navbarPages";
import {toast} from "react-toastify";
import Loading from "../components/loading";


function filterByVehichle(data, targetVehichle) {
    return data.filter(item => item.vehichle === targetVehichle);
}

export const LinesPrice = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [dataFilter, setDataFilter] = useState([])

    useEffect(() => {
        getData()
    }, []);


    const getData = () => {
        setLoading(true)
        axios
            .get(`http://181.41.194.224:7070/lines/prices/`)
            .then((res) => {
                setData(res.data.line_prices)
                // setDataFilter(res.data.line_prices)
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)

            });
    }


    return (
        <>
            {loading? <Loading/> : null}
            <main className="w-full flex justify-center">
                <div className="max-w-container w-full">
                    <NavbarPages title={"مشاهده نرخ حمل و نقل"} url={-1}/>
                    <div className="flex flex-col">
                        <div className="flex flex-col m-2 ">
                            <label>
                                نوع وسیله حمل و نقل را انتخاب کنید:
                            </label>
                            <select className="border-none shadowBox bd-10 mt-2 mb-2 p-2" onChange={(e) => {

                                if (e.target.value !== "") {
                                    setDataFilter(filterByVehichle(data, e.target.value))
                                }else {
                                    setDataFilter([])
                                }
                            }}>
                                <option value={""}>انتخاب کنید</option>
                                <option value={"تاکسی"}> تاکسی</option>
                                <option value={"اتوبوس"}> اتوبوس</option>
                            </select>
                        </div>

                        {dataFilter.map((d) => {
                            return (
                                <>
                                    <div className="flex flex-col w-full bd-10 shadowBox p-2 m-2">
                                        <p>
                                            مبدا:
                                            {d.source}
                                        </p>
                                        <p>
                                            مقصد:
                                            {d.destination}
                                        </p>
                                        <p>
                                            قیمت:
                                            {d.price_money}
                                        </p>
                                        <p>
                                            قیمت با امتیاز:
                                            {d.price_token}
                                        </p>


                                    </div>


                                </>
                            )
                        })}

                    </div>
                </div>
            </main>
        </>
    )
}
