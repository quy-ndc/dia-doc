import * as React from 'react';
import { Dimensions, Modal, Pressable, View } from 'react-native';
import { Text } from '../../ui/text'
import { useState } from 'react';
import { Trash2 } from '../../../lib/icons/Trash2';
import { X } from '../../../lib/icons/X';
import useNotificationStore from '../../../store/notificationStore';
import { GlobalColor } from '../../../global-color';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleAlert } from '../../../lib/icons/CircleAlert';
import { Clock } from '../../../lib/icons/Clock';
import { formatDateBlog } from '../../../util/format-date-post';
import IconButton from '../../common/icon-button';
import { Ellipsis } from '../../../lib/icons/Ellipsis';
import { Notification } from '../../../assets/types/notification/notification';
import { getNotificatinTypeInfo } from '../../../assets/enum/notification';
import Tag from '../../common/tag';

type Prop = {
    notification: Notification
}

const { width } = Dimensions.get('window');

export default function NotificationItem({ notification }: Prop) {

    const [visible, setVisible] = useState(false)

    const { removeNoti } = useNotificationStore()

    const onNotiDelete = () => {
        removeNoti(notification)
        setVisible(false)
    }

    const notiDisplay = getNotificatinTypeInfo(notification.type)

    return (
        <>
            <View className='mb-3'>
                <Pressable
                    style={{ borderLeftColor: notiDisplay.color, borderLeftWidth: 2 }}
                    className='px-4 py-3 w-full flex-col gap-3 border-l justify-between active:opacity-70'
                >
                    <View className='flex-row w-full gap-2 justify-between items-center'>
                        <View className='flex-row gap-3 items-center'>
                            <View className='flex-col gap-3'>
                                <View className='flex-row w-full items-center justify-between'>
                                    <Tag
                                        background={notiDisplay.subColor}
                                        text={notiDisplay.label}
                                        textColor={notiDisplay.color}
                                        borderColor={notiDisplay.color}
                                    />
                                    <IconButton
                                        icon={<Ellipsis className='text-foreground' size={20} />}
                                        buttonSize={2}
                                        possition={'other'}
                                        onPress={() => setVisible(true)}
                                    />
                                </View>
                                <View className='flex-col gap-2'>
                                    <Text className='text-base font-semibold tracking-wider'>{notification.title}</Text>
                                    {notification.content && (
                                        <Text className='text-sm text-[var(--fade-text-color)]'>{notification.content}</Text>
                                    )}
                                </View>
                                <View className='flex-row gap-2 items-center'>
                                    <Clock className='text-[var(--fade-text-color)]' size={13} />
                                    <Text className='text-xs text-[var(--fade-text-color)]'>{formatDateBlog(notification.receivedAt)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </View>
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
    );
}
