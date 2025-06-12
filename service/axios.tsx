import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import useUserStore from "../store/userStore";
import Toast from "react-native-toast-message";

const axiosServices = axios.create({
    timeout: 50000,
});

const handleUnauthorized = () => {
    const { logout } = useUserStore.getState()
    logout()
    router.replace('/authen-screen')
    Toast.show({
        type: 'error',
        text1: 'Phiên đăng nhập hết hạn',
        visibilityTime: 2000
    })
}

axiosServices.interceptors.request.use(
    function (config) {
        const { user } = useUserStore.getState()
        if (user.accessToken !== '') {
            config.headers["Authorization"] = `Bearer ${user.accessToken}`
        }
        config.headers["Content-Type"] = "application/json"
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
);

axiosServices.interceptors.response.use(
    (res) => {
        if (
            res.headers["content-type"]?.includes("application/json") &&
            res.data
        ) {
            res.data = res.data;
        }
        return res;
    },
    async (err) => {
        if (err.response) {
            console.error(
                "Response error:",
                err.response.status,
                err.response.data
            );

            if (err.response && err.response.status === 401) {
                handleUnauthorized()
            }
        } else {
            console.error("Error:", err.message);
        }
        return Promise.reject(err);
    }
);

const axiosUpload = axios.create({
    timeout: 50000,
});

axiosUpload.interceptors.request.use(
    function (config) {
        const { user } = useUserStore.getState()
        if (user.accessToken !== '') {
            config.headers["Authorization"] = `Bearer ${user.accessToken}`;
        }
        config.headers["Content-Type"] = "multipart/form-data";
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error);
}

export const axiosClientUpload = axiosUpload;
export default axiosServices;