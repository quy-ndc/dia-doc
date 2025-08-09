import * as React from 'react'
import { Dimensions, View } from 'react-native'
import { useRouter } from 'expo-router'
import QuickButton from './quick-button'
import { MessageCircleMore } from '../../../lib/icons/MessageCircleMore'
import { Newspaper } from '../../../lib/icons/Newspaper'
import { User } from '../../../lib/icons/User'
import SectionTitle from '../common/section-title'
import { Zap } from '../../../lib/icons/Zap'
import NotificationAccess from '../../header/notification/noti-access'
import { GlobalColor } from '../../../global-color'
import { Bookmark } from '../../../lib/icons/Bookmark'
import { Heart } from '../../../lib/icons/Heart'
import { Users } from '../../../lib/icons/Users'
import { Bot } from '../../../lib/icons/Bot'
import RoundedIcon from '../../common/icons/rouned-icon'
import { Phone } from '../../../lib/icons/Phone'
import useUserStore from '../../../store/userStore'

const { width } = Dimensions.get('window')

export default function QuickAccess() {
    const router = useRouter()
    const { user } = useUserStore()

    const handleTestCall = () => {
        router.push({
            pathname: '/(protected)/video-call-screen',
            params: {
                userId: user.id,
                targetUserId: '9554b171-acdc-42c3-8dec-5d3aba44ca99',
                mode: 'call'
            }
        })
    }

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
                            <RoundedIcon
                                background={GlobalColor.GREEN_NEON_BG}
                                size={3}
                                icon={<MessageCircleMore color={GlobalColor.GREEN_NEON_BORDER} size={17} />}
                            />
                        }
                        title='Tin nhắn'
                        onPress={() => router.push({
                            pathname: '/message-screen',
                            params: { type: 'group' }
                        })}
                    />
                    <QuickButton
                        icon={
                            <RoundedIcon
                                background={GlobalColor.PURPLE_NEON_BG}
                                size={3}
                                icon={<Users color={GlobalColor.PURPLE_NEON_BORDER} size={17} />}
                            />
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
                            <RoundedIcon
                                background={GlobalColor.CYAN_NEON_BG}
                                size={3}
                                icon={<Bot color={GlobalColor.CYAN_NEON_BORDER} size={17} />}
                            />
                        }
                        title='AI Chat'
                        onPress={() => router.push('/ai-chat-screen')}
                    />
                </View>
                <View className='flex flex-row justify-between'>
                    <QuickButton
                        icon={
                            <RoundedIcon
                                background={GlobalColor.BLUE_NEON_BG}
                                size={3}
                                icon={<Newspaper color={GlobalColor.BLUE_NEON_BORDER} size={17} />}
                            />
                        }
                        title='Bài viết'
                        onPress={() => router.push('/blog-screen')}
                    />
                    <QuickButton
                        icon={
                            <RoundedIcon
                                background={GlobalColor.ORANGE_NEON_BG}
                                size={3}
                                icon={<Bookmark color={GlobalColor.ORANGE_NEON_BORDER} size={17} />}
                            />
                        }
                        title='Đã lưu'
                        onPress={() => router.push('/saved-blog-screen')}
                    />
                    <QuickButton
                        icon={
                            <RoundedIcon
                                background={GlobalColor.PINK_NEON_BG}
                                size={3}
                                icon={<Heart color={GlobalColor.PINK_NEON_BORDER} size={17} />}
                            />
                        }
                        title='Yêu thích'
                        onPress={() => router.push('/liked-blog-screen')}
                    />
                    <QuickButton
                        icon={
                            <RoundedIcon
                                background={GlobalColor.RED_NEON_BG}
                                size={3}
                                icon={<User color={GlobalColor.RED_NEON_BORDER} size={17} />}
                            />
                        }
                        title='Hồ sơ'
                        onPress={() => router.push('/profile-screen')}
                    />
                </View>
            </View>
        </View>
    )
}