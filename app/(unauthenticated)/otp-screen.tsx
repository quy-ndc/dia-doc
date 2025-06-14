import * as React from 'react'
import { View } from 'react-native'
import { Text } from '../../components/ui/text'
import { Image } from 'expo-image'
import RegisterModule from '../../components/login-screen/register-module'
import { useLocalSearchParams } from 'expo-router'
import OtpModule from '../../components/login-screen/otp-module'


export default function OtpScreen() {

    const { phone } = useLocalSearchParams()
    console.log(phone)

    return (
        <View className='flex-1 w-full flex-col gap-10 justify-center items-center'>
            <View className='flex-col gap-2 items-center'>
                <View className="flex-col gap-2 justify-center items-center">
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../../assets/images/logo.png')}
                        contentFit="contain"
                    />
                    <Text className="text-3xl font-bold text-[#248fca] tracking-wider capitalize">Nhập mã xác thực</Text>
                </View>
                <Text className='text-base text-[var(--fade-text-color)] font-semibold tracking-wider'>Chúng tôi đã gửi mã xác thực đến</Text>
                <Text className='text-lg font-bold tracking-widest'>{phone}</Text>
            </View>
            <OtpModule />
        </View>
    )
}