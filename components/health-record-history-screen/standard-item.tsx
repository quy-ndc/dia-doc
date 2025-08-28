import * as React from 'react'
import { View, Pressable } from "react-native"
import { Text } from "../ui/text"
import { HB1ACRecord, HealthTrackItem, HeightRecord, WeightRecord } from '../../assets/types/user/health-track'
import { formatDateDm } from '../../util/format-date-d-m'
import { useState } from 'react'
import HealthRecordHistoryModal from './health-history-modal'
import { getHealthRecordDisplay } from '../../assets/data/health-record-type'
import Svg, { Line, Circle } from "react-native-svg"

type Prop = {
    item: HealthTrackItem
    maxValue: number
    minValue: number
    nextValue?: number
}

const ITEM_WIDTH = 100
const MIN_CHART_HEIGHT = 100

export default function StandardHistoryItem({
    item,
    maxValue,
    minValue,
    nextValue,
}: Prop) {
    if (!item.healthRecord || item.healthRecord == undefined) return null

    const [visible, setVisible] = useState(false)
    const healthRecord = item.healthRecord as WeightRecord | HeightRecord | HB1ACRecord
    const value = Number(healthRecord.value)
    const recordDisplay = getHealthRecordDisplay(item.recordType)

    const getContainerHeight = () => {
        const valueRatio = maxValue / minValue
        return MIN_CHART_HEIGHT * valueRatio + 10
    }

    const getY = (val: number) => {
        const availableHeight = getContainerHeight() - 10
        const valueRange = maxValue - minValue + 10
        const heightPerUnit = availableHeight / valueRange
        const heightFromBottom = (val - minValue) * heightPerUnit
        return availableHeight - heightFromBottom
    }

    const containerHeight = getContainerHeight()
    const currentY = getY(value)
    const nextY = nextValue !== undefined ? getY(nextValue) : undefined

    return (
        <>
            <Pressable
                onPress={() => setVisible(true)}
                className='flex-col gap-2 items-center active:opacity-80'
                style={{ width: ITEM_WIDTH }}
            >
                <View
                    className='relative items-center'
                    style={{ width: ITEM_WIDTH, height: containerHeight }}
                >
                    <Svg style={{ position: "absolute", width: ITEM_WIDTH * 2, height: containerHeight }}>
                        <Line
                            x1={ITEM_WIDTH}
                            y1={currentY}
                            x2={ITEM_WIDTH}
                            y2={containerHeight - 10}
                            stroke={recordDisplay.iconColor}
                            strokeWidth={1}
                            strokeDasharray="4,4"
                        />

                        {nextY !== undefined && (
                            <Line
                                x1={ITEM_WIDTH}
                                y1={currentY}
                                x2={ITEM_WIDTH * 2}
                                y2={nextY}
                                stroke={recordDisplay.iconColor}
                                strokeWidth={1}
                            />
                        )}

                        <Circle cx={ITEM_WIDTH} cy={currentY} r={5} fill={recordDisplay.iconColor} />
                    </Svg>

                    <Text
                        className='absolute text-sm font-medium text-center text-[var(--fade-text-color)] tracking-wider'
                        style={{
                            top: currentY - 10,
                            left: ITEM_WIDTH - 35,
                        }}
                    >
                        {healthRecord.value}
                    </Text>
                </View>

                <Text className='text-sm text-center text-[var(--fade-text-color)]'>
                    {formatDateDm(item.mesurementAt)}
                </Text>
            </Pressable>
            <HealthRecordHistoryModal visible={visible} setVisible={setVisible} item={item} />
        </>
    )
}
