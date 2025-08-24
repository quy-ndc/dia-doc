import * as React from 'react'
import { Text } from '../../../components/ui/text'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../../components/ui/select'
import { healthCarePlanSubType, getHealthCarePlanPeriodTime } from '../../../assets/data/healthcare-plan'
import { healthRecord } from '../../../assets/data/health-record-type'
import { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { Dimensions } from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useCreateCarePlanTemplateDoctorMutation, useCreateCarePlanTemplateMutation, useUpdateCarePlanTemplateDoctorMutation, useUpdateCarePlanTemplateMutation } from '../../../service/query/user-query'
import TemplateDeleteButton from '../../../components/manage-care-plan-screen/template-delete-button'
import SpinningIcon from '../../../components/common/icons/spinning-icon'
import { Loader } from '../../../lib/icons/Loader'
import { HealthRecordType } from '../../../assets/enum/health-record'
import { HealthCarePlanPeriod, HealthCarePlanSubType } from '../../../assets/enum/healthcare-plan'
import Toast from 'react-native-toast-message'
import { Save } from '../../../lib/icons/Save'
import DateTimePicker from '@react-native-community/datetimepicker'

const { width } = Dimensions.get('window')

const getDefaultTime = (time?: string, period?: string) => {
    if (time) {
        if (time.match(/^\d{2}:\d{2}$/)) return time
        if (time.match(/^\d{2}:\d{2}:\d{2}$/)) return time.substring(0, 5)
    }

    if (period) {
        const defaultTime = getHealthCarePlanPeriodTime(Number(period) as HealthCarePlanPeriod)
        if (defaultTime) return defaultTime
    }

    const now = new Date()
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}

export default function DoctorAddEditCarePlanScreen() {
    const { id, type, time, per, sub, patient } = useLocalSearchParams()

    const [recordType, setRecordType] = useState<string | null>(type as string || null)
    const [scheduledTime, setScheduledTime] = useState(getDefaultTime(time as string, per as string))
    const [subType, setSubType] = useState<string | null>(sub as string || null)
    const [showTimePicker, setShowTimePicker] = useState(false)

    const selectedRecordType = healthRecord.find(option => option.value === recordType)
    const selectedSubType = healthCarePlanSubType.find(option => option.value === subType)

    console.log(id)

    const {
        mutateAsync: updateTemplate,
        data: updateTemplateData,
        isLoading: updateTemplateLoading
    } = useUpdateCarePlanTemplateDoctorMutation()

    const {
        mutateAsync: createTemplate,
        data: createTemplateData,
        isLoading: createTemplateLoading
    } = useCreateCarePlanTemplateDoctorMutation()


    const onSave = async () => {
        if (recordType === null || !scheduledTime) {
            Toast.show({
                type: 'error',
                text1: 'Loại chỉ số và thời gian không được trống',
                text2: 'Vui lòng điền đầy đủ'
            })
            return
        }

        if (id) {
            await updateTemplate({
                templateId: id as string,
                patientId: patient as string,
                recordType: Number(recordType) as HealthRecordType,
                scheduledAt: `${scheduledTime}:00`,
                subType: subType ? Number(subType) as HealthCarePlanSubType : undefined
            })
        } else {
            await createTemplate({
                patientId: patient as string,
                recordType: Number(recordType) as HealthRecordType,
                scheduledAt: `${scheduledTime}:00`,
                subType: subType ? Number(subType) as HealthCarePlanSubType : undefined
            })
        }
    }

    const isLoading = updateTemplateLoading || createTemplateLoading
    const disabled = isLoading || recordType === null || !scheduledTime

    useEffect(() => {
        if (!updateTemplateData || updateTemplateLoading || updateTemplateData.status !== 200) return
        router.back()
    }, [updateTemplateData])

    useEffect(() => {
        if (!createTemplateData || createTemplateLoading || createTemplateData.status !== 200) return
        router.back()
    }, [createTemplateData])

    return (
        <>
            <Stack.Screen
                options={{
                    headerRight: () => (id && !isLoading) ? <TemplateDeleteButton id={id as string} deleteFor='doctor' /> : null,
                    headerTitle: id ? 'Chỉnh sửa lịch đo' : 'Tạo lịch đo mới'
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
                        onValueChange={option => setRecordType(option?.value || null)}
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
                        <Text className='text-base tracking-wider'>{scheduledTime}</Text>
                    </Pressable>
                    {showTimePicker && (
                        <DateTimePicker
                            value={(() => {
                                const [hours, minutes] = scheduledTime.split(':').map(Number)
                                const date = new Date()
                                date.setHours(hours)
                                date.setMinutes(minutes)
                                return date
                            })()}
                            mode="time"
                            is24Hour={true}
                            onChange={(_, selectedDate) => {
                                setShowTimePicker(false)
                                if (selectedDate) {
                                    setScheduledTime(
                                        `${String(selectedDate.getHours()).padStart(2, '0')}:${String(selectedDate.getMinutes()).padStart(2, '0')}`
                                    )
                                }
                            }}
                        />
                    )}
                </View>

                <View className='flex-col gap-3'>
                    <Text className="text-lg font-bold tracking-wider">Chọn phân loại</Text>
                    <Select
                        value={selectedSubType}
                        onValueChange={option => setSubType(option?.value === 'null' ? null : option?.value || null)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn phân loại">
                                {selectedSubType?.label ?? ''}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent style={{ width: width * 0.9 }}>
                            <SelectItem key="null" value="null" label="Không chọn" />
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