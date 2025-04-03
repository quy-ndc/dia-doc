import * as React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable, Animated, Easing } from 'react-native';
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
import { useChatConnection, useMessages } from '@ably/chat';
import { Text } from '../../components/ui/text'
import { Button } from '../ui/button';

type Prop = {
    setIsCameraOn: (state: boolean) => void
    newMessage: string;
    setNewMessage: (newMessage: string) => void;
    messages: Message[]
    handleSendMessage: (newMessage: string) => void
    handleSendImage: (image: string) => void
}

export default function ChatModule({
    setIsCameraOn,
    newMessage,
    setNewMessage,
    messages,
    handleSendMessage,
    handleSendImage
}: Prop) {

    const [showScrollButton, setShowScrollButton] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const opacity = useRef(new RNAnimated.Value(0)).current;

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

    const ownId = '1'

    const { connectionStatus, send } = useMessages({
        listener: (message) => {
            console.log('Received message: ', message);
        },
    })

    const { currentStatus } = useChatConnection({
        onStatusChange: (statusChange) => {
            console.log('Connection status changed to: ', statusChange.current);
        },
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <View className='h-full w-full items-center justify-center'>
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
                    <Text>{connectionStatus}</Text>
                    <Text>{currentStatus}</Text>
                    <Button variant={'default'} onPress={() => send({ text: 'Hello, World!' })}>
                        <Text>Send</Text>
                    </Button>

                </ScrollView>

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

                <View className='flex-row gap-1 justify-center items-center pt-2 pb-2'>
                    <View className='flex-row items-center'>
                        <CameraAccess setIsCameraOn={(state) => setIsCameraOn(state)} />
                        <GalleryAccess onImagePick={(image) => handleSendImage(image)} />
                    </View>
                    <Input
                        className='flex-1 rounded-full bg-[var(--input-bg)]'
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Aa"
                        returnKeyType="send"
                        onSubmitEditing={() => handleSendMessage(newMessage)}
                        multiline
                        autoCapitalize='sentences'
                    />
                    <Pressable
                        className='p-4 rounded-full active:bg-[var(--click-bg)]'
                        onPress={() => handleSendMessage(newMessage)}
                    >
                        {/* <SpinningLoader cn='text-foreground' /> */}
                        <SendHorizontal className='text-foreground' size={20} />
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 30,
        height: 30,
        borderRadius: 1000
    },
    messagesContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
    },
});
