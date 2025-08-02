import * as React from 'react'
import { Dimensions, Pressable, View } from 'react-native'
import LogoutButton from './logout-button'
import { GlobalColor } from '../../global-color'
import { Text } from '../../components/ui/text'
import { router } from 'expo-router'
import { LockKeyholeOpen } from '../../lib/icons/LockKeyholeOpen'

const { width } = Dimensions.get('window')

export default function ProfileAction() {

    return (
        <View className='flex-col w-full items-center gap-2 pb-3'>
            <Pressable
                style={{ width: width * 0.93 }}
                className={`flex-row items-center justify-center px-4 py-3 gap-2 rounded-xl active:bg-[#ef44441A] w-full`}
                onPress={() => router.push('change-password-screen')}
            >
                <LockKeyholeOpen className='text-foreground' size={17} />
                <Text className='text-base font-semibold tracking-wider capitalize'>
                    Đổi mật khẩu
                </Text>
            </Pressable >
            <LogoutButton />
        </View>
    )
}
