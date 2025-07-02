import * as React from 'react'
import { View } from 'react-native'
import { Text } from '../../ui/text'
import { GlobalColor } from '../../../global-color'
import { HealthCarePlan } from '../../../assets/types/user/healthcare-plan'
import { getHealthRecordDisplay } from '../../../assets/data/health-record-type'
import { formatTime } from '../../../util/format-time'
import { Check } from '../../../lib/icons/Check'
import { X } from '../../../lib/icons/X'
import { getHealthCarePlanPeriodString, getHealthCarePlanSubTypeString } from '../../../assets/data/healthcare-plan'
import { Clock } from '../../../lib/icons/Clock'

type Prop = {
    item: HealthCarePlan
}

export default function HealthcarePlanItem({ item }: Prop) {

    const recordDisplay = getHealthRecordDisplay(item.recordType)
    const period = getHealthCarePlanPeriodString(item.period)
    const subType = getHealthCarePlanSubTypeString(item.subtype)

    return (
        <View className='flex-row justify-between items-center px-3 py-4 mt-3 rounded-xl bg-[var(--blog-bg)]'>
            <View className='flex-col gap-3'>
                <View className='flex-row items-center gap-3'>
                    <View
                        style={{ backgroundColor: recordDisplay.backgroundColor }}
                        className='p-3 rounded-full'
                    >
                        {recordDisplay.coloredIcon}
                    </View>
                    <View className='flex-col gap-1'>
                        <Text className='text-base font-bold tracking-widest capitalize'>Đo {recordDisplay.name}</Text>
                        <View className='flex-row items-center gap-2'>
                            <Clock color={GlobalColor.BLUE_NEON_BORDER} size={15} />
                            <Text className='text-sm text-[var(--fade-text-color)] tracking-widest'>{formatTime(item.scheduledAt)}</Text>
                        </View>
                    </View>
                </View>
                <View className='flex-row items-center gap-2'>
                    <Text className='text-sm font-semibold px-4 py-1 rounded-full tracking-wider bg-[var(--click-bg)]'>
                        {period}
                    </Text>
                    <Text className='text-sm font-semibold px-4 py-1 rounded-full tracking-wider bg-[var(--click-bg)]'>
                        {subType}
                    </Text>
                </View>
            </View>
            {item.isCompleted ? (
                <View
                    style={{ borderColor: GlobalColor.GREEN_NEON_BORDER, borderWidth: 1 }}
                    className='p-2 border rounded-full'
                >
                    <Check color={GlobalColor.GREEN_NEON_BORDER} size={15} />
                </View>
            ) : (
                <View
                    style={{ borderColor: GlobalColor.RED_NEON_BORDER, borderWidth: 1 }}
                    className='p-1.5 border rounded-full'
                >
                    <X color={GlobalColor.RED_NEON_BORDER} size={12} />
                </View>
            )}
        </View>
    )
}
