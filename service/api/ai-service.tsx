import axios from "axios"
import { endpointAI } from "../endpoint"
import axiosServices from "../axios"

export const GetAllAIMessage = async (userId: string) => {

    try {
        const response = await axiosServices.get(`${endpointAI.GET_ALL_MESSAGE_WITH_AI}/${userId}`)

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

export const SendMessageToAI = async (param: {
    user_id: string,
    query: string
}) => {

    try {
        const response = await axiosServices.post(`${endpointAI.SEND_MESSAGE_TO_AI}`, {
            user_id: param.user_id,
            query: param.query
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