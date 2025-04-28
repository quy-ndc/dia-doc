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
import { OrderBy, useChatConnection, useMessages } from '@ably/chat';
import { Text } from '../../components/ui/text'
import { AtSign } from '../../lib/icons/AtSign';
import VoiceRecord from './voice-record';
import { ChevronRight } from '../../lib/icons/ChevronRight';
import { ChevronUp } from '../../lib/icons/ChevronUp';
import { Button } from '../ui/button';
import useUserStore from '../../store/userStore';

type Prop = {
    setIsCameraOn: (state: boolean) => void
    newMessage: string
    setNewMessage: (newMessage: string) => void
    messages: Message[]
    handleSendMessage: (newMessage: string) => void
    handleSendImage: (image: string) => void
    onHistory: (historyItems: Array<{ clientId: string; text: string, time: string }>) => void
    onReceived: (text: string, time: string, id: string) => void
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
    const [showScrollButton, setShowScrollButton] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const opacity = useRef(new RNAnimated.Value(0)).current;
    const [showUtil, setShowUtil] = useState(true)

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
    };

    const { get } = useMessages();

    const { send } = useMessages({
        listener: (message) => {
            // handleSendMessage(message.message.text)
            onReceived(message.message.text, message.message.createdAt.toISOString(), message.message.clientId)
            console.log('Received message: ', message);
        },
    })

    const handleGetMessages = () => {
        get({ limit: 100, orderBy: OrderBy.OldestFirst })
            .then((result) => {
                onHistory(result.items.map(item => ({
                    clientId: item.clientId,
                    text: item.text,
                    time: item.createdAt.toISOString()
                })));
            });
    }

    useEffect(() => {
        handleGetMessages()
    }, [])

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
                        // onSubmitEditing={() => handleSendMessage(newMessage)}
                        multiline
                        autoCapitalize='sentences'
                    />
                    <Pressable
                        className='p-4 rounded-full active:bg-[var(--click-bg)]'
                        onPress={() => {send({ text: newMessage })}}
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
