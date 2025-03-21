import '../global.css';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, View, Alert } from 'react-native';
import { NAV_THEME } from '../lib/constants';
import { useColorScheme } from '../lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { setAndroidNavigationBar } from '../lib/android-navigation-bar';
import { ReactQueryProvider } from '../util/provider/react-query-provider';
import { Provider } from 'react-redux';
import { persistor, store } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/common/toast-config/toast-config';
import { Text } from '../components/ui/text';
import AblyWrapper from '../util/provider/ably-provider';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { getApp } from '@react-native-firebase/app';


const LIGHT_THEME: Theme = { ...DefaultTheme, colors: NAV_THEME.light };
const DARK_THEME: Theme = { ...DarkTheme, colors: NAV_THEME.dark };

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  async function getFCMToken() {
    try {
      const token = await getApp().messaging().getToken();
      console.log('FCM Token:', token);
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  }

  async function requestUserPermission() {
    const authStatus = await getApp().messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFCMToken();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Cấp quyền thất bại',
        visibilityTime: 2000
      })
    }
  }

  useEffect(() => {
    requestUserPermission();

    const unsubscribeOnMessage = getApp().messaging().onMessage(async remoteMessage => {
      Alert.alert('New Notification', JSON.stringify(remoteMessage));
      console.log(JSON.stringify(remoteMessage))
    });

    return unsubscribeOnMessage;
  }, []);



  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      document.documentElement.classList.add('bg-background');
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<View className='flex-1 w-full h-full align-center justify-center'><Text>Loading...</Text></View>} persistor={persistor}>
          <AblyWrapper>
            <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
              <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
              <ReactQueryProvider>
                <Stack>
                  <Stack.Screen name='(main)' options={{ headerShown: false }} />
                  <Stack.Screen name='authen-screen' options={{ headerShown: false }} />
                  <Stack.Screen name='set-up-screen' options={{ headerShown: false }} />
                  <Stack.Screen name='chat-screen' options={{ headerTitle: '' }} />
                  <Stack.Screen name='blog-detail-screen' options={{ headerTitle: '', presentation: 'modal' }} />
                  <Stack.Screen name='+not-found' options={{ headerShown: false }} />
                </Stack>
              </ReactQueryProvider>
              <PortalHost />
            </ThemeProvider>
          </AblyWrapper>
        </PersistGate>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
