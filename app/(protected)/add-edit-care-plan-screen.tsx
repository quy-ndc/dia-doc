import * as React from 'react'
import { Text } from '../../components/ui/text'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../components/ui/select'
import { healthCarePlanPeriod, healthCarePlanSubType } from '../../assets/data/healthcare-plan'
import { healthRecord } from '../../assets/data/health-record-type'
import { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { Dimensions } from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useCreateCarePlanTemplateMutation, useUpdateCarePlanTemplateMutation } from '../../service/query/user-query'
import TemplateDeleteButton from '../../components/manage-care-plan-screen/template-delete-button'
import SpinningIcon from '../../components/common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'

const { width } = Dimensions.get('window')

export default function AddEditCarePlanScreen() {

    const { id, type, per, sub } = useLocalSearchParams()

    const [recordType, setRecordType] = useState<string>(type as string || '')
    const [period, setPeriod] = useState<string>(per as string || '')
    const [subType, setSubType] = useState<string>(sub as string || '')

    const selectedPeriod = healthCarePlanPeriod.find(option => option.value === period)
    const selectedRecordType = healthRecord.find(option => option.value === recordType)
    const selectedSubType = healthCarePlanSubType.find(option => option.value === subType)

    const {
        mutateAsync: updateTemplate,
        data: updateTemplateData,
        isLoading: updateTemplateLoading
    } = useUpdateCarePlanTemplateMutation()

    const {
        mutateAsync: createTemplate,
        data: createTemplateData,
        isLoading: createTemplateLoading
    } = useCreateCarePlanTemplateMutation()

    const onSave = async () => {
        if (id) {
            await updateTemplate({
                id: id as string,
                recordType: Number(recordType),
                period: Number(period),
                subType: Number(subType)
            })
        } else {
            await createTemplate({
                recordType: Number(recordType),
                period: Number(period),
                subType: Number(subType)
            })
        }
    }

    const isLoading = updateTemplateLoading || createTemplateLoading

    useEffect(() => {
        if (!updateTemplateData || updateTemplateLoading || updateTemplateData.status !== 200) return

        router.push('manage-care-plan-screen')
    }, [updateTemplateData])

    useEffect(() => {
        if (!createTemplateData || createTemplateLoading || createTemplateData.status !== 200) return

        router.push('manage-care-plan-screen')
    }, [createTemplateData])

    return (
        <>

            <Stack.Screen
                options={{
                    headerRight: () => (id && !isLoading) ? <TemplateDeleteButton id={id as string} /> : null
                }}
            />
            <View className='flex-col gap-5 px-5 py-3'>
                <View className='flex-col gap-3'>
                    <Text className="text-lg font-bold tracking-wider">Chọn loại chỉ số</Text>
                    <Select
                        value={selectedRecordType}
                        onValueChange={option => setRecordType(option?.value || '')}
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
                    <Text className="text-lg font-bold tracking-wider">Chọn thời điểm</Text>
                    <Select
                        value={selectedPeriod}
                        onValueChange={option => setPeriod(option?.value || '')}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn thời điểm">
                                {selectedPeriod?.label ?? ''}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent style={{ width: width * 0.9 }}>
                            {healthCarePlanPeriod.map(option => (
                                <SelectItem key={option.value} value={option.value} label={option.label} />
                            ))}
                        </SelectContent>
                    </Select>
                </View>

                <View className='flex-col gap-3'>
                    <Text className="text-lg font-bold tracking-wider">Chọn phân loại</Text>
                    <Select
                        value={selectedSubType}
                        onValueChange={option => setSubType(option?.value || '')}
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
                    className={`flex-row gap-2 p-4 rounded-full items-center justify-center w-full bg-[var(--oppo-theme-col)] active:opacity-70 ${isLoading && 'opacity-70'}`}
                    onPress={onSave}
                    disabled={isLoading}
                >
                    {isLoading && (
                        <SpinningIcon icon={<Loader className='text-white' size={17} />} />
                    )}
                    <Text className='text-base text-[var(--same-theme-col)] font-bold tracking-wider'>Lưu</Text>
                </Pressable>
            </View>
        </>
    )
}