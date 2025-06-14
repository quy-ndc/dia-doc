import * as React from 'react'
import { View, Pressable } from 'react-native'
import { Text } from '../../components/ui/text'
import { useState } from 'react'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../components/ui/input'
import SpinningIcon from '../../components/common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { router } from 'expo-router'
import { Check } from '../../lib/icons/Check'

export default function OtpModule() {
    const [isLoading, setIsLoading] = useState(false)

    const schema = yup.object({
        otp: yup
            .string()
            .required('Không được trống')
            .matches(/^\d{6}$/, 'Mã OTP phải gồm 6 chữ số')
    }).required()

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            otp: ''
        }
    })

    const onVerify = async (data: any) => {
        setIsLoading(true)
        console.log('OTP entered:', data.otp)
        setTimeout(() => setIsLoading(false), 1000)
    }

    return (
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
                disabled={isLoading}
                // onPress={handleSubmit(onVerify)}
                onPress={() => router.push('/(protected)/(main)')}
            >
                <Text className="text-base text-[var(--same-theme-col)] font-semibold tracking-wider capitalize">Xác minh</Text>
                {isLoading ? (
                    <SpinningIcon icon={<Loader className='text-[var(--same-theme-col)]' size={18} />} />
                ) : (
                    <Check className="text-[var(--same-theme-col)]" size={18} />
                )}
            </Pressable>
        </View>
    )
}
