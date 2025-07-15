import * as React from 'react'
import { Text } from '../../components/ui/text'
import { Dimensions, View } from 'react-native'
import { Input } from '../../components/ui/input'
import { useEffect, useState } from 'react'
import { calculateChange } from '../../util/calculate-change'
import RecordTimePicker from './common/time-picker'
import { useUpdateUserWeightMutation } from '../../service/query/user-query'
import { router } from 'expo-router'
import RecordConfirmButton from './common/record-confirm-button'


const { width } = Dimensions.get('window')

type Props = {
    lastMesurement: string
}

export default function WeightUpdateModule({ lastMesurement }: Props) {

    const [value, setValue] = useState('')
    const change = calculateChange(lastMesurement as string, value)
    const [selectedTime, setSelectedTime] = useState('')

    const { mutate, isLoading, data, isError } = useUpdateUserWeightMutation()

    const handleUpdateWeight = () => {
        mutate({
            value: Number(value),
            measurementAt: selectedTime
        })
    }

    useEffect(() => {
        if (isError || !data || data.status !== 200) return

        router.back()
    }, [data])

    return (
        <View className='flex-1 flex-col gap-5 items-center pt-5'>
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
                        placeholder={lastMesurement as string || 'Nhập cân nặng'}
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
            <RecordTimePicker setSelectedTime={setSelectedTime} />
            <RecordConfirmButton
                isLoading={isLoading}
                disabled={!value || !selectedTime}
                onPress={handleUpdateWeight}
            />
        </View>
    )
}