import axios from "axios"
import { endpointAuth } from "../endpoint"
import axiosServices from "../axios"

export const LoginUser = async (data: {
    phoneNumber: string,
    password: string
}) => {

    try {
        const response = await axios.post(`${endpointAuth.LOGIN_PHONE}`, {
            phoneNumber: data.phoneNumber,
            password: data.password,
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            }
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const Logout = async () => {

    try {
        const response = await axiosServices.delete(`${endpointAuth.LOGOUT}`)

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            }
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const RegisterUser = async (data: {
    phoneNumber: string,
    password: string
}) => {

    try {
        const response = await axios.post(`${endpointAuth.REGISTER_PHONE}`, {
            phoneNumber: data.phoneNumber,
            password: data.password
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            }
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const VerifyPhone = async (data: {
    phoneNumber: string,
    otp: string
}) => {

    try {
        const response = await axiosServices.post(`${endpointAuth.VERIFY_PHONE}`, {
            phoneNumber: data.phoneNumber,
            otp: data.otp
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            }
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}


export const ResendOtp = async (phoneNumber: string) => {

    try {
        const response = await axiosServices.post(`${endpointAuth.RESEND_PHONE}`, {
            phoneNumber: phoneNumber
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            }
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const RefreshToken = async (refreshToken: string) => {
    try {
        const response = await axiosServices.post(`${endpointAuth.REFRESH_TOKEN}`, {
            refreshToken
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            }
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const SaveFcmToken = async (fcmToken: string) => {
    try {
        const response = await axiosServices.post(`${endpointAuth.SAVE_FCM_TOKEN}`, {
            fcmToken: fcmToken
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            }
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const ChangePassword = async (params: {
    otp: string,
    oldPassword: string,
    newPassword: string
}) => {
    try {
        const response = await axiosServices.patch(`${endpointAuth.CHANGE_PASSWORD}`, {
            otp: params.otp,
            oldPassword: params.oldPassword,
            newPassword: params.newPassword
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            }
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const ForgotPassword = async (phoneNumber: string) => {
    try {
        const response = await axiosServices.post(`${endpointAuth.FORGOT_PASSWORD}`, {
            phoneNumber: phoneNumber
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            }
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}

export const ResetPassword = async (params: {
    phoneNumber: string,
    otp: string,
    password: string
}) => {
    try {
        const response = await axiosServices.patch(`${endpointAuth.RESET_PASSWORD}`, {
            phoneNumber: params.phoneNumber,
            otp: params.otp,
            password: params.password
        })

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            }
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}


export const ResendOtpChangePassword = async () => {
    try {
        const response = await axiosServices.post(`${endpointAuth.RESEND_OTP_CHANGE_PASSWORD}`)

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return {
                success: false,
                status: e.response.status,
                message: e.response.data.message || 'An error occurred',
                data: e.response.data
            }
        }

        return {
            success: false,
            status: 500,
            message: 'An error occurred',
            data: null
        }
    }
}