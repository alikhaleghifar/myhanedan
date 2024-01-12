import React, {useEffect,useState} from 'react'
import {CircleMarker, LayersControl, MapContainer, Marker, Popup, Rectangle, TileLayer, useMap} from "react-leaflet";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {HubConnectionBuilder} from "@microsoft/signalr";
import * as ReactDOMServer from "react-dom/server";
import {divIcon} from "leaflet/src/layer";
import config from "../api/config";
import api from "../api/api";
import {getToken} from "../api/auth";
import {NavbarPages} from "../components/navbarPages";
let Data = [];
let carModel = [];
let counterTrack = {};
let imei = "";


function SetViewOnChange({lat, lng, zoom}) {

    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng], zoom);
    }, [lat, lng, zoom, map]);
    return null;
}

export const TrackerTransportation = () => {
    const [view, setView] = useState();
    const [loading, setLoading] = useState(true);
    const [checkInternet, setCheckInternet] = useState(true)
    const positionFirstMap = {
        lat: "32.20274300043338",
        long: "54.15246922688382",
    };
    const [deviceDetaile, setDeviceDetaile] = useState([]);
    const [minmaximaze, setMinmaximaze] = useState(true);
    const user = {
        userId: "623604f2-9aca-4e2f-adf1-d294190288ce",
        roles: [
            "SuperAdmin"
        ],
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjYyMzYwNGYyLTlhY2EtNGUyZi1hZGYxLWQyOTQxOTAyODhjZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiIwOTM4NjI4MTU0NSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3MzYzMjI0MjgsImlzcyI6Imh0dHBzOi8vd2VmaW5kZXIuaXIiLCJhdWQiOiJodHRwczovL3dlZmluZGVyLmlyIn0.BIe1V5c72igkH2qAGWR00gPzxJd2VR7sUvVDW6CT_-U",
        fullName: "علی خالقی فر",
        nationalCode: "1234567891",
        snapShot: "/users/default.png"
    };
    let devices = [
        {
            id: "0e2eb9f1-f020-4c85-bee3-d40b0d9ecbf7",
            userId: "1d08fb1c-1c79-4d42-b8d7-0d2fbb66f5f0",
            ownerName: "سبحان عبدالملکی",
            ownerPhone: "09189196432",
            agencyId: "f686cfb4-65ac-4f81-9358-4e8d179aa1d1",
            agencyCityId: "03fbf96d-ec30-46b5-9f48-8ab14242e4a8",
            agencyProvinceId: "52d7fb9a-7203-453f-ae82-f522cccbaa06",
            imei: "864866055587470",
            deviceType: "WeFinder W700 _v25",
            adminNumber1: "09189196432",
            adminNumber2: "",
            adminNumber3: "",
            simCard: "09922436818",
            carName: "عبدالملکی",
            carColorId: "15fa4913-7192-4aec-865a-31ef33d85de5",
            carColorName: "قهوه‌ای",
            carColorCode: "8B4513",
            carModelId: "24882fda-6e14-4c41-a649-8735dea433ba",
            carModelName: "آتش نشانی",
            maxSpeed: 0,
            passWord: "123456",
            isObserver: true,
            licenseExpirationDate: null,
            licenseExpired: true,
            registrationDate: "2023-11-03T17:34:07.269464",
            deviceTypeId: "5d617377-243d-46c2-8431-f9c17213626e",
            description: "",
            serverDate: null
        },
        {
            id: "215bd0a8-01bd-4915-9dd7-75254809408e",
            userId: "07e948c4-eb2c-4824-88b8-1c539472a93e",
            ownerName: "پرهام خوش روش",
            ownerPhone: "09353256665",
            agencyId: "85a435b7-66b7-40e1-a910-76c466fb06da",
            agencyCityId: "60984509-327b-4fab-a522-f64902478b99",
            agencyProvinceId: "984697bc-f8ef-4301-9b8b-91733ee67c43",
            imei: "863051066324970",
            deviceType: "WeFinder W700 _v24",
            adminNumber1: "09189262326",
            adminNumber2: "09353256665",
            adminNumber3: "",
            simCard: "09368312381",
            carName: "وحیدفرد",
            carColorId: "09b3269d-a15c-41f3-a916-49c4db65aefb",
            carColorName: "آبی",
            carColorCode: "0000FF",
            carModelId: "2acedeef-8178-4cfa-9af6-66526f4993aa",
            carModelName: "تندر 90",
            maxSpeed: 0,
            passWord: "123456",
            isObserver: true,
            licenseExpirationDate: null,
            licenseExpired: true,
            registrationDate: "2023-06-19T14:50:56.406418",
            deviceTypeId: "68150ea2-624c-4b43-ad6f-15f97e5d7b75",
            description: "",
            serverDate: null
        },
        {
            id: "ca91828f-7143-4827-a0b4-38a4f652258d",
            userId: "623604f2-9aca-4e2f-adf1-d294190288ce",
            ownerName: "علی خالقی فر",
            ownerPhone: "09386281545",
            agencyId: "2f9b956b-8cfa-4161-900b-3a4b4f4577b1",
            agencyCityId: "20479b87-f6be-48a2-b214-c0291bc27770",
            agencyProvinceId: "a112c3df-c473-4b99-9ff9-65b7aef2e929",
            imei: "123456789123456",
            deviceType: "WeFinder W700 _v14",
            adminNumber1: "null",
            adminNumber2: "",
            adminNumber3: "",
            simCard: "09386281545",
            carName: "تت",
            carColorId: "cc5021c3-811c-4b85-8e8c-b27a054cd0f7",
            carColorName: "زیتونی",
            carColorCode: "808000",
            carModelId: "c2561ea3-2d2a-4dc1-a23c-306eb141a1ee",
            carModelName: "آکسور",
            maxSpeed: 0,
            passWord: "123456",
            isObserver: false,
            licenseExpirationDate: null,
            licenseExpired: true,
            registrationDate: "2023-11-02T09:01:16.466617",
            deviceTypeId: "26723f14-b72b-4c6f-8928-b63cdf1f701c",
            description: "تست",
            serverDate: null
        }
    ]
    let userId = user.userId
    const [accsessObservers, setAccsessObservers] = useState([true, true, true]);
    const [devcieSelected, setDevcieSelected] = useState({
        id: "0e2eb9f1-f020-4c85-bee3-d40b0d9ecbf7",
        userId: "1d08fb1c-1c79-4d42-b8d7-0d2fbb66f5f0",
        ownerName: "سبحان عبدالملکی",
        ownerPhone: "09189196432",
        agencyId: "f686cfb4-65ac-4f81-9358-4e8d179aa1d1",
        agencyCityId: "03fbf96d-ec30-46b5-9f48-8ab14242e4a8",
        agencyProvinceId: "52d7fb9a-7203-453f-ae82-f522cccbaa06",
        imei: "864866055587470",
        deviceType: "WeFinder W700 _v25",
        adminNumber1: "09189196432",
        adminNumber2: "",
        adminNumber3: "",
        simCard: "09922436818",
        carName: "عبدالملکی",
        carColorId: "15fa4913-7192-4aec-865a-31ef33d85de5",
        carColorName: "",
        carColorCode: "8B4513",
        carModelId: "24882fda-6e14-4c41-a649-8735dea433ba",
        carModelName: "آتش نشانی",
        maxSpeed: 0,
        passWord: "123456",
        isObserver: true,
        licenseExpirationDate: null,
        licenseExpired: true,
        registrationDate: "2023-11-03T17:34:07.269464",
        deviceTypeId: "5d617377-243d-46c2-8431-f9c17213626e",
        description: "",
        serverDate: null
    });
    const [flagsLocation, setFlagLocation] = useState({
        accFlag: null,
        speed: null,
        latestHeartBeatDate: null,
        latestTrackDate: null,
        lat: null,
        long: null,
    });
    const [validateFlags, setValidateFlags] = useState(true);
    const handlerViwe = (lat, lng) => {
        setView({lat, lng, zoom: 16});
        setTimeout(() => {
            setView(null);
        }, 1000);
    };
    let navigate = useNavigate();
    const [showModalSettingMap, setShowModalSettingMap] = useState(false);
    const openModalSettingMap = () => {
        setShowModalSettingMap((prev) => !prev);
    };
    const [showModalShare, setShowModalShare] = useState(false);
    const openModalShare = () => {
        setShowModalShare((prev) => !prev);
    };
    const [showModalShareLive, setShowModalShareLive] = useState(false);
    const openModalShareLive = () => {
        setShowModalShareLive((prev) => !prev);
    };
    const [showModalShareLiveAdd, setShowModalShareLiveAdd] = useState(false);
    const openModalShareLiveAdd = () => {
        setShowModalShareLiveAdd((prev) => !prev);
    };


    //
    // useEffect(() => {
    //     if (devices.length === 0) {
    //         setMinmaximaze(false)
    //         toast.error("ردیابی افزوده نشده است", {
    //             position: toast.POSITION.BOTTOM_CENTER,
    //         });
    //
    //     }
    //
    // }, []);


    useEffect(() => {


        if (!checkInternet) {
            const hub = new HubConnectionBuilder()
                .withUrl(`${config.getApiBaseUrl()}/hub?token=${getToken()}`)
                .withAutomaticReconnect()
                .build();

            hub.on("Track", (track) => {


                let indexCarModel = 0

                for (let i = 0; i < deviceDetaile.length; i++) {
                    if (deviceDetaile[i].imei === track.imei) {
                        indexCarModel = i
                    }


                }


                let urlCarModel = "";

                if (track.speed > 20 && track.accFlag === true) {
                    urlCarModel = carModel[indexCarModel].iconMove;
                } else if (track.speed <= 20 && track.accFlag === true) {
                    urlCarModel = carModel[indexCarModel].iconInPlace;
                } else if (track.accFlag === false) {
                    urlCarModel = carModel[indexCarModel].iconStop;
                }
                let iconMarkup = ReactDOMServer.renderToStaticMarkup(
                    <img
                        src={`${config.getApiBaseUrl() + urlCarModel}?${Date.now()}`}
                        alt="car"
                        style={{
                            transform: `rotate(${track.direction}deg)`,
                            width: "32px",
                        }}
                    />
                );

                let customMarkerIcon = divIcon({
                    html: iconMarkup,
                });

                let deviceSelectednew = JSON.parse(localStorage.getItem("devcieSelected"))
                let markerData;

                if (deviceSelectednew.imei === track.imei) {

                    setFlagLocation(prev => ({
                        ...prev,
                        accFlag: track.accFlag ? "روشن" : "خاموش",
                        speed: Math.floor(track.speed)
                        ,
                        long: track.longitude
                        ,
                        lat: track.latitude
                        ,
                        // latestTrackDate: `${ConvertSecendsToTimeOneItem(diffDatesWithNow(track.deviceDate))} قبل`
                    }));


                    markerData = (
                        <>
                            <Marker
                                position={[track.latitude, track.longitude]}
                                icon={customMarkerIcon}
                            >

                            </Marker>
                            {track.imei === counterTrack.imei ?
                                <SetViewOnChange lat={track.latitude} lng={track.longitude}/> :
                                <SetViewOnChange lat={track.latitude} lng={track.longitude} zoom={16}/>}

                        </>
                    )
                } else {
                    markerData = (
                        <>
                            <Marker
                                position={[track.latitude, track.longitude]}
                                icon={customMarkerIcon}
                            >

                            </Marker>
                        </>
                    )
                }

                setDeviceDetaile((details) => {
                    // جستجوی شیء متناظر با imei در آرایه deviceDetaile
                    //.log(details);
                    const updatedDetails = details.map((detail) => {
                        if (detail.imei === track.imei) {
                            // به روزرسانی مقدار مربوطه
                            return {
                                ...detail,
                                marker: markerData, // مقدار جدید
                                lat: track.latitude,
                                long: track.longitude,
                                // latestTrackDate: ConvertSecendsToTimeOneItem(diffDatesWithNow(track.deviceDate)) + `قبل`,

                            };
                        }
                        return detail;
                    });

                    return updatedDetails;
                });

                // setDeviceDetaile(detail => ({ ...detail, marker: markerData }))
                // setDeviceDetaile(detail => ({ ...detail, latestTrackDate: ConvertSecendsToTime(diffDatesWithNow(track.deviceDate)) }))
                counterTrack = {
                    imei: track.imei,
                    counter: true
                }

            });

            hub.on("HeartBeat", (hb) => {

                // if (imei === hb.imei) {

                let deviceSelectednew = JSON.parse(localStorage.getItem("devcieSelected"))

                if (hb.imei === deviceSelectednew.imei) {


                    setFlagLocation(prev => ({
                        ...prev,
                        // latestHeartBeatDate: `${ConvertSecendsToTimeOneItem(diffDatesWithNow(hb.serverDate))} قبل`
                    }));

                }
            });

            hub.start().then(() => {

                hub.invoke("Join", `User:${userId}`);
            });
        }


    }, [checkInternet]);


    useEffect(() => {

        const fetchData = async (d) => {
            const url1 = `/api/Account/CarModel/${d.carModelId}`;
            const url2 = `/api/Account/Device/${d.id}/Location`;

            try {
                const res1 = await api.get(url1);
                carModel.push(res1.data);

                const res2 = await api.get(url2);
                const datares = res2.data;


                if (devcieSelected.imei !== d.imei) {
                    let urlCarModel = "";

                    if (datares.speed > 20 && datares.accFlag === true) {
                        urlCarModel = carModel[carModel.length - 1].iconMove;
                    } else if (datares.speed <= 20 && datares.accFlag === true) {
                        urlCarModel = carModel[carModel.length - 1].iconInPlace;
                    } else if (datares.accFlag === false) {
                        urlCarModel = carModel[carModel.length - 1].iconStop;
                    }

                    let iconMarkup = ReactDOMServer.renderToStaticMarkup(
                        <img
                            src={`${config.getApiBaseUrl() + urlCarModel}?${Date.now()}`}
                            alt="car"
                            style={{transform: `rotate(${datares.latestDirection}deg)`, width: "32px"}}
                        />
                    );

                    let customMarkerIcon = divIcon({
                        html: iconMarkup,
                    });

                    let markerData;


                    markerData = (
                        <>
                            <Marker
                                position={[datares.latestLatitude, datares.latestLongitude]}
                                icon={customMarkerIcon}
                            >
                            </Marker>
                        </>
                    )


                    const updatedDeviceDetaile = {
                        ownerName: d.ownerName,
                        carName: d.carName,
                        carColorName: d.carColorName,
                        deviceType: d.deviceType,
                        id: d.id,
                        imei: d.imei,
                        simCard: d.simCard,
                        // licenseExpiration:
                        //     datares.licenseExpiration === null
                        //         ? "اشتراک ندارد"
                        //         : FormJsonToShamsi(datares.licenseExpiration),
                        // latestHeartBeatDate: ` ${ConvertSecendsToTimeOneItem(diffDatesWithNow(datares.latestHeartBeatDate))} قبل`,
                        // latestTrackDate: `${ConvertSecendsToTimeOneItem(diffDatesWithNow(datares.latestTrackDate))} قبل`,
                        accFlag: datares.accFlag ? "روشن" : "خاموش",
                        speed: Math.floor(datares.speed),
                        lat: datares.latestLatitude,
                        long: datares.latestLongitude,
                        carModelId: d.carModelId,
                        marker: markerData,
                        // registrationDate: FormJsonToShamsi(d.registrationDate),
                    };

                    setDeviceDetaile(prevDeviceDetaile => [...prevDeviceDetaile, updatedDeviceDetaile]);


                }


            } catch (error) {

            }
        };


        devices.map((d) => {
            fetchData(d);
        })

    }, [checkInternet]);
    const fetchDataDeviceSelected = async (d) => {
        const url1 = `/api/Account/CarModel/${d.carModelId}`;
        const url2 = `/api/Account/Device/${d.id}/Location`;

        try {
            const res1 = await api.get(url1);
            carModel.push(res1.data);

            const res2 = await api.get(url2);
            const datares = res2.data;

            if (datares.success === false) {
                setValidateFlags(false);
                toast.error(datares.message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            } else {
                setValidateFlags(true);
                let urlCarModel = "";

                if (datares.speed > 20 && datares.accFlag === true) {
                    urlCarModel = carModel[carModel.length - 1].iconMove;
                } else if (datares.speed <= 20 && datares.accFlag === true) {
                    urlCarModel = carModel[carModel.length - 1].iconInPlace;
                } else if (datares.accFlag === false) {
                    urlCarModel = carModel[carModel.length - 1].iconStop;
                }

                let iconMarkup = ReactDOMServer.renderToStaticMarkup(
                    <img
                        src={`${config.getApiBaseUrl() + urlCarModel}?${Date.now()}`}
                        alt="car"
                        style={{transform: `rotate(${datares.latestDirection}deg)`, width: "32px"}}
                    />
                );

                let customMarkerIcon = divIcon({
                    html: iconMarkup,
                });

                let markerData;


                setFlagLocation({
                    accFlag: datares.accFlag ? "روشن" : "خاموش",
                    speed: Math.floor(datares.speed),
                    // latestHeartBeatDate: ` ${ConvertSecendsToTimeOneItem(diffDatesWithNow(datares.latestHeartBeatDate))} قبل`,
                    // latestTrackDate: `${ConvertSecendsToTimeOneItem(diffDatesWithNow(datares.latestTrackDate))} قبل`,
                    lat: datares.latestLatitude,
                    long: datares.latestLongitude,
                });
                markerData = (
                    <>
                        <Marker
                            position={[datares.latestLatitude, datares.latestLongitude]}
                            icon={customMarkerIcon}
                        >
                        </Marker>
                        <SetViewOnChange
                            lat={datares.latestLatitude}
                            lng={datares.latestLongitude}
                            zoom={16}
                        />
                    </>
                )


                const updatedDeviceDetaile = {
                    ownerName: d.ownerName,
                    carName: d.carName,
                    carColorName: d.carColorName,
                    deviceType: d.deviceType,
                    id: d.id,
                    imei: d.imei,
                    simCard: d.simCard,
                    // licenseExpiration:
                    //     datares.licenseExpiration === null
                    //         ? "اشتراک ندارد"
                    //         : FormJsonToShamsi(datares.licenseExpiration),
                    // latestHeartBeatDate: ` ${ConvertSecendsToTimeOneItem(diffDatesWithNow(datares.latestHeartBeatDate))} قبل`,
                    // latestTrackDate: `${ConvertSecendsToTimeOneItem(diffDatesWithNow(datares.latestTrackDate))} قبل`,
                    accFlag: datares.accFlag ? "روشن" : "خاموش",
                    speed: Math.floor(datares.speed),
                    lat: datares.latestLatitude,
                    long: datares.latestLongitude,
                    carModelId: d.carModelId,
                    marker: markerData,
                    // registrationDate: FormJsonToShamsi(d.registrationDate),
                };

                setDeviceDetaile(prevDeviceDetaile => [...prevDeviceDetaile, updatedDeviceDetaile]);


            }


        } catch (error) {
            setValidateFlags(false);
            let markerData = (
                <>
                    <SetViewOnChange
                        lat={positionFirstMap.lat}
                        lng={positionFirstMap.long}
                        zoom={3}
                    />
                </>
            );
            setDeviceDetaile([
                ...deviceDetaile,
                {
                    ownerName: d.ownerName,
                    carName: d.carName,
                    carColorName: d.carColorName,
                    deviceType: d.deviceType,
                    id: d.id,
                    imei: d.imei,
                    simCard: d.simCard,
                    latestHeartBeatDate: "تا کنون بدون ارتباط",
                    latestTrackDate: "تا کنون بدون موقعیت",
                    marker: markerData,
                    // registrationDate: FormJsonToShamsi(d.registrationDate),
                }
            ]);
            console.log(error)
            if (error.response.data.success === false) {

                toast.dismiss();
                toast.error(error.response.data.message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            } else {
                toast.dismiss();
                toast.error("خطا در ارتباط با سرور", {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            }
        }
    };
    useEffect(() => {
        if (devices.length > 0) {
            fetchDataDeviceSelected(devcieSelected);
        }
    }, [checkInternet]);


    useEffect(() => {
        if (devices.length > 0) {
            getObservers()
        }

    }, [devcieSelected]);

    const getObservers = () => {


        let url = `/api/Account/Device/${devcieSelected.id}/Observer`;

        api
            .get(`${url}`)
            .then((res) => {
                let accsessObserver = []
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].userId === user.userId) {
                        accsessObserver.push(res.data[i].remote)
                        accsessObserver.push(res.data[i].monitoring)
                        accsessObserver.push(res.data[i].report)
                    }
                }
                if (accsessObserver.length > 0) {
                    setAccsessObservers(accsessObserver)
                    if (!accsessObserver[1]){
                        navigate("/")
                    }
                } else {
                    setAccsessObservers([true, true, true])
                }
                console.log(accsessObserver)

            })
            .catch((error) => {
                console.log(error)
                setLoading(false);
                toast.dismiss();
                toast.error("خطا در ارتباط با سرور", {
                    position: toast.POSITION.BOTTOM_CENTER,
                });

            });


    }


    const [dataGeoFence, setDataGeoFence] = useState([]);
    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    const [point, setPoint] = useState(null);
    useEffect(() => {
        if (devices.length > 0) {
            getDataGeoFence()
        }

    }, []);

    const getDataGeoFence = () => {
        setLoading(true);
        let url = `/api/Account/Device/${devcieSelected.id}/GeoFence`;

        api
            .get(`${url}`)
            .then((res) => {
                setDataGeoFence(res.data)

                if (res.data.length > 0) {
                    let dataRes = res.data[res.data.length - 1]
                    setStartPoint({
                        lat: dataRes.vertices[0].latitude, lng: dataRes.vertices[0].longitude,
                    })
                    setEndPoint({
                        lat: dataRes.vertices[2].latitude, lng: dataRes.vertices[2].longitude,
                    })
                    setPoint([{
                        lat: dataRes.vertices[0].latitude, lng: dataRes.vertices[0].longitude,
                    }, {
                        lat: dataRes.vertices[1].latitude, lng: dataRes.vertices[1].longitude,
                    }, {
                        lat: dataRes.vertices[2].latitude, lng: dataRes.vertices[2].longitude,
                    }, {
                        lat: dataRes.vertices[3].latitude, lng: dataRes.vertices[3].longitude,
                    }])
                }


            })
            .catch((error) => {
                setLoading(false);
                toast.dismiss();
                toast.error("خطا در ارتباط با سرور", {
                    position: toast.POSITION.BOTTOM_CENTER,
                });

            });
    }


    const ChangeDevice = (value) => {
        // console.log(value)
        // let deviceSelectedNew;
        // deviceDetaile.map((detail) => {
        //     if (detail.imei === value.imei) {
        //         // به روزرسانی مقدار مربوطه
        //         deviceSelectedNew = {
        //             lat: detail.lat,
        //             long: detail.long,
        //             accFlag: detail.accFlag,
        //             speed: detail.speed,
        //             latestHeartBeatDate: detail.latestHeartBeatDate,
        //             latestTrackDate: detail.latestTrackDate,
        //         };
        //     }
        // });
        // console.log(deviceSelectedNew, "deviceSelectedNew")
        //
        // let accFlag = ""
        // if (deviceSelectedNew.accFlag === "خاموش") {
        //     accFlag = "خاموش"
        // } else if (deviceSelectedNew.accFlag === "روشن") {
        //     accFlag = "روشن"
        // } else if (deviceSelectedNew.accFlag === true) {
        //     accFlag = "روشن"
        // } else {
        //     accFlag = "خاموش"
        // }
        // setFlagLocation({
        //     accFlag: accFlag,
        //     speed: Math.floor(deviceSelectedNew.speed),
        //     latestHeartBeatDate: deviceSelectedNew.latestHeartBeatDate,
        //     latestTrackDate: deviceSelectedNew.latestTrackDate,
        //     lat: deviceSelectedNew.lat,
        //     long: deviceSelectedNew.long,
        // });
        // handlerViwe(deviceSelectedNew.lat, deviceSelectedNew.long)

        setDevcieSelected(value)
        fetchDataDeviceSelected(value)
    }

    const shareLocation = () => {
        const lat = flagsLocation.lat.toFixed(7); // latitude of location
        const long = flagsLocation.long.toFixed(7); // longitude of location


        let validIsDevice = window.navigator.appVersion;

        let url = ""
        if (validIsDevice.includes("Android")) {
            url = `geo:${lat},${long}`;
        } else if (validIsDevice.includes("iPhone")) {
            url = `maps://?ll=${lat},${long}`;
        }


        handleButtonClickShareCurrent(lat, long)


        // window.open(url);
    }

    const handleButtonClickShareCurrent = async (lat, long) => {
        const locationUrl = `https://maps.google.com/maps?f=q&q=${lat},${long}`;
        const title = `موقعیت خودرو ${devcieSelected.carName}`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: title,
                    url: locationUrl,
                });
            } else {
                console.log('Web Share API is not supported.');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const navigateLocation = () => {
        const lat = flagsLocation.lat; // latitude of location
        const long = flagsLocation.long; // longitude of location
        let validIsDevice = window.navigator.appVersion;

        let url = ""
        if (validIsDevice.includes("Android")) {
            url = `google.navigation:q=${lat},${long}&mode=d`;
        } else if (validIsDevice.includes("iPhone")) {
            url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
        }


        window.open(url);
    }


    const handlerminmaximaze = () => {
        setMinmaximaze(!minmaximaze)
    }


    const [mapType, setMapType] = useState('flat');
    const [mapTraffic, setMapTraffic] = useState(false);

    const handleFlatMap = () => {
        setMapType('flat');
    };

    const handleSatelliteMap = () => {
        setMapType('satellite');
    };
    const handleOSMMap = () => {
        setMapType('OSM');
    };


    const checkConnectServer = () => {
        setLoading(true);

        api
            .get(`/api/Account/Version?releaseType=pwa&${Math.floor(Math.random() * 1000)}`)
            .then((res) => {
                setLoading(false);
                setCheckInternet(false)

            })
            .catch((error) => {
                setLoading(false);
                setCheckInternet(true)
                toast.dismiss();
                toast.error("لطفا اتصال به اینترنت را چک کنید", {
                    position: toast.POSITION.BOTTOM_CENTER,
                });

            });
    }

    useEffect(() => {
        checkConnectServer()
    }, []);


    useEffect(() => {
        let value = JSON.parse(localStorage.getItem("mapType"));
        let valueTraffic = JSON.parse(localStorage.getItem("mapTraffic"));
        if (value === "FlatMap") {
            handleFlatMap()
        }
        if (value === "AirMap") {
            handleSatelliteMap()
        }
        if (value === "OSM") {
            handleOSMMap()
        }

        changeMapTraffic(valueTraffic)
    }, []);

    const changeMap = (value) => {
        if (value === "FlatMap") {
            handleFlatMap()
        }
        if (value === "AirMap") {
            handleSatelliteMap()
        }
        if (value === "OSM") {
            handleOSMMap()
        }
    }

    const changeMapTraffic = (value) => {
        setMapTraffic(value)
    }

    const {BaseLayer} = LayersControl;
    const position = [51.505, -0.09]

    return (
        <>
            <div className="w-full flex justify-center">



                    <div className="max-w-container w-full">
<NavbarPages title={"مشاهده آنلاین حمل و نقل"} url={-1}/>
                        <div className="middle-location">
                            <div className="options-map-location-container">

                            </div>

                            <MapContainer  center={[positionFirstMap.lat, positionFirstMap.long]} zoom={3.48} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {startPoint && endPoint && point && (<>
                                    <Rectangle bounds={[startPoint, endPoint]}
                                               pathOptions={{color: "green", fillOpacity: 0.05}}/>
                                    <CircleMarker center={startPoint} radius={5} pathOptions={{color: "red"}}/>
                                    <CircleMarker center={endPoint} radius={5} pathOptions={{color: "red"}}/>
                                    <CircleMarker center={{
                                        lat: point[1].lat, lng: point[1].lng,
                                    }} radius={5} pathOptions={{color: "red"}}/>
                                    <CircleMarker center={{
                                        lat: point[3].lat, lng: point[3].lng,
                                    }} radius={5} pathOptions={{color: "red"}}/>
                                </>)}

                                {deviceDetaile.length > 0 ? deviceDetaile.map((d) => {
                                    return (<>{d.marker}</>)
                                }) : null}
                                {view && <SetViewOnChange lat={view.lat} lng={view.lng} zoom={view.zoom} {...view} />}

                            </MapContainer>


                        </div>
                    </div>



            </div>
        </>
    )
}
