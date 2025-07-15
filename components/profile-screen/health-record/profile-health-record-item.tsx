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

export default function ProfileHealthRecordItem({ item }: Prop) {

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
            pathname: "/health-record-history-screen",
            params: { type: item.recordType }
        })
    }

    return (
        <Pressable
            style={{ width: width * 0.91 }}
            className={`p-4 gap-2 rounded-xl bg-[var(--blog-bg)] active:bg-[var(--click-bg)] w-full`}
            onPress={handlePress}
        >
            <View className='flex-row items-center gap-2 mb-3'>
                <RoundedIcon
                    background={recordDisplay.iconColor}
                    size={2}
                    icon={recordDisplay.icon}
                />
                <Text
                    style={{ color: recordDisplay.iconColor }}
                    className='text-base font-semibold tracking-wider capitalize'
                >
                    {recordDisplay.name}
                </Text>
            </View>
            <View className='flex-col gap-2'>
                <Text className='text-base font-bold tracking-widest'>
                    {getValue()}
                    <Text className='text-sm font-normal text-[var(--fade-text-color)]'> {recordDisplay.unit}</Text>
                </Text>
                <View className='flex-row w-full items-center justify-between'>
                    <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                        {item.mesurementAt ? `Đo ${formatDateBlog(item.mesurementAt)}` : 'Chưa có dữ liệu'}
                    </Text>
                    <View className='flex-row gap-1 items-center'>
                        <Text className='text-sm font-bold tracking-wider'>Lịch sử đo</Text>
                        <ChevronRight className='text-foreground' size={15} />
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
