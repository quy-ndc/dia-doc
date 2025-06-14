import * as React from 'react'
import { View } from 'react-native'
import { Text } from '../../components/ui/text'
import { Image } from 'expo-image'
import RegisterModule from '../../components/login-screen/register-module'


export default function RegisterScreen() {

    return (
        <View className='flex-1 w-full flex-col gap-10 justify-center items-center'>
            <View className='flex-col gap-2 items-center'>
                <View className="flex-col gap-2 justify-center items-center">
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../../assets/images/logo.png')}
                        contentFit="contain"
                    />
                    <Text className="text-3xl font-bold text-[#248fca] tracking-wider capitalize">Đăng ký</Text>
                </View>
                <Text className='text-base font-semibold tracking-wider'>Nhập thông tin để tiếp tục</Text>
            </View>
            <RegisterModule />
        </View>
    )
}