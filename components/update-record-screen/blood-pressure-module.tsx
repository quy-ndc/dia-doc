import * as React from 'react'
import { Text } from '../ui/text'
import { Dimensions, Pressable, View } from 'react-native'
import { getHealthRecordDisplay } from '../../assets/data/health-record-type'
import { HealthRecordType } from '../../assets/enum/health-record'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'
import { calculateChange } from '../../util/calculate-change'
import SectionTitle from '../home/common/section-title'
import { GlobalColor } from '../../global-color'
import { Clock } from '../../lib/icons/Clock'
import RecordTimePicker from './time-picker'
import { formatTime } from '../../util/format-time'
import { PencilLine } from '../../lib/icons/PencilLine'
import { useUpdateUserBloodPressureMutation, useUpdateUserHbA1cMutation, useUpdateUserWeightMutation } from '../../service/query/user-query'
import SpinningIcon from '../common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { Check } from '../../lib/icons/Check'
import { ArrowLeft } from '../../lib/icons/ArrowLeft'
import { router } from 'expo-router'
import useUserStore from '../../store/userStore'


const { width } = Dimensions.get('window')

type Props = {
    type: HealthRecordType,
    lastMesurement: string
}


export default function BloodPressureUpdateModule({ type, lastMesurement }: Props) {

    const recordDisplay = getHealthRecordDisplay(type as unknown as HealthRecordType)
    const { user } = useUserStore()
    const [value, setValue] = useState('')
    const change = calculateChange(lastMesurement as string, value)
    const [selectedTime, setSelectedTime] = useState('')

    const { mutate, isLoading, data, isError } = useUpdateUserBloodPressureMutation()

    const handleUpdateBloodPressure = () => {
        mutate({
            userId: user.id,
            systolic: Number(value),
            diastolic: Number(value),
            personNote: '',
            measurementAt: selectedTime
        })
    }

    useEffect(() => {
        // if (isError || !data || data.status !== 200) return

        console.log(data)
    }, [data])

    return (
        <View className='flex-1 flex-col gap-5 items-center pt-5'>
            <View
                style={{ width: width * 0.7 }}
                className='flex-col gap-3 items-center'
            >
                <Text className='text-lg font-bold tracking-wider capitalize'>Huyết áp hiện tại</Text>
                <View className='w-full relative'>
                    <Input
                        style={{ textAlign: 'center', letterSpacing: 1.5, fontSize: 18, fontWeight: 'bold' }}
                        value={value}
                        onChangeText={setValue}
                        keyboardType='numeric'
                        placeholder={lastMesurement as string || 'Nhập huyết áp'}
                        className='w-full'
                    />
                    <Text className='absolute right-3  -translate-y-1/2 top-[50%] text-base font-bold text-[var(--fade-text-color)] tracking-wider'>
                        {recordDisplay.unit}
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
            <View className='flex-col gap-2 w-full px-5'>
                <View className='flex-row w-full items-center justify-between'>
                    <SectionTitle
                        icon={<Clock color={GlobalColor.CYAN_NEON_BORDER} size={18} />}
                        title='Thời gian đo'
                    />
                    <View />
                </View>
                <RecordTimePicker setSelectedTime={setSelectedTime} />
                <View className='flex-col items-center gap-2 mt-5'>
                    <Pressable
                        style={{ opacity: isLoading || !value || !selectedTime ? 0.5 : 1 }}
                        className="flex-row w-full gap-2 px-5 py-3 justify-center items-center bg-[var(--oppo-theme-col)] border border-[var(--same-theme-col)] rounded-full active:bg-[var(--oppo-click-bg)]"
                        disabled={isLoading || !value || !selectedTime}
                        onPress={handleUpdateBloodPressure}
                    >
                        <Text className="text-base text-[var(--same-theme-col)] font-semibold tracking-wider capitalize">Cập nhật</Text>
                        {isLoading ? (
                            <SpinningIcon icon={<Loader className='text-[var(--same-theme-col)]' size={17} />} />
                        ) : (
                            <Check className="text-[var(--same-theme-col)]" size={17} />
                        )}
                    </Pressable>

                    <Pressable
                        style={{ opacity: isLoading ? 0.5 : 1 }}
                        className="flex-row w-full gap-2 px-5 py-3 justify-center items-center border border-[var(--oppo-theme-col)] rounded-full active:bg-[var(--click-bg)]"
                        disabled={isLoading}
                        onPress={() => router.back()}
                    >
                        {isLoading ? (
                            <SpinningIcon icon={<Loader className='text-[var(--oppo-theme-col)]' size={17} />} />
                        ) : (
                            <ArrowLeft className="text-[var(--oppo-theme-col)]" size={17} />
                        )}
                        <Text className="text-base text-[var(--oppo-theme-col)] font-semibold tracking-wider capitalize">Quay lại</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}