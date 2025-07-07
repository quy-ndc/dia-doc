import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../ui/text';

type Prop = {
    content: string
};

export function AiSuccessResponse({ content }: Prop) {

    return (
        <View className="flex-row justify-between w-full my-2 max-w-[70%]">
            <Pressable className={`flex-row items-center px-4 py-1.5 rounded-2xl bg-[--ownt-message-bg]`}>
                <Text className={`text-base tracking-wider text-[--ownt-message-text]`}>
                    {content}
                </Text>
            </Pressable>
            <View />
        </View>
    );
}
