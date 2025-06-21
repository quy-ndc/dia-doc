import * as React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { useResendOtpMutation, useVerifyPhoneMutation } from '../../service/query/auth-query'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../components/ui/input'
import SpinningIcon from '../../components/common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { Check } from '../../lib/icons/Check'
import { useEffect } from 'react'
import { RefreshCcw } from '../../lib/icons/RefreshCcw'

export default function OtpScreen() {

    const { phone } = useLocalSearchParams()
    const { mutateAsync, data, isLoading, isError } = useVerifyPhoneMutation()
    const { mutateAsync: resendMutate, isLoading: isLoadingResend } = useResendOtpMutation()


    const schema = yup.object({
        otp: yup
            .string()
            .required('Không được trống')
        // .matches(/^\d{6}$/, 'Mã OTP phải gồm 6 chữ số')
    }).required()

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            otp: ''
        }
    })

    const onVerify = async (data: any) => {
        mutateAsync({
            otp: data.otp,
            phoneNumber: phone as string
        })
    }

    const onResend = async () => {
        resendMutate(phone as string)
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
                    <Text className="text-3xl font-bold text-[#248fca] tracking-wider uppercase">Nhập mã xác thực</Text>
                </View>
                <Text className='text-base text-[var(--fade-text-color)] font-semibold tracking-wider'>Chúng tôi đã gửi mã xác thực đến</Text>
                <Text className='text-lg font-bold tracking-widest'>{phone}</Text>
            </View>
            <View className='flex-col w-full gap-6 justify-center items-center px-5'>
                <View className='flex-col gap-2 w-full'>
                    <Text className='text-base font-bold tracking-widest'>Mã xác minh OTP</Text>
                    <Controller
                        control={control}
                        name="otp"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <Input
                                    style={{ letterSpacing: 8, textAlign: 'center', borderRadius: 100 }}
                                    keyboardType="numeric"
                                    placeholder="______"
                                    maxLength={6}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                />
                                {errors.otp && <Text className='text-red-500'>{errors.otp.message}</Text>}
                            </>
                        )}
                    />
                </View>
                <Pressable
                    style={{ opacity: isLoading ? 0.5 : 1 }}
                    className="flex-row w-full gap-2 px-5 py-3 justify-center items-center bg-[var(--oppo-theme-col)] border border-[var(--same-theme-col)] rounded-full active:bg-[var(--oppo-click-bg)]"
                    disabled={isLoading || isLoadingResend}
                    onPress={handleSubmit(onVerify)}
                >
                    <Text className="text-base text-[var(--same-theme-col)] font-semibold tracking-wider capitalize">Xác minh</Text>
                    {isLoading || isLoadingResend ? (
                        <SpinningIcon icon={<Loader className='text-[var(--same-theme-col)]' size={18} />} />
                    ) : (
                        <Check className="text-[var(--same-theme-col)]" size={18} />
                    )}
                </Pressable>
                <Pressable
                    style={{ opacity: isLoading ? 0.5 : 1 }}
                    className="flex-row w-full gap-2 px-5 py-3 justify-center items-center border border-[var(--oppo-theme-col)] rounded-full active:bg-[var(--click-bg)]"
                    disabled={isLoading || isLoadingResend}
                    onPress={onResend}
                >
                    {isLoading || isLoadingResend ? (
                        <SpinningIcon icon={<Loader className='text-[var(--oppo-theme-col)]' size={18} />} />
                    ) : (
                        <RefreshCcw className="text-[var(--oppo-theme-col)]" size={18} />
                    )}
                    <Text className="text-base text-[var(--oppo-theme-col)] font-semibold tracking-wider capitalize">Gửi lại mã OTP</Text>
                </Pressable>
            </View>
        </View>
    )
}