import * as React from 'react';
import { View, StyleSheet, Dimensions, useColorScheme, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import QuickAccess from '~/components/home/quick-access/quick-access';
import HomeBlogSection from '~/components/home/blog/blog-section';


const { width, height } = Dimensions.get('window');

export default function HomeScreen() {

    const router = useRouter()

    return (
        <ScrollView
            className='w-full py-5'
            contentContainerStyle={styles.container}
        >
            <View className='flex-col items-center gap-10'>
                <QuickAccess />
                <HomeBlogSection />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
});
