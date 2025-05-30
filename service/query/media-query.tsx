import { useMutation } from "@tanstack/react-query";
import { GetAllCategories, GetAllMedias, GetMediaById, GetTopMedias, UploadImage } from "../api/media-service";
import Toast from "react-native-toast-message";

export const useMediaQuery = (params: {
    PageSize: number
    SearchContent?: string
    CategoryId?: string
    UserCreatedId?: string
    SortType?: number
    IsSortASC?: boolean
    SelectedColumns?: string[]
}) => {
    const queryKey = ['medias', params]

    const queryFn = async ({ pageParam = undefined }) => {
        return GetAllMedias({
            ...params,
            Cursor: pageParam,
        })
    }

    return { queryKey, queryFn }
}

export const useNewMediaQuery = (params: {
    PageIndex: number
    PageSize: number
    SearchContent?: string
    CategoryId?: string
    UserCreatedId?: string
    SortType?: number
    IsSortASC?: boolean
    SelectedColumns?: string[]
}) => {
    const queryKey = ['new medias', params]
    const queryFn = async () => {
        return GetAllMedias(params)
    }

    return { queryKey, queryFn }
}

export const useMediaByIdQuery = (id: string) => {
    const queryKey = ['media by id', id]
    const queryFn = async () => {
        return GetMediaById(id)
    }

    return { queryKey, queryFn }
}


export const useTopMediaQuery = (params: {
    NumberOfPosts: number,
    NumberOfDays: number
}) => {
    const queryKey = ['top medias', params]
    const queryFn = async () => {
        return GetTopMedias(params)
    }

    return { queryKey, queryFn }
}

export const useCategoryQuery = () => {
    const queryKey = ['categories']
    const queryFn = async () => {
        return GetAllCategories()
    }

    return { queryKey, queryFn }
}

export const useUploadImageMutation = () => {
    return useMutation({
        mutationFn: (data: FormData) => UploadImage(data),
        onSuccess: (data) => {
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Gửi hình ảnh thất bại',
                visibilityTime: 2000
            })
            return error;
        }
    })
}