import * as React from 'react';
import { View, StyleSheet, ScrollView, Modal } from 'react-native';
import QuickAccess from '~/components/home/quick-access/quick-access';
import HomeBlogSection from '~/components/home/blog/blog-section';

export default function HomeScreen() {

    return (
        <>
            <ScrollView
                className='w-full bg- py-5'
                contentContainerStyle={styles.container}
            >
                <View className='flex-col items-center gap-10'>
                    <QuickAccess />
                    <HomeBlogSection />
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
});
