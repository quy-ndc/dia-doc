import * as React from 'react'
import { Dimensions, View } from "react-native"
import { Text } from "../../components/ui/text"
import { getHealthRecordDisplay } from '../../assets/data/health-record-type'
import { HealthRecordType } from '../../assets/enum/health-record'
import { BloodPressureRecord, HealthTrackItem } from '../../assets/types/user/health-track'
import { Clock } from '../../lib/icons/Clock'
import { formatTime } from '../../util/format-time'
import { formatDate } from '../../util/format-date'
import { PenLine } from '../../lib/icons/PenLine'
import { GlobalColor } from '../../global-color'
import { Bot } from '../../lib/icons/Bot'

type Prop = {
    item: HealthTrackItem
}

const { width } = Dimensions.get('window')

export default function HealthRecordHistoryItem({ item }: Prop) {

    if (item.healthRecord == undefined) return null

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

    return (
        <View
            style={{ width: width * 0.96, backgroundColor: recordDisplay.backgroundColor }}
            className={`p-4 gap-2 rounded-xl active:opacity-80`}
        >
            <View className='flex-col gap-4'>
                <View className='flex-row gap-1 items-center'>
                    <Text
                        style={{ color: recordDisplay.iconColor }}
                        className='text-3xl font-bold tracking-widest'
                    >
                        {getValue()}
                    </Text>
                    <Text className='text-base font-medium text-[var(--fade-text-color)]'> {recordDisplay.unit}</Text>
                </View>
                {item.mesurementAt ? (
                    <View className='flex-row items-center gap-2'>
                        <Clock className='text-foreground' size={18} />
                        <Text className='text-sm font-bold text-[var(--fade-text-color)] tracking-wider'>
                            {`${formatDate(item.mesurementAt)}  vào  ${formatTime(item.mesurementAt)}`}
                        </Text>
                    </View>
                ) : (
                    <Text className='text-sm text-[var(--fade-text-color)] tracking-wider'>
                        Chưa có dữ liệu
                    </Text>
                )}
                <View className='flex-row gap-2 items-center'>
                    <PenLine color={GlobalColor.CYAN_NEON_BORDER} size={17} />
                    <Text className='text-base font-medium tracking-wider'>
                        {!item.personNote || item.personNote == '' ? 'Không có ghi chú cá nhân' : item.personNote}
                    </Text>
                </View>
                <View className='flex-col gap-2'>
                    <Bot color={GlobalColor.BLUE_NEON_BORDER} size={17} />
                    <Text className='text-base font-medium tracking-wider'>
                        {item.assistantNote ? item.assistantNote : 'Không có lời khuyên từ tư vấn AI'}
                    </Text>
                </View>
            </View>
        </View>
    )
}
