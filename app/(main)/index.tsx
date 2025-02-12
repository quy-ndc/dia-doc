import * as React from 'react';
import { View, StyleSheet, Dimensions, useColorScheme, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { LogIn } from '~/lib/icons/Login';
import { useRouter } from 'expo-router';
import QuickAccess from '~/components/home/quick-access/quick-access';


const { width, height } = Dimensions.get('window');

export default function HomeScreen() {

    const router = useRouter()

    return (
        <ScrollView
            className='flex-col w-full gap-5 px-2 py-5'
            contentContainerStyle={styles.container}
        >
            <QuickAccess />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
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
