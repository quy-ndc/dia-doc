import * as React from 'react'
import { Text } from '../../../components/ui/text'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Pressable, View } from 'react-native'
import { getHealthRecordDisplay } from '../../../assets/data/health-record-type'
import { HealthRecordType } from '../../../assets/enum/health-record'
import WeightUpdateModule from '../../../components/update-record-screen/weight-update-module'
import HeightUpdateModule from '../../../components/update-record-screen/height-update-module'
import BloodSugarUpdateModule from '../../../components/update-record-screen/blood-sugar-module/blood-sugar-module'
import BloodPressureUpdateModule from '../../../components/update-record-screen/blood-pressure-module'
import Hb1AcUpdateModule from '../../../components/update-record-screen/hba1c-module'
import IconButton from '../../../components/common/icon-button'
import { History } from '../../../lib/icons/History'
import { CircleAlert } from '../../../lib/icons/CircleAlert'
import { GlobalColor } from '../../../global-color'
import BmiUpdateModule from '../../../components/update-record-screen/bmi-update-module'

const updateModules = {
    [HealthRecordType.WEIGHT]: WeightUpdateModule,
    [HealthRecordType.HEIGHT]: HeightUpdateModule,
    [HealthRecordType.BLOOD_SUGAR]: BloodSugarUpdateModule,
    [HealthRecordType.BLOOD_PRESSURE]: BloodPressureUpdateModule,
    [HealthRecordType.HBA1C]: Hb1AcUpdateModule,
    [HealthRecordType.BMI]: BmiUpdateModule,
} as const

function getUpdateModule(type: HealthRecordType) {
    return updateModules[type] || updateModules[HealthRecordType.WEIGHT]
}

export default function UpdateRecordScreen() {
    const { type, lastMesurement, time, id } = useLocalSearchParams()
    const recordType = type as unknown as HealthRecordType
    const recordDisplay = getHealthRecordDisplay(recordType)
    const UpdateModule = getUpdateModule(recordType)

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
                                <Text className='text-lg font-bold tracking-wider'>{recordDisplay.name}</Text>
                                <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                                    Theo dõi {recordDisplay.name}
                                </Text>
                            </View>
                        </View>,
                    headerRight: () => recordType == HealthRecordType.BLOOD_SUGAR || recordType == HealthRecordType.BLOOD_PRESSURE || recordType == HealthRecordType.HBA1C ?
                        <IconButton
                            icon={<CircleAlert color={GlobalColor.BLUE_NEON_BORDER} size={18} />}
                            buttonSize={3}
                            possition={'other'}
                            onPress={() => {
                                router.push({
                                    pathname: "/health-record-guide-screen",
                                    params: { type: recordType }
                                })
                            }}
                        /> : null
                }}
            />
            <View className='flex-1 relative'>
                <UpdateModule
                    lastMesurement={lastMesurement as string}
                    initialTime={time as string}
                    id={id as string}
                />
                <Pressable
                    style={{ backgroundColor: recordDisplay.iconColor }}
                    className='flex absolute bottom-5 right-7 p-4 items-center justify-center rounded-full active:opacity-80'
                    onPress={() => {
                        router.push({
                            pathname: "/health-record-history-screen",
                            params: { type: recordType }
                        })
                    }}
                >
                    <History className='text-white' size={17} />
                </Pressable>
            </View>
        </>
    )
}