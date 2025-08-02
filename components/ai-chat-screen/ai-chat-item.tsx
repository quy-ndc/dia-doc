import * as React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { router } from 'expo-router'
import { AiSession } from '../../assets/types/chat/ai-session'
import { formatDateBlog } from '../../util/format-date-post'


type Prop = {
    item: AiSession
}

export default function AiChatItem({ item }: Prop) {

    return (
        <View className='px-2 py-2'>
            <Pressable
                className='flex-col w-full p-3 gap-2 bg-[var(--blog-bg)] active:bg-[var(--click-bg)] rounded-md relative'
                onPress={() => router.push({
                    pathname: 'ai-chat-screen',
                    params: {
                        title: item.title,
                        id: item.id
                    }
                })}
            >
                <Text className='text-lg font-bold capitalize tracking-wider'>{item.title}</Text>
                <Text className='text-sm tracking-wider'>{formatDateBlog(item.created_at)}</Text>
            </Pressable>
        </View>
    )
}