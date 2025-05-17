import axios from "axios" 
import { endpointUser } from "../endpoint" 
import axiosServices from "../axios" 

export const GetUserProfile = async () => {

    try {
        const response = await axiosServices.get(`${endpointUser.GET_CURRENT_USER}`)

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

export const UpdateUserProfile = async (param: {
    dateOfBirth: string,
    genderType: number,
    bloodType: number,
    weight: number,
    height: number,
    diabetesType: number,
    medicalRecord?: any
}) => {
    try {
        const response = await axiosServices.put(`${endpointUser.EDIT_USER}`, {
            dateOfBirth: param.dateOfBirth,
            genderType: param.genderType,
            bloodType: param.bloodType,
            weight: param.weight,
            height: param.height,
            diabetesType: param.diabetesType,
            medicalRecord: param.medicalRecord
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