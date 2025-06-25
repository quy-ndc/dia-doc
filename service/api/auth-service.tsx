import axios from "axios"
import { endpointAuth } from "../endpoint"
import { LoginDoctorRequest, LoginPatientRequest } from "../type/auth-type"
import axiosServices from "../axios"



export const LoginPatient = async (request: LoginPatientRequest) => {

    try {
        const response = await axiosServices.post(`${endpointAuth.LOGIN_PATIENT}`, {
            zaloIdentityId: request.zaloIdentityId,
            fullName: request.fullName,
            avatar: request.avatar
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