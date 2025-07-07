import * as React from 'react';
import { Pressable, View, Animated, Easing } from 'react-native';
import { Text } from '../ui/text';
import { Skeleton } from '../ui/skeleton';
import { useEffect } from 'react';

export function AiLoadingResponse() {
    const fadeAnim = React.useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0.3,
                    duration: 700,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [fadeAnim]);

    return (
        <View className='flex-col gap-2 max-w-[70%]'>
            <View className="flex-row justify-between w-full my-2">
                <Pressable className={`flex-row items-center`}>
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <Text className={`text-base font-bold tracking-wider`}>
                            Đang suy nghĩ
                        </Text>
                    </Animated.View>
                </Pressable>
                <View />
            </View>
            <Skeleton className='w-[70%] h-5' />
            <Skeleton className='w-[80%] h-5' />
            <Skeleton className='w-[60%] h-5' />
        </View>
    );
}
