import * as React from 'react'
import { Dimensions, Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { useEffect, useState } from 'react'
import { LogIn } from '../../lib/icons/Login'
import { Eye } from '../../lib/icons/Eye'
import { EyeOff } from '../../lib/icons/EyeOff'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, router, useRouter } from 'expo-router'
import { useLoginDoctorMutation } from '../../service/query/auth-query'
import Toast from 'react-native-toast-message'
import { Loader } from '../../lib/icons/Loader'
import { Input } from '../../components/ui/input'
import SpinningIcon from '../../components/common/icons/spinning-icon'
import { ArrowLeft } from '../../lib/icons/ArrowLeft'


export default function LoginModule() {

    const { mutateAsync, isLoading, isError, data } = useLoginDoctorMutation()

    const schema = yup.object({
        phone: yup
            .string()
            .required('Không được trống')
            .matches(/^0\d{9}$/, 'Phải bắt đầu bằng 0 và gồm 10 chữ số'),
        password: yup.string().required('Không được trống')
    }).required()

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            phone: '',
            password: ''
        }
    })

    const [show, setShow] = useState(false)

    const onLogin = async (data: any) => {
        // const res = await mutateAsync({
        //     email: data.email,
        //     password: data.password
        // })
        console.log(data.email + ' ' + data.password)
    }

    return (
        <View className='flex-col w-full gap-6 justify-center items-center px-5'>
            <View className='flex-col gap-2 w-full'>
                <Text className='text-base font-bold tracking-widest capitalize'>Số điện thoại</Text>
                <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Input
                                style={{ letterSpacing: 2, borderRadius: 100 }}
                                placeholder={'0123456789'}
                                value={value}
                                maxLength={10}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType='numeric'
                            />
                            {errors.phone && <Text className='text-red-500'>{errors.phone.message}</Text>}
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
                                    style={{ letterSpacing: 3, borderRadius: 100 }}
                                    placeholder={show ? '123456789' : '********'}
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
                                        <Eye className='text-foreground' size={18} />
                                    ) : (
                                        <EyeOff className='text-foreground' size={18} />
                                    )}
                                </Pressable>
                            </View>
                            {errors.password && <Text className='text-red-500'>{errors.password.message}</Text>}
                        </>
                    )}
                />
            </View>
            <View className='flex-col gap-3 w-full items-center'>
                <Pressable
                    style={{ opacity: isLoading ? 0.5 : 1 }}
                    className="flex-row w-full gap-2 px-5 py-3 justify-center items-center bg-[var(--oppo-theme-col)] border border-[var(--same-theme-col)] rounded-full active:bg-[var(--oppo-click-bg)]"
                    disabled={isLoading}
                    onPress={handleSubmit(onLogin)}
                >
                    <Text className="text-base text-[var(--same-theme-col)] font-semibold tracking-wider capitalize">Đăng nhập</Text>
                    {isLoading ? (
                        <SpinningIcon icon={<Loader className='text-[var(--same-theme-col)]' size={17} />} />
                    ) : (
                        <LogIn className="text-[var(--same-theme-col)]" size={17} />
                    )}
                </Pressable>

                <Pressable
                    style={{ opacity: isLoading ? 0.5 : 1 }}
                    className="flex-row w-full gap-2 px-5 py-3 justify-center items-center border border-[var(--oppo-theme-col)] rounded-full active:bg-[var(--click-bg)]"
                    disabled={isLoading}
                    onPress={() => router.back()}
                >
                    {isLoading ? (
                        <SpinningIcon icon={<Loader className='text-[var(--oppo-theme-col)]' size={17} />} />
                    ) : (
                        <ArrowLeft className="text-[var(--oppo-theme-col)]" size={17} />
                    )}
                    <Text className="text-base text-[var(--oppo-theme-col)] font-semibold tracking-wider capitalize">Quay lại</Text>
                </Pressable>
            </View>
            <View className='flex-row gap-2 items-center'>
                <Text className='tracking-wider'>Chưa có tài khoản?</Text>
                <Link
                    className='text-blue-400 font-semibold underline'
                    href={'/register-screen'}
                >
                    Đăng ký
                </Link>
            </View>
        </View >
    )
}