import * as React from 'react'
import { View, Pressable, useColorScheme } from "react-native"
import { Text } from "../ui/text"
import { BloodPressureRecord, HealthTrackItem } from '../../assets/types/user/health-track'
import { formatDateMessage } from '../../util/format-date-message'
import HealthRecordHistoryModal from './health-history-modal'
import { useState } from 'react'
import { getBloodPressureStatus } from '../../assets/data/health-record-status'
import Svg, { Line, Circle } from "react-native-svg"
import { GlobalColor } from '../../global-color'

type Prop = {
    item: HealthTrackItem
    maxValue: number
    minValue: number
    nextValue?: { systolic: number; diastolic: number }
}

const ITEM_WIDTH = 100
const MIN_CHART_HEIGHT = 80

export default function BloodPressureItem({
    item,
    maxValue,
    minValue,
    nextValue,
}: Prop) {
    const [visible, setVisible] = useState(false)
    const theme = useColorScheme()
    const healthRecord = item.healthRecord as BloodPressureRecord
    const status = getBloodPressureStatus(`${healthRecord.systolic}/${healthRecord.diastolic}`)
    const lineColor = theme == 'dark' ? GlobalColor.HALF_LIGHT_THEME_COL : GlobalColor.HALF_DARK_THEME_COL

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
    const systolicY = getY(Number(healthRecord.systolic))
    const diastolicY = getY(Number(healthRecord.diastolic))
    const nextSystolicY = nextValue ? getY(nextValue.systolic) : undefined
    const nextDiastolicY = nextValue ? getY(nextValue.diastolic) : undefined

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
                            y1={systolicY}
                            x2={ITEM_WIDTH}
                            y2={containerHeight - 10}
                            stroke={lineColor}
                            strokeWidth={1}
                            strokeDasharray="4,4"
                        />

                        {nextValue && (
                            <>
                                <Line
                                    x1={ITEM_WIDTH}
                                    y1={systolicY}
                                    x2={ITEM_WIDTH * 2}
                                    y2={nextSystolicY}
                                    stroke={GlobalColor.CYAN_NEON_BORDER}
                                    strokeWidth={1}
                                />
                                <Line
                                    x1={ITEM_WIDTH}
                                    y1={diastolicY}
                                    x2={ITEM_WIDTH * 2}
                                    y2={nextDiastolicY}
                                    stroke={GlobalColor.ORANGE_NEON_BORDER}
                                    strokeWidth={1}
                                />
                            </>
                        )}

                        <Circle
                            cx={ITEM_WIDTH}
                            cy={systolicY}
                            r={5}
                            fill={status.systolic.color}
                        />
                        <Circle
                            cx={ITEM_WIDTH}
                            cy={diastolicY}
                            r={5}
                            fill={status.diastolic.color}
                        />
                    </Svg>

                    {/* Value labels */}
                    <Text
                        className='absolute text-sm font-medium text-center text-[var(--fade-text-color)] tracking-wider'
                        style={{
                            top: systolicY - 10,
                            left: ITEM_WIDTH - 35,
                        }}
                    >
                        {healthRecord.systolic}
                    </Text>
                    <Text
                        className='absolute text-sm font-medium text-center text-[var(--fade-text-color)] tracking-wider'
                        style={{
                            top: diastolicY - 10,
                            left: ITEM_WIDTH - 35,
                        }}
                    >
                        {healthRecord.diastolic}
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
