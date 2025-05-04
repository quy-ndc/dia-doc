import * as React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../../components/ui/input';
import { Message } from '../../assets/types/chat/message';
import { TextMessage } from './text-message';
import { SendHorizontal } from '../../lib/icons/SendHorizontal';
import GalleryAccess from './gallery-access';
import { ImageMessage } from './image-message';
import CameraAccess from './camera-access';
import { Animated as RNAnimated } from 'react-native';
import { ChevronDown } from '../../lib/icons/ChevronDown';
import { OrderBy, useChatConnection, useMessages, useOccupancy, usePresence, usePresenceListener } from '@ably/chat';
import { AtSign } from '../../lib/icons/AtSign';
import VoiceRecord from './voice-record';
import { ChevronRight } from '../../lib/icons/ChevronRight';
import useUserStore from '../../store/userStore';
import { Text } from '../../components/ui/text'
import { UserState } from '../../assets/enum/user-status';
import { useAppState } from '../../util/hook/useAppState';

type Prop = {
    setIsCameraOn: (state: boolean) => void
    newMessage: string
    setNewMessage: (newMessage: string) => void
    messages: Message[]
    handleSendMessage: (newMessage: string) => void
    handleSendImage: (image: string) => void
    onHistory: (historyItems: Message[]) => void
    onReceived: (message: Message) => void
}

export default function ChatModule({
    setIsCameraOn,
    newMessage,
    setNewMessage,
    messages,
    handleSendMessage,
    handleSendImage,
    onHistory,
    onReceived
}: Prop) {

    const { user } = useUserStore()
    const [showScrollButton, setShowScrollButton] = useState(false)
    const scrollViewRef = useRef<ScrollView>(null)
    const opacity = useRef(new RNAnimated.Value(0)).current
    const [showUtil, setShowUtil] = useState(true)
    const isBackground = useAppState()

    const ownId = user.id

    const onTextChange = (m: string) => {
        setNewMessage(m)
        if (showUtil && m !== '') {
            setShowUtil(false)
        }

        if (!showUtil && m == '') {
            setShowUtil(true)
        }
    }

    const toggleVisibility = (visible: boolean) => {
        RNAnimated.timing(opacity, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setShowScrollButton(visible);
        });
    };

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY < 400 && !showScrollButton) {
            toggleVisibility(true);
        } else if (offsetY > 400 && showScrollButton) {
            toggleVisibility(false);
        }
    };

    useEffect(() => {
        if (scrollViewRef.current) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    const scrollToTop = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }

    const { get } = useMessages()

    const { send } = useMessages({
        listener: (message) => {
            onReceived({
                id: message.message.clientId,
                type: message.message.metadata.type as 'text' | 'image',
                content: message.message.text,
                name: message.message.metadata.name as string,
                avatar: message.message.metadata.avatar as string,
                time: message.message.createdAt.toISOString()
            })
            console.log('Received message: ', message)
        },
    })

    const handleSend = () => {
        send({
            text: newMessage,
            metadata: {
                name: user.fullname,
                avatar: user.avatar
            }
        })
        setNewMessage('')
    }

    // const handleGetMessages = () => {
    //     get({ limit: 100, orderBy: OrderBy.OldestFirst })
    //         .then((result) => {
    //             onHistory(result.items.map(item => ({
    //                 clientId: item.clientId,
    //                 text: item.text,
    //                 time: item.createdAt.toISOString()
    //             })))
    //         })
    // }

    // useEffect(() => {
    //     handleGetMessages()
    // }, [])

    const { presenceData, error } = usePresenceListener({
        listener: (event) => {
            console.log('Presence event: ', event);
        },
    })

    const { update } = usePresence({
        enterWithData: { status: UserState.ONLINE },
        leaveWithData: { status: UserState.OFFLINE },
    })

    useEffect(() => {
        if (isBackground) {
            update({ status: UserState.OFFLINE })
        } else {
            update({ status: UserState.ONLINE })
        }
    }, [isBackground])

    // const { connections, presenceMembers } = useOccupancy({
    //     listener: (occupancyEvent) => {
    //         console.log('Number of users connected is: ', occupancyEvent.connections);
    //         console.log('Number of members present is: ', occupancyEvent.presenceMembers);
    //     },
    // })

    // console.log(presenceData)
    // console.log('error', error)

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <View className='relative h-full w-full items-center justify-center'>

                {/* <Pressable className="absolute top-2 left-1/2 -translate-x-1/2 flex-row gap-2 items-center z-50 px-4 py-2 rounded-full bg-blue-500 active:bg-blue-400">
                    <Text className='text-white text-sm font-semibold tracking-widest'>Tin nhắn mới</Text>
                    <ChevronUp className='text-white' size={17} />
                </Pressable> */}

                <ScrollView
                    className='w-full flex-col px-5'
                    ref={scrollViewRef}
                    contentContainerStyle={styles.messagesContainer}
                    keyboardShouldPersistTaps="handled"
                    onScroll={handleScroll}
                >
                    {messages.map((message, index) => (
                        message.type == 'text' ?
                            <TextMessage
                                key={index}
                                content={message.content}
                                time={message.time}
                                isOwn={message.id == ownId}
                            />
                            :
                            <ImageMessage
                                key={index}
                                content={message.content}
                                isOwn={message.id == ownId}
                            />
                    ))}
                    {/* <Text>Number of users connected is: {connections}</Text>
                    <Text>Number of members present is: {presenceMembers}</Text> */}
                    {/* <Text>{currentStatus}</Text>
                    <Text>{connectionStatus}</Text>
                    <Button variant={'default'} onPress={() => send({ text: 'Hello, World!' })}>
                        <Text>Send</Text>
                    </Button> */}
                </ScrollView>

                <View className='flex-row gap-1 justify-center items-center pt-2 pb-2'>
                    <View className={`flex-row items-center ${!showUtil && 'hidden'}`}>
                        <CameraAccess setIsCameraOn={(state) => setIsCameraOn(state)} />
                        <GalleryAccess onImagePick={(image) => handleSendImage(image)} />
                        <VoiceRecord setNewMessage={setNewMessage} />
                        <Pressable
                            className='px-3 py-4 rounded-xl active:bg-[var(--click-bg)]'
                            onPress={() => setNewMessage(`@AI ${newMessage}`)}
                        >
                            <AtSign className='text-foreground' size={20} />
                        </Pressable>
                    </View>
                    <Pressable
                        className={`px-3 py-4 rounded-xl active:bg-[var(--click-bg)] ${showUtil && 'hidden'}`}
                        onPress={() => setShowUtil(true)}
                    >
                        <ChevronRight className='text-foreground' size={20} />
                    </Pressable>
                    <Input
                        className='flex-1 rounded-full bg-[var(--input-bg)]'
                        value={newMessage}
                        onChangeText={onTextChange}
                        onFocus={() => setShowUtil(false)}
                        placeholder="Aa"
                        returnKeyType="send"
                        multiline
                        autoCapitalize='sentences'
                    />
                    <Pressable
                        className={`
                            p-4 rounded-full active:bg-[var(--click-bg)] disabled:opacity
                            ${newMessage == '' && 'opacity-50'}
                        `}
                        onPress={handleSend}
                        disabled={newMessage == ''}
                    >
                        {/* <SpinningLoader cn='text-foreground' /> */}
                        <SendHorizontal className='text-foreground' size={20} />
                    </Pressable>
                </View>

                <RNAnimated.View
                    style={{
                        opacity,
                        position: 'absolute',
                        bottom: 70,
                        left: '50%',
                        transform: [{ translateX: -20 }],
                    }}
                >
                    <Pressable
                        className='p-2 rounded-full justify-center items-center bg-[var(--go-up-btn-bg)] active:bg-[var(--go-up-click-bg)]'
                        onPress={scrollToTop}
                    >
                        <ChevronDown className='text-[var(--go-up-btn-icon)]' size={22} />
                    </Pressable>
                </RNAnimated.View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    messagesContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
});
