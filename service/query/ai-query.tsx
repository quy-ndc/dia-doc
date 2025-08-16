import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QueryKeys } from "../../assets/enum/query"
import { DeleteSession, GenrateAINote, GetAllAIMessage, GetAllSession, SendMessageToAI, UpdateSession } from "../api/ai-service"
import Toast from "react-native-toast-message"

export const useAiSessionQuery = (params: { user_id: string }) => {
    const queryKey = [QueryKeys.AI_SESSION, params]
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
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: {
            session_id: string
        }) => DeleteSession(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail || 'Xóa thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.AI_SESSION] })
            }
            return data
        },
        onError: (error) => {
            return error
        }
    })
}

export const useUpdateAiSessionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params: {
            session_id: string,
            title: string,
            external_knowledge: boolean
        }) => UpdateSession(params),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail || 'Cập nhật thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.AI_CHAT] })
            }
            return data
        },
        onError: (error) => {
            return error
        }
    })
}

export const useGenerateAiNoteMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (recordId: string) => GenrateAINote(recordId),
        onSuccess: (data) => {
            if (data.status !== 200) {
                Toast.show({
                    type: 'error',
                    text1: data.data.detail || 'Tạo ghi chú AI thất bại',
                    text2: 'Vui lòng thử lại sau',
                    visibilityTime: 2000,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.HEALTH_RECORD] })
                Toast.show({
                    type: 'success',
                    text1: 'Tạo ghi chú AI thành công',
                    visibilityTime: 2000,
                })
            }
            return data
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Tạo ghi chú AI thất bại',
                text2: 'Vui lòng thử lại sau',
                visibilityTime: 2000,
            })
            return error
        }
    })
}