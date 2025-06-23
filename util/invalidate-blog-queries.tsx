import { QueryClient } from "@tanstack/react-query"
import { QueryKeys } from "../assets/enum/query"

export const invalidateBlogQuery = (
    queryClient: QueryClient,
    postId: string
) => {
    // Invalidate Bookmarked Media
    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.LIKE_MEDIA,
    })
    queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.LIKE_MEDIA
    })

    // Invalidate Liked Media
    queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.BOOKMARK_MEDIA,
    })
    queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === QueryKeys.BOOKMARK_MEDIA
    })

    // Invalidate Detail Media
    queryClient.invalidateQueries({ queryKey: [QueryKeys.MEDIA_BY_ID, postId] })
    queryClient.refetchQueries({ queryKey: [QueryKeys.MEDIA_BY_ID, postId] })
}