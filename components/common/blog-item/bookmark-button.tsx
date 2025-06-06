import { Bookmark } from '../../../lib/icons/Bookmark';
import { useEffect, useState } from "react";
import { Pressable } from 'react-native';
import { useToggleBookmarkMediaMutation } from '../../../service/query/media-query';
import SpinningIcon from '../icons/spinning-icon';
import { Loader } from '../../../lib/icons/Loader';


type Prop = {
    postId: string
    bookmarked: boolean
}

export default function BookmarkButton({ postId, bookmarked }: Prop) {

    const [isBookmarked, setIsBookmarked] = useState(bookmarked)

    const { mutateAsync, data, isLoading } = useToggleBookmarkMediaMutation()

    const onBookmark = async () => {
        await mutateAsync(postId)
    }

    useEffect(() => {
        if (!data || data.status !== 200) return
        setIsBookmarked(!isBookmarked)
    }, [data])

    return (
        <Pressable
            className={`flex-row gap-3 items-center p-3 rounded-lg active:bg-[var(--click-bg)] ${isLoading && 'opacity-80'}`}
            onPress={onBookmark}
            disabled={isLoading}
        >
            {isLoading ? (
                <SpinningIcon icon={<Loader className='text-foreground' size={19} />} />
            ) : (
                <Bookmark
                    className={`text-foreground`}
                    fill={isBookmarked ? 'white' : 'none'}
                    size={19}
                />
            )}
        </Pressable>
    );
}