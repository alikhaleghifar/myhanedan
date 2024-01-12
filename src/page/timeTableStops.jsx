import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavbarPages} from "../components/navbarPages";
import {toast} from "react-toastify";
import Loading from "../components/loading";



export const TimeTableStops = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const [dataFilter, setDataFilter] = useState([])

    useEffect(() => {
        getData()
    }, []);


    const getData = () => {
        setLoading(true)
        axios
            .get(`http://181.41.194.224:7070/bus_stops/names/`)
            .then((res) => {
                setData(res.data.results)
                // setDataFilter(res.data.line_prices)
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)

            });
    }


    const handlerFilterData = (id) => {
        setLoading(true)
        axios
            .get(`http://181.41.194.224:7070/bus_stops/timetable/${id}`)
            .then((res) => {
                setDataFilter(res.data.results)
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
                                ایستگاه موردنظر را انتخاب کنید:
                            </label>
                            <select className="border-none shadowBox bd-10 mt-2 mb-2 p-2" onChange={(e) => {

                                if (e.target.value !== "") {
                                    handlerFilterData(e.target.value)
                                }else {
                                    setDataFilter([])
                                }
                            }}>
                                <option value={""}>انتخاب کنید</option>
                                {
                                    data.map((d) => (
                                        <option value={d.busstop_id}> {d.name}</option>
                                    ))
                                }


                            </select>
                        </div>

                        {dataFilter.map((d) => {
                            return (
                                <>
                                    <div className="flex flex-col w-full bd-10 shadowBox p-2 m-2">
                                        <p>
                                            ساعت:
                                            {d.departure_time}
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
