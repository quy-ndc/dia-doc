import * as React from 'react';
import { Modal, View } from 'react-native';
import { Image } from 'expo-image';
import { Text } from '../../components/ui/text';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import ChatModule from '../../components/chat-screen/chat-module';
import CameraModule from '../../components/chat-screen/camera-module';
import { useEffect, useState } from 'react';
import { Message } from '../../assets/types/chat/message';
import { AllFeaturesEnabled, ChatRoomProvider } from '@ably/chat';
import useUserStore from '../../store/userStore';


export default function ChatScreen() {

    const { title, image } = useLocalSearchParams();
    const { user } = useUserStore()
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')


    const handleHistory = (historyItems: { clientId: string; text: string, time: string }[]) => {
        const historyMessages: Message[] = historyItems.map(h => ({
            id: h.clientId,
            type: 'text',
            content: h.text,
            time: h.time
        }));

        setMessages(prev => [...historyMessages, ...prev]);
    }

    const handleReceive = (text: string, time: string, id: string) => {
        const receivedMessage: Message = {
            content: text,
            id: id,
            time: time,
            type: 'text'
        }
        setMessages((prevMessages) => [...prevMessages, receivedMessage])
    }

    const handleSendMessage = (newMessage: string) => {
        if (newMessage.trim()) {
            const messageToSend: Message = {
                id: user.id,
                type: 'text',
                content: newMessage,
                time: new Date(Date.now()).toISOString()
            }
            setMessages((prevMessages) => [...prevMessages, messageToSend])
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
            <ChatRoomProvider id="thu-duc" options={AllFeaturesEnabled}>
                <ChatModule
                    setIsCameraOn={setIsCameraOn}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    messages={messages}
                    handleSendMessage={handleSendMessage}
                    handleSendImage={handleImageMessage}
                    onHistory={handleHistory}
                    onReceived={handleReceive}
                />
            </ChatRoomProvider>
        </>
    );
}