import * as React from 'react';
import { Text } from '../../components/ui/text';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { getHealthRecordDisplay } from '../../assets/data/health-record-type';
import { HealthRecordType } from '../../assets/enum/health-record';
import WeightUpdateModule from '../../components/update-record-screen/weight-update-module';
import HeightUpdateModule from '../../components/update-record-screen/height-update-module';
import BloodSugarUpdateModule from '../../components/update-record-screen/blood-sugar-module';
import BloodPressureUpdateModule from '../../components/update-record-screen/blood-pressure-module';
import Hb1AcUpdateModule from '../../components/update-record-screen/hba1c-module';


export default function UpdateRecordScreen() {

    const { type, lastMesurement } = useLocalSearchParams()
    const recordType = type as unknown as HealthRecordType
    const recordDisplay = getHealthRecordDisplay(recordType)
    console.log(recordType)

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
                                <Text className='text-lg font-bold tracking-wider capitalize'>{recordDisplay.name}</Text>
                                <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                                    Theo dõi {recordDisplay.name}
                                </Text>
                            </View>
                        </View>
                }}
            />
            {recordType == HealthRecordType.WEIGHT ? (
                <WeightUpdateModule type={recordType} lastMesurement={lastMesurement as string} />
            ) : recordType == HealthRecordType.HEIGHT ? (
                <HeightUpdateModule type={recordType} lastMesurement={lastMesurement as string} />
            ) : recordType == HealthRecordType.BLOOD_SUGAR ? (
                <BloodSugarUpdateModule type={recordType} lastMesurement={lastMesurement as string} />
            ) : recordType == HealthRecordType.BLOOD_PRESSURE ? (
                <BloodPressureUpdateModule type={recordType} lastMesurement={lastMesurement as string} />
            ) : recordType == HealthRecordType.HBA1C ? (
                <Hb1AcUpdateModule type={recordType} lastMesurement={lastMesurement as string} />
            ) : (
                <WeightUpdateModule type={recordType} lastMesurement={lastMesurement as string} />
            )}
        </>
    );
}