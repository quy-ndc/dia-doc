import * as React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from '../../components/ui/text';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image'
import { truncateText } from '../../util/truncate-text';
import { formatDateBlog } from '../../util/format-date-post';

type Prop = {
    // id: string;
    img: string;
    name: string;
    time: string;
    message: string;
    hasNewMessage: boolean
}

export default function ChatItem({ img, name, time, message, hasNewMessage }: Prop) {

    const router = useRouter()

    const handleChatSelect = () => {
        router.push({
            pathname: '/chat-screen',
            params: {
                title: name,
                image: img
            }
        })
    }

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
            <View className='flex-col justify-center gap-1 w-[80%]'>
                <View className='flex-row justify-between items-center'>
                    <Text className={`text-xl ${hasNewMessage && 'font-bold'}`}>{name}</Text>
                    <Text className={`text-sm ${hasNewMessage && 'font-bold'}`}>{formatDateBlog('2025-02-17T16:19:20')}</Text>
                </View>
                <Text className={`${hasNewMessage ? 'font-bold' : 'opacity-[60%]'}`}>{truncateText(message, 40)}</Text>
            </View>
        </Pressable>
    );
}