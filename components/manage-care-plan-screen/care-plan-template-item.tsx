import * as React from 'react'
import { Text } from '../../components/ui/text'
import { Dimensions, Modal, Pressable, View } from 'react-native'
import { CarePlanTemplate } from '../../assets/types/user/care-plan-template'
import { GlobalColor } from '../../global-color'
import { getHealthRecordDisplay } from '../../assets/data/health-record-type'
import { getHealthCarePlanPeriodString, getHealthCarePlanSubTypeString } from '../../assets/data/healthcare-plan'
import { Clock } from '../../lib/icons/Clock'
import { formatTime } from '../../util/format-time'
import { PencilLine } from '../../lib/icons/PencilLine'
import { Trash2 } from '../../lib/icons/Trash2'

type Prop = {
    item: CarePlanTemplate
    setVisible: (visible: boolean) => void
}

const { width } = Dimensions.get('window');

export default function CarePlanTemplateItem({ item, setVisible }: Prop) {

    const recordDisplay = getHealthRecordDisplay(item.recordType)
    const period = getHealthCarePlanPeriodString(item.period)
    const subtype = item.subtype ? getHealthCarePlanSubTypeString(item.subtype) : undefined

    return (
        <>
            <Pressable
                className='flex-row justify-between items-center px-3 py-4 mt-3 rounded-xl bg-[var(--blog-bg)] active:bg-[var(--click-bg)]'
                onPress={() => setVisible(true)}
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
                                <Text className='text-sm text-[var(--fade-text-color)] tracking-widest'>{formatTime(item.createdDate)}</Text>
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
                <View className='flex-row gap-2 items-center'>
                    <Pressable
                        className='flex p-2 rounded-full items-center justify-center active:bg-[var(--click-bg)]'
                        onPress={() => setVisible(true)}
                    >
                        <PencilLine color={GlobalColor.CYAN_NEON_BORDER} size={17} />
                    </Pressable>
                    <Pressable
                        className='flex p-2 rounded-full items-center justify-center active:bg-[var(--click-bg)]'
                    >
                        <Trash2 color={GlobalColor.RED_NEON_BORDER} size={17} />
                    </Pressable>
                </View>
            </Pressable>
        </>
    )
}