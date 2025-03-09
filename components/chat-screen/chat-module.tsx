import * as React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable, Animated, Easing } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../../components/ui/input';
import { Message } from '../../assets/types/chat/message';
import { TextMessage } from './text-message';
import { SendHorizontal } from '../../lib/icons/SendHorizontal';
import SpinningLoader from '../../components/common/icons/spinning-loader';
import { Camera } from '../../lib/icons/Camera';
import GalleryAccess from './gallery-access';
import { ImageMessage } from './image-message';


export default function ChatModule() {

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
    const scrollViewRef = useRef<ScrollView>(null);


    useEffect(() => {
        if (scrollViewRef.current) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    const handleSendMessage = () => {
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

    const ownId = '1'

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
                                time={message.time}
                                isOwn={message.id == ownId}
                            />
                    ))}
                </ScrollView>

                <View className='flex-row gap-1 justify-center items-center pt-2 pb-2'>
                    <View className='flex-row items-center'>
                        <Pressable
                            className='px-3 py-4 rounded-xl active:bg-[var(--click-bg)]'
                            onPress={handleSendMessage}
                        >
                            <Camera className='text-foreground' size={20} />
                        </Pressable>
                        <GalleryAccess onImagePick={handleImageMessage} />
                    </View>
                    <Input
                        className='flex-1 rounded-full bg-[var(--input-bg)]'
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Aa"
                        returnKeyType="send"
                        onSubmitEditing={handleSendMessage}
                        multiline
                        autoCapitalize='sentences'
                    />
                    <Pressable
                        className='p-4 rounded-full active:bg-[var(--click-bg)]'
                        onPress={handleSendMessage}
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
