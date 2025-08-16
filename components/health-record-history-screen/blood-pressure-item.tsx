import * as React from 'react'
import { View, Pressable } from "react-native"
import { Text } from "../ui/text"
import { BloodPressureRecord, HealthTrackItem } from '../../assets/types/user/health-track'
import { formatDateMessage } from '../../util/format-date-message'
import HealthRecordHistoryModal from './health-history-modal'
import { useState } from 'react'
import { getBloodPressureStatus } from '../../assets/data/health-record-status'


type Prop = {
    item: HealthTrackItem
    maxValue: number
    minValue: number
}

const ITEM_WIDTH = 100
const MIN_BAR_HEIGHT = 150

export default function BloodPressureItem({
    item,
    maxValue,
    minValue,
}: Prop) {

    const [visible, setVisible] = useState(false)

    const healthRecord = item.healthRecord as BloodPressureRecord

    const status = getBloodPressureStatus(`${healthRecord.systolic}/${healthRecord.diastolic}`)

    const getContainerHeight = () => {
        const valueRatio = maxValue / minValue
        return MIN_BAR_HEIGHT * valueRatio
    }

    const getBarHeight = (value: number) => {
        if (value === minValue) {
            return MIN_BAR_HEIGHT
        }
        const valueRatio = value / minValue
        return MIN_BAR_HEIGHT * valueRatio
    }

    const containerHeight = getContainerHeight()
    const systolicBarHeight = getBarHeight(Number(healthRecord.systolic))
    const diastolicBarHeight = getBarHeight(Number(healthRecord.diastolic))

    return (
        <>
            <Pressable
                onPress={() => setVisible(true)}
                className='flex-col gap-2 items-center active:opacity-80'
                style={{ width: ITEM_WIDTH }}
            >
                <View
                    className='flex-row gap-2 justify-center'
                    style={{ height: containerHeight }}
                >
                    <View
                        className='rounded-xl relative'
                        style={{ width: (ITEM_WIDTH * 0.8 - 8) / 2, height: containerHeight }}
                    >
                        <View
                            className='absolute bottom-0 w-full rounded-xl'
                            style={{ height: systolicBarHeight, backgroundColor: status.systolic.color }}
                        />

                        <Text className='absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center text-white tracking-wider text-xs font-medium'>
                            {healthRecord.systolic}
                        </Text>
                    </View>
                    <View
                        className='rounded-xl relative'
                        style={{ width: (ITEM_WIDTH * 0.8 - 8) / 2, height: containerHeight }}
                    >
                        <View
                            className='absolute bottom-0 w-full rounded-xl'
                            style={{ height: diastolicBarHeight, backgroundColor: status.diastolic.color }}
                        />

                        <Text className='absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center text-white tracking-wider text-xs font-medium'>
                            {healthRecord.diastolic}
                        </Text>
                    </View>
                </View>

                <Text className='text-sm text-center text-[var(--fade-text-color)] tracking-wider'>
                    {formatDateMessage(item.mesurementAt)}
                </Text>
            </Pressable>
            <HealthRecordHistoryModal visible={visible} setVisible={setVisible} item={item} />
        </>
    )
}
