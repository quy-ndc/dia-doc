import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Pressable, View, Animated } from 'react-native';
import { Text } from '../ui/text';
import { formatDateMessage } from '../../util/format-date-message';

type Prop = {
    content: string;
    time: string;
    isOwn: boolean;
};

export function TextMessage({ content, time, isOwn }: Prop) {
    const [showTime, setShowTime] = useState(false);
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacityAnim, {
            toValue: showTime ? 1 : 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [showTime]);

    return (
        <View className="flex-col py-1 justify-center items-center">
            <Animated.View
                style={{ opacity: opacityAnim }}
                className={`flex-row w-full justify-between items-center ${!showTime && 'hidden'}`}
            >
                {isOwn && <View />}
                <Text className="text-sm text-[--fade-text-color] tracking-widest">
                    {formatDateMessage(time)}
                </Text>
                {!isOwn && <View />}
            </Animated.View>

            <View className="flex-row justify-between w-full my-2">
                {isOwn && <View />}
                <Pressable
                    className={`flex justify-center items-center max-w-[70%] px-4 py-1.5 rounded-2xl ${isOwn ? 'bg-[--own-message-bg]' : 'bg-[--ownt-message-bg]'}`}
                    onPress={() => setShowTime(!showTime)}
                >
                    <Text className={`text-lg tracking-wider ${isOwn ? 'text-[--own-message-text]' : 'text-[--ownt-message-text]'}`}>
                        {content}
                    </Text>
                </Pressable>
                {!isOwn && <View />}
            </View>
        </View>
    );
}
