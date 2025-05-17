import { Bookmark } from '../../../lib/icons/Bookmark'
import { useState } from "react"
import { Pressable } from 'react-native'


type Prop = {
    bookmarked: boolean
    detail?: boolean
}

export default function BookmarkButton({ bookmarked, detail }: Prop) {

    const [isBookmarked, setIsBookmarked] = useState(bookmarked)
    
    return (
        <Pressable
            className={`flex-row gap-3 items-center p-3 rounded-lg ${detail ? 'active:bg-[var(--detail-click-bg)]' : 'active:bg-[var(--click-bg)]'}`}
            onPress={() => setIsBookmarked(!isBookmarked)}
        >
            <Bookmark
                className={`text-foreground`}
                fill={isBookmarked ? 'white' : 'none'}
                size={19}
            />
        </Pressable>
    )
}