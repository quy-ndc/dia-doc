import { useMutation } from "@tanstack/react-query"
import { DeleteNotification, GetAllNotifications, UpdateNotification } from "../api/notification-service"
import { QueryKeys } from "../../assets/enum/query"

export const useNotificationQuery = (params: {
    PageSize?: number
}) => {
    const queryKey = [QueryKeys.NOTIFICATIONS, params]

    const queryFn = async ({ pageParam = undefined }) => {
        return GetAllNotifications({
            Cursor: pageParam,
            PageSize: params.PageSize,
        })
    }

    return { queryKey, queryFn }
}

export const useUpdateNotificationMutation = () => {
    return useMutation({
        mutationFn: (data: string[]) => UpdateNotification(data),
        onSuccess: (data) => {
            return data
        },
        onError: (error) => {
            return error;
        }
    })
}

export const useDeleteNotificationMutation = () => {
    return useMutation({
        mutationFn: (id: string) => DeleteNotification(id),
        onSuccess: (data) => {
            return data
        },
        onError: (error) => {
            return error;
        }
    })
}