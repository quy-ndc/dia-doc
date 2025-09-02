import * as React from 'react'
import { Text } from '../ui/text'
import { Dimensions, ScrollView, View } from 'react-native'
import { Input } from '../ui/input'
import { useEffect, useMemo, useState } from 'react'
import { calculateChange } from '../../util/calculate-change'
import RecordTimePicker from './common/time-picker'
import { useUpdateUserBloodPressureMutation } from '../../service/query/user-query'
import { router, useLocalSearchParams } from 'expo-router'
import NoteField from './common/note-field'
import RecordConfirmButton from './common/record-confirm-button'
import { useGenerateAiNoteMutation } from '../../service/query/ai-query'
import LoadingBanner from './common/loading-banner'
import { getBloodPressureStatus } from '../../assets/data/health-record-status'


const { width } = Dimensions.get('window')

type Props = {
    lastMesurement: string
    initialTime?: string | null
    id?: string | null
}

export default function BloodPressureUpdateModule({ lastMesurement, initialTime, id }: Props) {

    const [lastSystolic, lastDiastolic] = useMemo(() => {
        if (!lastMesurement || lastMesurement === '0') return ['0', '0']
        const parts = lastMesurement.split('/')
        return parts.length === 2 ? parts : ['0', '0']
    }, [lastMesurement])

    const [systolic, setSystolic] = useState('')
    const [diastolic, setDiastolic] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [note, setNote] = useState('')
    const { mutateAsync, isLoading, data, isError } = useUpdateUserBloodPressureMutation()
    const {
        mutateAsync: generateAiNote,
        isLoading: isLoadingAiNote,
        data: aiNoteData,
        isError: isErrorAiNote
    } = useGenerateAiNoteMutation()

    const handleUpdateBloodPressure = async () => {
        await mutateAsync({
            systolic: Number(systolic),
            diastolic: Number(diastolic),
            personNote: '',
            measurementAt: selectedTime,
            ...(id ? { carePlanInstanceId: id as string } : {})
        })
    }

    const handleGenerateAiNote = async () => {
        await generateAiNote(data?.data?.data)
    }

    const systolicChange = calculateChange(lastSystolic, systolic)
    const diastolicChange = calculateChange(lastDiastolic, diastolic)
    const bloodPressureStatus = getBloodPressureStatus(`${systolic}/${diastolic}`)

    useEffect(() => {
        if (isError || !data?.success || data?.status !== 200) return
        handleGenerateAiNote()
    }, [data])

    useEffect(() => {
        if (isErrorAiNote || !aiNoteData || aiNoteData.status !== 200) return
        router.replace({
            pathname: "/health-record-history-screen",
            params: { type: 3 }
        })
    })

    return (
        <ScrollView>
            <View className='flex-1 flex-col gap-5 items-center pt-5 pb-10'>
                <LoadingBanner
                    text1="Đang cập nhật chỉ số huyết áp, giai đoạn này sẽ hoàn thành trong giây lát"
                    text2="Đang tạo ghi chú AI cho chỉ số mới, vui lòng đợi trong giây lát, giai đoạn này có thể mất vài giây"
                    loading1={isLoading}
                    loading2={isLoadingAiNote}
                />
                <View
                    style={{ width: width * 0.9 }}
                    className='flex-col gap-3 items-center'
                >
                    <Text className='text-lg font-bold tracking-wider capitalize'>Huyết áp hiện tại</Text>
                    <View className='w-full flex-row gap-3 justify-between'>
                        <View className='flex-1 flex-col items-center relative'>
                            <Text className='text-base font-semibold text-[var(--fade-text-color)] tracking-wider mb-2'>Tâm thu</Text>
                            <Input
                                style={{ textAlign: 'center', letterSpacing: 1.5, fontSize: 18, fontWeight: 'bold', borderRadius: 1000 }}
                                value={systolic}
                                onChangeText={setSystolic}
                                keyboardType='numeric'
                                placeholder={lastSystolic || '0'}
                                className='w-full'
                            />
                            {systolic && (lastMesurement || bloodPressureStatus) && (
                                <View className='flex-col items-center gap-3 mt-2'>
                                    {lastMesurement && (
                                        <View className='flex-row items-center gap-2'>
                                            {systolicChange.icon}
                                            <Text
                                                style={{ color: systolicChange.color }}
                                                className='text-base font-bold tracking-wider'
                                            >
                                                {systolicChange.label} {systolicChange.percentage}%
                                            </Text>
                                        </View>
                                    )}
                                    {bloodPressureStatus && (
                                        <View className='flex-row items-center gap-2'>
                                            {bloodPressureStatus.systolic.icon}
                                            <Text
                                                style={{ color: bloodPressureStatus.systolic.color }}
                                                className='text-base font-bold tracking-wider'
                                            >
                                                Tâm thu {bloodPressureStatus.systolic.text}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            )}
                            <Text
                                className='absolute right-3 top-11 text-base font-bold text-[var(--fade-text-color)] tracking-wider'>
                                mmHg
                            </Text>

                        </View>
                        <View className='flex-1 flex-col items-center relative'>
                            <Text className='text-base font-semibold text-[var(--fade-text-color)] tracking-wider mb-2'>Tâm trương</Text>
                            <Input
                                style={{ textAlign: 'center', letterSpacing: 1.5, fontSize: 18, fontWeight: 'bold', borderRadius: 1000 }}
                                value={diastolic}
                                onChangeText={setDiastolic}
                                keyboardType='numeric'
                                placeholder={lastDiastolic || '0'}
                                className='w-full'
                            />
                            {diastolic && (lastMesurement || bloodPressureStatus) && (
                                <View className='flex-col items-center gap-3 mt-2'>
                                    {lastMesurement && (
                                        <View className='flex-row items-center gap-2'>
                                            {diastolicChange.icon}
                                            <Text
                                                style={{ color: diastolicChange.color }}
                                                className='text-base font-bold tracking-wider'
                                            >
                                                {diastolicChange.label} {diastolicChange.percentage}%
                                            </Text>
                                        </View>
                                    )}
                                    {bloodPressureStatus && (
                                        <View className='flex-row items-center gap-2'>
                                            {bloodPressureStatus.diastolic.icon}
                                            <Text
                                                style={{ color: bloodPressureStatus.diastolic.color }}
                                                className='text-base font-bold tracking-wider'
                                            >
                                                Tâm trương {bloodPressureStatus.diastolic.text}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            )}
                            <Text className='absolute right-3 top-11 text-base font-bold text-[var(--fade-text-color)] tracking-wider'>
                                mmHg
                            </Text>
                        </View>
                    </View>
                </View>
                <RecordTimePicker
                    setSelectedTime={setSelectedTime}
                    initialTime={initialTime}
                />
                <NoteField note={note} setNote={setNote} placeholder='Đi làm, cảm thấy chóng mặt' />
                <RecordConfirmButton
                    isLoading={isLoading || isLoadingAiNote}
                    disabled={!systolic || !diastolic || !selectedTime}
                    onPress={handleUpdateBloodPressure}
                />
            </View>
        </ScrollView>
    )
}