import * as React from 'react'
import { Dimensions, useColorScheme, View, Pressable } from "react-native"
import SectionTitle from "../common/section-title"
import { GlobalColor } from "../../../global-color"
import { useCallback } from 'react'
import ErrorDisplay from '../../common/error-display'
import { HealthSummary } from '../../../assets/types/user/health-track'
import { Text } from '../../ui/text'
import { PencilLine } from '../../../lib/icons/PencilLine'
import { getHealthRecordDisplay } from '../../../assets/data/health-record-type'
import { HealthRecordType } from '../../../assets/enum/health-record'
import Markdown from 'react-native-markdown-display'
import { Bot } from '../../../lib/icons/Bot'
import { getBloodPressureLevelInfo } from '../../../assets/enum/blood-pressure-level'
import { getBloodSugarLevelInfo } from '../../../assets/enum/blood-sugar-level'
import { getBmiLevelInfo } from '../../../assets/enum/bmi-level'
import HealthcarePlanSkeleton from '../../common/skeleton/healthcare-plan-skeleton'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { Platform } from 'react-native'
import { ChevronDown } from '../../../lib/icons/ChevronDown'

const { width } = Dimensions.get('window')

type Props = {
    items?: HealthSummary
    isLoading: boolean
    isError: boolean
    refetch: () => void
    remove: () => void
    refreshing: boolean
    date: string | null
    setDate: (date: string | null) => void
}

export default function HealthSummaries({
    items,
    isLoading,
    isError,
    refetch,
    remove,
    refreshing,
    date,
    setDate
}: Props) {

    const theme = useColorScheme()
    const [showPicker, setShowPicker] = useState(false)

    const onRefresh = useCallback(() => {
        remove()
        refetch()
    }, [refetch])

    const textColor = theme === 'dark' ? GlobalColor.LIGHT_THEME_COL : GlobalColor.DARK_THEME_COL

    const bloodPressureDisplay = getHealthRecordDisplay(HealthRecordType.BLOOD_PRESSURE)
    const bloodSugarDisplay = getHealthRecordDisplay(HealthRecordType.BLOOD_SUGAR)
    const bmiDisplay = getHealthRecordDisplay(HealthRecordType.BMI)

    const bloodPressureLevel = items ? getBloodPressureLevelInfo(items.bloodPressureLevel) : undefined
    const bloodSugarLevel = items ? getBloodSugarLevelInfo(items.bloodGlucoseLevel) : undefined
    const bmiLevel = items ? getBmiLevelInfo(items.bmiLevel) : undefined

    const onDateChange = (_: any, selectedDate: Date | undefined) => {
        setShowPicker(Platform.OS === 'ios')
        if (selectedDate) {
            const year = selectedDate.getFullYear()
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
            const day = String(selectedDate.getDate()).padStart(2, '0')
            setDate(`${year}-${month}-${day}`)
        }
    }

    const currentDate = () => {
        if (!date) return new Date()
        const [year, month, day] = date.split('-')
        return new Date(Number(year), Number(month) - 1, Number(day))
    }

    return (
        <View
            style={{ width: width * 0.95 }}
            className='flex-col gap-1 pt-2 rounded-xl'
        >
            <View className='flex-row justify-between items-center w-full'>
                <View className='flex-row px-2 gap-3 items-center text-center'>
                    <PencilLine color={GlobalColor.CYAN_NEON_BORDER} size={18} />
                    <Text className='text-lg mb-1 font-bold tracking-widest capitalize'>Thống kê sức khỏe</Text>
                </View>
                <Pressable
                    onPress={() => setShowPicker(true)}
                    className='flex-row gap-2 items-center px-4 py-1 rounded-lg bg-[var(--blog-bg)]'
                >
                    <Text className='text-sm font-medium tracking-wider'>
                        {date || 'Chọn ngày'}
                    </Text>
                    <ChevronDown className='text-foreground' size={18} />
                </Pressable>
            </View>

            {showPicker && (
                <DateTimePicker
                    value={currentDate()}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}

            {isLoading ? (
                <HealthcarePlanSkeleton />
            ) : isError || items === undefined ? (
                <View className='py-6'>
                    <ErrorDisplay
                        text={isError ? 'Lỗi khi tải dữ liệu' : 'Không có dữ liệu'}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                    />
                </View>
            ) : (
                <View className='flex-col gap-2 pt-2 px-2 w-full'>
                    <View className='flex-row justify-between px-3'>
                        <View className='flex-col gap-2 items-center'>
                            {bloodPressureDisplay.coloredIcon}
                            <Text className='text-sm font-semibold tracking-widest capitalize'>
                                Huyết áp
                            </Text>
                            {items.meanBloodPressureValue && (
                                <Text className='text-sm font-medium text-[var(--fade-text-color)]'>
                                    {items.meanBloodPressureValue} {bloodPressureDisplay.unit}
                                </Text>
                            )}
                            <Text
                                style={{ color: bloodPressureLevel?.color }}
                                className='text-sm font-bold text-[var(--fade-text-color)] tracking-widest'
                            >
                                {bloodPressureLevel?.label}
                            </Text>
                        </View>
                        <View className='flex-col gap-2 items-center'>
                            {bloodSugarDisplay.coloredIcon}
                            <Text className='text-sm font-semibold tracking-widest capitalize'>
                                Đường huyết
                            </Text>
                            <Text
                                style={{ color: bloodSugarLevel?.color }}
                                className='text-sm font-bold text-[var(--fade-text-color)] tracking-widest'
                            >
                                {bloodSugarLevel?.label}
                            </Text>
                        </View>
                        <View className='flex-col gap-2 items-center'>
                            {bmiDisplay.coloredIcon}
                            <Text className='text-sm font-semibold tracking-widest'>
                                BMI
                            </Text>
                            {items.bmiValue && (
                                <Text className='text-sm font-medium text-[var(--fade-text-color)]'>
                                    {items.bmiValue} {bmiDisplay.unit}
                                </Text>
                            )}
                            <Text
                                style={{ color: bmiLevel?.color }}
                                className='text-sm font-bold text-[var(--fade-text-color)] tracking-widest'
                            >
                                {bmiLevel?.label}
                            </Text>
                        </View>
                    </View>
                    <View className='flex-col'>
                        <View className='flex-col gap-4 pt-2'>
                            <View className='flex-row gap-2 items-center'>
                                <Bot color={GlobalColor.CYAN_NEON_BORDER} size={17} />
                                <Text className='text-sm font-semibold tracking-widest'>
                                    Lời khuyên từ trợ lý AI
                                </Text>
                            </View>
                            <View className='flex-col gap-3'>
                                {items.assistantNote.map((note, index) => (
                                    <Markdown
                                        key={index}
                                        style={{ body: { fontSize: 13, letterSpacing: 1, color: textColor } }}
                                    >
                                        {`- ${note}`}
                                    </Markdown>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}
