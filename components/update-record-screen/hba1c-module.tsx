import * as React from 'react'
import { Text } from '../ui/text'
import { Dimensions, ScrollView, View } from 'react-native'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'
import { calculateChange } from '../../util/calculate-change'
import RecordTimePicker from './common/time-picker'
import { useUpdateUserHbA1cMutation } from '../../service/query/user-query'
import { router } from 'expo-router'
import NoteField from './common/note-field'
import RecordConfirmButton from './common/record-confirm-button'


const { width } = Dimensions.get('window')

type Props = {
    lastMesurement: string
    initialTime?: string | null
}

export default function Hb1AcUpdateModule({ lastMesurement, initialTime }: Props) {

    const [value, setValue] = useState('')
    const [note, setNote] = useState('')
    const change = calculateChange(lastMesurement as string, value)
    const [selectedTime, setSelectedTime] = useState('')

    const { mutate, isLoading, data, isError } = useUpdateUserHbA1cMutation()

    const handleUpdateHbA1c = () => {
        mutate({
            value: Number(value),
            personNote: note,
            measurementAt: selectedTime
        })
    }

    useEffect(() => {
        if (isError || !data || data.status !== 200) return

        router.back()
    }, [data])

    return (
        <ScrollView>
            <View className='flex-1 flex-col gap-7 items-center pt-5 pb-10'>
                <View
                    style={{ width: width * 0.7 }}
                    className='flex-col gap-3 items-center'
                >
                    <Text className='text-lg font-bold tracking-wider capitalize'>HbA1c hiện tại</Text>
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
                            %
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
                <NoteField note={note} setNote={setNote} placeholder='Đi làm, cảm thấy chóng mặt' />
                <RecordConfirmButton
                    isLoading={isLoading}
                    disabled={!value || !selectedTime}
                    onPress={handleUpdateHbA1c}
                />
            </View>
        </ScrollView>
    )
}