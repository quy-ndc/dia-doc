import * as React from 'react';
import { View, ScrollView} from 'react-native';
import QuickAccess from '../../../components/home/quick-access/quick-access';
import HomeBlogSection from '../../../components/home/blog/blog-section';


export default function HomeScreen() {

    return (
        <>
            <ScrollView
                className='w-full py-5'
                contentContainerStyle={{ alignItems: 'center' }}
                decelerationRate={'normal'}
            >
                <View className='flex-col items-center gap-10'>
                    <QuickAccess />
                    <HomeBlogSection />
                </View>
            </ScrollView>
        </>
    );
}