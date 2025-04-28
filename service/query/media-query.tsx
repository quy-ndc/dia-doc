import { GetAllMedias, GetMediaById } from "../api/media-service";

export const useMediaQuery = (params: {
    PageSize: number
    Title?: string
    Content?: string
    CategoryId?: string
    UserCreatedId?: string
    SortType?: number
    IsSortASC?: boolean
    SelectedColumns?: string[]
}) => {
    const queryKey = ['medias', params]

    const queryFn = async ({ pageParam = 1 }) => {
        return GetAllMedias({ PageIndex: pageParam, ...params });
    }

    return { queryKey, queryFn }
};

export const useNewMediaQuery = (params: {
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
    const queryKey = ['new medias', params]
    const queryFn = async () => {
        return GetAllMedias(params)
    }

    return { queryKey, queryFn }
};


export const useMediaByIdQuery = (id: string) => {
    const queryKey = ['media by id', id]
    const queryFn = async () => {
        return GetMediaById(id)
    }

    return { queryKey, queryFn }
}
