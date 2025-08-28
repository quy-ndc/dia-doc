import * as React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemeToggle } from '../ThemeToggle';
import { Image } from 'expo-image'
import IconButton from '../common/icon-button';
import useUserStore from '../../store/userStore';
import NotificationAccess from './notification/noti-access';

export default function HeaderRight() {

    const router = useRouter()
    const { user } = useUserStore()

    return (
        <View className='flex-row pr-2 items-center'>
            <ThemeToggle />
            <NotificationAccess position='header' />
            <IconButton
                icon={
                    <Image
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 1000,
                        }}
                        source={user.avatar}
                    />
                }
                buttonSize={3}
                onPress={() => router.push('/profile-screen')}
                possition='other'
            />
        </View>
    );
}