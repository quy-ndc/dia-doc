import { useMutation } from "@tanstack/react-query"
import { GetAllChatGroups, GetAllChatMessages, SendMessage } from "../api/chat-service"
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