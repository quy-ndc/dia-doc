import { useMutation } from "@tanstack/react-query"
import { QueryKeys } from "../../assets/enum/query"
import { DeleteSession, GetAllAIMessage, GetAllSession, SendMessageToAI } from "../api/ai-service"



export const useAiSessionQuery = (params: { user_id: string }) => {
    const queryKey = [QueryKeys.AI_SESSION]
    const queryFn = async () => {
        return GetAllSession(params)
    }

    return { queryKey, queryFn }
}

export const useAiChatQuery = (params: { session_id: string }) => {
    const queryKey = [QueryKeys.AI_CHAT, params.session_id]
    const queryFn = async () => {
        return GetAllAIMessage(params)
    }

    return { queryKey, queryFn }
}

export const useAiChatMutation = () => {
    return useMutation({
        mutationFn: (params: {
            content: string,
            user_id: string,
            session_id?: string
        }) => SendMessageToAI(params),
        onSuccess: (data) => {
            return data
        },
        onError: (error) => {
            return error
        }
    })
}

export const useDeleteAiSessionMutation = () => {
    return useMutation({
        mutationFn: (params: {
            session_id: string
        }) => DeleteSession(params),
        onSuccess: (data) => {
            return data
        },
        onError: (error) => {
            return error
        }
    })
}