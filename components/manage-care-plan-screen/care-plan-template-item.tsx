import * as React from 'react'
import { Text } from '../../components/ui/text'
import { Pressable, View } from 'react-native'
import { CarePlanTemplate } from '../../assets/types/user/care-plan-template'
import { GlobalColor } from '../../global-color'
import { getHealthRecordDisplay } from '../../assets/data/health-record-type'
import { getHealthCarePlanPeriodString, getHealthCarePlanSubTypeString } from '../../assets/data/healthcare-plan'
import { router } from 'expo-router'
import { ChevronRight } from '../../lib/icons/ChevronRight'
import { formatDate } from '../../util/format-date'

type Prop = {
    item: CarePlanTemplate
}

export default function CarePlanTemplateItem({ item }: Prop) {

    const recordDisplay = getHealthRecordDisplay(item.recordType)
    const period = getHealthCarePlanPeriodString(item.period)
    const subtype = item.subType ? getHealthCarePlanSubTypeString(item.subType) : undefined

    return (
        <>
            <Pressable
                className='flex-row justify-between items-center px-3 py-4 mt-3 rounded-xl bg-[var(--blog-bg)] active:bg-[var(--click-bg)]'
                onPress={() => router.push({
                    pathname: 'add-edit-care-plan-screen',
                    params: {
                        id: item.id,
                        type: item.recordType,
                        per: item.period,
                        sub: item.subType
                    }
                })}
            >
                <View className='flex-col gap-3'>
                    <View className='flex-row items-center gap-3'>
                        <View
                            style={{ backgroundColor: recordDisplay.backgroundColor }}
                            className='p-3 rounded-full'
                        >
                            {recordDisplay.coloredIcon}
                        </View>
                        <Text className='text-base font-bold tracking-widest capitalize'>Đo {recordDisplay.name}</Text>
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
                    <Text
                        style={{ backgroundColor: GlobalColor.BLUE_NEON_BG, color: GlobalColor.BLUE_NEON_BORDER }}
                        className='text-sm px-4 py-1 font-bold rounded-full tracking-widest self-start'
                    >
                        Tạo vào {formatDate(item.createdDate)}
                    </Text>
                </View>
                <ChevronRight className='text-foreground' size={17} />
            </Pressable>
        </>
    )
}