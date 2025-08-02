import * as React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { Image } from 'expo-image'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useResetPasswordMutation, useForgotPasswordMutation } from '../../service/query/auth-query'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { router, useLocalSearchParams } from 'expo-router'
import { Input } from '../../components/ui/input'
import { Eye } from '../../lib/icons/Eye'
import { EyeOff } from '../../lib/icons/EyeOff'
import SpinningIcon from '../../components/common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { ArrowLeft } from '../../lib/icons/ArrowLeft'
import { Check } from '../../lib/icons/Check'

export default function ResetPasswordScreen() {

    const params = useLocalSearchParams()
    const phoneFromParams = params.phone as string

    const { mutateAsync, isLoading, isError, data } = useResetPasswordMutation()
    const { mutateAsync: resendMutate, isLoading: isLoadingResend } = useForgotPasswordMutation()
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const schema = yup.object({
        otp: yup
            .string()
            .required('Không được trống')
            .matches(/^\d{6}$/, 'Mã OTP phải gồm 6 chữ số'),
        newPassword: yup
            .string()
            .required('Không được trống')
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
        confirmPassword: yup
            .string()
            .required('Không được trống')
            .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp')
    }).required()

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            otp: '',
            newPassword: '',
            confirmPassword: ''
        }
    })

    const onLogin = async (data: any) => {
        await mutateAsync({
            phoneNumber: phoneFromParams,
            otp: data.otp,
            password: data.newPassword
        })
    }

    const onResend = async () => {
        await resendMutate(phoneFromParams)
    }

    useEffect(() => {
        if (!data?.data || isError || data.status !== 200) return
        router.replace('/authen-screen')
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
                    <Text className="text-3xl font-bold text-[#248fca] tracking-wider uppercase">Đổi mật khẩu</Text>
                </View>
                <Text className='text-base font-semibold tracking-wider'>Nhập mật khẩu mới để tiếp tục</Text>
            </View>
            <View className='flex-col w-full gap-6 justify-center items-center px-5'>
                <View className='flex-col gap-2 w-full'>
                    <Text className='text-base font-bold tracking-widest'>Mã OTP</Text>
                    <Controller
                        control={control}
                        name="otp"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <Input
                                    style={{ letterSpacing: 2, borderRadius: 100 }}
                                    placeholder={'123456'}
                                    value={value}
                                    maxLength={6}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    keyboardType='numeric'
                                />
                                {errors.otp && <Text className='text-red-500'>{errors.otp.message}</Text>}
                            </>
                        )}
                    />
                </View>
                <View className='flex-col gap-2 w-full'>
                    <Text className='text-base font-bold tracking-widest capitalize'>Mật khẩu mới</Text>
                    <Controller
                        control={control}
                        name="newPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <View className='relative'>
                                    <Input
                                        style={{ letterSpacing: 3, borderRadius: 100 }}
                                        placeholder={showNewPassword ? '123456789' : '********'}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        secureTextEntry={!showNewPassword}
                                    />
                                    <Pressable
                                        className='absolute right-1 -translate-y-1/2 top-[50%] p-2 rounded-full active:bg-[var(--click-bg)]'
                                        onPress={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? (
                                            <Eye className='text-foreground' size={18} />
                                        ) : (
                                            <EyeOff className='text-foreground' size={18} />
                                        )}
                                    </Pressable>
                                </View>
                                {errors.newPassword && <Text className='text-red-500'>{errors.newPassword.message}</Text>}
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
                                        placeholder={showConfirmPassword ? '123456789' : '********'}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        secureTextEntry={!showConfirmPassword}
                                    />
                                    <Pressable
                                        className='absolute right-1 -translate-y-1/2 top-[50%] p-2 rounded-full active:bg-[var(--click-bg)]'
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
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
                <View className='flex-row items-center w-full px-2 justify-between'>
                    <View />
                    <Pressable onPress={onResend}>
                        <Text className='text-sm text-[var(--oppo-theme-col)] font-semibold tracking-wider capitalize underline'>Gửi lại mã OTP</Text>
                    </Pressable>
                </View>
                <View className='flex-col gap-3 w-full items-center'>
                    <Pressable
                        style={{ opacity: isLoading || isLoadingResend ? 0.5 : 1 }}
                        className="flex-row w-full gap-2 px-5 py-3 justify-center items-center bg-[var(--oppo-theme-col)] border border-[var(--same-theme-col)] rounded-full active:bg-[var(--oppo-click-bg)]"
                        disabled={isLoading || isLoadingResend}
                        onPress={handleSubmit(onLogin)}
                    >
                        <Text className="text-base text-[var(--same-theme-col)] font-semibold tracking-wider capitalize">Đồng ý</Text>
                        {isLoading || isLoadingResend ? (
                            <SpinningIcon icon={<Loader className='text-[var(--same-theme-col)]' size={18} />} />
                        ) : (
                            <Check className="text-[var(--same-theme-col)]" size={18} />
                        )}
                    </Pressable>

                    <Pressable
                        style={{ opacity: isLoading || isLoadingResend ? 0.5 : 1 }}
                        className="flex-row w-full gap-2 px-5 py-3 justify-center items-center border border-[var(--oppo-theme-col)] rounded-full active:bg-[var(--click-bg)]"
                        disabled={isLoading || isLoadingResend}
                        onPress={() => router.push('/landing-screen')}
                    >
                        {isLoading || isLoadingResend ? (
                            <SpinningIcon icon={<Loader className='text-[var(--oppo-theme-col)]' size={18} />} />
                        ) : (
                            <ArrowLeft className="text-[var(--oppo-theme-col)]" size={18} />
                        )}
                        <Text className="text-base text-[var(--oppo-theme-col)] font-semibold tracking-wider capitalize">Quay lại</Text>
                    </Pressable>
                </View>
            </View >
        </View>
    )
}