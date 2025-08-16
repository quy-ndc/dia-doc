import * as React from 'react'
import { View, Pressable } from "react-native"
import { Text } from "../ui/text"
import { BloodSugarRecord, HB1ACRecord, HealthTrackItem, HeightRecord, WeightRecord } from '../../assets/types/user/health-track'
import { GlobalColor } from '../../global-color'
import { formatDateDm } from '../../util/format-date-d-m'
import { formatTime } from '../../util/format-time'
import { formatDateMessage } from '../../util/format-date-message'
import HealthRecordHistoryModal from './health-history-modal'
import { useState } from 'react'
import { getBloodSugarStatus } from '../../assets/data/health-record-status'


type Prop = {
    item: HealthTrackItem
    maxValue: number
    minValue: number
}

const ITEM_WIDTH = 100
const MIN_BAR_HEIGHT = 150

export default function BloodSugarItem({
    item,
    maxValue,
    minValue,
}: Prop) {

    const [visible, setVisible] = useState(false)

    const healthRecord = item.healthRecord as BloodSugarRecord

    const status = getBloodSugarStatus(Number(healthRecord.value), healthRecord.measureTime)

    const getContainerHeight = () => {
        const valueRatio = maxValue / minValue
        return MIN_BAR_HEIGHT * valueRatio
    }

    const getBarHeight = () => {
        const value = Number(healthRecord.value)

        if (value === minValue) {
            return MIN_BAR_HEIGHT
        }
        const valueRatio = value / minValue
        return MIN_BAR_HEIGHT * valueRatio
    }

    const containerHeight = getContainerHeight()
    const barHeight = getBarHeight()

    return (
        <>
            <Pressable
                onPress={() => setVisible(true)}
                className='flex-col gap-2 items-center active:opacity-80'
                style={{ width: ITEM_WIDTH }}
            >
                <View
                    className='rounded-xl relative'
                    style={{ width: ITEM_WIDTH * 0.8, height: containerHeight }}
                >
                    <View
                        className='absolute bottom-0 w-full rounded-xl'
                        style={{ height: barHeight, backgroundColor: status.color }}
                    />

                    <Text className='absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center text-white tracking-wider text-base font-medium'>
                        {healthRecord.value}
                    </Text>
                </View>

                <Text className='text-sm text-center text-[var(--fade-text-color)] tracking-wider'>
                    {formatDateMessage(item.mesurementAt)}
                </Text>
            </Pressable>
            <HealthRecordHistoryModal visible={visible} setVisible={setVisible} item={item} />
        </>
    )
}
