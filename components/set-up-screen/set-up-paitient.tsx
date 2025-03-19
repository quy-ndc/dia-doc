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
};

export default function SetUpPaitient({ setRole }: Prop) {

    const schema = yup.object({
        name: yup.string().required('Không được trống'),
        phone: yup.string()
            .required('Không đước trống')
            .matches(/^\d{10}$/, 'Phải có đúng 10 chữ số'),
        weight: yup.string()
            .required('Không được trống')
            .matches(/^\d+$/, 'Chỉ được chứa số'),
        height: yup.string()
            .required('Không được trống')
            .matches(/^\d+$/, 'Chỉ được chứa số')
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: 'Nguyễn Đỗ Chung Quý',
            phone: '0333476554',
            weight: '40',
            height: '150'
        }
    });

    const [gender, setGender] = useState<Option>({ label: 'Nam', value: 'male' })
    const [show, setShow] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(new Date())
    const [blood, setBlood] = useState<Option>({ label: 'A+', value: 'A+' })
    const [type, setType] = useState<Option>({ label: 'Loại 1', value: 'type1' })

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
            Weight: ${data.weight}
            Height: ${data.height}
            Type: ${type}
            `);
    }

    return (
        <ScrollView
            className='flex-1 pt-10'
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <View className='flex-col w-full gap-7 justify-center items-center'>
                <Text className='text-2xl font-bold tracking-widest capitalize pb-3'>Thiết lập hồ Sơ</Text>

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
                                            placeholder='Chọn loại máu'
                                        />
                                    </SelectTrigger>
                                    <SelectContent style={{ width: width * 0.42 }}>
                                        <SelectGroup>
                                            <SelectItem label='A+' value='A+' />
                                            <SelectItem label='A-' value='A-' />
                                            <SelectItem label='B+' value='B+' />
                                            <SelectItem label='B-' value='B-' />
                                            <SelectItem label='AB+' value='AB+' />
                                            <SelectItem label='AB-' value='AB-' />
                                            <SelectItem label='O+' value='O+' />
                                            <SelectItem label='O-' value='O-' />
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
                                            placeholder='Chọn loại tiểu đường'
                                        />
                                    </SelectTrigger>
                                    <SelectContent style={{ width: width * 0.42 }}>
                                        <SelectGroup>
                                            <SelectItem label='Loại 1' value='type1' />
                                            <SelectItem label='Loại 2' value='type2' />
                                            <SelectItem label='Loại thai kỳ' value='gestationa' />
                                            <SelectItem label='Loại khác' value='other' />
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
                                                value={value}
                                                onChangeText={onChange}
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
                                                value={value}
                                                onChangeText={onChange}
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