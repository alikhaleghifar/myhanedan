import React from 'react'
import QrReader from "react-qr-scanner";

export const TransportPayment = () => {
    return (
        <>
            <main className="w-full flex justify-center">
                <div className="max-w-container w-full">

                    <QrReader
                        delay={100}
                        //style={previewStyle}
                        onError={(err) => {
                            console.error(err);
                        }}
                        onScan={(data) => {
                            console.log(data)
                        }}
                    />

                </div>

            </main>
        </>
    )
}
