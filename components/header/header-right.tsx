import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemeToggle } from '../ThemeToggle';
import { Image } from 'expo-image'
import Notification from './notification/notification'
import IconButton from '../common/icon-button';

export default function HeaderRight() {

    const router = useRouter()

    return (
        <View className='flex-row pr-2 items-center'>
            <ThemeToggle />
            <Notification />
            <IconButton
                icon={
                    <Image
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 1000,
                        }}
                        source={`https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg`}
                    />
                }
                buttonSize={3}
                onPress={() => router.push('/authen-screen')}
                possition='other'
            />
        </View>
    );
}