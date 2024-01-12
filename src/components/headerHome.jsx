import React, {useEffect, useState} from 'react'
import logo from "../assets/image/logo.png"
import axios from "axios";
import point from "../assets/image/icon/point.png"
import Confirm from "./modals/confirm";

import {  toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";


export default function HeaderHome() {


    const uid = JSON.parse(localStorage.getItem("uid"));
    const navigate = useNavigate()
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("uid"))){
            navigate("/login")
        }
    }, []);


    const [wallet, setWallet] = useState({
        user_wallet: {
            wallet_id: 1,
            money_balance: 0,
            token_balance: 0
        }
    })

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        getData()
    }, []);


    const getData = () => {
        axios
            .post(`http://181.41.194.224:7070/user/show_wallet/`,{
                uid:uid
            })
            .then((res) => {
                setWallet(res.data)
                // setLoading(false)
            })
            .catch((error) => {
                // setLoading(false)

            });
    }

    const handlerSubmit = (value) => {
        axios
            .post(`http://181.41.194.224:7070/user/deposit_wallet/`,{
                uid:uid,
                money:value
            })
            .then((res) => {
                getData()
                toast.success("با موفقیت انجام شد", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch((error) => {
                // setLoading(false)
                // setLoading(false)
                toast.error("خطا در ارتباط با سرور", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    }

    return (
        <>
            <Confirm showModal={showModal} setShowModal={setShowModal} handelerSubmit={handlerSubmit} />
            <div className="w-full  main-header-home p-4 relative flex justify-center pb-16">
                <div className="w-full flex justify-between items-center">
                    <div className=" font-bold white-clr-bg bd-10 shadowBox p-2">
                        علی خالقی فر
                    </div>
                    <img width="30%" src={logo} alt={"logo"}/>
                    <div className=" font-bold red-clr-bg white-clr bd-10 shadowBox p-2" onClick={()=>{
                        navigate("/login")
                    }}>
                        خروج
                    </div>
                </div>
                <div className="flex w-90   white-clr-bg bd-10  absolute p-1 mt-16 shadowBox">
                    <div className="flex w-50 flex  items-center">
                        <div className="flex justify-center items-center green-clr-bg white-clr m-1"
                             style={{width: "30px", height: "30px", borderRadius: "50%"}}
                        onClick={()=>{
                            setShowModal(true);
                        }}
                        >
                            +
                        </div>
                        <div className="flex flex-col">
                            <p className="text-center p-2">
                                موجودی کیف پول:

                            </p>
                            <p className="text-center p-2">
                                {wallet.user_wallet.money_balance} هزار تومان
                            </p>
                        </div>

                    </div>
                    <div className="m-2" style={{width: "2px", backgroundColor: "#b9b9b9"}}>

                    </div>
                    <div className="w-50">
                        <div className="flex-col w-50 flex justify-center">
                            <p className=" p-2">
                                امتیازات
                            </p>

                            <div className="p-2 flex items-center">
                                <img className="m-1" src={point} width={"20px"} alt={"icon"}/>
                                <p className="m-1">
                                    {wallet.user_wallet.token_balance}
                                </p>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>

    )
}
