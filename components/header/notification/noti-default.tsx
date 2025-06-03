import * as React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../../ui/text'
import { Ellipsis } from '../../../lib/icons/Ellipsis'
import IconButton from '../../common/icon-button'
import { DefaultPayload, SystemNotification } from '../../../assets/types/notification/notification'
import { Image } from 'expo-image'
import { formatDateBlog } from '../../../util/format-date-post'
import { GlobalColor } from '../../../global-color'
import { LinearGradient } from 'expo-linear-gradient'
import { CircleAlert } from '../../../lib/icons/CircleAlert'
import { Clock } from '../../../lib/icons/Clock'

type Prop = {
    setVisible: (visible: boolean) => void
    notification: SystemNotification
}


export default function DefaultNotification({ setVisible, notification }: Prop) {

    const payload: DefaultPayload = notification.payload as DefaultPayload

    return (
        <>
            <Pressable
                style={{
                    backgroundColor: GlobalColor.ORANGE_NEON_BG,
                    borderLeftColor: GlobalColor.ORANGE_NEON_BORDER,
                    borderLeftWidth: 2,
                }}
                className='px-4 py-3 w-full flex-col gap-3 border-l justify-between active:bg-[var(--click-bg)]'
                onLongPress={() => setVisible(true)}
            >
                <View className='flex-row w-full gap-2 justify-between items-center'>
                    <View className='flex-row gap-3 items-center'>
                        <LinearGradient
                            colors={['#fb8c00', '#f4511e', '#e53935']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{ borderRadius: 4, padding: 14 }}
                        >
                            <CircleAlert className='text-white' size={20} />
                        </LinearGradient>
                        <View className='flex-col gap-1'>
                            <Text
                                style={{
                                    backgroundColor: GlobalColor.ORANGE_NEON_BG,
                                    color: GlobalColor.ORANGE_NEON_BORDER,
                                    borderColor: GlobalColor.ORANGE_NEON_BORDER
                                }}
                                className={`text-sm font-semibold px-4 py-1 border rounded-full tracking-wider capitalize`}
                            >
                                Thông báo hệ thống
                            </Text>
                            <View className='flex-row gap-2 items-center'>
                                <Clock className='text-[var(--fade-text-color)]' size={13} />
                                <Text className='text-xs text-[var(--fade-text-color)]'>{formatDateBlog(notification.receivedAt)}</Text>
                            </View>
                        </View>
                    </View>
                    <IconButton
                        icon={<Ellipsis className='text-foreground' size={20} />}
                        buttonSize={2}
                        possition={'other'}
                        onPress={() => setVisible(true)}
                    />
                </View>
                <View className="w-full flex-row items-start justify-between">
                    <Text className="text-base font-semibold tracking-wider basis-[70%]">
                        {payload.title}
                    </Text>
                    <Image
                        style={{ width: 80, height: 60, borderRadius: 5 }}
                        source={payload.thumbnail}
                        contentFit="cover"
                    />
                </View>
            </Pressable>
        </>
    )
}
