import * as React from 'react'
import { Text } from '../../components/ui/text'
import { Dimensions, ScrollView, View } from 'react-native'
import { Input } from '../../components/ui/input'
import { useEffect, useState } from 'react'
import { calculateChange } from '../../util/calculate-change'
import RecordTimePicker from './common/time-picker'
import { useUpdateUserHeightMutation } from '../../service/query/user-query'
import { router, useLocalSearchParams } from 'expo-router'
import RecordConfirmButton from './common/record-confirm-button'
import LoadingBanner from './common/loading-banner'
import { useGenerateAiNoteMutation } from '../../service/query/ai-query'


const { width } = Dimensions.get('window')

type Props = {
    lastMesurement: string
    initialTime?: string | null
    id?: string | null
}

export default function HeightUpdateModule({ lastMesurement, initialTime, id }: Props) {

    const [value, setValue] = useState('')
    const change = calculateChange(lastMesurement as string, value)
    const [selectedTime, setSelectedTime] = useState('')

    const { mutateAsync, isLoading, data, isError } = useUpdateUserHeightMutation()
    const {
        mutateAsync: generateAiNote,
        isLoading: isLoadingAiNote,
        data: aiNoteData,
        isError: isErrorAiNote
    } = useGenerateAiNoteMutation()

    const handleUpdateHeight = async () => {
        await mutateAsync({
            value: Number(value),
            measurementAt: selectedTime,
            ...(id ? { carePlanInstanceId: id as string } : {})
        })
    }

    const handleGenerateAiNote = async () => {
        await generateAiNote(data?.data?.data)
    }

    useEffect(() => {
        if (isError || !data || data.status !== 200) return
        handleGenerateAiNote()
    }, [data])

    useEffect(() => {
        if (isErrorAiNote || !aiNoteData || aiNoteData.status !== 200) return
        router.replace({
            pathname: "/health-record-history-screen",
            params: { type: 1 }
        })
    })

    return (
        <ScrollView>
            <View className='flex-1 flex-col gap-5 items-center pt-5 pb-10'>
                <LoadingBanner
                    text1="Đang cập nhật chỉ số chiều cao, giai đoạn này sẽ hoàn thành trong giây lát"
                    text2="Đang tạo ghi chú AI cho chỉ số mới, vui lòng đợi trong giây lát, giai đoạn này có thể mất vài giây"
                    loading1={isLoading}
                    loading2={isLoadingAiNote}
                />
                <View
                    style={{ width: width * 0.7 }}
                    className='flex-col gap-3 items-center'
                >
                    <Text className='text-lg font-bold tracking-wider capitalize'>Chiều cao hiện tại</Text>
                    <View className='w-full relative'>
                        <Input
                            style={{ textAlign: 'center', letterSpacing: 1.5, fontSize: 18, fontWeight: 'bold' }}
                            value={value}
                            onChangeText={setValue}
                            keyboardType='numeric'
                            placeholder={lastMesurement as string || '0'}
                            className='w-full'
                        />
                        <Text className='absolute right-3  -translate-y-1/2 top-[50%] text-base font-bold text-[var(--fade-text-color)] tracking-wider'>
                            cm
                        </Text>
                    </View>
                    {value && lastMesurement && (
                        <View className='flex-row items-center gap-2 mt-2'>
                            {change.icon}
                            <Text
                                style={{ color: change.color }}
                                className={`text-base font-bold tracking-wider`}
                            >
                                {change.label} {change.percentage}%
                            </Text>
                        </View>
                    )}
                </View>
                <RecordTimePicker
                    setSelectedTime={setSelectedTime}
                    initialTime={initialTime}
                />
                <RecordConfirmButton
                    isLoading={isLoading || isLoadingAiNote}
                    disabled={!value || !selectedTime}
                    onPress={handleUpdateHeight}
                />
            </View>
        </ScrollView>
    )
}