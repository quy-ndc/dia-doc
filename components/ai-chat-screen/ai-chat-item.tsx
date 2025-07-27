import * as React from 'react'
import { Dimensions, Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { GlobalColor } from '../../global-color'
import { router } from 'expo-router'


const { height } = Dimensions.get('window')

export default function AiChatItem() {

    return (
        <View className='px-2'>
            <Pressable
                className='flex-col w-full p-3 gap-2 bg-[var(--blog-bg)] active:bg-[var(--click-bg)] rounded-md relative'
                onPress={() => router.push({
                    pathname: 'ai-chat-screen',
                    params: { title: 'Vấn đề về giấc ngủ' }
                })}
            >
                <Text className='text-lg font-bold tracking-wider'>Vấn đề về giấc ngủ</Text>
                <Text className='text-sm tracking-wider'>5 ngày trước</Text>
            </Pressable>
        </View>
    )
}