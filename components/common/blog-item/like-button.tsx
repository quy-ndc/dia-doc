import { Text } from '~/components/ui/text'
import { Button } from "../../ui/button";
import { ThumbsUp } from "~/lib/icons/ThumbsUp";
import { useState } from "react";


type Prop = {
    liked: boolean
}

export default function LikeButton({ liked }: Prop) {

    const [isLiked, setIsLiked] = useState(liked)

    return (
        <Button
            variant={"ghost"}
            className="flex-row gap-3 items-center"
            onPress={() => setIsLiked(!isLiked)}
        >
            <ThumbsUp className={`${isLiked ? 'text-[var(--liked)]' : 'text-[var(--not-liked)]'}`} size={17} />
            <Text className={`text-base ${isLiked ? 'text-[var(--liked)] font-bold' : 'text-[var(--not-liked)]'}`}>{isLiked ? '11' : '10'}</Text>
        </Button>
    );
}