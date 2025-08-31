import * as React from 'react'
import { Text } from '../ui/text'
import { Dimensions, ScrollView, View } from 'react-native'
import { Input } from '../ui/input'
import { useEffect, useMemo, useState } from 'react'
import { calculateChange } from '../../util/calculate-change'
import RecordTimePicker from './common/time-picker'
import { useUpdateUserBmiMutation } from '../../service/query/user-query'
import { router, useLocalSearchParams } from 'expo-router'
import RecordConfirmButton from './common/record-confirm-button'
import { useGenerateAiNoteMutation } from '../../service/query/ai-query'
import LoadingBanner from './common/loading-banner'

const { width } = Dimensions.get('window')

type Props = {
    lastMesurement: string
    initialTime?: string | null
    id?: string | null
}

export default function BmiUpdateModule({ lastMesurement, initialTime, id }: Props) {
    const [lastWeight, lastHeight] = useMemo(() => {
        if (!lastMesurement || lastMesurement === '0') return ['0', '0']
        const parts = lastMesurement.split('/')
        return parts.length === 2 ? parts : ['0', '0']
    }, [lastMesurement])

    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const { mutateAsync, isLoading, data, isError } = useUpdateUserBmiMutation()
    const {
        mutateAsync: generateAiNote,
        isLoading: isLoadingAiNote,
        data: aiNoteData,
        isError: isErrorAiNote
    } = useGenerateAiNoteMutation()

    const handleUpdateBmi = async () => {
        await mutateAsync({
            weight: Number(weight),
            height: Number(height),
            measurementAt: selectedTime,
            ...(id ? { carePlanInstanceId: id as string } : {})
        })
    }

    const handleGenerateAiNote = async () => {
        await generateAiNote(data?.data?.data)
    }

    const weightChange = calculateChange(lastWeight, weight)
    const heightChange = calculateChange(lastHeight, height)

    useEffect(() => {
        if (isError || !data || data.status !== 200) return
        handleGenerateAiNote()
    }, [data])

    useEffect(() => {
        if (isErrorAiNote || !aiNoteData || aiNoteData.status !== 200) return
        router.replace({
            pathname: "/health-record-history-screen",
            params: { type: 5 }
        })
    })

    return (
        <ScrollView>
            <View className='flex-1 flex-col gap-5 items-center pt-5 pb-10'>
                <LoadingBanner
                    text1="Đang cập nhật chỉ số BMI, giai đoạn này sẽ hoàn thành trong giây lát"
                    text2="Đang tạo ghi chú AI cho chỉ số mới, vui lòng đợi trong giây lát, giai đoạn này có thể mất vài giây"
                    loading1={isLoading}
                    loading2={isLoadingAiNote}
                />
                <View
                    style={{ width: width * 0.9 }}
                    className='flex-col gap-3 items-center'
                >
                    <Text className='text-lg font-bold tracking-wider capitalize'>Chỉ số cơ thể hiện tại</Text>
                    <View className='w-full flex-row gap-3 justify-between'>
                        <View className='flex-1 flex-col items-center relative'>
                            <Text className='text-base font-semibold text-[var(--fade-text-color)] tracking-wider mb-2'>Cân nặng</Text>
                            <Input
                                style={{ textAlign: 'center', letterSpacing: 1.5, fontSize: 18, fontWeight: 'bold', borderRadius: 1000 }}
                                value={weight}
                                onChangeText={setWeight}
                                keyboardType='numeric'
                                placeholder={lastWeight || '0'}
                                className='w-full'
                            />
                            {weight && lastMesurement && (
                                <View className='flex-col items-center gap-3 mt-2'>
                                    <View className='flex-row items-center gap-2'>
                                        {weightChange.icon}
                                        <Text
                                            style={{ color: weightChange.color }}
                                            className='text-base font-bold tracking-wider'
                                        >
                                            {weightChange.label} {weightChange.percentage}%
                                        </Text>
                                    </View>
                                </View>
                            )}
                            <Text
                                className='absolute right-3 top-11 text-base font-bold text-[var(--fade-text-color)] tracking-wider'>
                                kg
                            </Text>
                        </View>
                        <View className='flex-1 flex-col items-center relative'>
                            <Text className='text-base font-semibold text-[var(--fade-text-color)] tracking-wider mb-2'>Chiều cao</Text>
                            <Input
                                style={{ textAlign: 'center', letterSpacing: 1.5, fontSize: 18, fontWeight: 'bold', borderRadius: 1000 }}
                                value={height}
                                onChangeText={setHeight}
                                keyboardType='numeric'
                                placeholder={lastHeight || '0'}
                                className='w-full'
                            />
                            {height && lastMesurement && (
                                <View className='flex-col items-center gap-3 mt-2'>
                                    <View className='flex-row items-center gap-2'>
                                        {heightChange.icon}
                                        <Text
                                            style={{ color: heightChange.color }}
                                            className='text-base font-bold tracking-wider'
                                        >
                                            {heightChange.label} {heightChange.percentage}%
                                        </Text>
                                    </View>
                                </View>
                            )}
                            <Text className='absolute right-3 top-11 text-base font-bold text-[var(--fade-text-color)] tracking-wider'>
                                cm
                            </Text>
                        </View>
                    </View>
                </View>
                <RecordTimePicker
                    setSelectedTime={setSelectedTime}
                    initialTime={initialTime}
                />
                <RecordConfirmButton
                    isLoading={isLoading || isLoadingAiNote}
                    disabled={!weight || !height || !selectedTime}
                    onPress={handleUpdateBmi}
                />
            </View>
        </ScrollView>
    )
}
