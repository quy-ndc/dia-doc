import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Pressable, View, Animated } from 'react-native';
import { Text } from '../ui/text';
import { formatDateMessage } from '../../util/format-date-message';
import { Image } from 'expo-image';
import Markdown from 'react-native-markdown-display'
import { useColorScheme } from '../../lib/useColorScheme'
import { GlobalColor } from '../../global-color';

type Prop = {
    name: string
    image: string
    content: string
    time: string
    isOwn: boolean
};

export function AiMessage({ name, image, content, time, isOwn }: Prop) {

    const { colorScheme } = useColorScheme()
    const [showTime, setShowTime] = useState(false)
    const opacityAnim = useRef(new Animated.Value(0)).current
    const userName = name ? name?.trim().split(' ').pop() : 'N/A'

    const ownTextColor = colorScheme == 'dark' ? GlobalColor.DARK_THEME_COL : GlobalColor.LIGHT_THEME_COL
    const oppoTextColor = colorScheme == 'dark' ? GlobalColor.LIGHT_THEME_COL : GlobalColor.DARK_THEME_COL

    useEffect(() => {
        Animated.timing(opacityAnim, {
            toValue: showTime ? 1 : 0,
            duration: 250,
            useNativeDriver: true,
        }).start()
    }, [showTime])

    return (
        <View className="flex-col py-1 justify-center items-center">
            <Animated.View
                style={{ opacity: opacityAnim }}
                className={`flex-row w-full justify-between items-center ${!showTime && 'hidden'}`}
            >
                {isOwn && <View />}
                <View className={`flex-row gap-4`}>
                    {!isOwn && (
                        <Text className='text-sm font-semibold tracking-wider'>{userName}</Text>
                    )}
                    <Text className={`text-sm text-[--fade-text-color] tracking-widest`}>
                        {formatDateMessage(time)}
                    </Text>
                </View>
                {!isOwn && <View />}
            </Animated.View>

            <View className="flex-row justify-between w-full my-2">
                {isOwn && <View />}
                <View className='flex-col gap-2 max-w-[85%]'>
                    {!isOwn && (
                        <Image
                            style={{ width: 30, height: 30, borderRadius: 1000 }}
                            source={image == '' ? require('../../assets/images/default-user.jpg') : image}
                            contentFit='contain'
                        />
                    )}
                    <Pressable
                        className={`flex-row items-center px-4 py-1.5 rounded-2xl ${isOwn ? 'bg-[--own-message-bg]' : 'bg-[--ownt-message-bg]'}`}
                        onPress={() => setShowTime(!showTime)}
                    >
                        <Markdown
                            style={{
                                body: {
                                    letterSpacing: 0.6,
                                    color: isOwn ? ownTextColor : oppoTextColor,
                                },
                            }}
                        >
                            {content}
                        </Markdown>
                    </Pressable>
                </View>
                {!isOwn && <View />}
            </View>
        </View>
    );
}
