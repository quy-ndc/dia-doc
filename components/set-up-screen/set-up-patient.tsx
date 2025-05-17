import * as React from 'react'
import { View, Dimensions, ScrollView, Pressable } from 'react-native'
import { Text } from '../ui/text'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import SetUpFields from './set-up-fields'
import DateTimePicker from '@react-native-community/datetimepicker'
import { PencilLine } from '../../lib/icons/PencilLine'
import IconButton from '../common/icon-button'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ChevronLeft } from '../../lib/icons/ChevronLeft'
import { Check } from '../../lib/icons/Check'
import useUserStore from '../../store/userStore'
import Toast from 'react-native-toast-message'
import { router } from 'expo-router'
import { bloodTypes } from '../../assets/data/blood-types'
import { diaTypes } from '../../assets/data/dia-types'
import { genders } from '../../assets/data/genders'
import { useEditPatientMutation } from '../../service/query/user-query'
import { User } from '../../assets/types/zustand/user-z'
import SpinningIcon from '../common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { Patient } from '../../assets/types/user/patient'

const { width } = Dimensions.get('window')

type Prop = {
    setRole: (role: string) => void
    mode: 'edit' | 'set-up'
}

export default function SetUpPatient({ setRole, mode }: Prop) {

    const { user, setUser } = useUserStore()

    const [show, setShow] = useState<boolean>(false)
    const [loginTrigger, setLoginTrigger] = useState(false)

    const { mutateAsync, isLoading, data, isSuccess, isError } = useEditPatientMutation()

    const schema = yup.object({
        weight: yup
            .number()
            .typeError('Chỉ được chứa số')
            .required('Không được trống')
            .integer('Phải là số nguyên')
            .positive('Phải lớn hơn 0'),
        height: yup
            .number()
            .typeError('Chỉ được chứa số')
            .required('Không được trống')
            .integer('Phải là số nguyên')
            .positive('Phải lớn hơn 0'),
        gender: yup
            .string()
            .required('Không được trống'),
        blood: yup
            .string()
            .required('Không được trống'),
        type: yup
            .string()
            .required('Không được trống'),
        date: yup.date()
            .max(new Date(), 'Ngày ở tương lai')
            .min(new Date('1900-01-01'), 'Ngày quá cũ')
            .required('Chọn ngày'),
    }).required()

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            weight: user.weight || 0,
            height: user.height || 0,
            gender: '',
            blood: '',
            type: '',
            date: new Date()
        }
    })

    const onSubmit = async (data: any) => {
        try {
            setLoginTrigger(true)
            await mutateAsync({
                dateOfBirth: data.date,
                genderType: Number(data.gender),
                bloodType: Number(data.blood),
                weight: Number(data.weight),
                height: Number(data.height),
                diabetesType: Number(data.type),
                medicalRecord: null
            })
        } catch (e) {
            console.log(e)
            Toast.show({
                type: 'error',
                text1: 'Thiết lập hồ sơ thất bại',
                visibilityTime: 2000
            })
        }
    }

    const postUpdateRedirect = () => {
        if (mode == 'edit') {
            router.back()
        } else {
            router.replace('/(protected)/(main)')
        }
    }

    useEffect(() => {
        if (!isSuccess || !data) return

        const result: Patient = data.data.value.data.patient
        const userData: User = {
            ...user,
            isAuthenticated: true,
            isSetUp: true,
            id: result.id,
            blood: result.bloodType,
            diaType: result.diabetesType,
            gender: result.gender,
            bod: result.dateOfBirth,
            weight: result.weight,
            height: result.height
        }

        setUser(userData)
        postUpdateRedirect()
        Toast.show({
            type: 'success',
            text1: 'Thiết lập hồ sơ thành công',
            visibilityTime: 2000
        })
    }, [isSuccess])

    useEffect(() => {
        if (!isError || !loginTrigger) return

        Toast.show({
            type: 'error',
            text1: 'Thiết lập hồ sơ thất bại',
            visibilityTime: 2000
        })

        setLoginTrigger(false)
    }, [isError])

    return (
        <ScrollView
            className='flex-1 pt-10'
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <View className='flex-col w-full gap-7 justify-center items-center'>
                <Text className='text-2xl font-bold tracking-widest capitalize pb-3'>
                    {mode == 'set-up' ? (
                        'Thiết lập hồ Sơ'
                    ) : (
                        'Chỉnh sửa hồ sơ'
                    )}
                </Text>
                <View className='flex-col gap-7'>
                    <View className='flex-col gap-1'>
                        <SetUpFields
                            label='Họ và tên'
                            length={0.9}
                            object={
                                <Input
                                    className='tracking-widest'
                                    value={user.fullname}
                                    keyboardType='default'
                                    editable={false}
                                />
                            }
                        />
                    </View>
                    <View className='flex-row justify-between'>
                        <Controller
                            control={control}
                            name="blood"
                            rules={{ required: 'Chọn loại máu' }}
                            render={({ field: { onChange, value } }) => {
                                const selectedOption = bloodTypes.find((option) => option.value === value)
                                return (
                                    <View className="flex-col gap-1">
                                        <SetUpFields
                                            label="Loại máu"
                                            length={0.42}
                                            object={
                                                <Select
                                                    value={selectedOption}
                                                    onValueChange={(option) => onChange(option?.value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            className="text-foreground text-sm native:text-lg"
                                                            placeholder="Loại máu"
                                                        >
                                                            {selectedOption?.label ?? ''}
                                                        </SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent style={{ width: width * 0.42 }}>
                                                        <SelectGroup>
                                                            {bloodTypes.map((option) => (
                                                                <SelectItem
                                                                    key={option.value}
                                                                    label={option.label}
                                                                    value={option.value}
                                                                />
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            }
                                        />
                                        {errors.blood && (
                                            <Text className="text-red-500 tracking-wider">
                                                {errors.blood.message}
                                            </Text>
                                        )}
                                    </View>
                                )
                            }}
                        />

                        <Controller
                            control={control}
                            name="type"
                            rules={{ required: 'Chọn loại tiểu đường' }}
                            render={({ field: { onChange, value } }) => {
                                const selectedOption = diaTypes.find((option) => option.value === value)
                                return (
                                    <View className="flex-col gap-1">
                                        <SetUpFields
                                            label="Loại tiểu đường"
                                            length={0.42}
                                            object={
                                                <Select
                                                    value={selectedOption}
                                                    onValueChange={(option) => onChange(option?.value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            className="text-foreground text-sm native:text-lg"
                                                            placeholder="Loại tiểu đường"
                                                        >
                                                            {selectedOption?.label ?? ''}
                                                        </SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent style={{ width: width * 0.42 }}>
                                                        <SelectGroup>
                                                            {diaTypes.map((option) => (
                                                                <SelectItem
                                                                    key={option.value}
                                                                    label={option.label}
                                                                    value={option.value}
                                                                />
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            }
                                        />
                                        {errors.type && (
                                            <Text className="text-red-500 tracking-wider">
                                                {errors.type.message}
                                            </Text>
                                        )}
                                    </View>
                                )
                            }}
                        />
                    </View>
                    <View className='flex-row justify-between'>
                        <Controller
                            control={control}
                            name="gender"
                            rules={{ required: 'Chọn giới tính' }}
                            render={({ field: { onChange, value } }) => {
                                const selectedOption = genders.find((option) => option.value === value)
                                return (
                                    <View className="flex-col gap-1">
                                        <SetUpFields
                                            label="Giới tính"
                                            length={0.42}
                                            object={
                                                <Select
                                                    value={selectedOption}
                                                    onValueChange={(option) => onChange(option?.value)}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue
                                                            className="text-foreground text-sm native:text-lg"
                                                            placeholder="Giới tính"
                                                        >
                                                            {selectedOption?.label ?? ''}
                                                        </SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent style={{ width: width * 0.4 }}>
                                                        <SelectGroup>
                                                            {genders.map((option) => (
                                                                <SelectItem
                                                                    key={option.value}
                                                                    label={option.label}
                                                                    value={option.value}
                                                                />
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            }
                                        />
                                        {errors.gender && (
                                            <Text className="text-red-500 tracking-wider">
                                                {errors.gender.message}
                                            </Text>
                                        )}
                                    </View>
                                )
                            }}
                        />
                        <Controller
                            control={control}
                            name="date"
                            rules={{ required: 'Chọn giới tính' }}
                            render={({ field: { onChange, value } }) => (
                                <View className='flex-col gap-1'>
                                    <SetUpFields
                                        label='Ngày sinh'
                                        length={0.42}
                                        object={
                                            <View className='flex-row gap-3 items-center '>
                                                <Text className='pl-1 text-lg tracking-widest'>
                                                    {value ? new Date(value).toLocaleDateString('en-GB') : 'dd/mm/yyyy'}
                                                </Text>
                                                <IconButton
                                                    icon={<PencilLine className='text-foreground' size={20} strokeWidth={1.25} />}
                                                    buttonSize={3}
                                                    possition={'other'}
                                                    onPress={() => setShow(true)}
                                                />
                                            </View>
                                        }
                                    />
                                    {errors.date && <Text className='text-red-500 tracking-wider'>{errors.date.message}</Text>}
                                    {show && (
                                        <DateTimePicker
                                            value={value ? new Date(value) : new Date()}
                                            mode="date"
                                            display="spinner"
                                            onChange={(event, selectedDate) => {
                                                setShow(false)
                                                if (event.type === 'set' && selectedDate) {
                                                    onChange(selectedDate.toISOString())
                                                }
                                            }}
                                        />

                                    )}
                                </View>
                            )}
                        />
                    </View>
                    <View className='flex-row justify-between'>
                        <Controller
                            control={control}
                            name="weight"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className='flex-col gap-1'>
                                    <SetUpFields
                                        label='Cân nặng (kg)'
                                        length={0.42}
                                        object={
                                            <Input
                                                className='tracking-widest'
                                                value={value.toString()}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                maxLength={3}
                                                keyboardType='numeric'
                                            />
                                        }
                                    />
                                    {errors.weight && <Text className='text-red-500 tracking-wider'>{errors.weight.message}</Text>}
                                </View>
                            )}
                        />
                        <Controller
                            control={control}
                            name="height"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className='flex-col gap-1'>
                                    <SetUpFields
                                        label='Chiều cao (cm)'
                                        length={0.42}
                                        object={
                                            <Input
                                                className='tracking-widest'
                                                value={value.toString()}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                maxLength={3}
                                                keyboardType='numeric'
                                            />
                                        }
                                    />
                                    {errors.height && <Text className='text-red-500 tracking-wider'>{errors.height.message}</Text>}
                                </View>
                            )}
                        />
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <View />
                        <View className='flex-row gap-2 justify-center items-center'>
                            <Pressable
                                className={`flex-row items-center gap-2 pr-4 pl-2 py-3 rounded-md active:bg-[var(--click-bg)] ${isLoading && 'opacity-50'}`}
                                disabled={isLoading}
                                onPress={mode == 'set-up' ? () => setRole('') : () => router.back()}
                            >
                                {isLoading ? (
                                    <SpinningIcon icon={<Loader className='text-foreground' size={20} />} />
                                ) : (
                                    <ChevronLeft className='text-foreground' size={20} />
                                )}
                                <Text className='text-base font-boldd tracking-wider capitalize'>Quay lại</Text>
                            </Pressable>
                            <Pressable
                                className={`flex-row items-center gap-2 px-4 py-3 rounded-md active:bg-[var(--click-bg)] ${isLoading && 'opacity-50'}`}
                                disabled={isLoading}
                                onPress={handleSubmit(onSubmit)}
                            // onPress={() => router.push('/(main)')}
                            >
                                <Text className='text-base font-boldd tracking-wider capitalize'>Xác Nhận</Text>
                                {isLoading ? (
                                    <SpinningIcon icon={<Loader className='text-foreground' size={20} />} />
                                ) : (
                                    <Check className='text-foreground' size={20} />
                                )}
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}