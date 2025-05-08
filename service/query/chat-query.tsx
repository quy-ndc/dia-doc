import { GetAllChatGroups } from "../api/chat-service"

export const useGroupChatQuery = (params: {
    Cursor?: string
    PageSize?: number
    Sort?: string
    Direction?: string
    Search?: string
}) => {
    const queryKey = ['group chat', params]
    const queryFn = async () => {
        return GetAllChatGroups(params)
    }

    return { queryKey, queryFn }
}