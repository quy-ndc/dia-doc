import * as React from 'react'
import { Dimensions, Pressable, View } from "react-native"
import { Text } from "../../../components/ui/text"
import { getHealthRecordDisplay } from '../../../assets/data/health-record-type'
import { HealthRecordType } from '../../../assets/enum/health-record'
import { formatDateBlog } from '../../../util/format-date-post'
import { BloodPressureRecord, HealthTrackItem } from '../../../assets/types/user/health-track'
import { router } from 'expo-router'

type Prop = {
    item: HealthTrackItem
}

const { width } = Dimensions.get('window')

export default function HealthTrackerItem({ item }: Prop) {

    const recordDisplay = getHealthRecordDisplay(item.recordType)

    const getValue = () => {
        if (!item.healthRecord) return '0'

        if (item.recordType === HealthRecordType.BLOOD_PRESSURE) {
            const bpRecord = item.healthRecord as BloodPressureRecord
            return bpRecord?.systolic && bpRecord?.diastolic
                ? `${bpRecord.systolic}/${bpRecord.diastolic}`
                : 'N/A'
        }
        return (item.healthRecord as any).value ?? 'N/A'
    }

    const handlePress = () => {
        router.push({
            pathname: "/update-record-screen",
            params: { type: item.recordType, lastMesurement: getValue() }
        })
    }

    return (
        <Pressable
            style={{
                backgroundColor: recordDisplay.backgroundColor,
                width: width * 0.44
            }}
            className={`p-4 gap-2 rounded-xl active:scale-95 w-full`}
            onPress={handlePress}
        >
            <View className='flex-row items-center gap-3 mb-3'>
                <View
                    style={{ backgroundColor: recordDisplay.iconColor }}
                    className='p-2 rounded-lg'
                >
                    {recordDisplay.icon}
                </View>
                <Text className='text-base font-semibold tracking-wider capitalize'>{recordDisplay.name}</Text>
            </View>
            <View className='flex-col gap-2'>
                <Text className='text-base font-bold tracking-widest'>
                    {getValue()}
                    <Text className='text-sm font-normal text-[var(--fade-text-color)]'> {recordDisplay.unit}</Text>
                </Text>
                <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                    {item.mesurementAt ? `Đo ${formatDateBlog(item.mesurementAt)}` : 'Chưa có dữ liệu'}
                </Text>
            </View>
        </Pressable>
    )
}
