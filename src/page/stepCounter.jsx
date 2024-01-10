import React, { useState, useEffect } from 'react';

const StepCounter = () => {
    const [steps, setSteps] = useState(0);
    const [lastPosition, setLastPosition] = useState(null);

    useEffect(() => {
        let watchId;

        const handlePosition = (position) => {
            const { latitude, longitude } = position.coords;

            if (lastPosition) {
                // محاسبه فاصله بین دو نقطه (در اینجا فاصله تقریبی به عنوان فاصله مستقیم محاسبه شده است)
                const distance = Math.sqrt(
                    Math.pow(latitude - lastPosition.latitude, 2) +
                    Math.pow(longitude - lastPosition.longitude, 2)
                );

                // اگر فاصله بیشتر از حد مشخص (به عنوان یک مقدار ثابت) باشد، آن را به عنوان یک قدم محاسبه کنید
                const stepThreshold = 0.0001; // مقدار آستانه برای شمارش قدم‌ها
                if (distance > stepThreshold) {
                    setSteps((prevSteps) => prevSteps + 1);
                }
            }

            // به‌روزرسانی مکان آخرین
            setLastPosition({ latitude, longitude });
        };

        const handleError = (error) => {
            console.error(`Error getting GPS data: ${error.message}`);
        };

        // درخواست دسترسی به مکان
        navigator.geolocation.getCurrentPosition(handlePosition, handleError);

        // شروع نظارت بر تغییرات مکان
        watchId = navigator.geolocation.watchPosition(handlePosition, handleError);

        // Cleanup
        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, [lastPosition]);

    return (
        <div>
            <h1>قدم‌شمار اتوماتیک با GPS</h1>
            <p>تعداد قدم‌ها: {steps}</p>
        </div>
    );
};

export default StepCounter;
