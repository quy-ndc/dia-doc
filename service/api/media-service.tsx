import axios from "axios"
import { createQueryString, endpointCategory, endpointMedia } from "../endpoint"
import axiosServices, { axiosClientUpload } from "../axios"

export const GetAllMedias = async (params: {
    Cursor?: string
    SearchContent?: string
    PageSize: number
    CategoryId?: string
    UserCreatedId?: string
    SortType?: number
    IsSortASC?: boolean
}) => {

    try {
        const queryString = createQueryString(params)
        const response = await axiosServices.get(`${endpointMedia.GET_ALL_MEDIAS}?${queryString}`)

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

export const GetMediaById = async (id: string) => {

    try {
        const response = await axiosServices.get(`${endpointMedia.GET_MEDIA_BY_ID}/${id}`)

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

export const GetAllCategories = async () => {

    try {
        const response = await axiosServices.get(`${endpointCategory.GET_ALL_CATEGORY}`)

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

export const GetTopMedias = async (params: {
    NumberOfPosts: number,
    NumberOfDays: number
}) => {

    try {
        const queryString = createQueryString(params)
        const response = await axiosServices.get(`${endpointMedia.GET_TOP_MEDIAS}?${queryString}`)

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

export const UploadImage = async (data: FormData) => {
    try {
        const response = await axiosClientUpload.post(`${endpointMedia.UPDATE_IMAGE}`, data )

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