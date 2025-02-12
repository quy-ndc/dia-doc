import * as React from 'react';
import { View, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { LogIn } from '~/lib/icons/Login';
import { useRouter } from 'expo-router';


const { width, height } = Dimensions.get('window');

export default function BlogScreen() {

    const router = useRouter()

    return (
        <View className='flex-1 justify-between gap-5 p-10'>
            <Text>Profile</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
