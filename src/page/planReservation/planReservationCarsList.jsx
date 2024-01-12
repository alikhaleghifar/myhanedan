import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavbarPages} from "../../components/navbarPages";
import AddCar from "../../components/modals/addCar";
import {useNavigate} from "react-router-dom";



function replaceX(originalString, replacementString) {
    // استفاده از تابع replace برای جایگزینی 'X' با رشته مورد نظر
    return originalString.replace('X', replacementString);
}


export const PlanReservationCarsList = () => {

    const [showModal, setShowModal] = useState(false)

            const [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, []);


    const getData = () => {
        axios
            .post(`http://181.41.194.224:7070/user/show_cars/`,{
                uid:1
            })
            .then((res) => {
                setData(res.data.user_cars)
                // setLoading(false)
            })
            .catch((error) => {
                // setLoading(false)

            });
    }

    const navigator = useNavigate();
    return (
        <>
            <AddCar setShowModal={setShowModal} showModal={showModal} loadData={getData} />
            <main className="w-full flex justify-center">
                <div className="max-w-container w-full">
                    <NavbarPages title={"رزرو طرح"} url={-1}/>
                    <div className="flex flex-col">
                        {data.map((d) =>{
                            return (
                                <>
                                <div className="flex flex-col w-full bd-10 shadowBox p-2 m-2" onClick={()=>{
                                    navigator(`/PlanReservation/${d.cid}`)
                                }}>
                                    <p>

                                        VIN :
                                        {d.vin}
                                    </p>
                                    <p>

                                        شماره پلاک:

                                        {replaceX(d.plate_serial,d.plate_letter)}

                                    </p>
                                </div>
                                </>
                            )
                        })}
                    </div>
                    <button className="btn-ok w-full p-2" onClick={()=>{
                        setShowModal(true)
                    }}>
                        افزودن خودرو
                    </button>
                </div>
            </main>
        </>
    )
}
