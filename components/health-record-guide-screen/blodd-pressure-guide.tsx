import * as React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text } from '../../components/ui/text'
import { View } from 'react-native'
import { HealthRecordType } from '../../assets/enum/health-record'
import { GlobalColor } from '../../global-color'


export default function BloodPressureGuide() {

    const { type } = useLocalSearchParams()

    const recordType = type as unknown as HealthRecordType

    return (
        <>
            <View className='flex-col p-2 gap-2 items-center'>
                <Text className='text-xl font-bold tracking-wider px-3'>Ngưỡng huyết áp hiện tại của bạn</Text>
                <View className='flex-row items-center'>
                    <View className='flex-col'>
                        <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                            Mức độ
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.RED_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Tăng huyết áp độ 3
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.ORANGE_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Tăng huyết áp độ 2
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.YELLOW_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Tăng huyết áp độ 1
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.GREEN_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Bình thường cao
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.EMERALD_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Bình thường
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.PURPLE_NEON_BORDER }}
                            className='text-base p-3 text-white font-bold tracking-wider'
                        >
                            Thấp
                        </Text>
                    </View>
                    <View className='flex-col'>
                        <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                            Tâm thu
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
                            {`>160-180`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.YELLOW_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`140-160`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<130-140`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.EMERALD_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<90-130`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.PURPLE_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<90`}
                        </Text>
                    </View>
                    <View className='flex-col'>
                        <Text className='text-base p-3 font-bold tracking-wider bg-[var(--blog-bg)]'>
                            Tâm thu
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.RED_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`>110`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.ORANGE_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`>100-110`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.YELLOW_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`90-100`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<85-90`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.EMERALD_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<60-85`}
                        </Text>
                        <Text
                            style={{ backgroundColor: GlobalColor.PURPLE_NEON_BG }}
                            className='text-base p-3 font-bold tracking-wider'
                        >
                            {`<60`}
                        </Text>
                    </View>
                </View>
            </View>
        </>
    )
}