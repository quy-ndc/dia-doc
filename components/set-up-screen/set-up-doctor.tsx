import * as React from 'react';
import { View, Dimensions, ScrollView, Pressable, Alert } from 'react-native';
import { Text } from '../../components/ui/text';
import { Option, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useState } from 'react';
import { Input } from '../../components/ui/input';
import SetUpFields from '../../components/set-up-screen/set-up-fields';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { PencilLine } from '../../lib/icons/PencilLine';
import IconButton from '../../components/common/icon-button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ChevronLeft } from '../../lib/icons/ChevronLeft';
import { Check } from '../../lib/icons/Check';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

type Prop = {
    setRole: (role: string) => void;
    mode: 'edit' | 'set-up'
};

export default function SetUpDoctor({ setRole, mode }: Prop) {

    const schema = yup.object({
        name: yup.string()
            .when({
                is: (value: string | undefined) => !!value,
                then: (schema) =>
                    schema.matches(/^[^\d]+$/, 'Không được chứa số'),
            })
            .when({
                is: (value: string | undefined) => !!value,
                then: (schema) =>
                    schema.matches(/^[A-Za-zÀ-ỹ\s]+$/, 'Không được chứa ký tự đặc biệt'),
            })
            .required('Không được trống'),
        phone: yup.string()
            .required('Không đước trống')
            .matches(/^\d{10}$/, 'Phải có đúng 10 chữ số')
            .matches(/^0/, 'Phải bắt đầu bằng 0'),
        exp: yup.string()
            .required('Không đước trống')
            .matches(/^\d+$/, 'Chỉ được chứa số')
            .test('is-greater-than-zero', 'Số phải lớn hơn 0', value => Number(value) > 0)
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: 'Nguyễn Đỗ Chung Quý',
            phone: '0333476554',
            exp: '1'
        }
    });

    const [gender, setGender] = useState<Option>({ label: 'Nam', value: 'male' })
    const [show, setShow] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(new Date())
    const [spec, setSpec] = useState<Option>({ label: 'Nội khoa', value: 'internal-medicine' })

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShow(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    }

    const onSubmit = (data: any) => {
        Alert.alert(
            `
            Name: ${data.name}
            Phone: ${data.phone}
            Gender: ${gender}
            DOB: ${date}
            Spec: ${spec}
            Exp: ${data.exp}
            `);
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
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View className='flex-col gap-1'>
                                <SetUpFields
                                    label='Họ và tên'
                                    length={0.9}
                                    object={
                                        <Input
                                            className='tracking-widest'
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            keyboardType='default'
                                        />
                                    }
                                />
                                {errors.name && <Text className='text-red-500'>{errors.name.message}</Text>}
                            </View>
                        )}
                    />

                    <Controller
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
                    />

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
                                            placeholder='Chọn giới tính'
                                        />
                                    </SelectTrigger>
                                    <SelectContent style={{ width: width * 0.4 }}>
                                        <SelectGroup>
                                            <SelectItem label='Nam' value='male' />
                                            <SelectItem label='Nữ' value='female' />
                                            <SelectItem label='Khác' value='other' />
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
                        <SetUpFields
                            label='Chuyên khoa'
                            length={0.42}
                            object={
                                <Select
                                    value={spec}
                                    onValueChange={setSpec}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            className='text-foreground text-sm native:text-lg'
                                            placeholder='Chọn chuyên khoa'
                                        />
                                    </SelectTrigger>
                                    <SelectContent style={{ width: width * 0.42 }}>
                                        <SelectGroup>
                                            <SelectItem label='Nội khoa' value='internal-medicine' />
                                            <SelectItem label='Ngoại khoa' value='surgery' />
                                            <SelectItem label='Sản - Nhi' value='obstetrics-pediatrics' />
                                            <SelectItem label='Khác' value='other' />
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            }
                        />
                        <Controller
                            control={control}
                            name="exp"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className='flex-col gap-1'>
                                    <SetUpFields
                                        label='Năm kinh nghiệm'
                                        length={0.42}
                                        object={
                                            <Input
                                                className='tracking-widest'
                                                value={value}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                maxLength={2}
                                                keyboardType='number-pad'
                                            />
                                        }
                                    />
                                    {errors.exp && <Text className='text-red-500'>{errors.exp.message}</Text>}
                                </View>
                            )}
                        />
                    </View>

                    <View className='flex-row justify-between items-center'>
                        <View />
                        <View className='flex-row gap-2 items-center'>
                            <Pressable
                                className='flex-row items-center gap-2 px-5 py-3 rounded-md active:bg-[var(--click-bg)]'
                                onPress={() => setRole('')}
                            >
                                <ChevronLeft className='text-foreground' size={20} />
                                <Text className='text-base font-boldd tracking-wider uppercase'>Quay lại</Text>
                            </Pressable>
                            <Pressable
                                className='flex-row items-center gap-2 px-5 py-3 rounded-md active:bg-[var(--click-bg)]'
                                // onPress={handleSubmit(onSubmit)}
                                onPress={() => router.push('/(main)')}
                            >
                                <Text className='text-base font-boldd tracking-wider uppercase'>Xác Nhận</Text>
                                <Check className='text-foreground' size={20} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}