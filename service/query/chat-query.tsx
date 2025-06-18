import {  useMutation } from "@tanstack/react-query"
import { GetAllChatGroups, GetAllChatMessages, SendMessage } from "../api/chat-service"
import { MessageType } from "../../assets/enum/message-type"
import Toast from "react-native-toast-message"
import { QueryKeys } from "../../assets/enum/query"

export const useGroupChatQuery = (params: {
    Cursor?: string
    PageSize?: number
    Sort?: string
    Direction?: string
    Search?: string
}) => {
    const queryKey = [QueryKeys.GROUP_CHATS, params]
    const queryFn = async () => {
        return GetAllChatGroups(params)
    }

    return { queryKey, queryFn }
}

export const useChatMessagesQuery = (params: {
    groupId: string
    PageSize?: number
    Sort?: string
    Direction?: string
    Search?: string
}) => {
    const queryKey = [QueryKeys.CHAT_MESSAGES, params]

    const queryFn = async ({ pageParam = undefined }) => {
        return GetAllChatMessages({
            groupId: params.groupId,
            Cursor: pageParam,
            PageSize: params.PageSize,
            Sort: params.Sort,
            Direction: params.Direction,
            Search: params.Search,
        })
    }

    return { queryKey, queryFn }
}

export const useSendMessageMutation = () => {
    return useMutation({
        mutationFn: (data: {
            groupId: string
            content: string
            type: MessageType
        }) => SendMessage(data),
        onSuccess: (data) => {
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Gửi tin nhắn thất bại',
                visibilityTime: 2000
            })
            return error;
        }
    })
}