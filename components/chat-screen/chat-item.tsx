import * as React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '../../components/ui/text';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image'
import { truncateText } from '../../util/truncate-text';
import { formatDateBlog } from '../../util/format-date-post';
import { useMessages } from '@ably/chat';
import { useEffect, useState } from 'react';
import { MessageType } from '../../assets/enum/message-type';
import { useMessageStore } from '../../store/useMessage';

type Prop = {
    id: string
    img: string
    name: string
    user?: string
    time?: string
    message?: string
    type?: MessageType
    hasNewMessage?: boolean
}

export default function ChatItem({ id, img, name, user, time, message, type, hasNewMessage }: Prop) {

    const router = useRouter()

    const { getLatestMessage } = useMessageStore()

    const handleChatSelect = () => {
        router.push({
            pathname: '/chat-screen',
            params: {
                id: id,
                title: name,
                image: img
            }
        })
    }

    const displayMessage = getLatestMessage(id)
        ? `${getLatestMessage(id)?.user.fullName.trim().split(' ').pop()}: ${type === 1 ? 'Đã gửi một ảnh' : truncateText(getLatestMessage(id)?.content as string, 25)}`
        : 'Nhóm này chưa có tin nhắn'

    return (
        <Pressable
            onPress={handleChatSelect}
            className={`flex-row justify-between py-5 px-3 active:bg-[var(--click-bg)]`}
        >
            <Image
                style={{ width: 60, height: 60, borderRadius: 1000 }}
                source={img}
                contentFit='cover'
            />
            <View className='flex-col justify-center gap-2 w-[80%]'>
                <View className='flex-row justify-between items-center'>
                    <Text className={`text-xl tracking-wider ${hasNewMessage && 'font-bold'}`}>{name}</Text>
                    {time && (
                        <Text className={`text-sm tracking-wider ${hasNewMessage && 'font-bold'}`}>{formatDateBlog(time)}</Text>
                    )}
                </View>
                <Text className={`text-base tracking-wider ${hasNewMessage ? 'font-bold' : 'opacity-[60%]'}`}>
                    {displayMessage}
                </Text>
            </View>
        </Pressable>
    );
}