import * as React from 'react'
import { Text } from '../ui/text'
import { Dimensions, Modal, Pressable, View } from 'react-native'
import { useDeleteCarePlanTemplateDoctorMutation, useDeleteCarePlanTemplateMutation } from '../../service/query/user-query'
import { GlobalColor } from '../../global-color'
import { Trash2 } from '../../lib/icons/Trash2'
import { useEffect, useState } from 'react'
import SpinningIcon from '../common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { router } from 'expo-router'

type Prop = {
    id: string
    deleteFor: 'patient' | 'doctor'
}

const { width } = Dimensions.get('window')

export default function TemplateDeleteButton({ id, deleteFor }: Prop) {

    const [visible, setVisible] = useState(false)

    const {
        mutateAsync: patientDelete,
        data: patientDeleteData,
        isLoading: patientDeleteLoading,
    } = useDeleteCarePlanTemplateMutation()

    const {
        mutateAsync: doctorDelete,
        data: doctorDeleteData,
        isLoading: doctorDeleteLoading,
    } = useDeleteCarePlanTemplateDoctorMutation()

    const onDelete = async () => {
        if (deleteFor == 'patient') {
            await patientDelete(id)
        } else {
            await doctorDelete({ templateId: id })
        }
    }

    useEffect(() => {
        if (!patientDeleteData || patientDeleteLoading || patientDeleteData.status !== 200) return

        setVisible(false)
        router.back()
    }, [patientDeleteData])

    useEffect(() => {
        if (!doctorDeleteData || doctorDeleteLoading || doctorDeleteData.status !== 200) return

        setVisible(false)
        router.back()
    }, [doctorDeleteData])

    return (
        <>
            <Pressable
                className={`flex p-3 rounded-full items-center justify-center active:bg-[var(--click-bg)]`}
                onPress={() => setVisible(true)}
            >
                <Trash2 color={GlobalColor.RED_NEON_BORDER} size={18} />
            </Pressable>
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
                        className='flex-col justify-center gap-7 p-5 items-center bg-[var(--noti-bg)] rounded-md'
                        style={{ width: width * 0.9 }}
                    >
                        <View className='flex-col gap-1 w-full'>
                            <Text className='text-lg font-bold text-left tracking-wider'>Bạn có chắc chắn muốn xóa không?</Text>
                            <Text className='text-sm text-[var(--fade-text-color)] text-left tracking-wider'>Hành động này không thể hoàn tác được</Text>
                        </View>
                        <View className='flex-col gap-4 items-center w-full'>
                            <Pressable
                                style={{ backgroundColor: GlobalColor.RED_NEON_BORDER }}
                                className={`flex-row gap-2 items-center p-4 rounded-full items-center justify-center w-full active:opacity-70 ${patientDeleteLoading || doctorDeleteLoading && 'opacity-70'}`}
                                onPress={onDelete}
                                disabled={patientDeleteLoading || doctorDeleteLoading}
                            >
                                {patientDeleteLoading || doctorDeleteLoading && (
                                    <SpinningIcon icon={<Loader className='text-white' size={17} />} />
                                )}
                                <Text className='text-base text-white font-bold tracking-wider'>
                                    Có, tôi muốn xóa
                                </Text>
                            </Pressable>
                            <Pressable
                                className={`flex-row gap-2 items-center p-4 rounded-full items-center justify-center w-full bg-[var(--oppo-theme-col)] active:opacity-70 ${patientDeleteLoading || doctorDeleteLoading && 'opacity-70'}`}
                                onPress={() => setVisible(false)}
                                disabled={patientDeleteLoading || doctorDeleteLoading}
                            >
                                {patientDeleteLoading || doctorDeleteLoading && (
                                    <SpinningIcon icon={<Loader className='text-white' size={17} />} />
                                )}
                                <Text className='text-base text-[var(--same-theme-col)] font-bold tracking-wider'>Không, quay lại</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}