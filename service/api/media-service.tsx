import axios from "axios"
import { createQueryString, endpointMedia } from "../endpoint"

export const GetAllMedias = async (params: {
    PageIndex: number
    PageSize: number
    Title?: string
    Content?: string
    CategoryId?: string
    UserCreatedId?: string
    SortType?: number
    IsSortASC?: boolean
    SelectedColumns?: string[]
}) => {

    try {
        const queryString = createQueryString(params)
        const response = await axios.get(`${endpointMedia.GET_ALL_MEDIAS}?${queryString}`)

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