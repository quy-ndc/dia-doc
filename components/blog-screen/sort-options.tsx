import * as React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../ui/text'

type Prop = {
    icon: React.ReactNode
    text: string
    subText: string
    isChoosen: boolean
    onPress: () => void
}

export default function SortOptions({ icon, text, subText, isChoosen, onPress }: Prop) {

    return (
        <Pressable
            className='flex-row gap-4 px-3 py-3 w-full items-center rounded-md active:bg-[var(--click-bg)]'
            onPress={onPress}
        >
            {icon}
            <View className='flex-col gap-1'>
                <Text className={`text-left text-base capitalize tracking-widest ${isChoosen && 'font-bold'}`}>{text}</Text>
                <Text className={`text-left text-sm text-[var(--fade-text-color)] tracking-wider ${isChoosen && 'font-bold'}`}>{subText}</Text>
            </View>
        </Pressable>
    )
}