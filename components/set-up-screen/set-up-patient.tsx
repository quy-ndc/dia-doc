import * as React from 'react';
import { View, Dimensions, ScrollView, Pressable, Alert } from 'react-native';
import { Text } from '../ui/text';
import { Option, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState } from 'react';
import { Input } from '../ui/input';
import SetUpFields from './set-up-fields';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { PencilLine } from '../../lib/icons/PencilLine';
import IconButton from '../common/icon-button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ChevronLeft } from '../../lib/icons/ChevronLeft';
import { Check } from '../../lib/icons/Check';
import { router } from 'expo-router';
import useUserStore from '../../store/userStore';
import { BloodType } from '../../assets/enum/blood';
import { DiaType } from '../../assets/enum/dia-type';
import { GenderNumber } from '../../assets/enum/gender';
import { UpdateUserProfile } from '../../service/api/user-service';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

type Prop = {
    setRole: (role: string) => void;
    mode: 'edit' | 'set-up'
};

export default function SetUpPatient({ setRole, mode }: Prop) {

    const { user } = useUserStore()
    const [loading, setLoading] = useState(false)

    const [show, setShow] = useState<boolean>(false)
    const [blood, setBlood] = useState<Option>()
    const [type, setType] = useState<Option>()
    const [gender, setGender] = useState<Option>()
    const [date, setDate] = useState<Date>(new Date())
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)

    const schema = yup.object({
        // phone: yup.string()
        //     .required('Không đước trống')
        //     .matches(/^\d{10}$/, 'Phải có đúng 10 chữ số'),
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
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            // phone: user.phone,
            weight: user.weight,
            height: user.height
        }
    })



    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShow(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    }

    const onSubmit = async () => {
        try {
            // const req = {
            //     dateOfBirth: date.toString(),
            //     genderType: Number(gender?.value),
            //     bloodType: Number(blood?.value),
            //     weight: weight,
            //     height: height,
            //     userId: user.id,
            //     medicalRecord: null
            // }
            const req = {
                dateOfBirth: 'asdasd',
                genderType: 0,
                bloodType: 0,
                weight: 111,
                height: 111,
                userId: 'asdasd',
                medicalRecord: null
            }
            console.log(req)
            const response = await UpdateUserProfile(req)
            if (response) {
                // setLoading(false)
            }
            console.log(response)
        } catch (e) {
            console.log(e)
            Toast.show({
                type: 'error',
                text1: 'Cập nhật thất bại',
                visibilityTime: 2000
            })
        }
    }

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

                    {/* <Controller
                            control={control}
                            name="phone"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className='flex-col gap-1'>
                                    <SetUpFields
                                        label='Số điện thoại'
                                        length={0.9}
                                        object={
                                            <Input
                                                className='tracking-widest'
                                                value={value}
                                                placeholder='0123456789'
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                maxLength={10}
                                                keyboardType='number-pad'
                                            />
                                        }
                                    />
                                    {errors.phone && <Text className='text-red-500'>{errors.phone.message}</Text>}
                                </View>
                            )}
                        /> */}

                    <View className='flex-row justify-between'>
                        <SetUpFields
                            label='Loại máu'
                            length={0.42}
                            object={
                                <Select
                                    value={blood}
                                    onValueChange={setBlood}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            className='text-foreground text-sm native:text-lg'
                                            placeholder='Loại máu'
                                        />
                                    </SelectTrigger>
                                    <SelectContent style={{ width: width * 0.42 }}>
                                        <SelectGroup>
                                            <SelectItem label='A+' value={BloodType.A_POSITIVE.toString()} />
                                            <SelectItem label='A-' value={BloodType.A_NEGATIVE.toString()} />
                                            <SelectItem label='B+' value={BloodType.B_POSITIVE.toString()} />
                                            <SelectItem label='B-' value={BloodType.B_NEGATIVE.toString()} />
                                            <SelectItem label='AB+' value={BloodType.AB_POSITIVE.toString()} />
                                            <SelectItem label='AB-' value={BloodType.AB_NEGATIVE.toString()} />
                                            <SelectItem label='O+' value={BloodType.O_POSITIVE.toString()} />
                                            <SelectItem label='O-' value={BloodType.O_NEGATIVE.toString()} />
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            }
                        />
                        <SetUpFields
                            label='Loại tiểu đường'
                            length={0.42}
                            object={
                                <Select
                                    value={type}
                                    onValueChange={setType}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            className='text-foreground text-sm native:text-lg'
                                            placeholder='Loại tiểu đường'
                                        />
                                    </SelectTrigger>
                                    <SelectContent style={{ width: width * 0.42 }}>
                                        <SelectGroup>
                                            <SelectItem label='Loại 1' value={DiaType.TYPE_1.toString()} />
                                            <SelectItem label='Loại 2' value={DiaType.TYPE_2.toString()} />
                                            <SelectItem label='Loại thai kỳ' value={DiaType.GESTATIONAL.toString()} />
                                            <SelectItem label='Loại khác' value={DiaType.OTHER.toString()} />
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            }
                        />
                    </View>

                    <View className='flex-row justify-between'>
                        <SetUpFields
                            label='Giới tính'
                            length={0.42}
                            object={
                                <Select
                                    value={gender}
                                    onValueChange={setGender}
                                >
                                    <SelectTrigger className='w-full'>
                                        <SelectValue
                                            className='text-foreground text-sm native:text-lg'
                                            placeholder='Giới tính'
                                        />
                                    </SelectTrigger>
                                    <SelectContent style={{ width: width * 0.4 }}>
                                        <SelectGroup>
                                            <SelectItem label='Nam' value={GenderNumber.MALE.toString()} />
                                            <SelectItem label='Nữ' value={GenderNumber.FAMALE.toString()} />
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            }
                        />
                        <SetUpFields
                            label='Ngày sinh'
                            length={0.42}
                            object={
                                <View className='flex-row gap-3 items-center '>
                                    <Text className='pl-1 text-lg tracking-widest'>
                                        {date.toLocaleDateString('en-GB')}
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
                        {show && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="spinner"
                                onChange={onChange}
                            />
                        )}
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
                                                onChangeText={text => {
                                                    onChange(text)
                                                    setWeight(Number(text))
                                                }}
                                                onBlur={onBlur}
                                                keyboardType='numeric'
                                            />
                                        }
                                    />
                                    {errors.weight && <Text className='text-red-500'>{errors.weight.message}</Text>}
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
                                                onChangeText={text => {
                                                    onChange(text)
                                                    setHeight(Number(text))
                                                }}
                                                onBlur={onBlur}
                                                maxLength={3}
                                                keyboardType='numeric'
                                            />
                                        }
                                    />
                                    {errors.height && <Text className='text-red-500'>{errors.height.message}</Text>}
                                </View>
                            )}
                        />
                    </View>

                    <View className='flex-row justify-between items-center'>
                        <View />
                        <View className='flex-row gap-2 justify-center items-center'>
                            <Pressable
                                className='flex-row items-center gap-2 pr-4 pl-2 py-3 rounded-md active:bg-[var(--click-bg)]'
                                onPress={() => setRole('')}
                            >
                                <ChevronLeft className='text-foreground' size={20} />
                                <Text className='text-base font-boldd tracking-wider capitalize'>Quay lại</Text>
                            </Pressable>
                            <Pressable
                                className='flex-row items-center gap-2 px-4 py-3 rounded-md active:bg-[var(--click-bg)]'
                                onPress={onSubmit}
                            // disabled={loading}
                            // onPress={() => router.push('/(main)')}
                            >
                                <Text className='text-base font-boldd tracking-wider capitalize'>Xác Nhận</Text>
                                <Check className='text-foreground' size={20} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}