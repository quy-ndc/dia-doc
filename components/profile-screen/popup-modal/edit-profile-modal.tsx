import * as React from 'react'
import { Modal, Pressable, View } from 'react-native'
import { Text } from '../../ui/text'
import { useEffect, useMemo, useState } from 'react'
import { useEditUserProfileMutation } from '../../../service/query/user-query'
import { PencilLine } from '../../../lib/icons/PencilLine'
import SpinningIcon from '../../common/icons/spinning-icon'
import { Loader } from '../../../lib/icons/Loader'
import { Input } from '../../ui/input'
import { Check } from '../../../lib/icons/Check'
import { X } from '../../../lib/icons/X'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Patient } from '../../../assets/types/user/patient'
import { Doctor } from '../../../assets/types/user/doctor'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Calendar } from '../../../lib/icons/Calendar'
import { GenderNumber } from '../../../assets/enum/gender'


const schema = yup.object({
    lastName: yup.string().nullable(),
    middleName: yup.string().nullable(),
    firstName: yup.string().nullable(),
    dateOfBirth: yup.date().nullable(),
    gender: yup.string().nullable()
}).required()

type Props = {
    profile: Patient | Doctor
}

export default function EditProfileModal({ profile }: Props) {
    const [visible, setVisible] = useState(false)
    const { mutateAsync, isLoading, data } = useEditUserProfileMutation()
    const [showDatePicker, setShowDatePicker] = useState(false)

    const nameParts = useMemo(() => {
        const name = 'fullName' in profile ? profile.fullName : profile.name
        const parts = name.split(' ')
        return {
            lastName: parts[0] || '',
            firstName: parts[parts.length - 1] || '',
            middleName: parts.slice(1, -1).join(' ') || ''
        }
    }, [profile])

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            lastName: nameParts.lastName,
            middleName: nameParts.middleName,
            firstName: nameParts.firstName,
            dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth) : null,
            gender: profile.gender?.toString() || null
        }
    })

    const dateOfBirth = watch('dateOfBirth')

    const onSubmit = async (data: any) => {
        await mutateAsync({
            lastName: data.lastName,
            middleName: data.middleName,
            firstName: data.firstName,
            dateOfBirth: data.dateOfBirth?.toISOString(),
            gender: data.gender ? parseInt(data.gender) as GenderNumber : undefined
        })
    }

    useEffect(() => {
        if (!data || data.status !== 200) return
        setVisible(false)
    }, [data, isLoading])

    const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    return (
        <>
            <Pressable
                className='p-2 rounded-full active:bg-[var(--click-bg)]'
                onPress={() => setVisible(true)}
            >
                <PencilLine className='text-foreground' size={17} />
            </Pressable>

            <Modal
                visible={visible}
                animationType='slide'
                onRequestClose={() => setVisible(false)}
            >
                <View className='flex-1 bg-background p-5'>
                    <View className='flex-col w-full gap-6 justify-center items-center'>
                        <View className='flex-col gap-2 w-full'>
                            <Text className='text-base font-bold tracking-widest capitalize'>Họ</Text>
                            <Controller
                                control={control}
                                name="lastName"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <Input
                                            style={{ borderRadius: 100 }}
                                            placeholder='Nguyễn'
                                            value={value || ''}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                        />
                                        {errors.lastName && <Text className='text-red-500'>{errors.lastName.message}</Text>}
                                    </>
                                )}
                            />
                        </View>

                        <View className='flex-col gap-2 w-full'>
                            <Text className='text-base font-bold tracking-widest capitalize'>Tên đệm</Text>
                            <Controller
                                control={control}
                                name="middleName"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <Input
                                            style={{ borderRadius: 100 }}
                                            placeholder='Văn'
                                            value={value || ''}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                        />
                                        {errors.middleName && <Text className='text-red-500'>{errors.middleName.message}</Text>}
                                    </>
                                )}
                            />
                        </View>

                        <View className='flex-col gap-2 w-full'>
                            <Text className='text-base font-bold tracking-widest capitalize'>Tên</Text>
                            <Controller
                                control={control}
                                name="firstName"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <Input
                                            style={{ borderRadius: 100 }}
                                            placeholder='A'
                                            value={value || ''}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                        />
                                        {errors.firstName && <Text className='text-red-500'>{errors.firstName.message}</Text>}
                                    </>
                                )}
                            />
                        </View>

                        <View className='flex-col gap-2 w-full'>
                            <Text className='text-base font-bold tracking-widest capitalize'>Ngày sinh</Text>
                            <Controller
                                control={control}
                                name="dateOfBirth"
                                render={({ field: { value } }) => (
                                    <>
                                        <Pressable
                                            className='flex-row items-center justify-between px-4 py-3 rounded-full border border-[var(--input-border)]'
                                            onPress={() => setShowDatePicker(true)}
                                        >
                                            <Text className='text-base tracking-wider'>
                                                {value ? formatDate(value) : 'Chọn ngày sinh'}
                                            </Text>
                                            <Calendar className='text-foreground' size={18} />
                                        </Pressable>
                                        {showDatePicker && (
                                            <DateTimePicker
                                                value={value || new Date()}
                                                mode='date'
                                                display='spinner'
                                                onChange={(event, selectedDate) => {
                                                    setShowDatePicker(false)
                                                    if (event.type === 'set' && selectedDate) {
                                                        setValue('dateOfBirth', selectedDate)
                                                    }
                                                }}
                                            />
                                        )}
                                        {errors.dateOfBirth && <Text className='text-red-500'>{errors.dateOfBirth.message}</Text>}
                                    </>
                                )}
                            />
                        </View>

                        <View className='flex-col gap-2 w-full'>
                            <Text className='text-base font-bold tracking-widest capitalize'>Giới tính</Text>
                            <Controller
                                control={control}
                                name="gender"
                                render={({ field: { onChange, value } }) => {
                                    const isMale = value != null ? parseInt(value) === GenderNumber.MALE : false
                                    return (
                                        <View className='flex-row gap-3'>
                                            <Pressable
                                                onPress={() => onChange(GenderNumber.FAMALE.toString())}
                                                className={`px-5 py-2 items-center justify-center rounded-full active:bg-[var(--click-bg)] ${!isMale ? 'bg-[var(--oppo-theme-col)]' : ''}`}
                                            >
                                                <Text className={!isMale ? 'text-[var(--same-theme-col)] font-semibold' : 'text-foreground'}>Nữ</Text>
                                            </Pressable>
                                            <Pressable
                                                onPress={() => onChange(GenderNumber.MALE.toString())}
                                                className={`px-5 py-2 items-center justify-center rounded-full active:bg-[var(--click-bg)] ${isMale ? 'bg-[var(--oppo-theme-col)]' : ''}`}
                                            >
                                                <Text className={isMale ? 'text-[var(--same-theme-col)] font-semibold' : 'text-foreground'}>Nam</Text>
                                            </Pressable>
                                        </View>
                                    )
                                }}
                            />
                        </View>

                        <View className='flex-col gap-3 w-full items-center'>
                            <Pressable
                                style={{ opacity: isLoading ? 0.5 : 1 }}
                                className="flex-row w-full gap-2 px-5 py-3 justify-center items-center bg-[var(--oppo-theme-col)] border border-[var(--same-theme-col)] rounded-full active:bg-[var(--oppo-click-bg)]"
                                disabled={isLoading}
                                onPress={handleSubmit(onSubmit)}
                            >
                                <Text className="text-base text-[var(--same-theme-col)] font-semibold tracking-wider capitalize">Đồng ý</Text>
                                {isLoading ? (
                                    <SpinningIcon icon={<Loader className='text-[var(--same-theme-col)]' size={18} />} />
                                ) : (
                                    <Check className="text-[var(--same-theme-col)]" size={18} />
                                )}
                            </Pressable>

                            <Pressable
                                style={{ opacity: isLoading ? 0.5 : 1 }}
                                className="flex-row w-full gap-2 px-5 py-3 justify-center items-center border border-[var(--oppo-theme-col)] rounded-full active:bg-[var(--click-bg)]"
                                disabled={isLoading}
                                onPress={() => setVisible(false)}
                            >
                                {isLoading ? (
                                    <SpinningIcon icon={<Loader className='text-[var(--oppo-theme-col)]' size={18} />} />
                                ) : (
                                    <X className="text-[var(--oppo-theme-col)]" size={18} />
                                )}
                                <Text className="text-base text-[var(--oppo-theme-col)] font-semibold tracking-wider capitalize">Hủy</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}
