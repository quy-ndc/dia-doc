import * as React from 'react'
import { Dimensions, Modal, Pressable } from 'react-native'
import { Text } from '../../ui/text'
import { useState } from 'react'
import { Trash2 } from '../../../lib/icons/Trash2'
import { X } from '../../../lib/icons/X'
import useNotificationStore from '../../../store/notificationStore'
import { SystemNotification } from '../../../assets/types/notification/notification'
import { NotificatinType } from '../../../assets/enum/notification'
import DefaultNotification from './noti-default'
import PostNotification from './noti-post'

type Prop = {
    notification: SystemNotification
}

const { width } = Dimensions.get('window')

export default function NotificationItem({ notification }: Prop) {

    const [visible, setVisible] = useState(false)

    const { removeNoti } = useNotificationStore()

    const onNotiDelete = () => {
        removeNoti(notification)
        setVisible(false)
    }

    const renderNoti = () => {
        switch (notification.type) {
            case NotificatinType.DEFAULT:
                return <DefaultNotification setVisible={setVisible} notification={notification} />
            case NotificatinType.POST:
                return <PostNotification setVisible={setVisible} notification={notification} />
        }
    }

    return (
        <>
            <Pressable
                className='px-4 py-3 w-full flex-row justify-between items-center active:bg-[var(--click-bg)]'
                onLongPress={() => setVisible(true)}
            >
                {renderNoti()}
            </Pressable>
            <Modal
                visible={visible}
                transparent
                animationType='fade'
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    className='flex-1 justify-center items-center bg-black/50'
                    onPress={() => setVisible(false)}
                >
                    <Pressable
                        className='flex-col justify-center items-center bg-[var(--noti-bg)] rounded-md'
                        style={{ width: width * 0.5 }}
                    >
                        <Pressable
                            className='flex-row gap-3 px-3 py-3 w-full items-center rounded-md active:bg-[var(--click-bg)]'
                            onPress={onNotiDelete}
                        >
                            <Trash2 className='text-foreground' size={18} />
                            <Text className='text-left text-base tracking-widest'>Xóa thông báo</Text>
                        </Pressable>
                        <Pressable
                            className='flex-row gap-3 px-3 py-3 w-full items-center rounded-md active:bg-[var(--click-bg)]'
                            onPress={() => setVisible(false)}
                        >
                            <X className='text-foreground' size={18} />
                            <Text className='text-left text-base tracking-widest'>Hủy</Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}
