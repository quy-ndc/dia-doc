import * as React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { Image } from 'expo-image'
import { useEffect, useState } from 'react'
import { useForgotPasswordMutation } from '../../service/query/auth-query'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '../../components/ui/input'
import SpinningIcon from '../../components/common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { useRouter } from 'expo-router'
import { ArrowLeft } from '../../lib/icons/ArrowLeft'
import { Check } from '../../lib/icons/Check'

export default function ForgotPasswordScreen() {

    const router = useRouter()
    const { mutateAsync, isLoading, isError, data } = useForgotPasswordMutation()
    const [submittedPhone, setSubmittedPhone] = useState('')

    const schema = yup.object({
        phone: yup
            .string()
            .required('Không được trống')
            .matches(/^0\d{9}$/, 'Phải bắt đầu bằng 0 và gồm 10 chữ số')
    }).required()

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            phone: '',
        }
    })

    const onLogin = async (data: any) => {
        setSubmittedPhone(data.phone)

        await mutateAsync(data.phone)
    }

    useEffect(() => {
        if (!data?.data || isError || data.status !== 200) return
        router.replace({
            pathname: 'reset-password-screen',
            params: { phone: submittedPhone }
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
                    <Text className="text-3xl font-bold text-[#248fca] tracking-wider uppercase">Quên mật khẩu</Text>
                </View>
                <Text className='text-base font-semibold tracking-wider'>Nhập số điện thoại để nhận OTP</Text>
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
                <View className='flex-col gap-3 w-full items-center'>
                    <Pressable
                        style={{ opacity: isLoading ? 0.5 : 1 }}
                        className="flex-row w-full gap-2 px-5 py-3 justify-center items-center bg-[var(--oppo-theme-col)] border border-[var(--same-theme-col)] rounded-full active:bg-[var(--oppo-click-bg)]"
                        disabled={isLoading}
                        onPress={handleSubmit(onLogin)}
                    >
                        <Text className="text-base text-[var(--same-theme-col)] font-semibold tracking-wider capitalize">Xác nhận</Text>
                        {isLoading ? (
                            <SpinningIcon icon={<Loader className='text-[var(--same-theme-col)]' size={17} />} />
                        ) : (
                            <Check className="text-[var(--same-theme-col)]" size={17} />
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
            </View >
        </View>
    )
}