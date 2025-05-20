import * as React from 'react';
import { Modal, View } from 'react-native';
import { Image } from 'expo-image';
import { Text } from '../../components/ui/text';
import { Stack, useLocalSearchParams } from 'expo-router';
import ChatModule from '../../components/chat-screen/chat-module';
import { useState } from 'react';
import { AllFeaturesEnabled, ChatRoomProvider } from '@ably/chat';
import { ChannelProvider } from 'ably/react';


export default function ChatScreen() {

    const { id, title, image } = useLocalSearchParams()

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
                    />
                </ChannelProvider>
            </ChatRoomProvider>
        </>
    );
}