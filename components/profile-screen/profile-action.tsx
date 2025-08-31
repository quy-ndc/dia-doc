import * as React from 'react'
import { View } from 'react-native'
import LogoutButton from './logout-button'
import ChangePasswordModal from './popup-modal/change-password-modal'

export default function ProfileAction() {

    return (
        <View className='flex-col w-full items-center gap-2 pb-3'>
            <ChangePasswordModal />
            <LogoutButton />
        </View>
    )
}
