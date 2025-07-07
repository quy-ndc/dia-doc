import { useMutation } from "@tanstack/react-query"
import { QueryKeys } from "../../assets/enum/query"
import { GetAllAIMessage, SendMessageToAI } from "../api/ai-service"

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
            return data
        },
        onError: (error) => {
            return error
        }
    })
}