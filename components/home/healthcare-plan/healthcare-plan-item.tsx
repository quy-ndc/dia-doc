import * as React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../../ui/text'
import { GlobalColor } from '../../../global-color'
import { HealthCarePlan } from '../../../assets/types/user/healthcare-plan'
import { getHealthRecordDisplay } from '../../../assets/data/health-record-type'
import { formatTime } from '../../../util/format-time'
import { Check } from '../../../lib/icons/Check'
import { X } from '../../../lib/icons/X'
import { getHealthCarePlanPeriodString, getHealthCarePlanSubTypeString } from '../../../assets/data/healthcare-plan'
import { Clock } from '../../../lib/icons/Clock'
import { router } from 'expo-router'
import { ChevronRight } from '../../../lib/icons/ChevronRight'
import { Stethoscope } from '../../../lib/icons/Stethoscope'

type Prop = {
    patientId?: string
    item: HealthCarePlan
    display: 'view' | 'manage'
}

export default function HealthcarePlanItem({ item, display, patientId }: Prop) {

    const recordDisplay = getHealthRecordDisplay(item.recordType)
    const period = getHealthCarePlanPeriodString(item.period)
    const subtype = getHealthCarePlanSubTypeString(item.subtype)

    const handlePress = () => {
        if (display === 'manage') {
            if (patientId) {
                router.push({
                    pathname: 'doctor-add-edit-today-care-plan-screen',
                    params: {
                        id: item.id,
                        type: item.recordType,
                        time: item.scheduledAt,
                        sub: item.subtype,
                        patient: patientId
                    }
                })
            } else {
                router.push({
                    pathname: 'add-edit-today-care-plan-screen',
                    params: {
                        id: item.id,
                        type: item.recordType,
                        time: item.scheduledAt,
                        sub: item.subtype,
                    }
                })
            }
        } else {
            router.push({
                pathname: 'update-record-screen',
                params: { type: item.recordType, time: item.scheduledAt, id: item.id }
            })
        }
    }

    return (
        <Pressable
            className='flex-row justify-between items-center px-3 py-4 mt-3 rounded-xl bg-[var(--blog-bg)] active:bg-[var(--click-bg)]'
            onPress={handlePress}
        >
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
                    {period !== undefined && (
                        <Text className='text-sm font-semibold px-4 py-1 rounded-full tracking-wider bg-[var(--click-bg)]'>
                            {period}
                        </Text>
                    )}
                    {subtype !== undefined && (
                        <Text className='text-sm font-semibold px-4 py-1 rounded-full tracking-wider bg-[var(--click-bg)]'>
                            {subtype}
                        </Text>
                    )}
                </View>
            </View>
            {display === 'manage' ? (
                <ChevronRight className='text-foreground' size={17} />
            ) : (
                item.isCompleted ? (
                    <View
                        style={{ borderColor: GlobalColor.GREEN_NEON_BORDER, borderWidth: 1 }}
                        className='p-1.5 border rounded-full'
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
                )
            )}

            {/* {item.docto bv */}

        </Pressable>
    )
}
