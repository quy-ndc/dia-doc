import * as React from 'react';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Input } from '~/components/ui/input';
import { Message } from '~/assets/types/chat/message';
import { OwnMessage, ReceivedMessage } from '~/components/chat-screen/messages';
import { SendHorizontal } from '~/lib/icons/SendHorizontal';


export default function ChatScreen() {

    const router = useRouter()

    // useEffect(() => {
    //   router.push('/(main)/profile')
    // })

    const { title, image } = useLocalSearchParams();

    const [messages, setMessages] = useState<Message[]>([
        { id: '1', content: 'a', time: '2025-2-12 08:06:26.753000' },
        { id: '1', content: 'a', time: '2025-2-11 08:06:26.753000' },
        { id: '2', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '2', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '1', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '2', content: 'aaaaaaaaaaa', time: '2024-11-01 08:06:26.753000' },
        { id: '1', content: 'ni ma de sha bi', time: '2024-11-01 08:06:26.753000' },
        { id: '2', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '1', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '2', content: 'a', time: '2024-11-01 08:06:26.753000' },
        { id: '2', content: 'a', time: '2024-11-01 08:06:26.753000' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const messageToSend: Message = {
                id: '1',
                content: newMessage,
                time: new Date(Date.now()).toISOString()
            }
            setMessages((prevMessages) => [...prevMessages, messageToSend]);
            setNewMessage('');
        }
    };

    const ownId = '1'

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: () =>
                        <View className='flex-row gap-4 items-center'>
                            <Image
                                style={styles.image}
                                source={image}
                                contentFit='cover'
                            />
                            <Text className='text-xl font-bold'>{title}</Text>
                        </View>
                }}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <View className='flex-1 items-center justify-center' >

                    {/* MESSAGE AREA */}
                    <ScrollView
                        className='w-full flex-col px-5'
                        ref={scrollViewRef}
                        contentContainerStyle={styles.messagesContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        {messages.map((message, index) => (
                            message.id == ownId ? (
                                <OwnMessage
                                    key={index}
                                    content={message.content}
                                    time={message.time}
                                />
                            ) : (
                                <ReceivedMessage
                                    key={index}
                                    content={message.content}
                                    time={message.time}
                                />
                            )
                        ))}
                    </ScrollView>

                    {/* INPUT FIELD */}
                    <View className='flex-row pl-5 pt-2'>
                        <Input
                            style={styles.input}
                            value={newMessage}
                            onChangeText={setNewMessage}
                            placeholder="Aa"
                            returnKeyType="send"
                            onSubmitEditing={handleSendMessage}
                        />
                        <Button
                            onPress={handleSendMessage}
                            variant={'ghost'}
                        >
                            <SendHorizontal className='text-foreground' size={20} />
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>

        </>
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
