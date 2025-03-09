import * as React from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { Text } from '../components/ui/text';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import ChatModule from '../components/chat-screen/chat-module';
import CameraModule from '../components/chat-screen/camera-module';


export default function ChatScreen() {

    const { title, image } = useLocalSearchParams();

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: () =>
                        <View className='flex-row gap-4 items-center'>
                            <Image
                                style={{ width: 30, height: 30, borderRadius: 1000 }}
                                source={image}
                                contentFit='cover'
                            />
                            <Text className='text-xl font-bold'>{title}</Text>
                        </View>
                }}
            />
            {/* <CameraModule/> */}
            <ChatModule />
        </>
    );
}