import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../../ui/text'
import { Ellipsis } from '../../../lib/icons/Ellipsis';
import IconButton from '../../common/icon-button';
import { BlogPayload, SystemNotification } from '../../../assets/types/notification/notification';
import { Image } from 'expo-image';
import { formatDateBlog } from '../../../util/format-date-post';
import { useRouter } from 'expo-router';
import { Newspaper } from '../../../lib/icons/Newspaper';
import { GlobalColor } from '../../../global-color';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock } from '../../../lib/icons/Clock';

type Prop = {
    setVisible: (visible: boolean) => void
    notification: SystemNotification
}


export default function PostNotification({ setVisible, notification }: Prop) {

    const router = useRouter()
    const payload: BlogPayload = notification.payload as BlogPayload

    const onNotiPress = () => {
        router.push({
            pathname: '/blog-detail-screen',
            params: { id: payload.postId }
        })
    }

    return (
        <Pressable
            style={{ borderLeftColor: GlobalColor.BLUE_NEON_BORDER, borderLeftWidth: 2, backgroundColor: GlobalColor.BLUE_NEON_BG }}
            className='px-4 py-3 w-full flex-col gap-3 border-l justify-between active:bg-[var(--click-bg)]'
            onLongPress={() => setVisible(true)}
            onPress={onNotiPress}
        >
            <View className='flex-row w-full gap-2 justify-between items-center'>
                <View className='flex-row gap-3 items-center'>
                    <LinearGradient
                        colors={['#1565c0', '#0288d1', '#26c6da']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ borderRadius: 4, padding: 14 }}
                    >
                        <Newspaper className='text-white' size={20} />
                    </LinearGradient>
                    <View className='flex-col gap-1'>
                        <Text
                            style={{ backgroundColor: GlobalColor.BLUE_NEON_BG, color: GlobalColor.BLUE_NEON_BORDER, borderColor: GlobalColor.BLUE_NEON_BORDER }}
                            className={`text-sm font-semibold px-4 py-1 border rounded-full tracking-wider capitalize`}
                        >
                            Bài viết mới
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
    );
}
