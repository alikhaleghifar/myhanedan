import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import Loading from "../components/loading";


function Register() {
    useEffect(() => {
        localStorage.clear();
    }, []);
    const [loading, setLoading] = useState(false)
    const [addData, setAddData] = useState({});
    let navigate = useNavigate();
    const handlerSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios
            .post("http://181.41.194.224:7070/register", {
                name_surname: addData.name_surname,
                phone_number: addData.phone_number,
                national_code: addData.national_code,

            })
            .then((res) => {
                axios
                    .post("http://181.41.194.224:7070/send_sms_code/", {
                        phone_number: addData.phone_number

                    })
                    .then((res) => {
                        navigate(`/confirmLogin/${addData.phone_number}`)
                        setLoading(false)

                    })
                    .catch((error) => {
                        setLoading(false)

                    });



            })
            .catch((error) => {
                setLoading(false)

            });
    }


    const setQueryPropertyAddData = (key, e) => {
        switch (key) {
            case "phone_number":
                setAddData({...addData, phone_number: e.target.value});
                break;
            case "name_surname":
                setAddData({...addData, name_surname: e.target.value});
                break;
            case "national_code":
                setAddData({...addData, national_code: e.target.value});
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
                            <img
                                src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
                                alt="illustration" className="illustration"/>
                            <h1 className="opacity">ورود</h1>
                            <form>
                                <input type="text" placeholder=" نام و نام خانوادگی" onChange={(e) => {
                                    setQueryPropertyAddData("name_surname", e);
                                }}/>
                                <input type="tel" placeholder="شماره همراه" onChange={(e) => {
                                    setQueryPropertyAddData("phone_number", e);
                                }}/>

                                <input type="text" placeholder=" کد ملی" onChange={(e) => {
                                    setQueryPropertyAddData("national_code", e);
                                }}/>
                                <button className="opacity" onClick={handlerSubmit}>ورود</button>
                            </form>
                            <div className="register-forget opacity">

                                <Link to="/login" className="black-clr">ثبت نام کرده اید؟ وارد شوید</Link>
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

export default Register;