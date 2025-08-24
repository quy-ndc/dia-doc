import * as React from 'react'
import useUserStore from '../../store/userStore'
import useConfigStore from '../../store/appConfigStore'
import { useRouter } from 'expo-router'
import { Dimensions, Pressable } from 'react-native'
import { GlobalColor } from '../../global-color'
import { useQueryClient } from '@tanstack/react-query'
import { invalidateQuery } from '../../util/invalidate-queries'
import { Text } from '../../components/ui/text'
import { LogOut } from '../../lib/icons/LogOut'
import { useLogoutMutation } from '../../service/query/auth-query'
import { useEffect } from 'react'

const { width } = Dimensions.get('window')

export default function LogoutButton() {

    const { logout } = useUserStore()
    const { setTokenDevice } = useConfigStore()
    const router = useRouter()
    const queryClient = useQueryClient()

    const { mutateAsync, data, isLoading, isError } = useLogoutMutation()

    const onLogout = async () => {
        await mutateAsync()
    }

    useEffect(() => {
        if (!data || data.status !== 200 || isError) return
        logout()
        setTokenDevice(null)
        invalidateQuery(queryClient)
        router.replace('/landing-screen')
    }, [data, isLoading])

    return (
        <Pressable
            style={{ width: width * 0.93 }}
            className={`flex-row items-center justify-center px-4 py-3 gap-2 rounded-xl active:bg-[#ef44441A] w-full ${isLoading && 'opacity-70'}`}
            onPress={onLogout}
            disabled={isLoading}
        >
            <LogOut color={GlobalColor.RED_NEON_BORDER} size={17} />
            <Text
                style={{ color: GlobalColor.RED_NEON_BORDER }}
                className='text-base font-semibold tracking-wider capitalize'
            >
                Đăng xuất
            </Text>
        </Pressable >
    )
}