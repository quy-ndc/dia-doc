import * as React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import QuickButton from './quick-button';
import { MessageCircleMore } from '../../../lib/icons/MessageCircleMore';
import { Newspaper } from '../../../lib/icons/Newspaper';
import { User } from '../../../lib/icons/User';
import SectionTitle from '../common/section-title';
import { Zap } from '../../../lib/icons/Zap';
import NotificationAccess from '../../header/notification/noti-access';

export default function QuickAccess() {

    const router = useRouter()

    return (
        <View className='flex-col gap-5'>
            <SectionTitle
                icon={<Zap className='text-yellow-400' size={18} />}
                title='Truy cập Nhanh'
            />

            <View className='flex flex-row justify-between px-2'>
                <QuickButton
                    icon={
                        <View className='flex p-3 justify-center items-center rounded-full bg-[var(--green-dynamic-bg)]'>
                            <MessageCircleMore className='text-foreground' size={17} />
                        </View>
                    }
                    title='Tin nhắn'
                    onPress={() => router.push('/message-screen')}
                />
                <QuickButton
                    icon={
                        <View className='flex p-3 justify-center items-center rounded-full bg-[var(--blue-dynamic-bg)]'>
                            <Newspaper className='text-foreground' size={17} />
                        </View>
                    }
                    title='Bài viết'
                    onPress={() => router.push('/blog-screen')}
                />
                <NotificationAccess position='quick' />
                <QuickButton
                    icon={
                        <View className='flex p-3 justify-center items-center rounded-full bg-[var(--red-dynamic-bg)]'>
                            <User className='text-foreground' size={17} />
                        </View>
                    }
                    title='Hồ sơ'
                    onPress={() => router.push('/profile-screen')}
                />
            </View>
        </View>
    );
}