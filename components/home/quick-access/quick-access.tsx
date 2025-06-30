import * as React from 'react'
import { Dimensions, Pressable, View } from 'react-native'
import { useRouter } from 'expo-router'
import QuickButton from './quick-button'
import { MessageCircleMore } from '../../../lib/icons/MessageCircleMore'
import { Newspaper } from '../../../lib/icons/Newspaper'
import { User } from '../../../lib/icons/User'
import SectionTitle from '../common/section-title'
import { Zap } from '../../../lib/icons/Zap'
import NotificationAccess from '../../header/notification/noti-access'
import { GlobalColor } from '../../../global-color'
import { Text } from '../../../components/ui/text'
import { Bookmark } from '../../../lib/icons/Bookmark'
import { Heart } from '../../../lib/icons/Heart'
import { PencilLine } from '../../../lib/icons/PencilLine'
import { Users } from '../../../lib/icons/Users'
import { Bot } from '../../../lib/icons/Bot'

const { width } = Dimensions.get('window')

export default function QuickAccess() {

    const router = useRouter()

    return (
        <View
            style={{ width: width }}
            className='flex-col gap-2'
        >
            <View className='flex w-full px-3'>
                <SectionTitle
                    icon={<Zap color={GlobalColor.YELLOW_NEON_BORDER} size={18} />}
                    title='Truy cập Nhanh'
                />
            </View>

            <View className='flex-col gap-3'>
                <View className='flex flex-row justify-between'>
                    <QuickButton
                        icon={
                            <View
                                style={{ backgroundColor: GlobalColor.GREEN_NEON_BG }}
                                className='flex p-3 justify-center items-center rounded-full'
                            >
                                <MessageCircleMore color={GlobalColor.GREEN_NEON_BORDER} size={17} />
                            </View>
                        }
                        title='Tin nhắn'
                        onPress={() => router.push({
                            pathname: '/message-screen',
                            params: { type: 'group' }
                        })}
                    />
                    <QuickButton
                        icon={
                            <View
                                style={{ backgroundColor: GlobalColor.PURPLE_NEON_BG }}
                                className='flex p-3 justify-center items-center rounded-full'
                            >
                                <Users color={GlobalColor.PURPLE_NEON_BORDER} size={17} />
                            </View>
                        }
                        title='Tư vấn'
                        onPress={() => router.push({
                            pathname: '/message-screen',
                            params: { type: 'private' }
                        })}
                    />
                    <NotificationAccess position='quick' />
                    <QuickButton
                        icon={
                            <View
                                style={{ backgroundColor: GlobalColor.CYAN_NEON_BG }}
                                className='flex p-3 justify-center items-center rounded-full'
                            >
                                <Bot color={GlobalColor.CYAN_NEON_BORDER} size={17} />
                            </View>
                        }
                        title='AI Chat'
                        onPress={() => router.push('/ai-chat-screen')}
                    />
                </View>
                <View className='flex flex-row justify-between'>
                    <QuickButton
                        icon={
                            <View
                                style={{ backgroundColor: GlobalColor.BLUE_NEON_BG }}
                                className='flex p-3 justify-center items-center rounded-full'
                            >
                                <Newspaper color={GlobalColor.BLUE_NEON_BORDER} size={17} />
                            </View>
                        }
                        title='Bài viết'
                        onPress={() => router.push('/blog-screen')}
                    />
                    <QuickButton
                        icon={
                            <View
                                style={{ backgroundColor: GlobalColor.ORANGE_NEON_BG }}
                                className='flex p-3 justify-center items-center rounded-full'
                            >
                                <Bookmark color={GlobalColor.ORANGE_NEON_BORDER} size={17} />
                            </View>
                        }
                        title='Đã lưu'
                        onPress={() => router.push('/saved-blog-screen')}
                    />
                    <QuickButton
                        icon={
                            <View
                                style={{ backgroundColor: GlobalColor.PINK_NEON_BG }}
                                className='flex p-3 justify-center items-center rounded-full'
                            >
                                <Heart color={GlobalColor.PINK_NEON_BORDER} size={17} />
                            </View>
                        }
                        title='Yêu thích'
                        onPress={() => router.push('/liked-blog-screen')}
                    />
                    <QuickButton
                        icon={
                            <View
                                style={{ backgroundColor: GlobalColor.RED_NEON_BG }}
                                className='flex p-3 justify-center items-center rounded-full'
                            >
                                <User color={GlobalColor.RED_NEON_BORDER} size={17} />
                            </View>
                        }
                        title='Hồ sơ'
                        onPress={() => router.push('/profile-screen')}
                    />
                </View>
            </View>
        </View>
    )
}