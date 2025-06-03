import * as React from 'react';
import { LogOut } from '../../lib/icons/LogOut';
import useUserStore from '../../store/userStore';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Text } from '../../components/ui/text'
import { GlobalColor } from '../../global-color';
import { useQueryClient } from '@tanstack/react-query';

export default function LogoutButton() {

    const { logout } = useUserStore()
    const queryClient = useQueryClient()
    const router = useRouter()

    const onLogout = () => {
        logout(queryClient)
        router.replace('/authen-screen')
    }

    return (
        <View className='flex-1 justify-center items-center'>
            <Pressable
                style={{ borderColor: GlobalColor.RED_NEON_BORDER, backgroundColor: GlobalColor.RED_NEON_BG }}
                className='flex-row p-3 gap-2 w-1/2 border justify-center items-center rounded-md active:opacity-80'
                onPress={onLogout}
            >
                <LogOut className='text-red-500' size={19} />
                <Text className='text-base font-bold text-red-500 tracking-wider capitalize'>Đăng xuất</Text>
            </Pressable>
        </View>
    )
}