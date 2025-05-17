import axios from "axios" 
import { endppointAuth } from "../endpoint" 
import { LoginDoctorRequest, LoginPatientRequest } from "../type/auth-type" 
import axiosServices from "../axios" 



export const LoginPatient = async (request: LoginPatientRequest) => {

    try {
        const response = await axiosServices.post(`${endppointAuth.LOGIN_PATIENT}`, {
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

export const LoginDoctor = async (request: LoginDoctorRequest): Promise<any> => {

    try {
        const response = await axiosServices.post(`${endppointAuth.LOGIN_DOCTOR}`, {
            email: request.email,
            password: request.password
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