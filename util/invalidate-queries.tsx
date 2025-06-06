import { QueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../assets/enum/query";

export const invalidateQuery = (queryClient: QueryClient) => {
    // queryClient?.invalidateQueries({ queryKey: [QueryKeys.USER] })
    queryClient?.invalidateQueries({ queryKey: [QueryKeys.GROUP_CHATS] })
    queryClient?.invalidateQueries({ queryKey: [QueryKeys.CHAT_MESSAGES] })
    queryClient?.invalidateQueries({ queryKey: [QueryKeys.MEDIAS] })
    queryClient?.invalidateQueries({ queryKey: [QueryKeys.NEW_MEDIAS] })
    queryClient?.invalidateQueries({ queryKey: [QueryKeys.MEDIA_BY_ID] })
    queryClient?.invalidateQueries({ queryKey: [QueryKeys.TOP_MEDIAS] })
    queryClient?.invalidateQueries({ queryKey: [QueryKeys.CATEGORIES] })
    queryClient?.invalidateQueries({ queryKey: [QueryKeys.NOTIFICATIONS] })
}