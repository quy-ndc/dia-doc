import * as React from 'react'
import { Text } from '../../components/ui/text'
import { Dimensions, View } from 'react-native'
import { Input } from '../../components/ui/input'
import { useEffect, useState } from 'react'
import { calculateChange } from '../../util/calculate-change'
import RecordTimePicker from './common/time-picker'
import { useUpdateUserWeightMutation } from '../../service/query/user-query'
import RecordConfirmButton from './common/record-confirm-button'
import { useGenerateAiNoteMutation } from '../../service/query/ai-query'
import { router } from 'expo-router'
import { Info } from '../../lib/icons/Info'
import { GlobalColor } from '../../global-color'
import LoadingBanner from './common/loading-banner'


const { width } = Dimensions.get('window')

type Props = {
    lastMesurement: string
    initialTime?: string | null
}

export default function WeightUpdateModule({ lastMesurement, initialTime }: Props) {

    const [value, setValue] = useState('')
    const change = calculateChange(lastMesurement as string, value)
    const [selectedTime, setSelectedTime] = useState('')

    const { mutateAsync, isLoading, data, isError } = useUpdateUserWeightMutation()
    const {
        mutateAsync: generateAiNote,
        isLoading: isLoadingAiNote,
        data: aiNoteData,
        isError: isErrorAiNote
    } = useGenerateAiNoteMutation()

    const handleUpdateWeight = async () => {
        await mutateAsync({
            value: Number(value),
            measurementAt: selectedTime
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
            params: { type: 0 }
        })
    })

    return (
        <View className='flex-1 flex-col gap-5 items-center pt-5'>
            <LoadingBanner
                text1="Đang cập nhật chỉ số cân nặng, giai đoạn này sẽ hoàn thành trong giây lát"
                text2="Đang tạo ghi chú AI cho chỉ số mới, vui lòng đợi trong giây lát, giai đoạn này có thể mất vài giây"
                loading1={isLoading}
                loading2={isLoadingAiNote}
            />
            <View
                style={{ width: width * 0.7 }}
                className='flex-col gap-3 items-center'
            >
                <Text className='text-lg font-bold tracking-wider capitalize'>Cân nặng hiện tại</Text>
                <View className='w-full relative'>
                    <Input
                        style={{ textAlign: 'center', letterSpacing: 1.5, fontSize: 18, fontWeight: 'bold' }}
                        value={value}
                        onChangeText={setValue}
                        keyboardType='numeric'
                        placeholder={lastMesurement as string || '0'}
                        className='w-full'
                    />
                    <Text className='absolute right-3 -translate-y-1/2 top-[50%] text-base font-bold text-[var(--fade-text-color)] tracking-wider'>
                        kg
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
                onPress={handleUpdateWeight}
            />
        </View>
    )
}