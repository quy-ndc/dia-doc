import { Text } from '~/components/ui/text'
import { ThumbsUp } from "~/lib/icons/ThumbsUp";
import { useState } from "react";
import { Pressable } from 'react-native';


type Prop = {
    liked: boolean
    detail?: boolean
}

export default function LikeButton({ liked, detail }: Prop) {

    const [isLiked, setIsLiked] = useState(liked)

    return (
        <Pressable
            className={`flex-row gap-3 items-center px-4 py-2 rounded-lg ${detail ? 'active:bg-[var(--detail-click-bg)]' : 'active:bg-[var(--click-bg)]'}`}
            onPress={() => setIsLiked(!isLiked)}
        >
            <ThumbsUp
                className={
                    `${isLiked ?
                        'text-[var(--liked)]' :
                        `${detail ?
                            'text-white' :
                            'text-[var(--not-liked)]'}`}`
                }
                size={17}
            />
            <Text
                className={
                    `text-base
                     ${isLiked ?
                        'text-[var(--liked)] font-bold' :
                        detail ?
                            'text-white' :
                            'text-[var(--not-liked)]'}`
                }
            >
                {isLiked ? '11' : '10'}
            </Text>
        </Pressable>
    );
}