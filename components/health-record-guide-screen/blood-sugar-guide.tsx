import * as React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text } from '../../components/ui/text'
import { View } from 'react-native'
import { HealthRecordType } from '../../assets/enum/health-record'
import { GlobalColor } from '../../global-color'

export default function BloodSugarGuide() {

    const { type } = useLocalSearchParams()

    const recordType = type as unknown as HealthRecordType

    return (
        <View className='flex-col p-2 gap-2 items-center'>
            <Text className='text-xl font-bold tracking-wider px-3'>Ngưỡng đường huyết hiện tại của bạn</Text>
            <View className='flex-row items-center'>
                <View className='flex-col'>
                    <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                        Mức độ
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.RED_NEON_BORDER }}
                        className='text-base p-3 text-white font-bold tracking-wider'
                    >
                        Rất cao
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.ORANGE_NEON_BORDER }}
                        className='text-base p-3 text-white font-bold tracking-wider'
                    >
                        Cao
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.GREEN_NEON_BORDER }}
                        className='text-base p-3 text-white font-bold tracking-wider'
                    >
                        Bình thường
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.YELLOW_NEON_BORDER }}
                        className='text-base p-3 text-white font-bold tracking-wider'
                    >
                        Thấp
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.PURPLE_NEON_BORDER }}
                        className='text-base p-3 text-white font-bold tracking-wider'
                    >
                        Rất thấp
                    </Text>
                </View>
                <View className='flex-col'>
                    <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                        Trước ăn
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.RED_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`>130`}
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.ORANGE_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`>130`}
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`70-130`}
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.YELLOW_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`<54-69`}
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.PURPLE_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`<54-69`}
                    </Text>
                </View>
                <View className='flex-col'>
                    <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                        Sau ăn
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.RED_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`>180`}
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.ORANGE_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`>180`}
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`70-179`}
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.YELLOW_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`<54-69`}
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.PURPLE_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`<54-69`}
                    </Text>
                </View>
                <View className='flex-col'>
                    <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                        Chưa ăn
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.RED_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`>130`}
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.ORANGE_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`>130`}
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`70-130`}
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.YELLOW_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`<54-69`}
                    </Text>
                    <Text
                        style={{ backgroundColor: GlobalColor.PURPLE_NEON_BG }}
                        className='text-base p-3 font-bold tracking-wider'
                    >
                        {`<54-69`}
                    </Text>
                </View>
            </View>
        </View>
    )
}