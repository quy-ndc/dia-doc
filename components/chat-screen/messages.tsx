import * as React from 'react';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../../components/ui/text';
import { formatDateMessage } from '../../util/format-date-message';

type Prop = {
    content: string;
    time: string;
    isOwn: boolean
}


export function TextMessage({ content, time, isOwn }: Prop) {

    const [showTime, setShowTime] = useState(false)

    return (
        <View className='flex-col gap-4 justify-center items-center'>
            {showTime && (
                <Text className='text-[--fade-text-color]'>{formatDateMessage(time)}</Text>
            )}
            <View className='flex-row justify-between w-full my-1'>
                {isOwn && (
                    <View />
                )}
                <Pressable
                    className={`max-w-[70%] px-4 py-2 rounded-3xl ${isOwn ? 'bg-[--own-message-bg]' : 'bg-[--ownt-message-bg]'}`}
                    onPress={() => setShowTime(!showTime)}
                >
                    <Text className={`text-lg text-center tracking-wider ${isOwn ? 'text-[--own-message-text]' : 'text-[--ownt-message-text]'}`}>
                        {content}
                    </Text>
                </Pressable>
                {!isOwn && (
                    <View />
                )}
            </View>
        </View>
    );
}