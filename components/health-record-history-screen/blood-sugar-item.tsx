import * as React from 'react'
import { View, Pressable, useColorScheme } from "react-native"
import { Text } from "../ui/text"
import { BloodSugarRecord, HealthTrackItem } from '../../assets/types/user/health-track'
import { useState } from 'react'
import { getBloodSugarStatus } from '../../assets/data/health-record-status'
import HealthRecordHistoryModal from './health-history-modal'
import Svg, { Line, Circle } from "react-native-svg"
import { GlobalColor } from '../../global-color'
import { formatDateDm } from '../../util/format-date-d-m'

type Prop = {
    item: HealthTrackItem
    maxValue: number
    minValue: number
    nextValue?: number
}

const ITEM_WIDTH = 100
const MIN_CHART_HEIGHT = 100

export default function BloodSugarItem({
    item,
    maxValue,
    minValue,
    nextValue,
}: Prop) {
    const [visible, setVisible] = useState(false)
    const theme = useColorScheme()
    const healthRecord = item.healthRecord as BloodSugarRecord
    const value = Number(healthRecord.value)
    const status = getBloodSugarStatus(value, healthRecord.measureTime)

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

    const lineColor = theme == 'dark' ? GlobalColor.HALF_LIGHT_THEME_COL : GlobalColor.HALF_DARK_THEME_COL

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
                            stroke={status.color}
                            strokeWidth={1}
                            strokeDasharray="4,4"
                        />

                        {nextY !== undefined && (
                            <Line
                                x1={ITEM_WIDTH}
                                y1={currentY}
                                x2={ITEM_WIDTH * 2}
                                y2={nextY}
                                stroke={lineColor}
                                strokeWidth={1}
                            />
                        )}

                        <Circle cx={ITEM_WIDTH} cy={currentY} r={5} fill={status.color} />
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
