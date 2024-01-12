

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import  { useCallback, useEffect, useRef, useState } from "react";

import { useSpring, animated } from "react-spring";




const Confirm = ({ showModal, setShowModal, handelerSubmit }) => {
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

    const [data, setData] = useState({})

    const setQueryPropertyData = (key, e) => {
        switch (key) {

            case "money":
                setData({...data, money: e.target.value});
                break;

            default:
                return null;
        }
    };



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
                                        <h1> افزودن به کیف پول</h1>
                                        <FontAwesomeIcon onClick={() => setShowModal((prev) => !prev)} icon={faXmark}/>

                                    </div>
                                    <div className="form-modal-content">

                                        <div className="container-box-input-form-modal-content-50">
                                            <div className="flex flex-col w-full p-2">
                                                <div className="flex flex-col mb-4 mt-2">
                                                    <label>
                                                        مقدار (تومان):


                                                    </label>
                                                    <input className="border-none  bd-10 shadowBox p-2 "
                                                           onChange={(event) => {
                                                               setQueryPropertyData("money", event);
                                                           }}       type="text"/>
                                                </div>
                                                <button className="btn-ok p-2 " onClick={()=>{
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

export default Confirm;
