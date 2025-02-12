import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import QuickButton from './quick-button';
import { MessageCircleMore } from '~/lib/icons/MessageCircleMore';
import { Newspaper } from '~/lib/icons/Newspaper';
import { User } from '~/lib/icons/User';


const { width, height } = Dimensions.get('window');

export default function QuickAccess() {

    const router = useRouter()

    return (
        <View className='flex flex-wrap flex-row justify-between gap-5 px-3'>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 6
    },
    image: {
        width: '100%',
        height: height * 0.6,
    },
    button: {
        height: 60,
        width: '70%'
    },
    text: {
        fontSize: 19,
    }
});
