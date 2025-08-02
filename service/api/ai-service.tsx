import axios from "axios"
import { createQueryString, endpointAI } from "../endpoint"
import axiosServices from "../axios"


export const GetAllSession = async (params: { user_id: string }) => {

    const queryString = createQueryString(params)
    try {
        const response = await axiosServices.get(`${endpointAI.GET_ALL_AI_SESSION}?${queryString}`)

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

export const DeleteSession = async (params: { session_id: string }) => {

    const queryString = createQueryString(params)
    try {
        const response = await axiosServices.delete(`${endpointAI.DELETE_AI_SESSION}?${queryString}`)

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

export const GetAllAIMessage = async (params: { session_id: string }) => {

    const queryString = createQueryString(params)
    try {
        const response = await axiosServices.get(`${endpointAI.GET_ALL_MESSAGE_WITH_AI}?${queryString}`)

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

export const SendMessageToAI = async (params: {
    content: string,
    user_id: string,
    session_id?: string
}) => {

    try {
        const response = await axiosServices.post(`${endpointAI.SEND_MESSAGE_TO_AI}`, {
            content: params.content,
            user_id: params.user_id,
            session_id: params.session_id
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