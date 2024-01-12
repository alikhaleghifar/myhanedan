import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useCallback, useEffect, useRef, useState} from "react";

import {useSpring, animated} from "react-spring";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const AddCar = ({showModal, setShowModal,loadData}) => {
    // START MODAL
    const modalRef = useRef();

    const animation = useSpring({
        config: {
            duration: 250,
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
    });

    const closeModal = (e) => {
        console.log(modalRef.current, e.target);
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    const keyPress = useCallback(
        (e) => {
            if (e.key === "Escape" && showModal) {
                setShowModal(false);
                console.log("I pressed");
            }
        },
        [setShowModal, showModal]
    );

    useEffect(() => {
        document.addEventListener("keydown", keyPress);
        return () => document.removeEventListener("keydown", keyPress);
    }, [keyPress]);

    // END MODAL

    const [data, setData] = useState({plate_letter:"ا"})
    const uid = JSON.parse(localStorage.getItem("uid"));
    const navigate = useNavigate()
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("uid"))){
            navigate("/login")
        }
    }, []);


    const setQueryPropertyData = (key, e) => {
        switch (key) {

            case "vin":
                setData({...data, vin: e.target.value});
                break;
            case "plate_serial1":
                setData({...data, plate_serial1: e.target.value});
                break;
            case "plate_serial2":
                setData({...data, plate_serial2: e.target.value});
                break;
            case "plate_serial3":
                setData({...data, plate_serial3: e.target.value});
                break;
            case "plate_letter":
                setData({...data, plate_letter: e.target.value});
                break;

            default:
                return null;
        }
    };

    const handelerSubmit = () => {
        axios
            .post(`http://181.41.194.224:7070/user/add_car/`, {
                uid: uid,
                vin: data.vin,
                plate_serial:data.plate_serial1+"X"+ data.plate_serial2 +"-"+data.plate_serial3,
                plate_letter:data.plate_letter
            })
            .then((res) => {
                loadData()
                setShowModal(false)
                // setLoading(false)
            })
            .catch((error) => {
                // setLoading(false)

            });
    }

    return (
        <>


            {showModal ? (

                <div
                    className="modal-components-background"
                    // onClick={closeModal}
                    ref={modalRef}
                >
                    <animated.div
                        style={animation}
                        className="modal-components-background-content "
                    >
                        <div className="modal-components-warpper shadowBox bd-10">
                            <div className="modal-content">
                                <div className="modal-option-topbar">
                                    <h1> افزودن خودرو</h1>
                                    <FontAwesomeIcon onClick={() => setShowModal((prev) => !prev)} icon={faXmark}/>

                                </div>
                                <div className="form-modal-content">

                                    <div className="container-box-input-form-modal-content-50">
                                        <div className="flex flex-col w-full p-2">
                                            <div className="flex flex-col mb-4 mt-2">
                                                <label>
                                                    VIN:


                                                </label>
                                                <input className="border-none  bd-10 shadowBox p-2 "
                                                       onChange={(event) => {
                                                           setQueryPropertyData("vin", event);
                                                       }} type="text"/>
                                            </div>
                                            <div className="flex flex-col mb-4 mt-2">
                                                <label>
                                                    پلاک خودرو:


                                                </label>
                                                <div className="flex w-full">
                                                    <input className="border-none  bd-10 shadowBox p-2 m-1"     style={{width:"50px"}}
                                                           onChange={(event) => {
                                                               setQueryPropertyData("plate_serial1", event);
                                                           }} type="text"/>
                                                    <select className="border-none  bd-10 shadowBox p-2 m-1" onChange={(event) => {
                                                        setQueryPropertyData("plate_letter", event);
                                                    }}>
                                                        <option value="ا">ا</option>
                                                        <option value="ب">ب</option>
                                                        <option value="پ">پ</option>
                                                        <option value="ت">ت</option>
                                                        <option value="ث">ث</option>
                                                        <option value="ج">ج</option>
                                                        <option value="چ">چ</option>
                                                        <option value="ح">ح</option>
                                                        <option value="خ">خ</option>
                                                        <option value="د">د</option>
                                                        <option value="ذ">ذ</option>
                                                        <option value="ر">ر</option>
                                                        <option value="ز">ز</option>
                                                        <option value="ژ">ژ</option>
                                                        <option value="س">س</option>
                                                        <option value="ش">ش</option>
                                                        <option value="ص">ص</option>
                                                        <option value="ض">ض</option>
                                                        <option value="ط">ط</option>
                                                        <option value="ظ">ظ</option>
                                                        <option value="ع">ع</option>
                                                        <option value="غ">غ</option>
                                                        <option value="ف">ف</option>
                                                        <option value="ق">ق</option>
                                                        <option value="ک">ک</option>
                                                        <option value="گ">گ</option>
                                                        <option value="ل">ل</option>
                                                        <option value="م">م</option>
                                                        <option value="ن">ن</option>
                                                        <option value="و">و</option>
                                                        <option value="ه">ه</option>
                                                        <option value="ی">ی</option>
                                                    </select>
                                                    <input className="border-none  bd-10 shadowBox p-2 m-1"     style={{width:"50px"}}
                                                           onChange={(event) => {
                                                               setQueryPropertyData("plate_serial2", event);
                                                           }} type="text"/>
                                                    <input
                                                        className="border-none  bd-10 shadowBox p-2 m-1"
                                                        style={{width:"50px"}}
                                                        onChange={(event) => {
                                                            setQueryPropertyData("plate_serial3", event);
                                                        }} type="text"/>
                                                </div>

                                            </div>
                                            <button className="btn-ok p-2 " onClick={() => {
                                                handelerSubmit(data.money)
                                                setShowModal(false)
                                            }}>
                                                پرداخت
                                            </button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </animated.div>
                </div>


            ) : null}
        </>
    );
};

export default AddCar;
