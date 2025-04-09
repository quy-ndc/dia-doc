import * as React from 'react';
import { Modal, View } from 'react-native';
import { Image } from 'expo-image';
import { Text } from '../components/ui/text';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import ChatModule from '../components/chat-screen/chat-module';
import CameraModule from '../components/chat-screen/camera-module';
import { useEffect, useState } from 'react';
import { Message } from '../assets/types/chat/message';
import { AllFeaturesEnabled, ChatRoomProvider } from '@ably/chat';


export default function ChatScreen() {

    const { title, image } = useLocalSearchParams();

    const [messages, setMessages] = useState<Message[]>([
        { id: '1', type: 'text', content: 'a', time: '2025-2-12 08:06:26.753000' },
        { id: '1', type: 'text', content: 'a', time: '2025-2-11 08:06:26.753000' },
        { id: '2', type: 'text', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '2', type: 'text', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '1', type: 'text', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '2', type: 'text', content: 'aaaaaaaaaaa', time: '2024-11-01 08:06:26.753000' },
        { id: '1', type: 'text', content: 'ni ma de sha bi', time: '2024-11-01 08:06:26.753000' },
        { id: '2', type: 'text', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '1', type: 'text', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '2', type: 'text', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '2', type: 'text', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '2', type: 'text', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '1', type: 'text', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '2', type: 'text', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '2', type: 'text', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '1', type: 'text', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '2', type: 'text', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '2', type: 'text', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '1', type: 'image', content: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604342/Shirt_4_xkedmf.jpg', time: '2024-11-01 08:06:26.753000' },
        { id: '2', type: 'image', content: 'https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729604342/Shirt_4_xkedmf.jpg', time: '2024-11-01 08:06:26.753000' },
    ])

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (newMessage: string) => {
        if (newMessage.trim()) {
            const messageToSend: Message = {
                id: '1',
                type: 'text',
                content: newMessage,
                time: new Date(Date.now()).toISOString()
            }
            setMessages((prevMessages) => [...prevMessages, messageToSend]);
            setNewMessage('');
        }
    };

    const handleImageMessage = (url: string) => {
        const messageToSend: Message = {
            id: '1',
            type: 'image',
            content: url,
            time: new Date(Date.now()).toISOString()
        }
        setMessages((prevMessages) => [...prevMessages, messageToSend]);
        setNewMessage('');
    }

    const [isCameraOn, setIsCameraOn] = useState(false)

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: () =>
                        <View className={`flex-row gap-4 items-center`}>
                            <Image
                                style={{ width: 30, height: 30, borderRadius: 1000 }}
                                source={image}
                                contentFit='cover'
                            />
                            <Text className='text-xl font-bold'>{title}</Text>
                        </View>
                }}
            />
            <Modal
                visible={isCameraOn}
                animationType='fade'
                onRequestClose={() => setIsCameraOn(false)}
            >
                <CameraModule
                    setIsCameraOn={setIsCameraOn}
                    handleSendImage={handleImageMessage}
                />
            </Modal>
            <ChatRoomProvider id="readme-getting-started" options={AllFeaturesEnabled}>
                <ChatModule
                    setIsCameraOn={setIsCameraOn}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    messages={messages}
                    handleSendMessage={handleSendMessage}
                    handleSendImage={handleImageMessage}
                />
            </ChatRoomProvider>
        </>
    );
}