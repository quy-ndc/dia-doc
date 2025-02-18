import * as React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemeToggle } from '../ThemeToggle';
import { Image } from 'expo-image'

const { width, height } = Dimensions.get('window');

export default function HeaderRight() {

    const router = useRouter()

    return (
        <View className='flex-row gap-2 px-2'>
            <ThemeToggle />
            <Pressable
                onPress={() => router.push('/authen-screen')}
            >
                <Image
                    style={styles.image}
                    source={`https://res.cloudinary.com/dcjdtlnbl/image/upload/v1729103768/female-shirt-category_pl5o1d.jpg`}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 30,
        height: 30,
        borderRadius: 1000
    }
});