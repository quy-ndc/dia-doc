import * as React from 'react'
import { View, Dimensions, ScrollView, Pressable } from 'react-native'
import { Text } from '../../components/ui/text'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { useEffect, useState } from 'react'
import { Input } from '../../components/ui/input'
import SetUpFields from '../../components/set-up-screen/set-up-fields'
import DateTimePicker from '@react-native-community/datetimepicker'
import { PencilLine } from '../../lib/icons/PencilLine'
import IconButton from '../../components/common/icon-button'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ChevronLeft } from '../../lib/icons/ChevronLeft'
import { Check } from '../../lib/icons/Check'
import useUserStore from '../../store/userStore'
import Toast from 'react-native-toast-message'
import { router } from 'expo-router'
import { genders } from '../../assets/data/genders'
import { useCreateUserProfileMutation } from '../../service/query/user-query'
import SpinningIcon from '../../components/common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { diagnosisRecencyTypes } from '../../assets/data/diagnosis-recency'
import { type2TreatmentTypes } from '../../assets/data/type-2-treatment'
import { controlLevelTypes } from '../../assets/data/control-level'
import { insulinInjectionTypes } from '../../assets/data/insulin-injection'
import { complicationTypes } from '../../assets/data/complications'
import { exerciseFrequencyTypes } from '../../assets/data/exercise-frequency'
import { eatingHabitTypes } from '../../assets/data/eating-habits'
import { medicalHistoryTypes } from '../../assets/data/medical-histories'
import { Checkbox } from '../../components/ui/checkbox'
import { diaTypes } from '../../assets/data/dia-types'
import { User } from '../../assets/types/zustand/user-z'

const { width } = Dimensions.get('window')

type FormValues = {
    firstName: string;
    middleName: string;
    lastName: string;
    weight: number;
    height: number;
    gender: string;
    diaRecency: string;
    diagnosisYear?: number;
    type: string;
    treatmentMethod?: string;
    insulinInjectionFrequency?: string;
    controlLevel: string;
    complications: string[];
    otherComplicationDescription?: string;
    date: Date;
    exerciseFrequency: string;
    eatingHabit: string;
    usesAlcoholOrTobacco: string;
    medicalHistories: string[];
    note?: string;
}

export default function SetUpScreen() {

    const { user, setUser } = useUserStore()

    const [show, setShow] = useState<boolean>(false)
    const [newUser, setNewUser] = useState<User>()

    const { mutateAsync, isLoading, data, isError } = useCreateUserProfileMutation()

    const schema = yup.object().shape({
        firstName: yup
            .string()
            .required('Không được trống'),
        middleName: yup
            .string()
            .required('Không được trống'),
        lastName: yup
            .string()
            .required('Không được trống'),
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
        diaRecency: yup
            .string()
            .required('Không được trống'),
        diagnosisYear: yup
            .number()
            .typeError('Chỉ được chứa số')
            .when('diaRecency', {
                is: '2',
                then: (schema) => schema
                    .required('Không được trống')
                    .integer('Phải là số nguyên')
                    .min(1900, 'Năm không hợp lệ')
                    .max(new Date().getFullYear(), 'Năm không được lớn hơn năm hiện tại')
            }),
        type: yup
            .string()
            .required('Không được trống'),
        treatmentMethod: yup
            .string()
            .when('type', {
                is: '2',
                then: (schema) => schema.required('Không được trống')
            }),
        insulinInjectionFrequency: yup
            .string()
            .when(['type', 'treatmentMethod'], {
                is: (type: string, treatmentMethod: string) =>
                    type === '0' || (type === '1' && treatmentMethod === '0'),
                then: (schema) => schema.required('Không được trống'),
                otherwise: (schema) => schema.optional()
            }),
        controlLevel: yup.string().optional(),
        complications: yup.array().of(yup.string()).optional(),
        otherComplicationDescription: yup
            .string()
            .when('complications', {
                is: (complications: string[]) => complications?.includes('5'),
                then: (schema) => schema.required('Vui lòng mô tả biến chứng khác')
            }),
        date: yup.date()
            .max(new Date(), 'Ngày ở tương lai')
            .min(new Date('1900-01-01'), 'Ngày quá cũ')
            .required('Chọn ngày'),
        exerciseFrequency: yup.string().optional(),
        eatingHabit: yup.string().optional(),
        usesAlcoholOrTobacco: yup.string().optional(),
        medicalHistories: yup.array().of(yup.string()).optional(),
        note: yup.string().optional()
    }) as yup.ObjectSchema<FormValues>

    const { control, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
        resolver: yupResolver<FormValues>(schema),
        defaultValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            weight: 0,
            height: 0,
            gender: '',
            diaRecency: '',
            diagnosisYear: undefined,
            type: '',
            treatmentMethod: '',
            insulinInjectionFrequency: '',
            controlLevel: '',
            complications: [],
            otherComplicationDescription: '',
            date: new Date(),
            exerciseFrequency: '',
            eatingHabit: '',
            usesAlcoholOrTobacco: '',
            medicalHistories: [],
            note: ''
        }
    })

    const diaRecencyValue = watch('diaRecency')
    const diabetesType = watch('type')
    const treatmentMethod = watch('treatmentMethod')
    const showInsulinFrequency = diabetesType === '0' || (diabetesType === '1' && treatmentMethod === '0')

    const onSubmit = async (data: FormValues) => {
        try {
            const request: any = {
                userId: user.id,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                dateOfBirth: data.date.toISOString(),
                gender: Number(data.gender),
                heightCm: Number(data.height),
                weightKg: Number(data.weight),
                diabetes: Number(data.type),
                diagnosisRecency: Number(data.diaRecency),
                year: data.diaRecency === '2' ? Number(data.diagnosisYear) : undefined,
                type2TreatmentMethod: data.type === '1' ? Number(data.treatmentMethod) : undefined,
                controlLevel: data.controlLevel ? Number(data.controlLevel) : undefined,
                insulinInjectionFrequency: data.insulinInjectionFrequency ? Number(data.insulinInjectionFrequency) : undefined,
                complications: data.complications?.length ? data.complications.map(Number) : undefined,
                otherComplicationDescription: data.complications?.includes('5') ? data.otherComplicationDescription : undefined,
                exerciseFrequency: data.exerciseFrequency ? Number(data.exerciseFrequency) : undefined,
                eatingHabit: data.eatingHabit ? Number(data.eatingHabit) : undefined,
                usesAlcoholOrTobacco: data.usesAlcoholOrTobacco ? data.usesAlcoholOrTobacco === 'true' : undefined,
                medicalHistories: data.medicalHistories?.length ? data.medicalHistories.map(Number) : undefined,
                note: data.note || undefined
            }

            setNewUser({
                ...user,
                isSetUp: true,
                fullName: `${data.lastName} ${data.middleName} ${data.firstName}`,
            })

            await mutateAsync(request)
        } catch (e) {
            console.log(e)
            Toast.show({
                type: 'error',
                text1: 'Thiết lập hồ sơ thất bại',
                visibilityTime: 2000
            })
        }
    }

    useEffect(() => {
        console.log(data?.data?.errors)
        if (!data?.data || isError || data.status !== 200) return

        if (newUser) {
            setUser(newUser)
            router.replace('/(protected)/(main)')
        }
    }, [isLoading, data])

    return (
        <ScrollView className='pb-20'>
            <View className='flex-col w-full gap-5 justify-center items-center'>
                <View className='flex-col gap-5'>
                    <View className='flex-col gap-5'>
                        <Controller
                            control={control}
                            name="lastName"
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <View className='flex-col gap-1'>
                                        <SetUpFields
                                            label='Họ'
                                            length={0.9}
                                            required={true}
                                            object={
                                                <Input
                                                    className='tracking-widest'
                                                    value={value}
                                                    keyboardType='default'
                                                    onChangeText={onChange}
                                                />
                                            }
                                        />
                                        {errors.lastName && (
                                            <Text className="text-red-500 tracking-wider">
                                                {errors.lastName.message}
                                            </Text>
                                        )}
                                    </View>
                                )
                            }}
                        />
                        <Controller
                            control={control}
                            name="middleName"
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <View className='flex-col gap-1'>
                                        <SetUpFields
                                            label='Tên đệm'
                                            length={0.9}
                                            required={true}
                                            object={
                                                <Input
                                                    className='tracking-widest'
                                                    value={value}
                                                    keyboardType='default'
                                                    onChangeText={onChange}
                                                />
                                            }
                                        />
                                        {errors.middleName && (
                                            <Text className="text-red-500 tracking-wider">
                                                {errors.middleName.message}
                                            </Text>
                                        )}
                                    </View>
                                )
                            }}
                        />
                        <Controller
                            control={control}
                            name="firstName"
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <View className='flex-col gap-1'>
                                        <SetUpFields
                                            label='Tên'
                                            length={0.9}
                                            required={true}
                                            object={
                                                <Input
                                                    className='tracking-widest'
                                                    value={value}
                                                    keyboardType='default'
                                                    onChangeText={onChange}
                                                />
                                            }
                                        />
                                        {errors.firstName && (
                                            <Text className="text-red-500 tracking-wider">
                                                {errors.firstName.message}
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
                                            required={true}
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
                                        required={true}
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
                                        required={true}
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
                                        required={true}
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
                                        length={0.9}
                                        required={true}
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
                                                <SelectContent style={{ width: width * 0.9 }}>
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

                    {diabetesType === '1' && (
                        <Controller
                            control={control}
                            name="treatmentMethod"
                            render={({ field: { onChange, value } }) => {
                                const selectedOption = type2TreatmentTypes.find((option) => option.value === value)
                                return (
                                    <View className="flex-col gap-1">
                                        <SetUpFields
                                            label="Phương pháp điều trị"
                                            length={0.9}
                                            required={true}
                                            object={
                                                <Select
                                                    value={selectedOption}
                                                    onValueChange={(option) => onChange(option?.value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            className="text-foreground text-sm native:text-lg"
                                                            placeholder="Chọn phương pháp điều trị"
                                                        >
                                                            {selectedOption?.label ?? ''}
                                                        </SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent style={{ width: width * 0.9 }}>
                                                        <SelectGroup>
                                                            {type2TreatmentTypes.map((option) => (
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
                                        {errors.treatmentMethod && (
                                            <Text className="text-red-500 tracking-wider">
                                                {errors.treatmentMethod.message}
                                            </Text>
                                        )}
                                    </View>
                                )
                            }}
                        />
                    )}

                    <Controller
                        control={control}
                        name="diaRecency"
                        rules={{ required: 'Thời điểm chuẩn đoán' }}
                        render={({ field: { onChange, value } }) => {
                            const selectedOption = diagnosisRecencyTypes.find((option) => option.value === value)
                            return (
                                <View className="flex-col gap-1">
                                    <SetUpFields
                                        label="Thời điểm chuẩn đoán"
                                        length={0.9}
                                        required
                                        object={
                                            <Select
                                                value={selectedOption}
                                                onValueChange={(option) => onChange(option?.value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        className="text-foreground text-sm native:text-lg"
                                                        placeholder="Thời điểm chuẩn đoán"
                                                    >
                                                        {selectedOption?.label ?? ''}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent style={{ width: width * 0.9 }}>
                                                    <SelectGroup>
                                                        {diagnosisRecencyTypes.map((option) => (
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
                                    {errors.diaRecency && (
                                        <Text className="text-red-500 tracking-wider">
                                            {errors.diaRecency.message}
                                        </Text>
                                    )}
                                </View>
                            )
                        }}
                    />

                    {diaRecencyValue === '2' && (
                        <Controller
                            control={control}
                            name="diagnosisYear"
                            render={({ field: { onChange, value } }) => (
                                <View className="flex-col gap-1">
                                    <SetUpFields
                                        label="Năm chuẩn đoán"
                                        length={0.9}
                                        required={true}
                                        object={
                                            <Input
                                                className="tracking-widest"
                                                value={value?.toString() || ''}
                                                onChangeText={onChange}
                                                keyboardType="numeric"
                                                placeholder="Nhập năm chẩn đoán"
                                                maxLength={4}
                                            />
                                        }
                                    />
                                    {errors.diagnosisYear && (
                                        <Text className="text-red-500 tracking-wider">
                                            {errors.diagnosisYear.message}
                                        </Text>
                                    )}
                                </View>
                            )}
                        />
                    )}

                    {showInsulinFrequency && (
                        <Controller
                            control={control}
                            name="insulinInjectionFrequency"
                            render={({ field: { onChange, value } }) => {
                                const selectedOption = insulinInjectionTypes.find((option) => option.value === value)
                                return (
                                    <View className="flex-col gap-1">
                                        <SetUpFields
                                            label="Tần suất tiêm Insulin"
                                            length={0.9}
                                            required
                                            object={
                                                <Select
                                                    value={selectedOption}
                                                    onValueChange={(option) => onChange(option?.value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            className="text-foreground text-sm native:text-lg"
                                                            placeholder="Chọn tần suất tiêm Insulin"
                                                        >
                                                            {selectedOption?.label ?? ''}
                                                        </SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent style={{ width: width * 0.9 }}>
                                                        <SelectGroup>
                                                            {insulinInjectionTypes.map((option) => (
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
                                        {errors.insulinInjectionFrequency && (
                                            <Text className="text-red-500 tracking-wider">
                                                {errors.insulinInjectionFrequency.message}
                                            </Text>
                                        )}
                                    </View>
                                )
                            }}
                        />
                    )}

                    <Controller
                        control={control}
                        name="controlLevel"
                        render={({ field: { onChange, value } }) => {
                            const selectedOption = controlLevelTypes.find((option) => option.value === value)
                            return (
                                <View className="flex-col gap-1">
                                    <SetUpFields
                                        label="Mức độ kiểm soát"
                                        length={0.9}
                                        object={
                                            <Select
                                                value={selectedOption}
                                                onValueChange={(option) => onChange(option?.value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        className="text-foreground text-sm native:text-lg"
                                                        placeholder="Chọn mức độ kiểm soát"
                                                    >
                                                        {selectedOption?.label ?? ''}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent style={{ width: width * 0.9 }}>
                                                    <SelectGroup>
                                                        {controlLevelTypes.map((option) => (
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
                                    {errors.controlLevel && (
                                        <Text className="text-red-500 tracking-wider">
                                            {errors.controlLevel.message}
                                        </Text>
                                    )}
                                </View>
                            )
                        }}
                    />

                    <Controller
                        control={control}
                        name="complications"
                        render={({ field: { onChange, value } }) => {
                            return (
                                <View className="flex-col gap-1">
                                    <SetUpFields
                                        label="Biến chứng"
                                        length={0.9}
                                        object={
                                            <View className="flex-row flex-wrap justify-between">
                                                {complicationTypes.map((option) => (
                                                    <Pressable
                                                        key={option.value}
                                                        className="w-[48%] mb-3"
                                                        onPress={() => {
                                                            const isSelected = value.includes(option.value)
                                                            const newValue = isSelected
                                                                ? value.filter(v => v !== option.value)
                                                                : [...value, option.value]
                                                            onChange(newValue)
                                                        }}
                                                    >
                                                        <View className="flex-row items-center gap-3">
                                                            <Checkbox
                                                                checked={value.includes(option.value)}
                                                                onCheckedChange={(checked) => {
                                                                    const newValue = checked
                                                                        ? [...value, option.value]
                                                                        : value.filter(v => v !== option.value)
                                                                    onChange(newValue)
                                                                }}
                                                            />
                                                            <Text className="text-base tracking-wider flex-1">{option.label}</Text>
                                                        </View>
                                                    </Pressable>
                                                ))}
                                            </View>
                                        }
                                    />
                                    {errors.complications && (
                                        <Text className="text-red-500 tracking-wider">
                                            {errors.complications.message}
                                        </Text>
                                    )}
                                </View>
                            )
                        }}
                    />

                    <Controller
                        control={control}
                        name="otherComplicationDescription"
                        render={({ field: { onChange, value } }) => {
                            const complications = watch('complications')
                            const showOtherField = complications?.includes('5')

                            if (!showOtherField) {
                                return <View />
                            }

                            return (
                                <View className="flex-col gap-1">
                                    <SetUpFields
                                        label="Mô tả biến chứng khác"
                                        length={0.9}
                                        object={
                                            <Input
                                                className="tracking-widest"
                                                value={value || ''}
                                                onChangeText={onChange}
                                                placeholder="Nhập mô tả biến chứng khác"
                                            />
                                        }
                                    />
                                    {errors.otherComplicationDescription && (
                                        <Text className="text-red-500 tracking-wider">
                                            {errors.otherComplicationDescription.message}
                                        </Text>
                                    )}
                                </View>
                            )
                        }}
                    />

                    <Controller
                        control={control}
                        name="exerciseFrequency"
                        render={({ field: { onChange, value } }) => {
                            const selectedOption = exerciseFrequencyTypes.find((option) => option.value === value)
                            return (
                                <View className="flex-col gap-1">
                                    <SetUpFields
                                        label="Tần suất tập thể dục"
                                        length={0.9}
                                        object={
                                            <Select
                                                value={selectedOption}
                                                onValueChange={(option) => onChange(option?.value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        className="text-foreground text-sm native:text-lg"
                                                        placeholder="Chọn tần suất tập thể dục"
                                                    >
                                                        {selectedOption?.label ?? ''}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent style={{ width: width * 0.9 }}>
                                                    <SelectGroup>
                                                        {exerciseFrequencyTypes.map((option) => (
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
                                    {errors.exerciseFrequency && (
                                        <Text className="text-red-500 tracking-wider">
                                            {errors.exerciseFrequency.message}
                                        </Text>
                                    )}
                                </View>
                            )
                        }}
                    />

                    <Controller
                        control={control}
                        name="eatingHabit"
                        render={({ field: { onChange, value } }) => {
                            const selectedOption = eatingHabitTypes.find((option) => option.value === value)
                            return (
                                <View className="flex-col gap-1">
                                    <SetUpFields
                                        label="Thói quen ăn uống"
                                        length={0.9}
                                        object={
                                            <Select
                                                value={selectedOption}
                                                onValueChange={(option) => onChange(option?.value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        className="text-foreground text-sm native:text-lg"
                                                        placeholder="Chọn thói quen ăn uống"
                                                    >
                                                        {selectedOption?.label ?? ''}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent style={{ width: width * 0.9 }}>
                                                    <SelectGroup>
                                                        {eatingHabitTypes.map((option) => (
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
                                    {errors.eatingHabit && (
                                        <Text className="text-red-500 tracking-wider">
                                            {errors.eatingHabit.message}
                                        </Text>
                                    )}
                                </View>
                            )
                        }}
                    />

                    <Controller
                        control={control}
                        name="medicalHistories"
                        render={({ field: { onChange, value } }) => {
                            return (
                                <View className="flex-col gap-1">
                                    <SetUpFields
                                        label="Tiền sử bệnh"
                                        length={0.9}
                                        object={
                                            <View className="flex-row flex-wrap justify-between">
                                                {medicalHistoryTypes.map((option) => (
                                                    <Pressable
                                                        key={`${option.value}-${option.label}`}
                                                        className="w-[48%] mb-3"
                                                        onPress={() => {
                                                            const isSelected = value.includes(option.value)
                                                            const newValue = isSelected
                                                                ? value.filter(v => v !== option.value)
                                                                : [...value, option.value]
                                                            onChange(newValue)
                                                        }}
                                                    >
                                                        <View className="flex-row items-center gap-3">
                                                            <Checkbox
                                                                checked={value.includes(option.value)}
                                                                onCheckedChange={(checked) => {
                                                                    const newValue = checked
                                                                        ? [...value, option.value]
                                                                        : value.filter(v => v !== option.value)
                                                                    onChange(newValue)
                                                                }}
                                                            />
                                                            <Text className="text-base tracking-wider flex-1">{option.label}</Text>
                                                        </View>
                                                    </Pressable>
                                                ))}
                                            </View>
                                        }
                                    />
                                    {errors.medicalHistories && (
                                        <Text className="text-red-500 tracking-wider">
                                            {errors.medicalHistories.message}
                                        </Text>
                                    )}
                                </View>
                            )
                        }}
                    />

                    <Controller
                        control={control}
                        name="usesAlcoholOrTobacco"
                        rules={{ required: 'Vui lòng chọn' }}
                        render={({ field: { onChange, value } }) => {
                            const options = [
                                { value: 'true', label: 'Có' },
                                { value: 'false', label: 'Không' }
                            ]
                            const selectedOption = options.find((option) => option.value === value)
                            return (
                                <View className="flex-col gap-1">
                                    <SetUpFields
                                        label="Bạn có sử dụng rượu bia/thuốc lá không?"
                                        length={0.9}
                                        object={
                                            <Select
                                                value={selectedOption}
                                                onValueChange={(option) => onChange(option?.value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        className="text-foreground text-sm native:text-lg"
                                                        placeholder="Chọn câu trả lời"
                                                    >
                                                        {selectedOption?.label ?? ''}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent style={{ width: width * 0.9 }}>
                                                    <SelectGroup>
                                                        {options.map((option) => (
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
                                    {errors.usesAlcoholOrTobacco && (
                                        <Text className="text-red-500 tracking-wider">
                                            {errors.usesAlcoholOrTobacco.message}
                                        </Text>
                                    )}
                                </View>
                            )
                        }}
                    />

                    <Controller
                        control={control}
                        name="note"
                        render={({ field: { onChange, value } }) => {
                            return (
                                <View className="flex-col gap-1">
                                    <SetUpFields
                                        label="Ghi chú"
                                        length={0.9}
                                        object={
                                            <Input
                                                className="tracking-widest"
                                                value={value || ''}
                                                onChangeText={onChange}
                                                placeholder="Nhập ghi chú (không bắt buộc)"
                                                multiline={true}
                                                numberOfLines={3}
                                            />
                                        }
                                    />
                                </View>
                            )
                        }}
                    />

                    <View className='flex-col gap-5 items-center pb-10'>
                        <Pressable
                            style={{ opacity: isLoading ? 0.5 : 1 }}
                            className="flex-row w-full gap-2 px-5 py-3 justify-center items-center bg-[var(--oppo-theme-col)] border border-[var(--same-theme-col)] rounded-full active:bg-[var(--oppo-click-bg)]"
                            disabled={isLoading}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text className="text-base text-[var(--same-theme-col)] font-semibold tracking-wider capitalize">Xác nhận</Text>
                            {isLoading ? (
                                <SpinningIcon icon={<Loader className='text-foreground' size={20} />} />
                            ) : (
                                <Check className='text-[var(--same-theme-col)]' size={20} />
                            )}
                        </Pressable>

                        <Pressable
                            style={{ opacity: isLoading ? 0.5 : 1 }}
                            className="flex-row w-full gap-2 px-5 py-3 justify-center items-center border border-[var(--oppo-theme-col)] rounded-full active:bg-[var(--click-bg)]"
                            disabled={isLoading}
                            onPress={() => router.replace('/(unauthenticated)/landing-screen')}
                        >
                            {isLoading ? (
                                <SpinningIcon icon={<Loader className='text-[var(--oppo-theme-col)]' size={17} />} />
                            ) : (
                                <ChevronLeft className='text-foreground' size={20} />
                            )}
                            <Text className="text-base text-[var(--oppo-theme-col)] font-semibold tracking-wider capitalize">Quay lại</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}