import * as React from 'react'
import { Dimensions, View } from 'react-native'
import { Text } from '../ui/text'

const { width } = Dimensions.get('window')

type Prop = {
    icon: React.ReactNode
    topText: string
    bottomText: string
}

export default function FeatureItem({ icon, topText, bottomText }: Prop) {

    return (
        <View
            style={{ width: width * 0.85 }}
            className='flex-row px-4 py-3 gap-3 items-center bg-[var(--blog-bg)] rounded-md'
        >
            <View className='p-3 justify-center items-center bg-[var(--blue-dynamic-bg)] rounded-full'>
                {icon}
            </View>
            <View className='flex-col gap-1'>
                <Text className='text-sm tracking-wider font-semibold'>{topText}</Text>
                <Text className='text-[var(--fade-text-color)] text-sm tracking-wider'>{bottomText}</Text>
            </View>
        </View>
    )
}