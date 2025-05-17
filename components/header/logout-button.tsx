import * as React from 'react';
import IconButton from '../common/icon-button';
import { LogOut } from '../../lib/icons/LogOut';
import useUserStore from '../../store/userStore';
import { useRouter } from 'expo-router';

export default function LogoutButton() {

    const { logout } = useUserStore()
    const router = useRouter()

    const onLogout = () => {
        logout
        router.replace('/authen-screen')
    }

    return (
        <IconButton
            icon={<LogOut className='text-foreground' size={21} strokeWidth={1.25} />}
            buttonSize={3}
            possition={'other'}
            onPress={onLogout}
        />
    )
}