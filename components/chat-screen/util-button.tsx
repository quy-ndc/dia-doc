import * as React from 'react'
import { Modal, View, StyleSheet, Pressable, Dimensions } from 'react-native'
import IconButton from '../common/icon-button'
import useUserStore from '../../store/userStore'
import { useEffect, useState } from 'react'
import { Settings } from '../../lib/icons/Settings'
import { UserRole } from '../../assets/enum/user-role'
import GenerateQRButton from './generate-qr'
import { useLeaveAGroupMutation } from '../../service/query/chat-query'
import { router } from 'expo-router'
import { LogOut } from '../../lib/icons/LogOut'
import { Text } from '../ui/text'
import { GlobalColor } from '../../global-color'
import SpinningIcon from '../common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'

type Prop = {
    id: string
}

const { width } = Dimensions.get('window')

export default function UtilButton({ id }: Prop) {

    const { user } = useUserStore()
    const [visible, setVisible] = useState(false)

    const { mutateAsync, data, isLoading, isError } = useLeaveAGroupMutation()

    const onLeave = async () => {
        await mutateAsync(id)

    }

    useEffect(() => {
        if (!data || isError || data.status !== 200) return
        router.replace({
            pathname: '/message-screen',
            params: { type: 'group' }
        })
    }, [data, isLoading])

    return (
        <>
            <IconButton
                icon={<Settings className='text-foreground' size={17} />}
                buttonSize={3}
                possition={'other'}
                onPress={() => setVisible(true)}
            />

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    className="flex-1 justify-center items-center bg-black/50"
                    onPress={() => setVisible(false)}
                >
                    <View
                        style={{ width: width * 0.7 }}
                        className='flex-col gap-2 bg-[var(--noti-bg)] rounded-xl'
                    >
                        {user.role == UserRole.DOCTOR && (
                            <GenerateQRButton id={id} />
                        )}
                        <Pressable
                            style={{ backgroundColor: GlobalColor.RED_NEON_BG }}
                            className='flex-row px-4 py-2 items-center gap-2 rounded-xl active:bg-[var(--click-bg)]'
                            onPress={onLeave}
                        >
                            {isLoading ? (
                                <SpinningIcon icon={<Loader color={GlobalColor.RED_NEON_BORDER} size={17} />} />
                            ) : (
                                <LogOut color={GlobalColor.RED_NEON_BORDER} size={17} />
                            )}
                            <Text
                                style={{ color: GlobalColor.RED_NEON_BORDER }}
                                className='text-base font-bold tracking-wide'
                            >
                                Rời nhóm
                            </Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}
