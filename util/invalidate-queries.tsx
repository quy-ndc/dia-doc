import { QueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../assets/enum/query";

export const invalidateQuery = (queryClient: QueryClient) => {
    queryClient?.invalidateQueries({ queryKey: [QueryKeys.USER] })
    queryClient?.invalidateQueries({ queryKey: [QueryKeys.DOCTOR] })

    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.HEALTH_RECORD,
    })
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.HEALTH_RECORD,
    })

    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.HEALTH_CARE_PLAN,
    })
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.HEALTH_CARE_PLAN,
    })
    
    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.CARE_PLAN_TEMPLATE,
    })
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.CARE_PLAN_TEMPLATE,
    })
    
    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.GROUP_CHATS,
    })
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.GROUP_CHATS,
    })

    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.CHAT_MESSAGES,
    })
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.CHAT_MESSAGES,
    })

    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.MEDIAS,
    })
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.MEDIAS,
    })

    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.NEW_MEDIAS,
    })
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.NEW_MEDIAS,
    })

    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.MEDIA_BY_ID,
    })
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.MEDIA_BY_ID,
    })

    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.TOP_MEDIAS,
    })
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.TOP_MEDIAS,
    })

    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.CATEGORIES,
    })
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.CATEGORIES,
    })

    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.TOP_CATEGORIES,
    })
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.TOP_CATEGORIES,
    })

    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.BOOKMARK_MEDIA,
    })
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.BOOKMARK_MEDIA,
    })

    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.LIKE_MEDIA,
    })
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.LIKE_MEDIA,
    })

    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.NOTIFICATIONS,
    })
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.NOTIFICATIONS,
    })
}