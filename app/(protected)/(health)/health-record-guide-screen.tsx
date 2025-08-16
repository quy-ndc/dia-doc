import * as React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Dimensions, View } from 'react-native'
import { Text } from '../../../components/ui/text'
import { HealthRecordType } from '../../../assets/enum/health-record'
import { getHealthRecordDisplay } from '../../../assets/data/health-record-type'
import BloodSugarGuide from '../../../components/health-record-guide-screen/blood-sugar-guide'
import BloodPressureGuide from '../../../components/health-record-guide-screen/blodd-pressure-guide'

export default function HealthRecordHistoryScreen() {

    const { type } = useLocalSearchParams()

    const recordType = type as unknown as HealthRecordType
    const recordDisplay = getHealthRecordDisplay(recordType)

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: () =>
                        <View className={`flex-row gap-4 items-center`}>
                            <View
                                style={{ backgroundColor: recordDisplay.iconColor }}
                                className='p-2 rounded-full'
                            >
                                {recordDisplay.icon}
                            </View>
                            <View className='flex-col1'>
                                <Text className='text-lg font-bold tracking-wider capitalize'>
                                    Hướng chỉ số {recordDisplay.name}
                                </Text>
                                <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                                    Hướng dẫn đo lường
                                </Text>
                            </View>
                        </View>
                }}
            />
            {recordType == HealthRecordType.BLOOD_SUGAR ? (
                <BloodSugarGuide />
            ) : (
                <BloodPressureGuide />
            )}
        </>
    )
}