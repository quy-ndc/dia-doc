import * as React from 'react'
import { View } from 'react-native'
import { Text } from '../../../components/ui/text'
import { useWelcomeGradientColors } from '../../../util/get-welcome-bg'
import useUserStore from '../../../store/userStore'

export default function HomeHeaderText() {

    const welcomeComponent = useWelcomeGradientColors()
    const { user } = useUserStore()
    const name = user.fullname.trim().split(/\s+/).pop() || ' '

    return (
        <View className='flex-col ml-5 gap-1'>
            <View className='flex-row gap-2 items-center'>
                {welcomeComponent.icon}
                <Text className='text-lg font-semibold tracking-wider capitalize'>{welcomeComponent.text}, {name}!</Text>
            </View>
            <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>{welcomeComponent.message}</Text>
        </View>
    )
}
