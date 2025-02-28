import * as React from 'react';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../../components/ui/text';
import { formatDateMessage } from '../../util/format-date-message';

type Prop = {
    content: string;
    time: string;
}

export function ReceivedMessage({ content, time }: Prop) {

    const [showTime, setShowTime] = useState(false)

    return (
        <View className='flex-col gap-4 justify-center items-center'>
            {showTime && (
                <Text className='text-[--fade-text-color]'>{formatDateMessage(time)}</Text>
            )}
            <View className='flex-row justify-between w-full rounded-xl my-1'>
                <Pressable
                    className='max-w-[70%] bg-[--ownt-message-bg] px-4 py-2 rounded-2xl '
                    onPress={() => setShowTime(!showTime)}
                >
                    <Text className='text-xl text-[--ownt-message-text] text-center tracking-wider'>
                        {content}
                    </Text>
                </Pressable>
                <View />
            </View>
        </View>
    );
}
export function OwnMessage({ content, time }: Prop) {

    const [showTime, setShowTime] = useState(false)

    return (
        <View className='flex-col gap-4 justify-center items-center'>
            {showTime && (
                <Text className='text-[--fade-text-color]'>{formatDateMessage(time)}</Text>
            )}
            <View className='flex-row justify-between w-full rounded-xl my-1'>
                <View />
                <Pressable
                    className='max-w-[70%] bg-[--own-message-bg] px-4 py-2 rounded-2xl '
                    onPress={() => setShowTime(!showTime)}
                >
                    <Text className='text-xl text-[--own-message-text] text-center tracking-wider'>
                        {content}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
