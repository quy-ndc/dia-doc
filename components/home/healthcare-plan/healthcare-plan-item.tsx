import * as React from 'react'
import { Dimensions, View } from 'react-native'
import { Text } from '../../ui/text'
import SectionTitle from '../common/section-title'
import { GlobalColor } from '../../../global-color'
import { Calendar } from '../../../lib/icons/Calendar'
import { HealthCarePlan } from '../../../assets/types/user/healthcare-plan'
import IconButton from '../../common/icon-button'
import { ChevronRight } from '../../../lib/icons/ChevronRight'
import { FlashList } from '@shopify/flash-list'
import { getHealthRecordDisplay } from '../../../assets/data/health-record-type'
import { formatTime } from '../../../util/format-time'
import { Check } from '../../../lib/icons/Check'
import { X } from '../../../lib/icons/X'
import { getHealthCarePlanPeriodString, getHealthCarePlanSubTypeString } from '../../../assets/data/healthcare-plan'

const { width, height } = Dimensions.get('window')

type Prop = {
    item: HealthCarePlan
}

export default function HealthcarePlanItem({ item }: Prop) {

    const recordDisplay = getHealthRecordDisplay(item.recordType)
    const period = getHealthCarePlanPeriodString(item.period)
    const subType = getHealthCarePlanSubTypeString(item.subtype)

    return (
        <View
            style={{ backgroundColor: recordDisplay.backgroundColor }}
            className='flex-row justify-between items-center px-3 py-4 mt-3 rounded-xl'
        >
            <View className='flex-col gap-3'>
                <View className='flex-row items-center gap-3'>
                    <View
                        style={{ backgroundColor: recordDisplay.iconColor }}
                        className='p-3 rounded-lg'
                    >
                        {recordDisplay.icon}
                    </View>
                    <View className='flex-col gap-1'>
                        <Text className='text-base font-bold tracking-widest capitalize'>{recordDisplay.name}</Text>
                        <Text className='text-sm text-[var(--fade-text-color)] tracking-widest'>{formatTime(item.scheduledAt)}</Text>
                    </View>
                </View>
                <View className='flex-row items-center gap-2'>
                    <Text
                        style={{ borderColor: recordDisplay.iconColor, color: recordDisplay.iconColor }}
                        className='text-sm font-semibold px-4 py-1 border rounded-full tracking-wider'
                    >
                        {period}
                    </Text>
                    <Text
                        style={{ borderColor: recordDisplay.iconColor, color: recordDisplay.iconColor }}
                        className='text-sm font-semibold px-4 py-1 border rounded-full tracking-wider'
                    >
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
