import { useMutation } from "@tanstack/react-query"
import { QueryKeys } from "../../assets/enum/query"
import { GetAllAIMessage, SendMessageToAI } from "../api/ai-service"
import Toast from "react-native-toast-message"

export const useAiChatQuery = (userId: string) => {
    const queryKey = [QueryKeys.AI_CHAT]
    const queryFn = async () => {
        return GetAllAIMessage(userId)
    }

    return { queryKey, queryFn }
}

export const useAiChatMutation = () => {
    return useMutation({
        mutationFn: (params: {
            user_id: string
            query: string
        }) => SendMessageToAI(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail || 'Gửi tin nhắn thất bại',
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
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error
        }
    })
}