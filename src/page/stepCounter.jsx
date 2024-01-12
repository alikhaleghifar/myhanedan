import React, {useEffect,useState} from 'react'
import {

    MapContainer,
    Marker, Polygon,
    Polyline,
    Popup,

    TileLayer, useMapEvents
} from "react-leaflet";

import * as ReactDOMServer from "react-dom/server";
import {divIcon} from "leaflet/src/layer";

import {NavbarPages} from "../components/navbarPages";

import foot from "../assets/image/icon/foot.png"
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Loading from "../components/loading";





export default function  StepCounter() {
    const [loading, setLoading] = useState(false)
    const [marker, setMarker] = useState();
    const [markerP, setMarkerP] = useState();
    const [status, setStatus] = useState("1");
    const [uloc_id, setUloc_id] = useState("");
    const position = [34.7834699744819, 48.51227656733467];
    const uid = JSON.parse(localStorage.getItem("uid"));
    const navigate = useNavigate()
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("uid"))){
            navigate("/login")
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "poly",
            JSON.stringify([])
        );
    }, []);

    const iconMarkup = ReactDOMServer.renderToStaticMarkup(<div><img width="20px" src={foot} alt={"icon"}/> </div>);
    const customMarkerIcon = divIcon({
        html: iconMarkup,
    });




    const blackOptions = {color: "black"};
    const limeOptions = {color: "lime"};

    function LocationMarker() {
        const map = useMapEvents({
            click(e) {
                map.locate();

                let poly = JSON.parse(localStorage.getItem("poly"));
                if (poly.length >= 2) {
                    let t = []
                    t.push([e.latlng.lat, e.latlng.lng])
                    // setPoly(t)
                    console.log(t);

                    localStorage.setItem(
                        "poly",
                        JSON.stringify(t)
                    );
                    handelrePolyline(t)
                    setMarker(<>
                            {marker}
                            <Marker
                                position={[e.latlng.lat, e.latlng.lng]}
                                icon={customMarkerIcon}
                            >
                            </Marker>
                        </>
                    );
                }else {
                    let t = poly
                    t.push([e.latlng.lat, e.latlng.lng])
                    // setPoly(t)
                    console.log(t);

                    localStorage.setItem(
                        "poly",
                        JSON.stringify(t)
                    );
                    handelrePolyline(t)
                    setMarker(<>
                            {marker}
                            <Marker
                                position={[e.latlng.lat, e.latlng.lng]}
                                icon={customMarkerIcon}
                            >
                            </Marker>
                        </>
                    );
                }

            },
        });
    }

    const handelrePolyline = (t) => {
        console.log('====================================');
        console.log(t);
        console.log('====================================');
        setMarkerP(<Polygon pathOptions={limeOptions} positions={t}/>);
    };



    const handlerSubmit = () => {
        setLoading(true)
        if (status === "1"){
            axios
                .post(`http://181.41.194.224:7070/user/start_walk/`,{


                uid: uid,
                start_lat: 34.7834699744819,
                start_long: 48.51227656733467


                })
                .then((res) => {
setStatus("2")
                    setLoading(false)
                    setUloc_id(res.data.uloc_id)
                })
                .catch((error) => {
                    setLoading(false)
                    toast.error("خطا در ازتباط با سرور", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                });
        }else {
            axios
                .post(`http://181.41.194.224:7070/user/end_walk/`,{


                    uloc_id: uloc_id,
                    end_lat: 34.776205051772564,
                    end_long: 48.51227656733467



                })
                .then((res) => {
                    toast.success(`مقدار ${res.data.tokens_gained}به امتیازات اضافه شد`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setLoading(false)
                    navigate("/")
                })
                .catch((error) => {
                    setLoading(false)
                    toast.error("خطا در ازتباط با سرور", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                });
        }

    }
    return (
        <>
            {loading? <Loading/> : null}
            <div className="w-full flex justify-center">



                <div className="max-w-container w-full">
                    <NavbarPages title={"قدم شمار"} url={-1}/>

                    <p className="m-2 p-2 red-clr">
                       هر 1 متر دو قدم محاسبه می باشد
                    </p>
                    <div className="middle-location">
                        <div className="options-map-location-container">

                        </div>

                        <MapContainer center={position} zoom={13.48} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />


                            {/*<LocationMarker/>*/}

                             <Marker
                                position={[34.7834699744819,48.51227656733467]}
                                icon={customMarkerIcon}
                            >
                            </Marker>


                            {
                                status === "2" ? <Marker
                                    position={[34.776205051772564,48.51227656733467]}
                                    icon={customMarkerIcon}
                                >
                                </Marker> : null
                            }


                        </MapContainer>
                        <button className="btn-ok w-90 p-2 m-2"  onClick={()=>{
                            handlerSubmit()
                        }}>
                            {status === "1"?"شروع" : "پایان" }
                        </button>

                    </div>

                </div>


            </div>
        </>
    )
}
