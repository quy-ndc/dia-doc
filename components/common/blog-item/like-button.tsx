import { Text } from '../../../components/ui/text'
import { Heart } from '../../../lib/icons/Heart'
import { useEffect, useState } from "react"
import { Pressable } from 'react-native'
import { useToggleLikeMediaMutation } from '../../../service/query/media-query'
import { LikeStatus } from '../../../assets/enum/like-status'


type Prop = {
    liked: boolean
    count: number
    postId: string
}

export default function LikeButton({ liked, count, postId }: Prop) {

    const [isLiked, setIsLiked] = useState(liked)
    const [likeCount, setLikeCount] = useState(count)

    const { mutateAsync, data, isLoading } = useToggleLikeMediaMutation(postId)

    const onLiked = async () => {
        await mutateAsync()
    }

    useEffect(() => {
        if (!data || data.status !== 200) return
        const action = data.data.value.code
        if (action === LikeStatus.ADD_LIKE) {
            if (!isLiked) {
                setIsLiked(true)
                setLikeCount(prev => prev + 1)
            }
        } else {
            if (isLiked) {
                setIsLiked(false)
                setLikeCount(prev => prev - 1)
            }
        }
    }, [data])

    return (
        <Pressable
            className={`flex-row gap-2 items-center px-3 py-2 rounded-md active:bg-[var(--click-bg)] ${isLoading && 'opacity-80'}`}
            onPress={onLiked}
            disabled={isLoading}
        >
            <Heart
                className={`${isLiked ? 'text-[#FF3366]' : 'text-foreground'}`}
                size={17}
                fill={`${isLiked ? '#FF3366' : '#ffffff00'}`}
            />
            <Text
                style={{ marginBottom: 2 }}
                className={`text-base font-semibold`}
            >
                {likeCount}
            </Text>
        </Pressable>
    )
}



