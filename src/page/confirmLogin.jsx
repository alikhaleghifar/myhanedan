import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {  toast } from 'react-toastify';
import Loading from "../components/loading";


function ConfirmLogin() {
    useEffect(() => {
        localStorage.clear();
    }, []);
    const [loading, setLoading] = useState(false)
    const [addData, setAddData] = useState({});
    let navigate = useNavigate();
    const {number} = useParams();
    const handlerSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios
            .post("http://181.41.194.224:7070/verify_sms_code/",{
                code:parseInt(addData.code) ,
                phone_number:number

            })
            .then((res) => {

                    localStorage.setItem("uid", JSON.stringify(res.data.uid))
                    navigate("/")
                setLoading(false)

            })
            .catch((error) => {

                setLoading(false)
            });
    }


    const setQueryPropertyAddData = (key, e) => {
        switch (key) {
            case "code":
                setAddData({...addData, code: e.target.value});
                break;

            default:
                return null;
        }
    };


    return (
        <>
            {loading? <Loading/> : null}
            <div className="login">
                <section className="container">
                    <div className="login-container">
                        <div className="circle circle-one"></div>
                        <div className="form-container">
                            <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />
                            <h1 className="opacity">OTP</h1>
                            <form>
                                <input type="tel" placeholder=" کد ارسال  شده به تلفن همراه" onChange={(e) => {
                                    setQueryPropertyAddData("code", e);
                                }}/>

                                <button className="opacity" onClick={handlerSubmit}>ورود</button>
                            </form>
                            {/*<div className="register-forget opacity">*/}

                            {/*    <Link  to="/register" className="black-clr">ثبت نام نکرده اید؟ ثبت نام کنید</Link>*/}
                            {/*</div>*/}
                        </div>
                        <div className="circle circle-two"></div>
                    </div>
                    <div className="theme-btn-container"></div>
                </section>
            </div>
        </>


    );
}

export default ConfirmLogin;