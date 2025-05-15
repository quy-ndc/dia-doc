import * as React from 'react';
import { Modal, View } from 'react-native';
import { Image } from 'expo-image';
import { Text } from '../../components/ui/text';
import { Stack, useLocalSearchParams } from 'expo-router';
import ChatModule from '../../components/chat-screen/chat-module';
import CameraModule from '../../components/chat-screen/camera-module';
import { useEffect, useState } from 'react';
import { Message } from '../../assets/types/chat/message';
import { AllFeaturesEnabled, ChatRoomProvider } from '@ably/chat';
import { ChannelProvider } from 'ably/react';
import { useChatMessagesQuery } from '../../service/query/chat-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MessageType } from '../../assets/enum/message-type';


export default function ChatScreen() {

    const { id, title, image } = useLocalSearchParams()
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')

    const {
        data,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        refetch,
        remove,
        isLoading,
    } = useInfiniteQuery({
        ...useChatMessagesQuery({
            groupId: id as string,
            PageSize: 30
        }),
        getNextPageParam: (lastPage) => {
            const groups = lastPage.data?.value?.groups
            return groups?.hasNextPage ? groups.nextCursor : undefined
        },
        keepPreviousData: false,
    })

    const allMessages: Message[] = data?.pages.flatMap(page => page.data?.value.messages.items || []) || []

    const handleHistory = (messages: Message[]) => {
        setMessages(prev => [...messages, ...prev]);
    }

    const handleReceive = (receivedMessage: Message) => {
        setMessages((prevMessages) => [...prevMessages, receivedMessage])
    }

    const handleSendMessage = (newMessage: Message) => {
        setMessages((prevMessages) => [...prevMessages, newMessage])
        setNewMessage('')
    }

    useEffect(() => {
        if (allMessages.length > 0) {
            handleHistory(allMessages)
        }
    }, [data])

    // const handleImageMessage = (url: string) => {
    //     const messageToSend: Message = {
    //         id: user.id,
    //         type: MessageType.PICTURE,
    //         content: url,
    //         createdDate: new Date(Date.now()).toISOString(),
    //         isRead: false,
    //         name: user.fullname,
    //         avatar: user.avatar
    //     }
    //     setMessages((prevMessages) => [...prevMessages, messageToSend]);
    //     setNewMessage('');
    // }

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
            {/* <Modal
                visible={isCameraOn}
                animationType='fade'
                onRequestClose={() => setIsCameraOn(false)}
            >
                <CameraModule
                    setIsCameraOn={setIsCameraOn}
                    handleSendImage={handleImageMessage}
                />
            </Modal> */}
            <ChatRoomProvider id={id} options={AllFeaturesEnabled}>
                <ChannelProvider channelName="message-read-latest">
                    <ChatModule
                        groupId={id as string}
                        setIsCameraOn={setIsCameraOn}
                        // newMessage={newMessage}
                        // setNewMessage={setNewMessage}
                        // messages={messages}
                        // handleSendMessage={handleSendMessage}
                        // handleSendImage={handleImageMessage}
                        onHistory={handleHistory}
                        onReceived={handleReceive}
                    />
                </ChannelProvider>
            </ChatRoomProvider>
        </>
    );
}