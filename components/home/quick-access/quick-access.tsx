import * as React from 'react';
import { View, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import QuickButton from './quick-button';
import { MessageCircleMore } from '~/lib/icons/MessageCircleMore';
import { Newspaper } from '~/lib/icons/Newspaper';
import { User } from '~/lib/icons/User';
import { Text } from '~/components/ui/text'
import SectionTitle from '../common/section-title';
import { Zap } from '~/lib/icons/Zap';

const { width, height } = Dimensions.get('window');

export default function QuickAccess() {

    const router = useRouter()

    return (
        <View className='flex-col gap-5'>
            <SectionTitle
                icon={<Zap className='text-[var(--quick-access-title-icon-color)]' size={18} />}
                title='Truy cập Nhanh'
            />
             
            <View className='flex flex-wrap flex-row justify-between gap-3 px-5'>
                <QuickButton
                    icon={<MessageCircleMore className='text-[var(--quick-access-icon-color)]' size={23} />}
                    title='Tin nhắn'
                    onPress={() => router.push('/message-screen')}
                />
                <QuickButton
                    icon={<Newspaper className='text-[var(--quick-access-icon-color)]' size={23} />}
                    title='Bài viết'
                    onPress={() => router.push('/blog-screen')}
                />
                <QuickButton
                    icon={<User className='text-[var(--quick-access-icon-color)]' size={23} />}
                    title='Hồ sơ'
                    onPress={() => router.push('/profile-screen')}
                />
            </View>
        </View>
    );
}