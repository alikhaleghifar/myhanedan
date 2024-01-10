import React from 'react'
import trackerTransportationImg from "../assets/image/icon/tracker.png"

export default function HeaderHome() {
    return (
        <div className="w-full green-low-clr-bg main-header-home p-4">
            <div className="">
                <p className="text-center font-bold">
                    علی خالقی فر
                </p>
            </div>
            <div className="flex w-full m-2 white-clr-bg bd-10 opacity-light">
                <div className="flex-col w-50 flex justify-center">
                    <p className="text-center p-2">
                        موجودی

                    </p>
                    <p className="text-center p-2">
                        555555555 هزار تومان
                    </p>
                </div>
                <div className="w-50">
                    <button className="w-full bd-10 border-none main-clr-bg white-clr p-2 h-full">
                        افزایش موجودی
                    </button>
                </div>
            </div>
            <div className="flex w-full m-2 white-clr-bg bd-10 opacity-light">
                <div className="flex-col w-50 flex justify-center">
                    <p className="text-center p-2">
                        امتیاز

                    </p>
                    <p className="text-center p-2">
                        555555555
                    </p>
                </div>
                <div className="w-50">
                    <button className="w-full bd-10 border-none green-clr-bg white-clr p-2 h-full">
                        استفاده از امتیاز
                    </button>
                </div>
            </div>

        </div>
    )
}
