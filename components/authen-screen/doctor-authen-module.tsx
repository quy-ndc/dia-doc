import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../ui/text'
import { Input } from '../ui/input';
import { useState } from 'react';
import { LogIn } from '../../lib/icons/Login';
import { Eye } from '../../lib/icons/Eye';
import { EyeOff } from '../../lib/icons/EyeOff';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


export default function DoctorAuthenModule() {

    const schema = yup.object({
        email: yup.string()
            .required('Không được trống')
            .email('Email không hợp lệ'),
        password: yup.string().required('Không đước trống')
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [show, setShow] = useState(false)

    const onLogin = (data: any) => {
        console.log(data.email + ' ' + data.password)
    }

    return (
        <View className='flex-col gap-5 items-center'>
            <View className='flex-col gap-2 w-full'>
                <Text className='text-base font-bold tracking-widest capitalize'>Email</Text>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Input
                                style={{ letterSpacing: 2 }}
                                placeholder='BacSi123'
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                            {errors.email && <Text className='text-red-500'>{errors.email.message}</Text>}
                        </>
                    )}
                />
            </View>
            <View className='flex-col gap-2 w-full'>
                <Text className='text-base font-bold tracking-widest capitalize'>Mật khẩu</Text>
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <View className='relative'>
                                <Input
                                    style={{ letterSpacing: 3 }}
                                    placeholder='********'
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    secureTextEntry={!show}
                                />
                                <Pressable
                                    className='absolute right-1 -translate-y-1/2 top-[50%] p-2 rounded-full active:bg-[var(--click-bg)]'
                                    onPress={() => setShow(!show)}
                                >
                                    {show ? (
                                        <Eye className='text-foreground' size={20} />
                                    ) : (
                                        <EyeOff className='text-foreground' size={20} />
                                    )}
                                </Pressable>
                            </View>
                            {errors.password && <Text className='text-red-500'>{errors.password.message}</Text>}
                        </>
                    )}
                />

            </View>
            <View className='flex-row w-full justify-between items-center'>
                <View />
                <Pressable
                    className='flex-row gap-2 items-center px-4 py-2 rounded-lg active:bg-[var(--click-bg)]'
                    onPress={handleSubmit(onLogin)}
                >
                    <Text className='text-lg font-bold tracking-wider capitalize'>Đăng nhập</Text>
                    <LogIn className="text-foreground" size={20} />
                </Pressable>
            </View>

        </View>
    );
}