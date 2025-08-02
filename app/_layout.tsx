import '../global.css'
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Platform } from 'react-native'
import { NAV_THEME } from '../lib/constants'
import { useColorScheme } from '../lib/useColorScheme'
import { PortalHost } from '@rn-primitives/portal'
import { setAndroidNavigationBar } from '../lib/android-navigation-bar'
import { ReactQueryProvider } from '../util/provider/react-query-provider'
import Toast from 'react-native-toast-message'
import { toastConfig } from '../components/common/toast-config/toast-config'
import AblyWrapper from '../util/provider/ably-provider'
import NetworkOverlay from '../components/common/network-overlay'
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
