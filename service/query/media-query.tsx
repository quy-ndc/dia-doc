import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GetAllCategories, GetAllMedias, GetBookmarkMedia, GetLikeMedia, GetMediaById, GetTopCategories, GetTopMedias, ToggleBookmarkMedia, ToggleLikeMedia, UploadImage } from "../api/media-service"
import Toast from "react-native-toast-message"
import { QueryKeys } from "../../assets/enum/query"
import { invalidateBlogQuery } from "../../util/invalidate-blog-queries"

export const useMediaQuery = (params: {
    PageSize: number
    SearchContent?: string
    CategoryIds?: string[]
    UserCreatedId?: string
    SortType?: number
    IsSortASC?: boolean
    SelectedColumns?: string[]
}) => {
    const queryKey = [QueryKeys.MEDIAS, params]

    const queryFn = async ({ pageParam = undefined }) => {
        return GetAllMedias({
            ...params,
            Cursor: pageParam,
        })
    }

    return { queryKey, queryFn }
}

export const useMediaByIdQuery = (id: string) => {
    const queryKey = [QueryKeys.MEDIA_BY_ID, id]
    const queryFn = async () => {
        return GetMediaById(id)
    }

    return { queryKey, queryFn }
}


export const useTopMediaQuery = (params: {
    NumberOfPosts: number,
    NumberOfDays: number
}) => {
    const queryKey = [QueryKeys.TOP_MEDIAS, params]
    const queryFn = async () => {
        return GetTopMedias(params)
    }

    return { queryKey, queryFn }
}

export const useCategoryQuery = () => {
    const queryKey = [QueryKeys.CATEGORIES]
    const queryFn = async () => {
        return GetAllCategories()
    }

    return { queryKey, queryFn }
}

export const useTopCategoryQuery = (params: {
    NumberOfCategories: number
}) => {
    const queryKey = [QueryKeys.TOP_CATEGORIES]
    const queryFn = async () => {
        return GetTopCategories(params)
    }

    return { queryKey, queryFn }
}

export const useToggleBookmarkMediaMutation = (postId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => ToggleBookmarkMedia(postId),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: 'Lưu bài viết thất bại',
                    visibilityTime: 2000
                })
                return
            }
            invalidateBlogQuery(queryClient, postId)
            return data
        },
        onError: (error) => {
            return error
        }
    })
}

export const useBookmarkMediaQuery = (params: {
    PageSize: number
    SearchContent?: string
    CategoryIds?: string[]
    UserCreatedIds?: string
    SortType?: number
    IsSortASC?: boolean
    SelectedColumns?: string[]
}) => {
    const queryKey = [QueryKeys.BOOKMARK_MEDIA, params]

    const queryFn = async ({ pageParam = undefined }) => {
        return GetBookmarkMedia({
            ...params,
            Cursor: pageParam,
        })
    }

    return { queryKey, queryFn }
}

export const useLikeMediaQuery = (params: {
    PageSize: number
    SearchContent?: string
    CategoryIds?: string[]
    UserCreatedIds?: string
    SortType?: number
    IsSortASC?: boolean
    SelectedColumns?: string[]
}) => {
    const queryKey = [QueryKeys.LIKE_MEDIA, params]

    const queryFn = async ({ pageParam = undefined }) => {
        return GetLikeMedia({
            ...params,
            Cursor: pageParam,
        })
    }

    return { queryKey, queryFn }
}

export const useToggleLikeMediaMutation = (postId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => ToggleLikeMedia(postId),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: 'Thích bài viết thất bại',
                    visibilityTime: 2000
                })
                return
            }
            invalidateBlogQuery(queryClient, postId)
            return data
        },
        onError: (error) => {
            return error
        }
    })
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
            return error
        }
    })
}