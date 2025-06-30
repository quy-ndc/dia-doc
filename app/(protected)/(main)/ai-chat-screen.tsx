import * as React from 'react';
import { Text } from '../../../components/ui/text';
import { Dimensions, View } from 'react-native';


const { height } = Dimensions.get('window')

export default function AiChatScreen() {

    return (
        <View className='flex-1 items-center justify-center'>
            <Text className='text-2xl font-bold'>Ai Chat</Text>
        </View>
    );
}