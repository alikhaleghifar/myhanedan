import axios, {interceptors} from "axios";
import config from "./config";
import {getToken} from "./auth";


const instance = axios.create({
    baseURL: config.getApiBaseUrl(),
    headers: {
        Authorization: `Bearer ${getToken()}`,
        accept: "application/json",
    },
});


instance.interceptors.response.use(
    response => {
        // اعمال منطق برای پاسخ موفقیت‌آمیز
        return response;
    },
    error => {
        // بررسی خطا و کد وضعیت
        console.log(error );
        if (error.response && error.response.status === 401) {

        }
        console.log("wwwwwwwwwwwwwwwwwwwwwww");

        // پاسخ خطا را به صورت اصلی برگردانید تا در ادامه کد قابل استفاده باشد
        return Promise.reject(error);
    }
);
const noTokenInstance = axios.create({
    baseURL: config.getApiBaseUrl(),
});

export const getWithoutToken = (url, params) => {
    return noTokenInstance.get(url, {params});
};


export const postWithoutToken = (url, data) => {
    console.log(getToken());
    return noTokenInstance.post(url, data);
};




export default instance;
