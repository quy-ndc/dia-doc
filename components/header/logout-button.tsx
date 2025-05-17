import * as React from 'react';
import IconButton from '../common/icon-button';
import { LogOut } from '../../lib/icons/LogOut';
import useUserStore from '../../store/userStore';

export default function LogoutButton() {

    const { logout } = useUserStore()

    return (
        <IconButton
            icon={<LogOut className='text-foreground' size={21} strokeWidth={1.25} />}
            buttonSize={3}
            possition={'other'}
            onPress={logout}
        />
    )
}