import * as React from 'react'
import { View } from 'react-native'
import { Text } from '../../ui/text'
import { GlobalColor } from '../../../global-color'
import { HealthCarePlan } from '../../../assets/types/user/healthcare-plan'
import { getHealthRecordDisplay } from '../../../assets/data/health-record-type'
import { formatTime } from '../../../util/format-time'
import { Check } from '../../../lib/icons/Check'
import { getHealthCarePlanPeriodString, getHealthCarePlanSubTypeString } from '../../../assets/data/healthcare-plan'
import { Clock } from '../../../lib/icons/Clock'

type Prop = {
    item?: HealthCarePlan
    hidden: boolean
}

export default function HealthcarePlanDetailItem({ item, hidden }: Prop) {
    if (!item) return (
        <View className={`flex-col gap-2 px-2 py-4 items-center ${hidden ? 'hidden' : ''}`}>
            <View
                style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
                className='p-4 rounded-full'
            >
                <Check color={GlobalColor.GREEN_NEON_BORDER} size={17} />
            </View>
            <Text className='text-lg font-semibold tracking-wider'>Không còn kế hoạch cho ngày hôm nay</Text>
            <Text className='text-base text-[var(--fade-text-color)] text-center tracking-wider'>Quay lại vào ngày mai để tiếp tục nhận được kế hoạch chăm sóc sức khỏe! 💪</Text>
        </View>
    )

    const recordDisplay = getHealthRecordDisplay(item.recordType)
    const period = getHealthCarePlanPeriodString(item.period)
    const subtype = getHealthCarePlanSubTypeString(item.subtype)

    return (
        <View
            style={{ borderColor: recordDisplay.iconColor, borderLeftWidth: 4 }}
            className={`flex-col w-full justify-between border-l items-center gap-3 px-3 py-4 mt-3 rounded-xl bg-[var(--blog-bg)] relative ${hidden ? 'hidden' : ''}`}
        >
            <Text
                style={{ backgroundColor: recordDisplay.iconColor, left: -1, borderTopRightRadius: 100, borderBottomRightRadius: 100 }}
                className='absolute top-5 px-4 py-1 text-sm text-white font-semibold tracking-widest capitalize'
            >
                Tiếp theo
            </Text>
            <View
                style={{ backgroundColor: recordDisplay.iconColor }}
                className='p-4 rounded-full'
            >
                {recordDisplay.icon}
            </View>
            <Text className='text-lg font-semibold tracking-widest capitalize'>Đo {recordDisplay.name}</Text>
            <View className='flex-row gap-2 items-center'>
                {period !== undefined && (
                    <Text
                        style={{ color: recordDisplay.iconColor, borderColor: recordDisplay.iconColor }}
                        className='text-sm px-4 py-1 font-medium border rounded-full tracking-wider'
                    >
                        {period}
                    </Text>
                )}
                {subtype !== undefined && (
                    <Text
                        style={{ color: recordDisplay.iconColor, borderColor: recordDisplay.iconColor }}
                        className='text-sm px-4 py-1 font-medium border rounded-full tracking-wider'
                    >
                        {subtype}
                    </Text>
                )}
            </View>
            <View className='flex-row gap-2 items-center'>
                <Clock color={GlobalColor.BLUE_NEON_BORDER} size={20} />
                <Text className='text-lg font-bold tracking-wider'>{formatTime(item.scheduledAt)}</Text>
            </View>
            <Text className='text-base font-semibold tracking-wider text-center'>
                Lý do: &nbsp;
                <Text className='text-base font-medium text-[var(--fade-text-color)] tracking-wider text-center'>
                    {item.reason}
                </Text>
            </Text>
            <Text className='text-base font-semibold tracking-wider text-center'>
                Trạng thái: &nbsp;
                <Text
                    style={{ color: item.isCompleted ? GlobalColor.GREEN_NEON_BORDER : GlobalColor.RED_NEON_BORDER }}
                    className='text-base font-medium text-[var(--fade-text-color)] tracking-wider text-center'
                >
                    {item.isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                </Text>
            </Text>
        </View>
    )
}
