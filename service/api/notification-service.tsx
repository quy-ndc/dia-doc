import axios from "axios"
import axiosServices from "../axios"
import { createQueryString, endpointNoti } from "../endpoint"


export const GetAllNotifications = async (params: {
    Cursor?: string
    PageSize?: number
}) => {

    try {
        const queryString = createQueryString(params)
        const response = await axiosServices.get(`${endpointNoti.GET_ALL_NOTIFICATION}?${queryString}`)

        return {
            success: true,
            status: response.status,
            data: response.data,
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                status: error.response.status,
                message: error.response.data.message || 'An error occurred',
                data: error.response.data
            };
        } else {
            return {
                success: false,
                status: 500,
                message: 'An unexpected error occurred',
                data: null
            };
        }
    }
}

export const UpdateNotification = async (data: string[]) => {

    try {
        const response = await axiosServices.patch(`${endpointNoti.UPDATE_NOTIFICATION}`, { data })

        return {
            success: true,
            status: response.status,
            data: response.data,
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                status: error.response.status,
                message: error.response.data.message || 'An error occurred',
                data: error.response.data
            };
        } else {
            return {
                success: false,
                status: 500,
                message: 'An unexpected error occurred',
                data: null
            };
        }
    }
}


export const DeleteNotification = async (id: string) => {

    try {
        const response = await axiosServices.delete(`${endpointNoti.DELETE_NOTIFICATION}/${id}`)

        return {
            success: true,
            status: response.status,
            data: response.data,
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                status: error.response.status,
                message: error.response.data.message || 'An error occurred',
                data: error.response.data
            };
        } else {
            return {
                success: false,
                status: 500,
                message: 'An unexpected error occurred',
                data: null
            };
        }
    }
}