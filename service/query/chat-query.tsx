import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GetAllChatGroups, GetAllChatMessages, JoinAGroup, SendMessage } from "../api/chat-service"
import { MessageType } from "../../assets/enum/message-type"
import Toast from "react-native-toast-message"
import { QueryKeys } from "../../assets/enum/query"
import { ConversationType } from "../../assets/enum/conversation-type"

export const useGroupChatQuery = (params: {
    Cursor?: string
    PageSize?: number
    Type: ConversationType
}) => {
    const queryKey = [QueryKeys.GROUP_CHATS, params]
    const queryFn = async () => {
        return GetAllChatGroups(params)
    }

    return { queryKey, queryFn }
}

export const useChatMessagesQuery = (params: {
    conversationId: string
    Cursor?: string
    PageSize?: number
}) => {
    const queryKey = [QueryKeys.CHAT_MESSAGES, params]

    const queryFn = async ({ pageParam = undefined }) => {
        return GetAllChatMessages({
            conversationId: params.conversationId,
            Cursor: pageParam,
            PageSize: params.PageSize,
        })
    }

    return { queryKey, queryFn }
}

export const useSendMessageMutation = () => {
    return useMutation({
        mutationFn: (request: {
            conversationId: string,
            conversationType: number,
            content: string,
            mediaId: string,
            messageType: MessageType
        }) => SendMessage(request),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data?.data?.errors[0].message || 'Gửi tin nhắn thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            }
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

export const useJoinAGroupMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (request: {
            conversationId: string,
            invitedBy: string
        }) => JoinAGroup(request),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data?.data?.errors[0].message || 'Tham gia nhóm thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.GROUP_CHATS] })
                Toast.show({
                    type: 'success',
                    text1: 'Tham gia nhóm thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Tham gia nhóm thất bại',
                visibilityTime: 2000
            })
            return error;
        }
    })
}