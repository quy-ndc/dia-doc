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

    const displayMessage = message
        ? `${user?.trim().split(' ').pop()}: ${type === 1 ? 'Đã gửi một ảnh' : truncateText(message, 25)}`
        : 'Nhóm này chưa có tin nhắn'

    const [latestMessage, setLatestMessage] = useState(displayMessage)

    useEffect(() => (
        setLatestMessage(displayMessage)
    ), [])

    const { } = useMessages({
        listener: (message) => {
            setLatestMessage(message.message.text)
            console.log('Received message: ', message)
        },
    })

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
                    {latestMessage}
                </Text>
            </View>
        </Pressable>
    );
}