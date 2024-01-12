import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {  toast } from 'react-toastify';


function Login() {
    useEffect(() => {
        localStorage.clear();
    }, []);

    const [addData, setAddData] = useState({});
    let navigate = useNavigate();
    const handlerSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://188.121.105.111:3010/login",{
                phoneNumber:addData.phoneNumber,
                password:addData.password
            })
            .then((res) => {

                if (res.data.isLoggedIn === false){
                    toast.error("شماره همراه یا رمز عبور اشتباه است", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }else if (res.data.isLoggedIn === "notActive"){
                    toast.error("حساب کاربری شما غیر فعال شده است", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }else {
                    localStorage.setItem("user", JSON.stringify(res.data.isLoggedIn))
                    navigate("/")
                }

            })
            .catch((error) => {


            });
    }


    const setQueryPropertyAddData = (key, e) => {
        switch (key) {
            case "phoneNumber":
                setAddData({...addData, phoneNumber: e.target.value});
                break;
            case "password":
                setAddData({...addData, password: e.target.value});
                break;
            default:
                return null;
        }
    };


    return (
        <>
            <div className="login">
                <section className="container">
                    <div className="login-container">
                        <div className="circle circle-one"></div>
                        <div className="form-container">
                            <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />
                            <h1 className="opacity">ورود</h1>
                            <form>
                                <input type="tel" placeholder="شماره همراه" onChange={(e) => {
                                    setQueryPropertyAddData("phoneNumber", e);
                                }}/>
                                <input type="password" placeholder="رمز عبور" onChange={(e) => {
                                    setQueryPropertyAddData("password", e);
                                }}/>
                                <button className="opacity" onClick={handlerSubmit}>ورود</button>
                            </form>
                            <div className="register-forget opacity">

                                <Link  to="/register" className="black-clr">ثبت نام نکرده اید؟ ثبت نام کنید</Link>
                            </div>
                        </div>
                        <div className="circle circle-two"></div>
                    </div>
                    <div className="theme-btn-container"></div>
                </section>
            </div>
        </>


    );
}

export default Login;