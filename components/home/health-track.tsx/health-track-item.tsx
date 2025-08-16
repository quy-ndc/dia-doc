import * as React from 'react'
import { Dimensions, Pressable, View } from "react-native"
import { Text } from "../../../components/ui/text"
import { getHealthRecordDisplay } from '../../../assets/data/health-record-type'
import { HealthRecordType } from '../../../assets/enum/health-record'
import { formatDateBlog } from '../../../util/format-date-post'
import { BloodPressureRecord, HealthTrackItem } from '../../../assets/types/user/health-track'
import { router } from 'expo-router'
import { ChevronRight } from '../../../lib/icons/ChevronRight'
import RoundedIcon from '../../common/icons/rouned-icon'

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

    const getTimeText = () => {
        if (item.mesurementAt) {
            const date = new Date(item.mesurementAt)
            const now = new Date()
            if (date > now) {
                return 'Đã đo'
            } else {
                return `Đo ${formatDateBlog(item.mesurementAt)}`
            }
        } else {
            return 'Chưa có dữ liệu'
        }
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
            <View className='flex-row items-center gap-2 mb-3'>
                <RoundedIcon
                    background={recordDisplay.iconColor}
                    size={2}
                    icon={recordDisplay.icon}
                />
                <Text className='text-base font-semibold tracking-wider capitalize'>{recordDisplay.name}</Text>
            </View>
            <View className='flex-col gap-2'>
                <Text className='text-base font-bold tracking-widest'>
                    {getValue()}
                    <Text className='text-sm font-normal text-[var(--fade-text-color)]'> {recordDisplay.unit}</Text>
                </Text>
                <View className='flex-row items-center w-full justify-between'>
                    <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                        {getTimeText()}
                    </Text>
                    <ChevronRight className='text-foreground' size={15} />
                </View>
            </View>
        </Pressable>
    )
}
