import * as React from 'react'
import useUserStore from '../../store/userStore'
import { useRouter } from 'expo-router'
import { Dimensions, Pressable } from 'react-native'
import { GlobalColor } from '../../global-color'
import { useQueryClient } from '@tanstack/react-query'
import { invalidateQuery } from '../../util/invalidate-queries'
import { Text } from '../../components/ui/text'

const { width } = Dimensions.get('window')

export default function LogoutButton() {

    const { logout } = useUserStore()
    const router = useRouter()
    const queryClient = useQueryClient()

    const onLogout = () => {
        logout()
        invalidateQuery(queryClient)
        router.replace('/landing-screen')
    }

    return (
        <Pressable
            style={{ width: width * 0.93 }}
            className={`flex-row items-center justify-center px-4 py-3 gap-2 rounded-xl active:bg-[#ef44441A] w-full`}
            onPress={onLogout}
        >
            <Text
                style={{ color: GlobalColor.RED_NEON_BORDER }}
                className='text-base font-semibold tracking-wider capitalize'
            >
                Đăng xuất
            </Text>
        </Pressable >
    )
}