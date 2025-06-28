import '../global.css'
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native'
import { Redirect, Stack, router, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Platform, Alert, PermissionsAndroid } from 'react-native'
import { NAV_THEME } from '../lib/constants'
import { useColorScheme } from '../lib/useColorScheme'
import { PortalHost } from '@rn-primitives/portal'
import { setAndroidNavigationBar } from '../lib/android-navigation-bar'
import { ReactQueryProvider } from '../util/provider/react-query-provider'
import Toast from 'react-native-toast-message'
import { toastConfig } from '../components/common/toast-config/toast-config'
import AblyWrapper from '../util/provider/ably-provider'
import messaging from '@react-native-firebase/messaging'
import { useEffect } from 'react'
import { getApp } from '@react-native-firebase/app'
import NetworkOverlay from '../components/common/network-overlay'
import { Vibration } from 'react-native'
import notifee from '@notifee/react-native'
import { createNotificationChannel } from '../util/notification/create-noti-channel'
import { ChannelProvider } from 'ably/react'
import { GLOBAL_CHAT_EVENT_CHANNEL } from '@env'
import useUserStore from '../store/userStore'
import { AuthorProvider } from '../util/provider/author-provider'

const LIGHT_THEME: Theme = { ...DefaultTheme, colors: NAV_THEME.light }
const DARK_THEME: Theme = { ...DarkTheme, colors: NAV_THEME.dark }

export { ErrorBoundary } from 'expo-router'

export default function RootLayout() {

  const hasMounted = React.useRef(false)
  const { colorScheme, isDarkColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false)
  const { user } = useUserStore()

  // useEffect(() => {
  //   createNotificationChannel()
  // }, [])

  console.log(user)

  useEffect(() => {
    requestUserPermission()

    const unsubscribeOnMessage = getApp().messaging().onMessage(async remoteMessage => {
      Vibration.vibrate()

      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId: 'foreground-noti',
          smallIcon: 'ic_launcher', // ensure you have this icon in `android/app/src/main/res`
          pressAction: {
            id: 'default',
          },
        },
      })

      Alert.alert('New Notification', JSON.stringify(remoteMessage))
      console.log(JSON.stringify(remoteMessage))
    })

    return unsubscribeOnMessage
  }, [])

  async function requestUserPermission() {
    const authStatus = await getApp().messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (!enabled) {
      // Toast.show({
      //   type: 'error',
      //   text1: 'Bạn cần cấp quyền để nhận thông báo',
      //   visibilityTime: 3000,
      // })
    }

    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      )
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        // Alert.alert('Notification Permission Required', 'Please enable notifications in settings.')
      }
    }
  }

  async function getDeviceToken() {
    try {
      const token = await getApp().messaging().getToken()
      console.log('FCM Token:', token)
      return token
    } catch (error) {
      console.error('Error getting FCM token:', error)
    }
  }

  useEffect(() => {
    requestUserPermission().then(() => getDeviceToken())
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return
    }

    if (Platform.OS === 'web') {
      document.documentElement.classList.add('bg-background')
    }
    setAndroidNavigationBar(colorScheme)
    setIsColorSchemeLoaded(true)
    hasMounted.current = true
  }, [])

  if (!isColorSchemeLoaded) {
    return null
  }

  return (
    <>
      <AblyWrapper>
        <ChannelProvider channelName={GLOBAL_CHAT_EVENT_CHANNEL}>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
            <ReactQueryProvider>
              <AuthorProvider>
                <Stack>
                  <Stack.Screen name='(unauthenticated)' options={{ headerShown: false }} />
                  <Stack.Screen name='(protected)' options={{ headerShown: false }} />
                  <Stack.Screen name='+not-found' options={{ headerShown: false }} />
                </Stack>
                <NetworkOverlay />
              </AuthorProvider>
            </ReactQueryProvider>
            <PortalHost />
          </ThemeProvider>
        </ChannelProvider>
      </AblyWrapper>
      <Toast config={toastConfig} />
    </>
  )
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect
