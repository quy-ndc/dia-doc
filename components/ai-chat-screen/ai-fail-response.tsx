import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../ui/text';
import { GlobalColor } from '../../global-color';

export function AiFailResponse() {

    return (
        <View className="flex-row justify-between w-full my-2 max-w-[70%]">
            <Pressable
                style={{ backgroundColor: GlobalColor.RED_NEON_BG }}
                className={`flex-row items-center px-4 py-1.5 rounded-md`}
            >
                <Text
                    style={{ color: GlobalColor.RED_NEON_BORDER }}
                    className={`text-base font-bold tracking-wider`}
                >
                    Có vấn đề khi trả lời câu hỏi, vui lòng thử lại sau
                </Text>
            </Pressable>
            <View />
        </View>
    );
}
