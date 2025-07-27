import * as React from 'react'
import { Text } from '../../components/ui/text'
import { Dimensions, Modal, Pressable } from 'react-native'
import { CarePlanTemplate } from '../../assets/types/user/care-plan-template'
import { useCreateCarePlanTemplateMutation, useUpdateCarePlanTemplateMutation } from '../../service/query/user-query'
import { useState } from 'react'
import { HealthCarePlanPeriod, HealthCarePlanSubType } from '../../assets/enum/healthcare-plan'
import { HealthRecordType } from '../../assets/enum/health-record'
import { healthRecord } from '../../assets/data/health-record-type'
import { healthCarePlanPeriod, healthCarePlanSubType } from '../../assets/data/healthcare-plan'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../components/ui/select'

type Prop = {
    visible: boolean
    setVisible: (visible: boolean) => void
    item?: CarePlanTemplate
}

const { width } = Dimensions.get('window')

export default function CarePlanAddEditModal({ visible, setVisible, item }: Prop) {

    const [recordType, setRecordType] = useState(() => healthRecord.find(o => o.value === item?.recordType?.toString()) ?? undefined)
    const [period, setPeriod] = useState(() => healthCarePlanPeriod.find(o => o.value === item?.period?.toString()) ?? undefined)
    const [subType, setSubType] = useState(() => healthCarePlanSubType.find(o => o.value === item?.subtype?.toString()) ?? undefined)

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

    const onConfirm = () => {
        if (item) {
            updateTemplate({
                id: item.id,
                period: Number(period?.value) as HealthCarePlanPeriod,
                recordType: Number(recordType?.value) as HealthRecordType,
                subType: Number(subType?.value) as HealthCarePlanSubType
            })
        } else {
            createTemplate({
                period: Number(period?.value) as HealthCarePlanPeriod,
                recordType: Number(recordType?.value) as HealthRecordType,
                subType: Number(subType?.value) as HealthCarePlanSubType
            })
        }
    }

    return (
        <>
            <Modal
                visible={visible}
                transparent
                animationType='fade'
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    className='flex-1 justify-center items-center bg-black/50'
                    onPress={() => setVisible(false)}
                >
                    <Pressable
                        className='flex-col justify-center items-center bg-[var(--noti-bg)] rounded-md'
                        style={{ width: width * 0.9 }}
                    >
                        {/* Dropdowns for healthRecord, healthCarePlanPeriod, healthCarePlanSubType */}
                        <Select value={recordType} onValueChange={option => setRecordType(option ?? undefined)}>
                            <SelectTrigger>
                                <SelectValue placeholder='Chọn loại chỉ số'>
                                    {recordType?.label ?? ''}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {healthRecord.map(option => (
                                    <SelectItem key={option.value} value={option.value} label={option.label} />
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={period} onValueChange={option => setPeriod(option ?? undefined)}>
                            <SelectTrigger>
                                <SelectValue placeholder='Chọn thời điểm'>
                                    {period?.label ?? ''}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {healthCarePlanPeriod.map(option => (
                                    <SelectItem key={option.value} value={option.value} label={option.label} />
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={subType} onValueChange={option => setSubType(option ?? undefined)}>
                            <SelectTrigger>
                                <SelectValue placeholder='Chọn trạng thái'>
                                    {subType?.label ?? ''}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {healthCarePlanSubType.map(option => (
                                    <SelectItem key={option.value} value={option.value} label={option.label} />
                                ))}
                            </SelectContent>
                        </Select>
                        {/* Existing modal content (confirm/cancel) */}
                        <Pressable
                            className='flex-row gap-3 px-3 py-3 w-full items-center rounded-md active:bg-[var(--click-bg)]'
                        >
                            <Text className='text-left text-base tracking-widest'>Xóa thông báo</Text>
                        </Pressable>
                        <Pressable
                            className='flex-row gap-3 px-3 py-3 w-full items-center rounded-md active:bg-[var(--click-bg)]'
                            onPress={() => setVisible(false)}
                        >
                            <Text className='text-left text-base tracking-widest'>Hủy</Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}