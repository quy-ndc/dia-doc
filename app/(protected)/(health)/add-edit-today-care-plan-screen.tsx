import * as React from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { Dimensions, Pressable, View } from 'react-native'
import { Text } from '../../../components/ui/text'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { healthRecord } from '../../../assets/data/health-record-type'
import { healthCarePlanSubType } from '../../../assets/data/healthcare-plan'
import { useEffect, useState } from 'react'
import { useCreateCarePlanMutation, useUpdateCarePlanMutation } from '../../../service/query/user-query'
import { HealthRecordType } from '../../../assets/enum/health-record'
import { HealthCarePlanSubType } from '../../../assets/enum/healthcare-plan'
import { Save } from '../../../lib/icons/Save'
import SpinningIcon from '../../../components/common/icons/spinning-icon'
import { Loader } from '../../../lib/icons/Loader'
import Toast from 'react-native-toast-message'
import DateTimePicker from '@react-native-community/datetimepicker'
import CarePlanDeleteButton from '../../../components/manage-today-care-plan-screen/care-plan-delete-button'

const { width } = Dimensions.get('window')

export default function AddEditTodayCarePlanScreen() {
    const { id, type, time, sub } = useLocalSearchParams()

    const [recordType, setRecordType] = useState(type as string || HealthRecordType.BLOOD_SUGAR.toString())
    const [scheduledTime, setScheduledTime] = useState(time ? new Date(time as string) : new Date())
    const [subType, setSubType] = useState(sub as string || HealthCarePlanSubType.FASTING.toString())
    const [showTimePicker, setShowTimePicker] = useState(false)

    const selectedRecordType = healthRecord.find(option => option.value === recordType)
    const selectedSubType = healthCarePlanSubType.find(option => option.value === subType)

    const {
        mutateAsync: updateCarePlan,
        data: updateCarePlanData,
        isLoading: updateCarePlanLoading
    } = useUpdateCarePlanMutation()

    const {
        mutateAsync: createCarePlan,
        data: createCarePlanData,
        isLoading: createCarePlanLoading
    } = useCreateCarePlanMutation()

    const onSave = async () => {
        if (!scheduledTime) {
            Toast.show({
                type: 'error',
                text1: 'Thời gian không được trống',
                text2: 'Vui lòng điền đầy đủ'
            })
            return
        }

        if (id) {
            await updateCarePlan({
                instanceId: id as string,
                recordType: Number(recordType) as HealthRecordType,
                scheduledAt: scheduledTime.toISOString(),
                subType: Number(subType) as HealthCarePlanSubType
            })
        } else {
            await createCarePlan({
                recordType: Number(recordType) as HealthRecordType,
                scheduledAt: scheduledTime.toISOString(),
                subType: Number(subType) as HealthCarePlanSubType
            })
        }
    }

    const isLoading = updateCarePlanLoading || createCarePlanLoading
    const disabled = isLoading || !scheduledTime

    useEffect(() => {
        if (!updateCarePlanData || updateCarePlanLoading || updateCarePlanData.status !== 200) return
        router.back()
    }, [updateCarePlanData])

    useEffect(() => {
        if (!createCarePlanData || createCarePlanLoading || createCarePlanData.status !== 200) return
        router.back()
    }, [createCarePlanData])

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: id ? 'Chỉnh sửa lịch đo' : 'Tạo lịch đo mới',
                    headerRight: () => (id && !isLoading) ? <CarePlanDeleteButton id={id as string} /> : null,
                }}
            />
            <View className='flex-col gap-5 px-5 py-3'>
                <View className='flex-col gap-3'>
                    <Text className="text-lg font-bold tracking-wider">
                        Chọn loại chỉ số
                        <Text className='text-red-500'> *</Text>
                    </Text>
                    <Select
                        value={selectedRecordType}
                        onValueChange={option => setRecordType(option?.value || HealthRecordType.BLOOD_SUGAR.toString())}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn loại chỉ số">
                                {selectedRecordType?.label ?? ''}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent style={{ width: width * 0.9 }}>
                            {healthRecord.map(option => (
                                <SelectItem key={option.value} value={option.value} label={option.label} />
                            ))}
                        </SelectContent>
                    </Select>
                </View>

                <View className='flex-col gap-3'>
                    <Text className="text-lg font-bold tracking-wider">
                        Chọn thời gian
                        <Text className='text-red-500'> *</Text>
                    </Text>
                    <Pressable
                        className='flex-row items-center justify-between px-4 py-3 rounded-lg bg-[var(--input-bg)] active:opacity-70'
                        onPress={() => setShowTimePicker(true)}
                    >
                        <Text className='text-base tracking-wider'>
                            {scheduledTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                    </Pressable>
                    {showTimePicker && (
                        <DateTimePicker
                            value={scheduledTime}
                            mode="time"
                            is24Hour={true}
                            onChange={(event, selectedDate) => {
                                setShowTimePicker(false)
                                if (selectedDate) {
                                    setScheduledTime(selectedDate)
                                }
                            }}
                        />
                    )}
                </View>

                <View className='flex-col gap-3'>
                    <Text className="text-lg font-bold tracking-wider">
                        Chọn phân loại
                        <Text className='text-red-500'> *</Text>
                    </Text>
                    <Select
                        value={selectedSubType}
                        onValueChange={option => setSubType(option?.value || HealthCarePlanSubType.FASTING.toString())}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn phân loại">
                                {selectedSubType?.label ?? ''}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent style={{ width: width * 0.9 }}>
                            {healthCarePlanSubType.map(option => (
                                <SelectItem key={option.value} value={option.value} label={option.label} />
                            ))}
                        </SelectContent>
                    </Select>
                </View>

                <Pressable
                    className={`flex-row gap-2 p-4 rounded-full items-center justify-center w-full bg-[var(--oppo-theme-col)] active:opacity-70 ${disabled && 'opacity-70'}`}
                    onPress={onSave}
                    disabled={disabled}
                >
                    {isLoading ? (
                        <SpinningIcon icon={<Loader className='text-[var(--same-theme-col)]' size={17} />} />
                    ) : (
                        <Save className='text-[var(--same-theme-col)]' size={17} />
                    )}
                    <Text className='text-base text-[var(--same-theme-col)] font-bold tracking-wider'>Lưu</Text>
                </Pressable>
            </View>
        </>
    )
}