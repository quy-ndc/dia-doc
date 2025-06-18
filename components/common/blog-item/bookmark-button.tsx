import { Bookmark } from '../../../lib/icons/Bookmark';
import { useEffect, useState } from "react";
import { Pressable, useColorScheme } from 'react-native';
import { useToggleBookmarkMediaMutation } from '../../../service/query/media-query';
import { GlobalColor } from '../../../global-color';
import { BookmarkStatus } from '../../../assets/enum/bookmark-status';

type Prop = {
    postId: string
    bookmarked: boolean
}

export default function BookmarkButton({ postId, bookmarked }: Prop) {

    const theme = useColorScheme()
    const [isBookmarked, setIsBookmarked] = useState(bookmarked)
    const { mutateAsync, data, isLoading } = useToggleBookmarkMediaMutation(postId)

    const onBookmark = async () => {
        await mutateAsync()
    }

    useEffect(() => {
        if (!data || data.status !== 200) return
        if (data.data.value.code == BookmarkStatus.ADD_BOOKMARK) {
            setIsBookmarked(true)
        } else {
            setIsBookmarked(false)
        }
    }, [data])

    const bookmarkFill = theme == 'dark' ? GlobalColor.LIGHT_THEME_COL : GlobalColor.DARK_THEME_COL

    return (
        <Pressable
            className={`flex-row gap-3 items-center p-3 rounded-lg active:bg-[var(--click-bg)] ${isLoading && 'opacity-80'}`}
            onPress={onBookmark}
            disabled={isLoading}
        >
            <Bookmark
                className={`text-foreground`}
                fill={isBookmarked ? bookmarkFill : 'none'}
                size={19}
            />
        </Pressable>
    );
}