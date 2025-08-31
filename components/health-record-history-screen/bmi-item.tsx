import * as React from 'react'
import { View, Pressable, useColorScheme } from "react-native"
import { Text } from "../ui/text"
import { BmiRecord, HealthTrackItem } from '../../assets/types/user/health-track'
import { useState } from 'react'
import HealthRecordHistoryModal from './health-history-modal'
import Svg, { Path, Circle } from "react-native-svg"
import { getBmiLevelInfo } from '../../assets/enum/bmi-level'
import { GlobalColor } from '../../global-color'
import { formatDateTime } from '../../util/format-date-time'

type Prop = {
    item: HealthTrackItem
    maxValue: number
    minValue: number
    nextValue?: number
}

const ITEM_WIDTH = 100
const MIN_CHART_HEIGHT = 100

export default function BmiHistoryItem({
    item,
    maxValue,
    minValue,
    nextValue,
}: Prop) {
    if (!item.healthRecord || item.healthRecord == undefined) return null

    const [visible, setVisible] = useState(false)
    const theme = useColorScheme()
    const healthRecord = item.healthRecord as BmiRecord
    const value = healthRecord.bmi
    const bmiLevelInfo = getBmiLevelInfo(healthRecord.level)

    const getHeightMultiplier = () => {
        const gap = maxValue - minValue
        if (gap < 1) return 10
        if (gap < 2) return 5
        if (gap < 5) return 2
        return 1
    }

    const getContainerHeight = () => {
        const valueRatio = maxValue / minValue
        return MIN_CHART_HEIGHT * valueRatio + 10
    }

    const getY = (val: number) => {
        const availableHeight = getContainerHeight() - 10
        const valueRange = maxValue - minValue + 10
        const heightPerUnit = (availableHeight / valueRange) * getHeightMultiplier()
        const heightFromBottom = (val - minValue) * heightPerUnit
        return availableHeight - heightFromBottom
    }

    const getLabelPosition = (currentY: number, nextY?: number) => {
        if (!nextY) return { top: currentY - 12 }

        const isNextPointHigher = nextY < currentY
        const upwardOffset = 20
        const downwardOffset = 2

        return {
            top: isNextPointHigher ?
                currentY + downwardOffset :
                currentY - upwardOffset
        }
    }

    const timeDisplay = formatDateTime(item.mesurementAt)

    const containerHeight = getContainerHeight()
    const currentY = getY(value)
    const nextY = nextValue !== undefined ? getY(nextValue) : undefined

    const lineColor = theme == 'dark' ? GlobalColor.HALF_LIGHT_THEME_COL : GlobalColor.HALF_DARK_THEME_COL

    const createCurvedPath = (x1: number, y1: number, x2: number, y2: number) => {
        const dx = x2 - x1

        const straightLength = dx * 0.03
        const curveStart = x1 + straightLength
        const curveEnd = x2 - straightLength

        const cp1x = curveStart + (curveEnd - curveStart) * 0.25
        const cp2x = curveStart + (curveEnd - curveStart) * 0.75

        const dy = Math.abs(y2 - y1)
        const isGoingUp = y2 < y1

        const curveIntensity = Math.max(0.1, 0.15 - (dy / 1000))
        const maxOffset = Math.min(dy * curveIntensity, 10)

        const cp1y = isGoingUp ?
            y1 + maxOffset :
            y1 - maxOffset

        const cp2y = isGoingUp ?
            y2 - maxOffset :
            y2 + maxOffset

        return `M ${x1} ${y1} 
                L ${curveStart} ${y1} 
                C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${curveEnd} ${y2}
                L ${x2} ${y2}`
    }

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
                        <Path
                            d={`M ${ITEM_WIDTH} ${currentY} L ${ITEM_WIDTH} ${containerHeight - 10}`}
                            stroke={lineColor}
                            strokeWidth={1}
                            strokeDasharray="4,4"
                        />

                        {nextY !== undefined && (
                            <Path
                                d={createCurvedPath(ITEM_WIDTH, currentY, ITEM_WIDTH * 2, nextY)}
                                stroke={lineColor}
                                strokeWidth={1}
                                fill="none"
                            />
                        )}

                        <Circle cx={ITEM_WIDTH} cy={currentY} r={5} fill={bmiLevelInfo.color} />
                    </Svg>

                    <Text
                        className='absolute text-xs font-medium text-center text-[var(--fade-text-color)] tracking-wider'
                        style={{
                            ...getLabelPosition(currentY, nextY),
                            left: ITEM_WIDTH - 35
                        }}
                    >
                        {value}
                    </Text>
                </View>

                <View className='flex-col gap-1'>
                    <Text className='text-sm text-center font-medium text-[var(--fade-text-color)] tracking-widest'>
                        {timeDisplay.date}
                    </Text>
                    <Text className='text-sm text-center font-medium text-[var(--fade-text-color)] tracking-widest'>
                        {timeDisplay.time}
                    </Text>
                </View>
            </Pressable>
            <HealthRecordHistoryModal visible={visible} setVisible={setVisible} item={item} />
        </>
    )
}
