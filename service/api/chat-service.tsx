import { MessageType } from "../../assets/enum/message-type"
import axiosServices from "../axios"
import { createQueryString, endpointChat } from "../endpoint"
import axios from 'axios'

export const GetAllChatGroups = async (params: {
    Cursor?: string
    PageSize?: number
    Sort?: string
    Direction?: string
    Search?: string
}) => {

    try {
        const queryString = createQueryString(params)
        const response = await axiosServices.get(`${endpointChat.GET_ALL_GROUP_CHAT}?${queryString}`)

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
            } 
        } else {
            return {
                success: false,
                status: 500,
                message: 'An unexpected error occurred',
                data: null
            } 
        }
    }
}

export const GetAllChatMessages = async (params: {
    groupId: string
    Cursor?: string
    PageSize?: number
    Sort?: string
    Direction?: string
    Search?: string
}) => {

    try {
        const queryString = createQueryString(params)
        const response = await axiosServices.get(`${endpointChat.GET_ALL_MESSAGES}?${queryString}`)

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
            } 
        } else {
            return {
                success: false,
                status: 500,
                message: 'An unexpected error occurred',
                data: null
            } 
        }
    }
}

export const SendMessage = async (request: {
    groupId: string
    content: string
    type: MessageType
}) => {

    try {
        const response = await axiosServices.post(`${endpointChat.SEND_MESSAGE}/${request.groupId}/messages`, {
            content: request.content,
            type: request.type
        })

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
            } 
        } else {
            return {
                success: false,
                status: 500,
                message: 'An unexpected error occurred',
                data: null
            } 
        }
    }
}