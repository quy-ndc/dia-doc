import * as React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { Image } from 'expo-image'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useRegisterUserMutation } from '../../service/query/auth-query'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, router } from 'expo-router'
import { Input } from '../../components/ui/input'
import { Eye } from '../../lib/icons/Eye'
import { EyeOff } from '../../lib/icons/EyeOff'
import { Checkbox } from '../../components/ui/checkbox'
import SpinningIcon from '../../components/common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { LogIn } from '../../lib/icons/Login'
import { ArrowLeft } from '../../lib/icons/ArrowLeft'

export default function RegisterScreen() {


    const [termAgreed, setTermAgreed] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const { mutateAsync, isLoading, isError, data } = useRegisterUserMutation()
    const [show, setShow] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const schema = yup.object({
        phone: yup
            .string()
            .required('Không được trống')
            .matches(/^0\d{9}$/, 'Phải bắt đầu bằng 0 và gồm 10 chữ số'),
        password: yup
            .string()
            .required('Không được trống')
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
        confirmPassword: yup
            .string()
            .required('Không được trống')
            .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
    }).required()

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            phone: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onLogin = async (data: any) => {
        const formattedPhone = data.phone.replace(/^0/, '+84')
        setPhoneNumber(formattedPhone)
        await mutateAsync({
            phoneNumber: formattedPhone,
            password: data.password
        })
    }

    useEffect(() => {
        if (!data?.data || isError || data.status !== 200) return

        router.push({
            pathname: '/otp-screen',
            params: { phone: phoneNumber }
        })
    }, [data, isLoading])


    return (
        <View className='flex-1 w-full flex-col gap-10 justify-center items-center'>
            <View className='flex-col gap-2 items-center'>
                <View className="flex-col gap-2 justify-center items-center">
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../../assets/images/logo.png')}
                        contentFit="contain"
                    />
                    <Text className="text-3xl font-bold text-[#248fca] tracking-wider uppercase">Đăng ký</Text>
                </View>
                <Text className='text-base font-semibold tracking-wider'>Nhập thông tin để tiếp tục</Text>
            </View>
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
                <View className='flex-col gap-2 w-full'>
                    <Text className='text-base font-bold tracking-widest capitalize'>Nhập lại mật khẩu</Text>
                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <View className='relative'>
                                    <Input
                                        style={{ letterSpacing: 3, borderRadius: 100 }}
                                        placeholder={showConfirm ? '123456789' : '********'}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        secureTextEntry={!showConfirm}
                                    />
                                    <Pressable
                                        className='absolute right-1 -translate-y-1/2 top-[50%] p-2 rounded-full active:bg-[var(--click-bg)]'
                                        onPress={() => setShowConfirm(!showConfirm)}
                                    >
                                        {showConfirm ? (
                                            <Eye className='text-foreground' size={18} />
                                        ) : (
                                            <EyeOff className='text-foreground' size={18} />
                                        )}
                                    </Pressable>
                                </View>
                                {errors.confirmPassword && <Text className='text-red-500'>{errors.confirmPassword.message}</Text>}
                            </>
                        )}
                    />
                </View>
                <View className='flex-row w-full gap-2 justify-between items-center'>
                    <View className='flex-row gap-2 items-center'>
                        <Checkbox checked={termAgreed} onCheckedChange={setTermAgreed} />
                        <Text
                            className='text-base tracking-wider'
                            onPress={() => setTermAgreed(!termAgreed)}
                        >
                            Tôi đồng ý với các điều khoản của ứng dụng
                        </Text>
                    </View>
                    <View />
                </View>
                <View className='flex-col gap-3 w-full items-center'>
                    <Pressable
                        style={{ opacity: isLoading || !termAgreed ? 0.5 : 1 }}
                        className="flex-row w-full gap-2 px-5 py-3 justify-center items-center bg-[var(--oppo-theme-col)] border border-[var(--same-theme-col)] rounded-full active:bg-[var(--oppo-click-bg)]"
                        disabled={isLoading || !termAgreed}
                        onPress={handleSubmit(onLogin)}
                    >
                        <Text className="text-base text-[var(--same-theme-col)] font-semibold tracking-wider capitalize">Đăng ký</Text>
                        {isLoading ? (
                            <SpinningIcon icon={<Loader className='text-[var(--same-theme-col)]' size={18} />} />
                        ) : (
                            <LogIn className="text-[var(--same-theme-col)]" size={18} />
                        )}
                    </Pressable>

                    <Pressable
                        style={{ opacity: isLoading ? 0.5 : 1 }}
                        className="flex-row w-full gap-2 px-5 py-3 justify-center items-center border border-[var(--oppo-theme-col)] rounded-full active:bg-[var(--click-bg)]"
                        disabled={isLoading}
                        onPress={() => router.push('/landing-screen')}
                    >
                        {isLoading ? (
                            <SpinningIcon icon={<Loader className='text-[var(--oppo-theme-col)]' size={18} />} />
                        ) : (
                            <ArrowLeft className="text-[var(--oppo-theme-col)]" size={18} />
                        )}
                        <Text className="text-base text-[var(--oppo-theme-col)] font-semibold tracking-wider capitalize">Quay lại</Text>
                    </Pressable>
                </View>
                <View className='flex-row gap-2 items-center'>
                    <Text className='tracking-wider'>Đã có tài khoản?</Text>
                    <Link
                        className='text-blue-400 font-semibold underline'
                        href={'/authen-screen'}
                    >
                        Đăng nhập
                    </Link>
                </View>
            </View >
        </View>
    )
}