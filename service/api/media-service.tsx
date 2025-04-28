import axios from "axios"
import { createQueryString, endpointMedia } from "../endpoint"
import axiosServices from "../axios"
// import axiosServices from "../axios"

export const GetAllMedias = async (params: {
    PageIndex: number
    PageSize: number
    Title?: string
    Content?: string
    CategoryId?: string
    UserCreatedId?: string
    SortType?: number
    IsSortASC?: boolean
    electedColumns?: string[]
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

    // const config = useAuthHeader()

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