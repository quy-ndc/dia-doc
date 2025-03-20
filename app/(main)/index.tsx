import * as React from 'react';
import { View, ScrollView } from 'react-native';
import QuickAccess from '../../components/home/quick-access/quick-access';
import HomeBlogSection from '../../components/home/blog/blog-section';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import { Text } from '../../components/ui/text'

export default function HomeScreen() {

    const router = useRouter()

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         router.push('/set-up-screen');
    //     }, 1000);

    //     return () => clearTimeout(timeout);
    // }, []);

    const [token, setToken] = useState('aaa')

    async function requestUserPermission() {
        const authStatus = await getApp().messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Notification permission granted.');
        } else {
            Alert.alert('Permissions required', 'Please enable notifications.');
        }
    }

    async function getDeviceToken() {
        try {
            const token = await getApp().messaging().getToken();
            console.log('FCM Token:', token);
            setToken(token)
            return token;
        } catch (error) {
            console.error('Error getting FCM token:', error);
        }
    }


    useEffect(() => {
        requestUserPermission();
        getDeviceToken();
    }, []);

    return (
        <>
            <ScrollView
                className='w-full py-5'
                contentContainerStyle={{ alignItems: 'center' }}
                decelerationRate={'normal'}
            >
                <View className='flex-col items-center gap-10'>
                    {/* <Text>{token}</Text> */}
                    <QuickAccess />
                    <HomeBlogSection />
                </View>
            </ScrollView>
        </>
    );
}


// import * as React from 'react';
// import { View, ScrollView, Animated } from 'react-native';
// import QuickAccess from '~/components/home/quick-access/quick-access';
// import HomeBlogSection from '~/components/home/blog/blog-section';
// import { useNavigation } from 'expo-router';
// import { useEffect, useRef, useState } from 'react';



// export default function HomeScreen() {
//     const navigation = useNavigation();
//     const scrollY = useRef(new Animated.Value(0)).current;
//     const [tabBarHeight, setTabBarHeight] = useState(60);

//     useEffect(() => {
//         const listener = scrollY.addListener(({ value }) => {
//             if (value > 10) {
//                 Animated.timing(scrollY, {
//                     toValue: 0,
//                     duration: 300,
//                     useNativeDriver: false,
//                 }).start(() => setTabBarHeight(0));
//             } else {
//                 Animated.timing(scrollY, {
//                     toValue: 1,
//                     duration: 300,
//                     useNativeDriver: false,
//                 }).start(() => setTabBarHeight(60));
//             }

//             navigation.setOptions({ tabBarStyle: { height: tabBarHeight } });
//         });

//         return () => scrollY.removeListener(listener);
//     }, [navigation, scrollY, tabBarHeight]);

//     return (
//         <ScrollView
//             onScroll={Animated.event(
//                 [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//                 { useNativeDriver: false }
//             )}
//             scrollEventThrottle={16}
//             className='w-full py-5'
//             contentContainerStyle={{ alignItems: 'center' }}
//         >
//             <View className='flex-col items-center gap-10'>
//                 <QuickAccess />
//                 <HomeBlogSection />
//             </View>
//         </ScrollView>
//     );
// }

