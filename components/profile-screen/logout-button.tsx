import * as React from 'react'
import { LogOut } from '../../lib/icons/LogOut'
import useUserStore from '../../store/userStore'
import { useRouter } from 'expo-router'
import { Pressable } from 'react-native'
import { GlobalColor } from '../../global-color'
import { useQueryClient } from '@tanstack/react-query'
import { invalidateQuery } from '../../util/invalidate-queries'

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
            className='flex p-3 gap-2 justify-center items-center rounded-md active:bg-[#ef44441A]'
            onPress={onLogout}
        >
            <LogOut color={GlobalColor.RED_NEON_BORDER} size={17} />
        </Pressable>
    )
}