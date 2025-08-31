import * as React from 'react'
import { Text } from '../../ui/text'
import { Dimensions, ScrollView, View } from 'react-native'
import { Input } from '../../ui/input'
import { useEffect, useState } from 'react'
import { calculateChange } from '../../../util/calculate-change'
import SectionTitle from '../../home/common/section-title'
import { GlobalColor } from '../../../global-color'
import RecordTimePicker from '../common/time-picker'
import { useUpdateUserBloodSugarMutation } from '../../../service/query/user-query'
import { router, useLocalSearchParams } from 'expo-router'
import { UtensilsCrossed } from '../../../lib/icons/UtensilsCrossed'
import GlucoseTimingPicker from './glucose-timing-picker'
import { MeasureTime } from '../../../assets/data/measure-time'
import NoteField from '../common/note-field'
import RecordConfirmButton from '../common/record-confirm-button'
import { useGenerateAiNoteMutation } from '../../../service/query/ai-query'
import LoadingBanner from '../common/loading-banner'
import { getBloodSugarStatus } from '../../../assets/data/health-record-status'


const { width } = Dimensions.get('window')

type Props = {
    lastMesurement: string
    initialTime?: string | null
    id?: string | null
}

export default function BloodSugarUpdateModule({ lastMesurement, initialTime, id }: Props) {

    const [value, setValue] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [selectPeriod, setSelectPeriod] = useState<MeasureTime | undefined>(undefined)
    const [note, setNote] = useState('')
    const change = calculateChange(lastMesurement as string, value)
    const bloodSugarStatus = getBloodSugarStatus(Number(value), selectPeriod)

    const { mutateAsync, isLoading, data, isError } = useUpdateUserBloodSugarMutation()
    const {
        mutateAsync: generateAiNote,
        isLoading: isLoadingAiNote,
        data: aiNoteData,
        isError: isErrorAiNote
    } = useGenerateAiNoteMutation()

    const handleUpdateBloodSugar = async () => {
        await mutateAsync({
            value: Number(value),
            measureTime: selectPeriod as number,
            personNote: note,
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
            params: { type: 2 }
        })
    })

    return (
        <ScrollView>
            <View className='flex-1 flex-col gap-5 items-center pt-5 pb-10'>
                <LoadingBanner
                    text1="Đang cập nhật chỉ số đường huyết, giai đoạn này sẽ hoàn thành trong giây lát"
                    text2="Đang tạo ghi chú AI cho chỉ số mới, vui lòng đợi trong giây lát, giai đoạn này có thể mất vài giây"
                    loading1={isLoading}
                    loading2={isLoadingAiNote}
                />
                <View
                    style={{ width: width * 0.7 }}
                    className='flex-col gap-3 items-center'
                >
                    <Text className='text-lg font-bold tracking-wider capitalize'>Đường huyết hiện tại</Text>
                    <View className='w-full relative'>
                        <Input
                            style={{ textAlign: 'center', letterSpacing: 1.5, fontSize: 18, fontWeight: 'bold', borderRadius: 1000 }}
                            value={value}
                            onChangeText={setValue}
                            keyboardType='numeric'
                            placeholder={lastMesurement as string || '0'}
                            className='w-full'
                        />
                        <Text className='absolute right-3 -translate-y-1/2 top-[50%] text-base font-bold text-[var(--fade-text-color)] tracking-wider'>
                            mmol/L
                        </Text>
                    </View>
                    {value && (lastMesurement || bloodSugarStatus) && (
                        <View className='flex-col items-center gap-3'>
                            {lastMesurement && (
                                <View className='flex-row items-center gap-2'>
                                    {change.icon}
                                    <Text
                                        style={{ color: change.color }}
                                        className={`text-base font-bold tracking-wider`}
                                    >
                                        {change.label} {change.percentage}%
                                    </Text>
                                </View>
                            )}
                            {bloodSugarStatus && (
                                <View className='flex-row items-center gap-2'>
                                    {bloodSugarStatus.icon}
                                    <Text
                                        style={{ color: bloodSugarStatus.color }}
                                        className={`text-base font-bold tracking-wider`}
                                    >
                                        Đường huyết {bloodSugarStatus.text}
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>
                <View className='flex-col gap-2 w-full px-5'>
                    <View className='flex-row w-full items-center justify-between'>
                        <SectionTitle
                            icon={<UtensilsCrossed color={GlobalColor.YELLOW_NEON_BORDER} size={18} />}
                            title='Thời điểm đo'
                        />
                        <View />
                    </View>
                    <GlucoseTimingPicker setSelectPeriod={setSelectPeriod} />
                </View>
                <RecordTimePicker
                    setSelectedTime={setSelectedTime}
                    initialTime={initialTime}
                />
                <NoteField note={note} setNote={setNote} placeholder='Ăn nhiều ngọt trước đó, cảm thấy chóng mặt' />
                <RecordConfirmButton
                    isLoading={isLoading || isLoadingAiNote}
                    disabled={value == '' || selectedTime == '' || selectPeriod == undefined}
                    onPress={handleUpdateBloodSugar}
                />
            </View>
        </ScrollView>
    )
}