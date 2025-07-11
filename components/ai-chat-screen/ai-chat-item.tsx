import * as React from 'react'
import { Dimensions, Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { GlobalColor } from '../../global-color'
import { router } from 'expo-router'


const { height } = Dimensions.get('window')

export default function AiChatItem() {

    return (
        <View className=''>
            <Pressable
                style={{ borderColor: GlobalColor.BLUE_NEON_BORDER, borderRightWidth: 4 }}
                className='flex-col w-full p-3 gap-2 bg-[var(--blog-bg)] active:bg-[var(--click-bg)] rounded-md relative'
                onPress={() => router.push({
                    pathname: 'ai-chat-screen',
                    params: { title: 'Vấn đề về giấc ngủ' }
                })}
            >
                <Text className='text-lg font-bold tracking-wider'>Vấn đề về giấc ngủ</Text>
                <Text className='text-sm tracking-wider'>5 ngày trước</Text>
                <Text
                    style={{ backgroundColor: GlobalColor.BLUE_NEON_BORDER, borderTopLeftRadius: 100, borderBottomLeftRadius: 100 }}
                    className='absolute bottom-0 right-0 text-sm text-white font-bold px-4 py-1 tracking-wider'
                >
                    5 tin nhắn
                </Text>
            </Pressable>
        </View>
    )
}