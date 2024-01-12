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





export default function  StepCounter() {
    const [marker, setMarker] = useState();
    const [markerP, setMarkerP] = useState();
    const position = [32.20274300043338, 54.15246922688382];

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
        
    }
    return (
        <>
            <div className="w-full flex justify-center">



                <div className="max-w-container w-full">
                    <NavbarPages title={"قدم شمار"} url={-1}/>
                    <p className="m-2 p-2">
                        لطفا ابتدا دونقطه شروع و پایان را در نقشه با کلیک کردن روی نقشه انتخاب کنید
                    </p>
                    <p className="m-2 p-2 red-clr">
                       هر 1 متر دو قدم محاسبه می باشد
                    </p>
                    <div className="middle-location">
                        <div className="options-map-location-container">

                        </div>

                        <MapContainer center={position} zoom={3.48} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {marker}
                            {markerP}
                            <LocationMarker/>

                        </MapContainer>
                        <button className="btn-ok w-90 p-2 m-2"  onClick={handlerSubmit}>
                            ثبت
                        </button>

                    </div>

                </div>


            </div>
        </>
    )
}
